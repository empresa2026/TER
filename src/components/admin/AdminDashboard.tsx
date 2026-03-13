import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderPlus, Plus, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Category, Quiz } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { generateQuizFromPrompt } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AdminDashboardProps {
  categories: Category[];
  onBack: () => void;
}

export function AdminDashboard({ categories, onBack }: AdminDashboardProps) {
  const [generatorPrompt, setGeneratorPrompt] = useState(() => 
    localStorage.getItem('luxquiz_generator_prompt') || 
    'Crie um protocolo de auto-investigação profundo que explore as camadas do ego e a ferida primária.'
  );
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    localStorage.setItem('luxquiz_generator_prompt', generatorPrompt);
  }, [generatorPrompt]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCreatingCategory(true);
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategoryName,
        createdAt: new Date().toISOString()
      });
      setNewCategoryName('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'categories');
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setError('');
    try {
      const quizData = await generateQuizFromPrompt(generatorPrompt, topic);
      await addDoc(collection(db, 'quizzes'), {
        ...quizData,
        categoryId: selectedCategoryId || null,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid
      });
      onBack();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'quizzes');
    } finally {
      setGenerating(false);
    }
  };

  const handleCleanup = async () => {
    setCleaning(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'quizzes'));
      const updates = querySnapshot.docs.map(async (quizDoc) => {
        const data = quizDoc.data() as Quiz;
        let needsUpdate = false;
        const newData: any = {};

        // Clean Title
        if (data.title && /lux/i.test(data.title)) {
          newData.title = data.title.replace(/lux/gi, '').replace(/\s+/g, ' ').trim();
          needsUpdate = true;
        }

        // Clean Sections
        if (data.sections) {
          const newSections = data.sections.map(section => {
            if (section.title && /bloco/i.test(section.title)) {
              needsUpdate = true;
              return {
                ...section,
                title: section.title.replace(/bloco\s*/gi, '').trim()
              };
            }
            return section;
          });
          if (needsUpdate) newData.sections = newSections;
        }

        if (needsUpdate) {
          await updateDoc(doc(db, 'quizzes', quizDoc.id), newData);
        }
      });

      await Promise.all(updates);
      alert('Limpeza concluída com sucesso!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'quizzes');
    } finally {
      setCleaning(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="py-8 max-w-2xl mx-auto pb-32"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      
      <h2 className="text-4xl font-serif mb-8">Gestão</h2>

      <div className="space-y-12">
        {/* Cleanup Utility */}
        <Card className="border-gold/20 bg-gold/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wand2 className="w-5 h-5 text-gold" />
              <div>
                <h3 className="text-xl font-serif">Limpeza de Dados</h3>
                <p className="text-xs text-white/40">Remove "Lux" dos títulos e "Bloco" das seções nos protocolos existentes.</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleCleanup} 
              disabled={cleaning}
              className="border-gold/20 text-gold hover:bg-gold hover:text-black"
            >
              {cleaning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Limpar Agora"}
            </Button>
          </div>
        </Card>

        {/* Category Creation */}
        <Card className="space-y-6 border-gold/10">
          <div className="flex items-center gap-3 mb-2">
            <FolderPlus className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-serif">Criar Nova Categoria</h3>
          </div>
          <div className="flex gap-4">
            <input 
              type="text"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
              placeholder="Ex: Bloqueio Timidez, Escassez..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <Button onClick={handleCreateCategory} disabled={creatingCategory || !newCategoryName.trim()}>
              {creatingCategory ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            </Button>
          </div>
        </Card>
        
        {/* Protocol Generation */}
        <Card className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-serif">Gerar Protocolo</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Categoria (Opcional)</label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 transition-all appearance-none"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="" className="bg-luxury-black text-white">Nenhuma Categoria</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-luxury-black text-white">{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Instruções de Comportamento</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 min-h-[100px] transition-all text-sm"
              placeholder="Adicione nuances específicas para a IA..."
              value={generatorPrompt}
              onChange={(e) => setGeneratorPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Tema / Termo de Investigação</label>
            <input 
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
              placeholder="Ex: Medo da Rejeição..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button 
            className="w-full py-4" 
            onClick={handleGenerate} 
            disabled={generating || !topic.trim()}
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Canalizando Protocolo...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar Protocolo
              </>
            )}
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}
