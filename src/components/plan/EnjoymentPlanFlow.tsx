import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  Crown, 
  Star, 
  Heart, 
  TrendingUp, 
  Briefcase, 
  BookOpen, 
  Sun, 
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ENJOYMENT_PILLARS } from '../../data/enjoymentPlan';
import { EnjoymentPlanResult } from '../../types';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, setDoc, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { cn } from '../../lib/utils';

interface EnjoymentPlanFlowProps {
  userId: string;
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 
  | 'intro' 
  | 'xray' 
  | 'xray_reflections' 
  | 'pillar_details' 
  | 'final_vision' 
  | 'final_vida' 
  | 'concluded';

export function EnjoymentPlanFlow({ userId, onComplete, onBack }: EnjoymentPlanFlowProps) {
  const [step, setStep] = useState<FlowStep>('intro');
  const [pillarIndex, setPillarIndex] = useState(0);
  const [pillarSubStep, setPillarSubStep] = useState<'intro' | 'image' | 'objectives' | 'actions'>('intro');
  const [saving, setSaving] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [loadingDraft, setLoadingDraft] = useState(true);

  const [xrayScores, setXrayScores] = useState<Record<string, number>>({});
  const [xrayReflections, setXrayReflections] = useState({ r1: '', r2: '', r3: '' });
  const [pillarData, setPillarData] = useState<Record<string, any>>({});
  const [finalVision, setFinalVision] = useState({ 
    phrase: { where: '', who: '' },
    vida: { visao: '', intencao: '', direcao: '', acao: '' }
  });

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load existing draft
  useEffect(() => {
    async function loadDraft() {
      try {
        const q = query(
          collection(db, 'enjoymentPlanDrafts'), 
          where('userId', '==', userId),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const draftDoc = snapshot.docs[0];
          const data = draftDoc.data();
          setDraftId(draftDoc.id);
          if (data.xray) setXrayScores(data.xray);
          if (data.xrayReflections) setXrayReflections(data.xrayReflections);
          if (data.pillars) setPillarData(data.pillars);
          if (data.finalVision) setFinalVision(data.finalVision);
          if (data.currentStep) setStep(data.currentStep);
          if (data.pillarIndex !== undefined) setPillarIndex(data.pillarIndex);
          if (data.pillarSubStep) setPillarSubStep(data.pillarSubStep);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      } finally {
        setLoadingDraft(false);
      }
    }
    loadDraft();
  }, [userId]);

  const saveDraft = async () => {
    try {
      const draftData = {
        userId,
        xray: xrayScores,
        xrayReflections,
        pillars: pillarData,
        finalVision,
        currentStep: step,
        pillarIndex,
        pillarSubStep,
        updatedAt: new Date().toISOString()
      };

      if (draftId) {
        await updateDoc(doc(db, 'enjoymentPlanDrafts', draftId), draftData);
      } else {
        const newDoc = await addDoc(collection(db, 'enjoymentPlanDrafts'), draftData);
        setDraftId(newDoc.id);
      }
    } catch (error) {
      console.warn('Silent auto-save failed:', error);
    }
  };

  // Auto-save debounced
  useEffect(() => {
    if (loadingDraft) return;
    
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      saveDraft();
    }, 2000);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [xrayScores, xrayReflections, pillarData, finalVision, step, pillarIndex, pillarSubStep, loadingDraft]);

  const currentPillar = ENJOYMENT_PILLARS[pillarIndex];

  const handleSave = async () => {
    setSaving(true);
    try {
      const result: Omit<EnjoymentPlanResult, 'id'> = {
        userId,
        xray: xrayScores,
        xrayReflections,
        pillars: pillarData,
        finalVision,
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'enjoymentPlans'), result);
      
      // Clear draft after successful completion
      if (draftId) {
        // Technically we could delete it, but let's just mark it completed or ignore
        // Moving to concluded state is enough
      }
      
      setStep('concluded');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'enjoymentPlans');
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    if (step === 'intro') setStep('xray');
    else if (step === 'xray') setStep('xray_reflections');
    else if (step === 'xray_reflections') setStep('pillar_details');
    else if (step === 'pillar_details') {
      if (pillarSubStep === 'intro') setPillarSubStep('image');
      else if (pillarSubStep === 'image') setPillarSubStep('objectives');
      else if (pillarSubStep === 'objectives') setPillarSubStep('actions');
      else if (pillarSubStep === 'actions') {
        if (pillarIndex < ENJOYMENT_PILLARS.length - 1) {
          setPillarIndex(pillarIndex + 1);
          setPillarSubStep('intro');
        } else {
          setStep('final_vision');
        }
      }
    }
    else if (step === 'final_vision') setStep('final_vida');
    else if (step === 'final_vida') handleSave();
  };

  const prevStep = () => {
    if (step === 'intro') onBack();
    else if (step === 'xray') setStep('intro');
    else if (step === 'xray_reflections') setStep('xray');
    else if (step === 'pillar_details') {
      if (pillarSubStep === 'intro') {
        if (pillarIndex > 0) {
          setPillarIndex(pillarIndex - 1);
          setPillarSubStep('actions');
        } else {
          setStep('xray_reflections');
        }
      }
      else if (pillarSubStep === 'image') setPillarSubStep('intro');
      else if (pillarSubStep === 'objectives') setPillarSubStep('image');
      else if (pillarSubStep === 'actions') setPillarSubStep('objectives');
    }
    else if (step === 'final_vision') {
      setStep('pillar_details');
      setPillarIndex(ENJOYMENT_PILLARS.length - 1);
      setPillarSubStep('actions');
    }
    else if (step === 'final_vida') setStep('final_vision');
  };

  if (loadingDraft) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
        <p className="text-white/40 font-serif italic text-lg text-center px-4">
          Preparando seu Plano do Desfrute...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <Crown className="w-10 h-10 text-gold" />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                Plano do <span className="text-gold italic">Desfrute</span>
              </h1>
              <p className="text-xl text-white/40 max-w-xl mx-auto leading-relaxed">
                O ponto de partida para uma vida que você não precisa mais conquistar — apenas desfrutar.
              </p>
            </div>

            <Card className="p-8 space-y-8 bg-white/[0.02] border-white/5">
              <div className="bg-gold/5 border-l-4 border-gold p-6 rounded-r-2xl">
                <p className="text-lg text-gold/90 font-serif italic mb-4">
                  "A maioria dos planos começa com: 'O que você quer conquistar?' Nós começamos com uma pergunta diferente: 'O que já foi provisionado para você — que você ainda não aprendeu a desfrutar?'"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Planos Comuns</h3>
                  <ul className="space-y-3">
                    {['Partem da escassez: "me falta"', 'Focam em conquistar e acumular', 'Ignoram por que você não consegue manter', 'Culpabilidade quando não executa'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="text-red-400 mt-1">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Plano do Desfrute</h3>
                  <ul className="space-y-3">
                    {['Parte da abundância: "já foi dado"', 'Foca em desobstruir e receber', 'Mapeia as Alianças que travam o fluxo', 'Honra o seu progresso'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gold/80 text-sm">
                        <span className="text-gold mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="flex flex-col items-center gap-4 pt-8">
              <Button onClick={nextStep} className="px-12 py-6 text-xl rounded-full">
                {draftId ? 'Continuar de onde parei' : 'Começar Jornada'} <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
              {draftId && (
                <button 
                  onClick={() => {
                    if (confirm('Deseja realmente recomeçar seu plano? Isso apagará o progresso anterior.')) {
                      setDraftId(null);
                      setXrayScores({});
                      setXrayReflections({ r1: '', r2: '', r3: '' });
                      setPillarData({});
                      setFinalVision({ 
                        phrase: { where: '', who: '' },
                        vida: { visao: '', intencao: '', direcao: '', acao: '' }
                      });
                      setStep('xray');
                    }
                  }}
                  className="text-white/20 hover:text-white/40 text-sm transition-colors"
                >
                  Recomeçar novo plano
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'xray' && (
          <motion.div
            key="xray"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={prevStep} className="p-2 hover:bg-white/5 rounded-full text-white/40">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Passo 1</span>
                <h2 className="text-3xl font-serif">Raio-X da Vida</h2>
              </div>
            </div>

            <p className="text-white/60 italic leading-relaxed">
              "Avalie cada dimensão com honestidade. A nota não é sobre o que você deveria ter — é sobre o que você genuinamente sente e vive hoje."
            </p>

            <div className="space-y-6">
              {ENJOYMENT_PILLARS.map((pillar) => (
                <Card key={pillar.id} className="p-6 bg-white/[0.02]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-serif">{pillar.title}</h3>
                      <p className="text-sm text-white/40">{pillar.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <button
                          key={score}
                          onClick={() => setXrayScores(prev => ({ ...prev, [pillar.id]: score }))}
                          className={cn(
                            "w-8 h-8 rounded-lg text-xs font-bold transition-all border",
                            xrayScores[pillar.id] === score
                              ? "bg-gold border-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                              : "bg-white/5 border-white/5 text-white/40 hover:border-gold/30"
                          )}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-end pt-8">
              <Button 
                onClick={nextStep} 
                disabled={Object.keys(xrayScores).length < ENJOYMENT_PILLARS.length}
                className="px-8"
              >
                Próximo Passo <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'xray_reflections' && (
          <motion.div
            key="xray_reflections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={prevStep} className="p-2 hover:bg-white/5 rounded-full text-white/40">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-serif">Reflexões do Raio-X</h2>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <label className="text-white/60 text-lg">R1. Qual dimensão te surpreendeu mais ao avaliar? O que você não esperava ver?</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 min-h-[120px]"
                  value={xrayReflections.r1}
                  onChange={(e) => setXrayReflections(prev => ({ ...prev, r1: e.target.value }))}
                />
              </div>

              <div className="space-y-4">
                <label className="text-white/60 text-lg">R2. Qual dimensão, se melhorada, impactaria mais positivamente todas as outras?</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 min-h-[120px]"
                  value={xrayReflections.r2}
                  onChange={(e) => setXrayReflections(prev => ({ ...prev, r2: e.target.value }))}
                />
              </div>

              <div className="space-y-4">
                <label className="text-white/60 text-lg">R3. Existe alguma dimensão onde você travou para dar a nota? Por quê?</label>
                <p className="text-xs text-gold/40 italic">Travar em uma área é um sinal: pode haver uma Aliança operando ali.</p>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 min-h-[120px]"
                  value={xrayReflections.r3}
                  onChange={(e) => setXrayReflections(prev => ({ ...prev, r3: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <Button onClick={nextStep} className="px-8">
                Confirmar e Iniciar Pilares <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'pillar_details' && (
          <motion.div
            key={`pillar-${pillarIndex}-${pillarSubStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <button onClick={prevStep} className="p-2 hover:bg-white/5 rounded-full text-white/40">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Pilar {pillarIndex + 1} de 7</span>
                  <h2 className="text-3xl font-serif">{currentPillar.title}</h2>
                </div>
              </div>
              <div className="flex gap-2">
                {['intro', 'image', 'objectives', 'actions'].map((s) => (
                  <div 
                    key={s} 
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      pillarSubStep === s ? "bg-gold scale-125" : "bg-white/10"
                    )} 
                  />
                ))}
              </div>
            </div>

            {pillarSubStep === 'intro' && (
              <div className="space-y-12">
                <Card className="p-12 text-center bg-gold/[0.02] border-gold/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Crown className="w-32 h-32 text-gold" />
                   </div>
                   <h3 className="text-3xl font-serif text-gold mb-6 italic leading-snug">"{currentPillar.description}"</h3>
                   <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">{currentPillar.context}</p>
                </Card>

                <div className="flex justify-center">
                  <Button onClick={nextStep} className="px-12 py-6 text-lg rounded-full">
                    Iniciar Pilar <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {pillarSubStep === 'image' && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Passo 2</span>
                   <h3 className="text-2xl font-serif text-white/80">A Imagem do Desfrute</h3>
                   <p className="text-sm text-white/40">Escreva em tempo presente: "Eu desfruto...", "Na minha vida existe..."</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-lg font-serif">A. Como seria desfrutar plenamente {currentPillar.title}?</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl text-white focus:outline-none focus:border-gold/50 min-h-[150px]"
                      value={pillarData[currentPillar.id]?.image?.a || ''}
                      onChange={(e) => setPillarData(prev => ({
                        ...prev,
                        [currentPillar.id]: {
                          ...prev[currentPillar.id],
                          image: { ...(prev[currentPillar.id]?.image || {}), a: e.target.value }
                        }
                      }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-serif">B. O que você negligencia nesta área que, se cuidado, mudaria sua qualidade de vida?</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl text-white focus:outline-none focus:border-gold/50 min-h-[150px]"
                      value={pillarData[currentPillar.id]?.image?.b || ''}
                      onChange={(e) => setPillarData(prev => ({
                        ...prev,
                        [currentPillar.id]: {
                          ...prev[currentPillar.id],
                          image: { ...(prev[currentPillar.id]?.image || {}), b: e.target.value }
                        }
                      }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-serif">C. Existe algum padrão familiar repetitivo nesta área?</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl text-white focus:outline-none focus:border-gold/50 min-h-[150px]"
                      value={pillarData[currentPillar.id]?.image?.c || ''}
                      onChange={(e) => setPillarData(prev => ({
                        ...prev,
                        [currentPillar.id]: {
                          ...prev[currentPillar.id],
                          image: { ...(prev[currentPillar.id]?.image || {}), c: e.target.value }
                        }
                      }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="px-8">
                    Próximo <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {pillarSubStep === 'objectives' && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Passo 3</span>
                   <h3 className="text-2xl font-serif text-white/80">Objetivos de Desfrute</h3>
                   <p className="text-sm text-white/40">Use linguagem de estado: 'viver com...', 'sentir...', 'estar...'.</p>
                </div>

                <div className="space-y-6">
                  {[0, 1, 2].map((idx) => (
                    <Card key={idx} className="p-6 bg-white/[0.02] grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/20">O que desfrutar aqui</label>
                        <input 
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-gold/50 transition-all"
                          placeholder="Estado desejado"
                          value={pillarData[currentPillar.id]?.objectives?.[idx]?.what || ''}
                          onChange={(e) => {
                            const objectives = [...(pillarData[currentPillar.id]?.objectives || [{},{},{}])];
                            objectives[idx] = { ...objectives[idx], what: e.target.value };
                            setPillarData(prev => ({
                              ...prev,
                              [currentPillar.id]: { ...prev[currentPillar.id], objectives }
                            }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/20">Até quando</label>
                        <input 
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-gold/50 transition-all"
                          placeholder="Prazo"
                          value={pillarData[currentPillar.id]?.objectives?.[idx]?.when || ''}
                          onChange={(e) => {
                            const objectives = [...(pillarData[currentPillar.id]?.objectives || [{},{},{}])];
                            objectives[idx] = { ...objectives[idx], when: e.target.value };
                            setPillarData(prev => ({
                              ...prev,
                              [currentPillar.id]: { ...prev[currentPillar.id], objectives }
                            }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/20">Como saberei que cheguei</label>
                        <input 
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-gold/50 transition-all"
                          placeholder="Sinal de sucesso"
                          value={pillarData[currentPillar.id]?.objectives?.[idx]?.how || ''}
                          onChange={(e) => {
                            const objectives = [...(pillarData[currentPillar.id]?.objectives || [{},{},{}])];
                            objectives[idx] = { ...objectives[idx], how: e.target.value };
                            setPillarData(prev => ({
                              ...prev,
                              [currentPillar.id]: { ...prev[currentPillar.id], objectives }
                            }));
                          }}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="px-8">
                    Próximo <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {pillarSubStep === 'actions' && (
              <div className="space-y-12">
                <div className="space-y-4">
                   <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Passo 4</span>
                   <h3 className="text-2xl font-serif text-white/80">Ações Concretas</h3>
                   <p className="text-sm text-white/40">Defina 3 ações imediatas para desfrutar mais esta área.</p>
                </div>

                <div className="space-y-6">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                       <span className="text-3xl font-serif text-gold/20">{idx + 1}</span>
                       <input 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold/50 transition-all"
                          placeholder={`Ação ${idx + 1}...`}
                          value={pillarData[currentPillar.id]?.actions?.[idx] || ''}
                          onChange={(e) => {
                            const actions = [...(pillarData[currentPillar.id]?.actions || ['', '', ''])];
                            actions[idx] = e.target.value;
                            setPillarData(prev => ({
                              ...prev,
                              [currentPillar.id]: { ...prev[currentPillar.id], actions }
                            }));
                          }}
                        />
                    </div>
                  ))}
                </div>

            <div className="flex justify-center flex-wrap gap-4 pt-8">
              <Button 
                variant="outline"
                onClick={() => setStep('final_vision')}
                className="px-8 border-white/10 text-white/40 hover:text-white/60"
              >
                Pular para encerramento
              </Button>
              <Button onClick={nextStep} className="px-12 py-4">
                {pillarIndex === ENJOYMENT_PILLARS.length - 1 ? 'Prosseguir para Passos Finais' : 'Próximo Pilar'} <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
              </div>
            )}
          </motion.div>
        )}

        {step === 'final_vision' && (
          <motion.div
            key="final_vision"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
               <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Passo Final</span>
               <h2 className="text-4xl font-serif italic">A Visão Integrada</h2>
               <p className="text-white/40">Quem você vai ser quando estiver vivendo tudo isso?</p>
            </div>

            <Card className="p-12 space-y-8 bg-gold/[0.02] border-gold/20">
               <h3 className="text-xl font-serif uppercase tracking-widest text-center text-gold mb-8">A Frase do Desfrute</h3>
               
               <div className="space-y-12">
                 <div className="space-y-4">
                    <label className="text-white/60">Em...</label>
                    <input 
                      className="w-full bg-transparent border-b border-white/20 text-2xl font-serif italic py-4 text-gold focus:outline-none focus:border-gold placeholder:text-white/10"
                      placeholder="seu contexto / ano / ciclo..."
                      value={finalVision.phrase.where}
                      onChange={(e) => setFinalVision(prev => ({ ...prev, phrase: { ...prev.phrase, where: e.target.value } }))}
                    />
                    <p className="text-4xl font-serif italic text-white/40">eu vivo uma vida onde desfruto sem as alianças que me prendiam a...</p>
                 </div>

                 <div className="space-y-4">
                    <label className="text-white/60">Eu sou alguém que...</label>
                    <textarea 
                      className="w-full bg-transparent border-b border-white/20 text-3xl font-serif italic py-4 text-gold focus:outline-none focus:border-gold placeholder:text-white/10 min-h-[100px]"
                      placeholder="complete sua nova identidade..."
                      value={finalVision.phrase.who}
                      onChange={(e) => setFinalVision(prev => ({ ...prev, phrase: { ...prev.phrase, who: e.target.value } }))}
                    />
                 </div>
               </div>
            </Card>

            <div className="flex justify-center pt-8">
               <Button onClick={nextStep} className="px-12 py-4">
                 Próximo <ChevronRight className="ml-2 w-5 h-5" />
               </Button>
            </div>
          </motion.div>
        )}

        {step === 'final_vida' && (
          <motion.div
            key="final_vida"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
             <div className="text-center space-y-4">
               <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">V.I.D.A.</span>
               <h2 className="text-4xl font-serif">Seu Compromisso com o Desfrute</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: 'visao', label: 'V — VISÃO', desc: 'Qual é a versão de você que vai emergir quando este plano for vivido?' },
                { key: 'intencao', label: 'I — INTENÇÃO', desc: 'Qual é o seu compromisso real — não o que você gostaria, mas o que você DECIDE?' },
                { key: 'direcao', label: 'D — DIREÇÃO', desc: 'Qual pilar você vai começar a trabalhar primeiro — e por que esse?' },
                { key: 'acao', label: 'A — AÇÃO', desc: 'O que você vai fazer nos próximos 7 dias? Escreva a ação com data e hora.' }
              ].map((v) => (
                <Card key={v.key} className="p-8 space-y-4 bg-white/[0.02]">
                  <h3 className="text-gold font-bold tracking-[0.2em]">{v.label}</h3>
                  <p className="text-sm text-white/40 min-h-[40px] uppercase tracking-wider">{v.desc}</p>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold/50 min-h-[120px]"
                    value={(finalVision.vida as any)[v.key]}
                    onChange={(e) => setFinalVision(prev => ({
                      ...prev,
                      vida: { ...prev.vida, [v.key]: e.target.value }
                    }))}
                  />
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-12">
               <Button onClick={nextStep} disabled={saving} className="px-16 py-6 text-xl rounded-full shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                 {saving ? 'Selando Compromisso...' : 'Finalizar Plano do Desfrute'}
                 {!saving && <CheckCircle2 className="ml-2 w-6 h-6" />}
               </Button>
            </div>
          </motion.div>
        )}

        {step === 'concluded' && (
          <motion.div
            key="concluded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 space-y-12"
          >
            <div className="w-32 h-32 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-12 border border-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.2)]">
              <Check className="w-16 h-16 text-gold" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-6xl font-serif text-white">Compromisso Selado</h2>
              <p className="text-xl text-gold italic font-serif">"Você não precisa conquistar o que já foi dado. Você precisa aprender a receber. Isso é o Desfrute."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto pt-12">
               <Button onClick={onComplete} className="py-6 text-lg">
                  Ver meu Raio-X
               </Button>
               <Button variant="outline" onClick={onComplete} className="py-6 text-lg border-white/10">
                  Voltar ao Início
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
