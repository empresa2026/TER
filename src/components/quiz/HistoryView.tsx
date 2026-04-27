import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, FileText, Loader2, ExternalLink } from 'lucide-react';
import { Quiz, UserResult, MatrixResult, Matrix, EnjoymentPlanResult, ProtocolResult } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { createGoogleDoc } from '../../services/googleDocsService';
import { MATRICES } from '../../data/matrices';
import { ENJOYMENT_PILLARS } from '../../data/enjoymentPlan';
import { PROTOCOLS } from '../../data/protocols';

interface HistoryViewProps {
  history: UserResult[];
  matrixHistory: MatrixResult[];
  protocolHistory: ProtocolResult[];
  planHistory: EnjoymentPlanResult[];
  quizzes: Quiz[];
  onBack: () => void;
  onSelectQuiz: (quiz: Quiz, result?: UserResult) => void;
  onViewMatrixResult: (matrix: Matrix, result: MatrixResult) => void;
}

export function HistoryView({ 
  history, 
  matrixHistory, 
  protocolHistory,
  planHistory,
  quizzes, 
  onBack, 
  onSelectQuiz,
  onViewMatrixResult 
}: HistoryViewProps) {
  const [savingId, setSavingId] = useState<string | null>(null);

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
      let content = `Matriz de Investigação: ${matrix.title}\n`;
      content += `Autor: ${matrix.author}\n`;
      content += `Data: ${new Date(result.completedAt).toLocaleString('pt-BR')}\n\n`;
      
      content += `INVESTIGAÇÃO\n`;
      Object.entries(result.answers).forEach(([label, answer]) => {
        content += `${label}\n${answer}\n\n`;
      });

      try {
        const docUrl = await createGoogleDoc(`Matriz - ${matrix.title}`, content);
        window.open(docUrl, '_blank');
      } catch (docErr) {
        console.warn('Google Docs failed, falling back to TXT download', docErr);
        downloadTxt(`Matriz - ${matrix.title}`, content);
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
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-4xl font-serif">Seu Raio-X</h2>
      </div>

      <div className="space-y-12 pb-32">
        {/* Enjoyment Plans */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Plano do Desfrute</h3>
          {planHistory.map((result) => (
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
              </div>
            </Card>
          ))}
          {planHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum plano do desfrute iniciado.
            </div>
          )}
        </section>

        {/* IA Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Protocolos Realizados</h3>
          {history.map((result) => {
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
                </div>
              </Card>
            );
          })}
          {history.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum protocolo realizado ainda.
            </div>
          )}
        </section>

        {/* Matrix Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Investigações Checkpoint</h3>
          {matrixHistory.map((result) => {
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
                </div>
              </Card>
            );
          })}
          {matrixHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhuma matriz preenchida ainda.
            </div>
          )}
        </section>

        {/* Protocol Results */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">Processamentos em Protocolo</h3>
          {protocolHistory.map((result) => {
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
                </div>
              </Card>
            );
          })}
          {protocolHistory.length === 0 && (
            <div className="text-center py-10 glass rounded-3xl border-dashed border-white/5 text-white/20">
              Nenhum processamento em protocolo realizado.
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
