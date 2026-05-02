import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Plus, ChevronRight, Folder, Calendar, Trash2, CheckCircle2, Edit2, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Journey, MatrixResult } from '../../types';
import { MATRICES } from '../../data/matrices';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore';

interface JourneyManagerProps {
  userId: string;
  journeys: Journey[];
  matrixHistory: MatrixResult[];
  activeJourneyId: string | null;
  onSelect: (id: string) => void;
}

export function JourneyManager({ userId, journeys, matrixHistory, activeJourneyId, onSelect }: JourneyManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const docRef = await addDoc(collection(db, 'journeys'), {
        userId,
        name: name.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
        status: 'active'
      });
      onSelect(docRef.id);
      setIsCreating(false);
      setName('');
      setDescription('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'journeys');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'journeys', id), {
        name: editName.trim()
      });
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'journeys');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (e: React.MouseEvent, journey: Journey) => {
    e.stopPropagation();
    setEditingId(journey.id);
    setEditName(journey.name);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir esta jornada?')) return;
    try {
      await deleteDoc(doc(db, 'journeys', id));
      if (activeJourneyId === id) onSelect('');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'journeys');
    }
  };

  const getJourneyStats = (journeyId: string) => {
    const results = matrixHistory.filter(m => m.journeyId === journeyId);
    const uniqueIds = Array.from(new Set(results.map(r => r.matrixId)));
    const matrixNames = uniqueIds
      .map(id => MATRICES.find(m => m.id === id)?.title)
      .filter(Boolean) as string[];

    return {
      count: results.length,
      matrixNames
    };
  };

  const activeJourney = journeys.find(j => j.id === activeJourneyId);

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20">
            <Compass className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-white">Jornadas</h2>
            <p className="text-white/20 text-xs">Organização por evento</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-gold text-black hover:bg-gold/90 transition-all h-9 px-4 text-xs"
        >
          <Plus className="w-4 h-4" />
          Nova Jornada
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-4 border-gold/50 bg-white/[0.03] space-y-3">
                <input 
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do Evento"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsCreating(false)} className="flex-1 h-8 text-[10px]">Cancelar</Button>
                  <Button onClick={handleCreate} disabled={saving} className="flex-1 h-8 text-[10px] bg-gold text-black">Criar</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {journeys.map((journey) => {
            const stats = getJourneyStats(journey.id);
            const isEditing = editingId === journey.id;
            const isActive = activeJourneyId === journey.id;

            return (
              <motion.div
                key={journey.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => !isEditing && onSelect(journey.id)}
                className="cursor-pointer"
              >
                <Card className={`p-4 transition-all duration-300 group relative ${
                  isActive 
                    ? 'border-gold/50 bg-gold/[0.05]' 
                    : 'border-white/5 hover:border-gold/20 hover:bg-white/[0.02]'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${isActive ? 'bg-gold/20' : 'bg-white/5 group-hover:bg-gold/10'}`}>
                        <Folder className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-white/40'}`} />
                      </div>
                      
                      {isEditing ? (
                        <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                          <input 
                            autoFocus
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-24 bg-white/5 border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-gold"
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate(journey.id)}
                          />
                          <button onClick={() => handleUpdate(journey.id)} className="p-1 bg-gold text-black rounded">
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <h4 className="text-sm font-medium text-white truncate group-hover:text-gold transition-colors">
                          {journey.name}
                        </h4>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                      <button 
                        onClick={(e) => startEditing(e, journey)}
                        className="p-1.5 text-white/20 hover:text-gold hover:bg-gold/10 rounded-md"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(e, journey.id)}
                        className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-md"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-1 items-center">
                        {stats.count > 0 ? (
                          <>
                            <div className="flex -space-x-1">
                              {[...Array(Math.min(stats.count, 3))].map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-gold/60 border border-[#0d0d0d]" />
                              ))}
                            </div>
                            <span className="text-[10px] text-white/20 uppercase tracking-tighter">
                              {stats.count} Registros
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] text-white/10 italic">Nenhum registro</span>
                        )}
                      </div>
                      
                      {stats.matrixNames.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {stats.matrixNames.map((mName, i) => (
                            <span key={i} className="text-[8px] bg-gold/5 text-gold/60 px-2 py-0.5 rounded truncate max-w-full">
                              {mName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-white/20 uppercase">
                      {new Date(journey.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'text-gold' : 'text-white/10 group-hover:translate-x-0.5'}`} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
