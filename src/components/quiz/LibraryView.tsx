import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Sparkles, ChevronRight, BookOpen, Edit2, Check, X } from 'lucide-react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Quiz, Category, UserResult } from '../../types';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';

interface LibraryViewProps {
  quizzes: Quiz[];
  categories: Category[];
  onSelect: (q: Quiz) => void;
  history: UserResult[];
  isAdmin: boolean;
}

export function LibraryView({ 
  quizzes, 
  categories,
  onSelect, 
  history,
  isAdmin 
}: LibraryViewProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);

  const filteredQuizzes = selectedCategoryId 
    ? quizzes.filter(q => q.categoryId === selectedCategoryId)
    : quizzes.filter(q => !q.categoryId);

  const handleDeleteQuiz = async (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    setStatus(null);
    try {
      await deleteDoc(doc(db, 'quizzes', quizId));
      setStatus({ type: 'success', message: 'Protocolo deletado com sucesso.' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Erro ao deletar protocolo:', err);
      setStatus({ type: 'error', message: 'Erro ao deletar protocolo. Verifique suas permissões.' });
    }
  };

  const handleDeleteCategory = async (e: React.MouseEvent, catId: string) => {
    e.stopPropagation();
    setStatus(null);
    try {
      await deleteDoc(doc(db, 'categories', catId));
      if (selectedCategoryId === catId) setSelectedCategoryId(null);
      setStatus({ type: 'success', message: 'Categoria deletada com sucesso.' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
      setStatus({ type: 'error', message: 'Erro ao deletar categoria. Verifique suas permissões.' });
    }
  };

  const handleUpdateQuizCategory = async (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    setStatus(null);
    try {
      await updateDoc(doc(db, 'quizzes', quizId), {
        categoryId: newCategoryId || null
      });
      setEditingQuizId(null);
      setNewCategoryId(null);
      setStatus({ type: 'success', message: 'Categoria atualizada com sucesso.' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Erro ao atualizar categoria:', err);
      setStatus({ type: 'error', message: 'Erro ao atualizar categoria. Verifique suas permissões.' });
    }
  };

  const handleUpdateQuizTitle = async (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    if (!newTitle.trim()) return;
    setStatus(null);
    try {
      await updateDoc(doc(db, 'quizzes', quizId), {
        title: newTitle.trim()
      });
      setEditingTitleId(null);
      setStatus({ type: 'success', message: 'Título atualizado com sucesso.' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Erro ao atualizar título:', err);
      setStatus({ type: 'error', message: 'Erro ao atualizar título. Verifique suas permissões.' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-serif mb-2">Sua Biblioteca</h2>
        <p className="text-white/40">Explore protocolos exclusivos de auto-investigação.</p>
      </div>

      {status && (
        <div className={cn(
          "mb-8 p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-4",
          status.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          {status.message}
        </div>
      )}

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={cn(
            "px-6 py-3 rounded-2xl border transition-all whitespace-nowrap text-sm font-medium",
            selectedCategoryId === null 
              ? "bg-gold border-gold text-black" 
              : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
          )}
        >
          Geral
        </button>
        {categories.map(cat => (
          <div key={cat.id} className="relative group">
            <button
              onClick={() => setSelectedCategoryId(cat.id)}
              className={cn(
                "px-6 py-3 rounded-2xl border transition-all whitespace-nowrap text-sm font-medium pr-10",
                selectedCategoryId === cat.id 
                  ? "bg-gold border-gold text-black" 
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
              )}
            >
              {cat.name}
            </button>
            {isAdmin && (
              <button 
                onClick={(e) => handleDeleteCategory(e, cat.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black/20 hover:text-black transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => {
          const attempts = history.filter(h => h.quizId === quiz.id);
          
          return (
            <Card key={quiz.id} className="group hover:border-gold/30 transition-all cursor-pointer relative flex flex-col" onClick={() => onSelect(quiz)}>
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingQuizId(quiz.id);
                      setNewCategoryId(quiz.categoryId || null);
                    }}
                    className="p-2 text-white/10 hover:text-gold transition-colors"
                    title="Mudar Categoria"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDeleteQuiz(e, quiz.id)}
                    className="p-2 text-white/10 hover:text-red-400 transition-colors"
                    title="Deletar Protocolo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-gold/10 text-gold">
                  <Sparkles className="w-6 h-6" />
                </div>
                {attempts.length > 0 && (
                  <div className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    Concluído
                  </div>
                )}
              </div>

              {editingQuizId === quiz.id ? (
                <div className="mb-6 space-y-3" onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] uppercase text-white/40 font-bold">Nova Categoria</label>
                  <div className="flex gap-2">
                    <select 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-gold/50"
                      value={newCategoryId || ''}
                      onChange={(e) => setNewCategoryId(e.target.value || null)}
                    >
                      <option value="" className="bg-luxury-black">Geral</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-luxury-black">{cat.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={(e) => handleUpdateQuizCategory(e, quiz.id)}
                      className="p-2 bg-gold text-black rounded-xl hover:bg-gold/80 transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingQuizId(null);
                      }}
                      className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : editingTitleId === quiz.id ? (
                <div className="mb-6 space-y-3" onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] uppercase text-white/40 font-bold">Editar Título</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-gold/50"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      autoFocus
                    />
                    <button 
                      onClick={(e) => handleUpdateQuizTitle(e, quiz.id)}
                      className="p-2 bg-gold text-black rounded-xl hover:bg-gold/80 transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTitleId(null);
                      }}
                      className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <h3 
                  className={cn(
                    "text-2xl font-serif mb-3 group-hover:text-gold transition-colors pr-16",
                    isAdmin && "cursor-text hover:underline decoration-gold/30 underline-offset-4"
                  )}
                  onClick={(e) => {
                    if (isAdmin) {
                      e.stopPropagation();
                      setEditingTitleId(quiz.id);
                      setNewTitle(quiz.title);
                    }
                  }}
                >
                  {quiz.title}
                </h3>
              )}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="text-[9px] uppercase text-white/20">Mascara: {quiz.identifiedStructure?.mascara || 'N/A'}</div>
                <div className="text-[9px] uppercase text-white/20">Modo: {quiz.identifiedStructure?.modo || 'N/A'}</div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-white/20 uppercase tracking-tighter">{(quiz.sections || []).length} Blocos</span>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold transition-all group-hover:translate-x-1" />
              </div>
            </Card>
          );
        })}
        {filteredQuizzes.length === 0 && (
          <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-white/10">
            <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 font-serif">Nenhum protocolo encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
