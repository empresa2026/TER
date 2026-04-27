import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check, Crown } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Quiz, UserResult } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface QuizPlayerProps {
  quiz: Quiz;
  userId: string;
  onComplete: () => void;
  onBack: () => void;
  viewResult?: UserResult;
}

export function QuizPlayer({ quiz, userId, onComplete, onBack, viewResult }: QuizPlayerProps) {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(viewResult ? 0 : -1); // -1 for Intro, sections.length for Final Prayer
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(viewResult?.answers || {});
  const [saving, setSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const isViewMode = !!viewResult;

  const sections = quiz.sections || [];
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const currentGlobalIndex = sections.slice(0, currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIdx;
  const progress = currentSectionIdx === -1 ? 0 : (currentGlobalIndex / totalQuestions) * 100;

  const handleAnswer = (optionIdx: number) => {
    if (isViewMode || selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const questionKey = `${currentSectionIdx}-${currentQuestionIdx}`;
    setAnswers(prev => ({ ...prev, [questionKey]: optionIdx }));

    setTimeout(() => {
      setSelectedOption(null);
      const currentSection = sections[currentSectionIdx];
      if (currentQuestionIdx < currentSection.questions.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        setCurrentSectionIdx(currentSectionIdx + 1);
        setCurrentQuestionIdx(0);
      }
    }, 1000);
  };

  const saveResult = async () => {
    setSaving(true);
    try {
      await addDoc(collection(db, 'user_results'), {
        userId: userId,
        quizId: quiz.id,
        answers,
        completedAt: new Date().toISOString()
      });
      onComplete();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'user_results');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-8 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {currentSectionIdx === -1 ? 'Introdução' : 
           currentSectionIdx >= sections.length ? 'Conclusão' : 
           `Bloco ${currentSectionIdx + 1} de ${sections.length}`}
        </div>
        <div className="w-6" />
      </div>

      <AnimatePresence mode="wait">
        {currentSectionIdx >= 0 && currentSectionIdx < sections.length && (
          <div className="mb-12 space-y-4">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/20 font-bold">
              <span>Progresso da Investigação</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              />
            </div>
          </div>
        )}

        {currentSectionIdx === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Estrutura Identificada</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Ferida Primária</div>
                  <div className="text-lg font-serif">{quiz.identifiedStructure?.ferida || 'N/A'}</div>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Domínio de Dor</div>
                  <div className="text-lg font-serif">{quiz.identifiedStructure?.dominio || 'N/A'}</div>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Máscara do Ego</div>
                  <div className="text-lg font-serif">{quiz.identifiedStructure?.mascara || 'N/A'}</div>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Modo Operante</div>
                  <div className="text-lg font-serif">{quiz.identifiedStructure?.modo || 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/5">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Estabelecimento de Eixo</h2>
              <p className="text-xl font-serif leading-relaxed text-white/80 italic">
                {quiz.axisEstablishment?.text || 'N/A'}
              </p>
              <div className="bg-gold/5 border border-gold/20 p-6 rounded-3xl space-y-3">
                <div className="text-[10px] uppercase text-gold font-bold">Instrução</div>
                <p className="text-lg font-serif text-gold leading-snug">
                  {quiz.axisEstablishment?.instruction || 'N/A'}
                </p>
              </div>
            </div>

            <Button className="w-full py-4 mt-8" onClick={() => setCurrentSectionIdx(0)}>
              Iniciar Protocolo
            </Button>
          </motion.div>
        )}

        {currentSectionIdx >= 0 && currentSectionIdx < sections.length && (
          <motion.div
            key={`section-${currentSectionIdx}-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-serif">{sections[currentSectionIdx].title}</h2>
              {sections[currentSectionIdx].intro && (
                <p className="text-white/40 italic">{sections[currentSectionIdx].intro}</p>
              )}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif leading-tight">
                {sections[currentSectionIdx].questions[currentQuestionIdx].question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {sections[currentSectionIdx].questions[currentQuestionIdx].options.map((option, idx) => {
                  const answerKey = `${currentSectionIdx}-${currentQuestionIdx}`;
                  const isSelected = selectedOption === idx || answers[answerKey] === idx;
                  const isDimmed = (selectedOption !== null && selectedOption !== idx) || (isViewMode && answers[answerKey] !== undefined && answers[answerKey] !== idx);
                  return (
                    <motion.button
                      key={idx}
                      whileTap={(!isViewMode && selectedOption === null) ? { scale: 0.98 } : {}}
                      animate={isSelected ? { scale: 1.02 } : isDimmed ? { scale: 0.96, opacity: 0.2 } : { scale: 1 }}
                      onClick={() => handleAnswer(idx)}
                      className={cn(
                        "glass p-6 rounded-2xl text-left transition-all duration-500 group flex items-center justify-between border relative overflow-hidden",
                        isSelected 
                          ? "border-gold bg-gradient-to-br from-gold/30 via-gold/10 to-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.3)]" 
                          : "border-white/5 hover:border-gold/50 hover:bg-white/10",
                        isDimmed && "grayscale pointer-events-none blur-[0.5px]"
                      )}
                    >
                      {isSelected && (
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        />
                      )}
                      <span className={cn(
                        "text-lg transition-colors relative z-10",
                        isSelected ? "text-gold font-bold" : "text-white/80 group-hover:text-white"
                      )}>{option}</span>
                      <div className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center transition-all relative z-10",
                        isSelected ? "border-gold gold-gradient text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]" : "border-white/20 group-hover:border-gold/50"
                      )}>
                        {isSelected ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {isViewMode && (
                <div className="flex justify-between gap-4 pt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentQuestionIdx > 0) {
                        setCurrentQuestionIdx(currentQuestionIdx - 1);
                      } else if (currentSectionIdx > 0) {
                        setCurrentSectionIdx(currentSectionIdx - 1);
                        setCurrentQuestionIdx(sections[currentSectionIdx - 1].questions.length - 1);
                      } else {
                        setCurrentSectionIdx(-1);
                      }
                    }}
                    className="flex-1 border-white/10"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => {
                      const currentSection = sections[currentSectionIdx];
                      if (currentQuestionIdx < currentSection.questions.length - 1) {
                        setCurrentQuestionIdx(currentQuestionIdx + 1);
                      } else {
                        setCurrentSectionIdx(currentSectionIdx + 1);
                        setCurrentQuestionIdx(0);
                      }
                    }}
                    className="flex-1"
                  >
                    Próximo
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {currentSectionIdx >= sections.length && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12 text-center"
          >
            <div className="p-12 glass rounded-[3rem] space-y-8 border-gold/20">
              <Crown className="w-16 h-16 text-gold mx-auto" />
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gold">Oração Final de Renúncia</h2>
              <p className="text-2xl font-serif leading-relaxed italic text-white/90 whitespace-pre-wrap">
                {quiz.finalPrayer}
              </p>
            </div>

            <Button 
              className="w-full py-4 text-lg" 
              onClick={isViewMode ? onBack : saveResult}
              disabled={saving}
            >
              {isViewMode ? 'Voltar ao Raio-X' : saving ? 'Salvando...' : 'Concluir Protocolo'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
