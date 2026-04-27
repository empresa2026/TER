import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  Check, 
  Save, 
  Crown,
  Info,
  Lightbulb,
  Zap,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Matrix, MatrixField, MatrixResult } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface MatrixPlayerProps {
  matrix: Matrix;
  userId: string;
  onComplete: () => void;
  onBack: () => void;
  viewResult?: MatrixResult;
}

export function MatrixPlayer({ matrix, userId, onComplete, onBack, viewResult }: MatrixPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0 to fields.length
  const [answers, setAnswers] = useState<Record<string, string>>(viewResult?.answers || {});
  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(!viewResult);

  const isViewMode = !!viewResult;

  const isLastStep = currentStep === matrix.fields.length - (matrix.extraQuestions ? 0 : 1);
  const progress = (currentStep / matrix.fields.length) * 100;

  const handleNext = () => {
    if (currentStep < matrix.fields.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await addDoc(collection(db, 'matrix_results'), {
        userId,
        matrixId: matrix.id,
        answers,
        completedAt: new Date().toISOString()
      });
      onComplete();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'matrix_results');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 min-h-[80vh]"
    >
      {/* Sidebar Help for Laypeople */}
      <AnimatePresence>
        {showHelp && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="md:w-80 shrink-0"
          >
            <Card className="h-full space-y-8 sticky top-8 border-gold/20 bg-gold/5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Guia do Facilitador</h4>
                <button onClick={() => setShowHelp(false)} className="text-gold/40 hover:text-gold">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar">
                <HelpSection 
                  icon={<Info className="w-4 h-4" />}
                  title="O que procurar?"
                  content={matrix.help.what}
                />
                <HelpSection 
                  icon={<Lightbulb className="w-4 h-4" />}
                  title="Como sei que achei?"
                  content={matrix.help.how}
                />
                <HelpSection 
                  icon={<Zap className="w-4 h-4" />}
                  title="O que faço agora?"
                  content={matrix.help.do}
                />
                <HelpSection 
                  icon={<ShieldCheck className="w-4 h-4" />}
                  title="Como isso cura?"
                  content={matrix.help.cure}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-serif">{matrix.title}</h2>
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/20 mt-1">
              Etapa {currentStep + 1} de {matrix.fields.length}
            </div>
          </div>

          {!showHelp ? (
            <button onClick={() => setShowHelp(true)} className="p-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-all">
              <HelpCircle className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          />
        </div>

        <AnimatePresence mode="wait">
          {currentStep < matrix.fields.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center text-4xl font-serif text-gold shrink-0">
                  {matrix.fields[currentStep].letter}
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold/60 mb-2">
                    {matrix.fields[currentStep].label}
                  </h3>
                  <p className="text-2xl font-serif leading-tight mb-6">
                    {matrix.fields[currentStep].description}
                  </p>

                  {matrix.fields[currentStep].hints && !isViewMode && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {matrix.fields[currentStep].hints?.map((hint, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => {
                            const current = answers[matrix.fields[currentStep].label] || '';
                            setAnswers(prev => ({ 
                              ...prev, 
                              [matrix.fields[currentStep].label]: current ? `${current}\n${hint}` : hint 
                            }));
                          }}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all flex items-center gap-2 group"
                        >
                          <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {hint}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <textarea 
                readOnly={isViewMode}
                autoFocus={!isViewMode}
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-xl text-white placeholder:text-white/10 focus:outline-none focus:border-gold/50 min-h-[300px] transition-all leading-relaxed",
                  isViewMode && "cursor-default"
                )}
                placeholder="Escreva sua percepção aqui..."
                value={answers[matrix.fields[currentStep].label] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [matrix.fields[currentStep].label]: e.target.value }))}
              />

              <div className="flex justify-end gap-4">
                {currentStep === matrix.fields.length - 1 ? (
                  <Button onClick={isViewMode ? onBack : handleSave} disabled={saving} className="py-4 px-12 text-lg">
                    {isViewMode ? 'Voltar ao Raio-X' : saving ? 'Concluindo...' : 'Finalizar Investigação'}
                    {!saving && !isViewMode && <Check className="ml-2 w-5 h-5" />}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="py-4 px-12 text-lg">
                    Próxima Letra
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="extra"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-8"
            >
              <Crown className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="text-4xl font-serif">Investigação Concluída</h2>
              <p className="text-white/60 max-w-md mx-auto">
                Suas percepções foram registradas. Este é um passo fundamental para o seu processo de diferenciação e integração.
              </p>
              <Button onClick={handleSave} className="py-4 px-12 text-lg" disabled={saving}>
                Salvar no Raio-X
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function HelpSection({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-xs text-white/50 leading-relaxed italic">
        {content}
      </p>
    </div>
  );
}
