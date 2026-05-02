import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, FileText, Loader2, ExternalLink, LayoutGrid, Trash2 } from 'lucide-react';
import { Journey, Quiz, UserResult, MatrixResult, Matrix, EnjoymentPlanResult, ProtocolResult } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { createGoogleDoc } from '../../services/googleDocsService';
import { MATRICES } from '../../data/matrices';
import { ENJOYMENT_PILLARS } from '../../data/enjoymentPlan';
import { PROTOCOLS } from '../../data/protocols';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { X, Trophy } from 'lucide-react';

interface HistoryViewProps {
  history: UserResult[];
  matrixHistory: MatrixResult[];
  protocolHistory: ProtocolResult[];
  planHistory: EnjoymentPlanResult[];
  quizzes: Quiz[];
  onBack: () => void;
  onSelectQuiz: (quiz: Quiz, result?: UserResult) => void;
  onViewMatrixResult: (matrix: Matrix, result: MatrixResult) => void;
  onDeleteUserResult?: (resultId: string) => void;
  onDeleteMatrixResult?: (resultId: string) => void;
  onDeleteProtocolResult?: (resultId: string) => void;
  onDeletePlanResult?: (resultId: string) => void;
  activeJourneyId?: string | null;
  journeys?: Journey[];
}

const DeleteButton = ({ 
  id, 
  onDelete, 
  label, 
  confirmDeleteId, 
  setConfirmDeleteId 
}: { 
  id: string, 
  onDelete: (id: string) => void, 
  label: string,
  confirmDeleteId: string | null,
  setConfirmDeleteId: (id: string | null) => void
}) => {
  const isConfirming = confirmDeleteId === id;

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
        <Button 
          variant="ghost" 
          onClick={() => setConfirmDeleteId(null)}
          className="text-[10px] uppercase font-bold px-3 py-1"
        >
          Cancelar
        </Button>
        <Button 
          className="bg-red-500 text-white hover:bg-red-600 text-[10px] uppercase font-bold px-3 py-1 border-none shadow-lg shadow-red-500/20"
          onClick={() => {
            onDelete(id);
            setConfirmDeleteId(null);
          }}
        >
          Confirmar
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={() => setConfirmDeleteId(id)}
      title={`Excluir ${label}`}
      className="p-3 border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export function HistoryView({ 
  history, 
  matrixHistory, 
  protocolHistory,
  planHistory,
  quizzes, 
  onBack, 
  onSelectQuiz,
  onViewMatrixResult,
  onDeleteUserResult,
  onDeleteMatrixResult,
  onDeleteProtocolResult,
  onDeletePlanResult,
  activeJourneyId,
  journeys = []
}: HistoryViewProps) {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [viewingPlan, setViewingPlan] = useState<EnjoymentPlanResult | null>(null);

  const activeJourney = journeys.find(j => j.id === activeJourneyId);

  const filteredHistory = activeJourneyId 
    ? history.filter(h => h.journeyId === activeJourneyId)
    : history;
  
  const filteredMatrixHistory = activeJourneyId 
    ? matrixHistory.filter(h => h.journeyId === activeJourneyId)
    : matrixHistory;

  const filteredProtocolHistory = activeJourneyId 
    ? protocolHistory.filter(h => h.journeyId === activeJourneyId)
    : protocolHistory;

  const filteredPlanHistory = activeJourneyId 
    ? planHistory.filter(h => h.journeyId === activeJourneyId)
    : planHistory;

  const downloadTxt = (title: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };



  const handleSaveToDocs = async (result: UserResult, quiz: Quiz) => {
    setSavingId(result.id);
    try {
      let content = `Protocolo: ${quiz.title}\n`;
      content += `Data: ${new Date(result.completedAt).toLocaleString('pt-BR')}\n\n`;
      
      content += `ESTRUTURA IDENTIFICADA\n`;
      content += `Ferida: ${quiz.identifiedStructure.ferida}\n`;
      content += `Domínio: ${quiz.identifiedStructure.dominio}\n`;
      content += `Máscara: ${quiz.identifiedStructure.mascara}\n`;
      content += `Modo: ${quiz.identifiedStructure.modo}\n\n`;
      
      content += `RESPOSTAS\n`;
      quiz.sections.forEach((section, sIdx) => {
        content += `\n[ ${section.title} ]\n`;
        section.questions.forEach((q, qIdx) => {
          const answerIdx = result.answers[`${sIdx}-${qIdx}`];
          const answer = answerIdx !== undefined ? q.options[answerIdx] : 'Não respondida';
          content += `P: ${q.question}\nR: ${answer}\n\n`;
        });
      });

      content += `\nORAÇÃO FINAL\n${quiz.finalPrayer}\n`;

      try {
        const docUrl = await createGoogleDoc(`Protocolo - ${quiz.title}`, content);
        window.open(docUrl, '_blank');
      } catch (docErr) {
        console.warn('Google Docs failed, falling back to TXT download', docErr);
        downloadTxt(`Protocolo - ${quiz.title}`, content);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao processar exportação');
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveMatrixToDocs = async (result: MatrixResult) => {
    const matrix = MATRICES.find(m => m.id === result.matrixId);
    if (!matrix) return;
    
    setSavingId(result.id);
    try {
      let content = `Checkpoint de Investigação: ${matrix.title}\n`;
      content += `Autor: ${matrix.author}\n`;
      content += `Data: ${new Date(result.completedAt).toLocaleString('pt-BR')}\n\n`;
      
      content += `INVESTIGAÇÃO\n`;
      Object.entries(result.answers).forEach(([label, answer]) => {
        content += `${label}\n${answer}\n\n`;
      });

      try {
        const docUrl = await createGoogleDoc(`Checkpoint - ${matrix.title}`, content);
        window.open(docUrl, '_blank');
      } catch (docErr) {
        console.warn('Google Docs failed, falling back to TXT download', docErr);
        downloadTxt(`Checkpoint - ${matrix.title}`, content);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao processar exportação');
    } finally {
      setSavingId(null);
    }
  };

  const handleSavePlanToDocs = async (result: EnjoymentPlanResult) => {
    setSavingId(result.id);
    try {
      let content = `PLANO DO DESFRUTE\n`;
      content += `Data: ${new Date(result.createdAt).toLocaleString('pt-BR')}\n\n`;
      
      content += `RAIO-X DA VIDA\n`;
      ENJOYMENT_PILLARS.forEach(p => {
        content += `${p.title}: ${result.xray[p.id]}/10\n`;
      });
      content += `\nREFLEXÕES:\nR1: ${result.xrayReflections.r1}\nR2: ${result.xrayReflections.r2}\nR3: ${result.xrayReflections.r3}\n\n`;

      ENJOYMENT_PILLARS.forEach(pillar => {
        const data = result.pillars[pillar.id];
        if (!data) return;
        content += `[ PILAR: ${pillar.title} ]\n`;
        content += `Imagem do Desfrute:\n`;
        content += `A: ${data.image.a}\nB: ${data.image.b}\nC: ${data.image.c}\n\n`;
        content += `Objetivos:\n`;
        data.objectives.forEach(obj => {
          content += `- ${obj.what} (Até: ${obj.when}) -> Como saberei: ${obj.how}\n`;
        });
        content += `\nAções:\n`;
        data.actions.forEach((act, i) => content += `${i+1}. ${act}\n`);
        content += `\n-------------------\n\n`;
      });

      content += `VISÃO INTEGRADA\n`;
      content += `Frase: No contexto ${result.finalVision.phrase.where}, eu vivo uma vida onde desfruto sem as alianças que me prendiam a... Eu sou alguém que ${result.finalVision.phrase.who}\n\n`;
      
      content += `V.I.D.A.\n`;
      content += `Visão: ${result.finalVision.vida.visao}\n`;
      content += `Intenção: ${result.finalVision.vida.intencao}\n`;
      content += `Direção: ${result.finalVision.vida.direcao}\n`;
      content += `Ação: ${result.finalVision.vida.acao}\n`;

      try {
        const docUrl = await createGoogleDoc(`Plano do Desfrute`, content);
        window.open(docUrl, '_blank');
      } catch (docErr) {
        console.warn('Google Docs failed, falling back to TXT download', docErr);
        downloadTxt(`Plano do Desfrute`, content);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao processar exportação');
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveProtocolToDocs = async (result: ProtocolResult) => {
    setSavingId(result.id);
    try {
      const protocol = PROTOCOLS.find(p => p.id === result.protocolId);
      if (!protocol) return;

      let content = `PROTOCOLO: ${protocol.title}\n`;
      content += `Código: ${protocol.code}\n`;
      content += `Data: ${new Date(result.completedAt).toLocaleString('pt-BR')}\n\n`;
      content += `Frase: "${protocol.quote}"\n\n`;

      Object.entries(result.answers).forEach(([key, value]) => {
        content += `${key.toUpperCase()}: ${value}\n`;
      });

      try {
        const docUrl = await createGoogleDoc(`Protocolo - ${protocol.title}`, content);
        window.open(docUrl, '_blank');
      } catch (docErr) {
        downloadTxt(`Protocolo - ${protocol.title}`, content);
      }
    } catch (error) {
       alert('Erro ao exportar protocolo');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-4xl font-serif">Biblioteca Checkpoint</h2>
            {activeJourney && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-bold text-gold uppercase tracking-widest">
                  Visualizando Espaço: {activeJourney.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {activeJourneyId && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Histórico do Evento</span>
          </div>
        )}
      </div>

      <div className="space-y-12 pb-32">
        {/* Enjoyment Plans */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Plano do Desfrute</h3>
          {filteredPlanHistory.map((result) => (
            <Card key={result.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gold/[0.03] border-gold/10">
              <div className="flex-1">
                <h3 className="text-xl font-serif mb-1">Mapa da Mente Curada</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  {new Date(result.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setViewingPlan(result)}
                  className="flex items-center gap-2 border-white/5 hover:bg-white/5"
                >
                  <Play className="w-4 h-4" />
                  Visualizar
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => handleSavePlanToDocs(result)}
                  disabled={savingId === result.id}
                  className="flex items-center gap-2 border-gold/20 text-gold hover:bg-gold hover:text-black"
                >
                  {savingId === result.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  Exportar
                </Button>

                {onDeletePlanResult && (
                  <DeleteButton 
                    id={result.id} 
                    onDelete={onDeletePlanResult} 
                    label="plano" 
                    confirmDeleteId={confirmDeleteId}
                    setConfirmDeleteId={setConfirmDeleteId}
                  />
                )}
              </div>
            </Card>
          ))}
          {filteredPlanHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum plano do desfrute neste espaço.
            </div>
          )}
        </section>

        {/* IA Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Protocolos Realizados</h3>
          {filteredHistory.map((result) => {
            const quiz = quizzes.find(q => q.id === result.quizId);
            if (!quiz) return null;

            return (
              <Card key={result.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-serif mb-1">{quiz.title}</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest">
                    {new Date(result.completedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => onSelectQuiz(quiz, result)}
                    className="flex items-center gap-2 border-white/5 hover:bg-white/5"
                  >
                    <Play className="w-4 h-4" />
                    Abrir
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveToDocs(result, quiz)}
                    disabled={savingId === result.id}
                    className="flex items-center gap-2 border-gold/20 text-gold hover:bg-gold hover:text-black"
                  >
                    {savingId === result.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    Exportar
                  </Button>

                  {onDeleteUserResult && (
                    <DeleteButton 
                      id={result.id} 
                      onDelete={onDeleteUserResult} 
                      label="protocolo" 
                      confirmDeleteId={confirmDeleteId}
                      setConfirmDeleteId={setConfirmDeleteId}
                    />
                  )}
                </div>
              </Card>
            );
          })}
          {filteredHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum protocolo neste espaço.
            </div>
          )}
        </section>

        {/* Matrix Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Histórico de Checkpoints</h3>
          {filteredMatrixHistory.map((result) => {
            const matrix = MATRICES.find(m => m.id === result.matrixId);
            if (!matrix) return null;

            return (
              <Card key={result.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-gold/10">
                <div className="flex-1">
                  <h3 className="text-xl font-serif mb-1">{matrix.title}</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest">
                    {new Date(result.completedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => onViewMatrixResult(matrix, result)}
                    className="flex items-center gap-2 border-white/5 hover:bg-white/5"
                  >
                    <Play className="w-4 h-4" />
                    Abrir
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveMatrixToDocs(result)}
                    disabled={savingId === result.id}
                    className="flex items-center gap-2 border-gold/20 text-gold hover:bg-gold hover:text-black"
                  >
                    {savingId === result.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    Exportar
                  </Button>

                  {onDeleteMatrixResult && (
                    <DeleteButton 
                      id={result.id} 
                      onDelete={onDeleteMatrixResult} 
                      label="checkpoint" 
                      confirmDeleteId={confirmDeleteId}
                      setConfirmDeleteId={setConfirmDeleteId}
                    />
                  )}
                </div>
              </Card>
            );
          })}
          {filteredMatrixHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum checkpoint neste espaço.
            </div>
          )}
        </section>

        {/* Protocol Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Processamentos em Protocolo</h3>
          {filteredProtocolHistory.map((result) => {
            const protocol = PROTOCOLS.find(p => p.id === result.protocolId);
            if (!protocol) return null;

            return (
              <Card key={result.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.02] border-gold/5">
                <div className="flex-1">
                  <div className="text-[10px] uppercase font-bold text-gold/60 mb-1">{protocol.code}</div>
                  <h3 className="text-xl font-serif mb-1">{protocol.title}</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest">
                    {new Date(result.completedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveProtocolToDocs(result)}
                    disabled={savingId === result.id}
                    className="flex items-center gap-2 border-gold/20 text-gold hover:bg-gold hover:text-black"
                  >
                    {savingId === result.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    Exportar
                  </Button>

                  {onDeleteProtocolResult && (
                    <DeleteButton 
                      id={result.id} 
                      onDelete={onDeleteProtocolResult} 
                      label="processamento" 
                      confirmDeleteId={confirmDeleteId}
                      setConfirmDeleteId={setConfirmDeleteId}
                    />
                  )}
                </div>
              </Card>
            );
          })}
          {filteredProtocolHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum processamento neste espaço.
            </div>
          )}
        </section>
      </div>

      {/* Plan Summary Modal */}
      {viewingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-luxury-black border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-luxury-black/90 backdrop-blur-md p-6 border-b border-white/10 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-gold" />
                <h3 className="text-2xl font-serif">Plano do Desfrute</h3>
              </div>
              <button 
                onClick={() => setViewingPlan(null)}
                className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 text-center">Raio-X de Pilares</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ENJOYMENT_PILLARS.map(p => ({
                        subject: p.title.split(' ')[0],
                        A: viewingPlan.xray[p.id] || 0,
                        fullMark: 10,
                      }))}>
                        <PolarGrid stroke="#ffffff10" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar
                          name="Raio-X"
                          dataKey="A"
                          stroke="#D4AF37"
                          fill="#D4AF37"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* VIDA Section */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Compromisso V.I.D.A.</h4>
                  {[
                    { label: 'VISÃO', val: viewingPlan.finalVision.vida.visao },
                    { label: 'INTENÇÃO', val: viewingPlan.finalVision.vida.intencao },
                    { label: 'DIREÇÃO', val: viewingPlan.finalVision.vida.direcao },
                    { label: 'AÇÃO', val: viewingPlan.finalVision.vida.acao }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1 p-4 bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gold/40 uppercase tracking-widest">{item.label}</span>
                      <p className="text-sm italic">"{item.val}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillars Details */}
              <div className="space-y-6">
                <h4 className="text-xl font-serif text-white/80">Detalhes dos Pilares</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {ENJOYMENT_PILLARS.filter(p => viewingPlan.pillars[p.id]).map(p => {
                    const data = viewingPlan.pillars[p.id];
                    return (
                      <Card key={p.id} className="p-6 bg-white/[0.02]">
                        <h5 className="text-gold font-serif mb-4">{p.title}</h5>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-white/20 uppercase">Ações:</span>
                            <ul className="text-xs space-y-1">
                              {data.actions.map((act, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-gold">•</span>
                                  {act}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
