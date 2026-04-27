import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, Info } from 'lucide-react';
import { MATRICES } from '../../data/matrices';
import { Matrix } from '../../types';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface MatrixLibraryViewProps {
  onSelect: (m: Matrix) => void;
}

export function MatrixLibraryView({ onSelect }: MatrixLibraryViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="py-8"
    >
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <LayoutGrid className="w-8 h-8 text-gold" />
          <h2 className="text-4xl font-serif">Checkpoint de Unidade</h2>
        </div>
        <p className="text-white/40 max-w-xl">
          Ferramentas estruturadas de auto-investigação baseadas nas grandes escolas da psicologia e terapia sistêmica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATRICES.map((matrix) => (
          <Card 
            key={matrix.id} 
            className="group hover:border-gold/30 transition-all cursor-pointer relative flex flex-col h-full" 
            onClick={() => onSelect(matrix)}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
                Checkpoint {matrix.number}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                {matrix.author}
              </div>
            </div>

            <h3 className="text-3xl font-serif mb-2 group-hover:text-gold transition-colors">
              {matrix.title}
            </h3>
            
            <p className="text-sm text-white/60 mb-8 italic leading-relaxed">
              "{matrix.concept}"
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-2">
                {matrix.fields.map((f, i) => (
                  <div 
                    key={i} 
                    className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40"
                  >
                    {f.letter}
                  </div>
                ))}
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold transition-all group-hover:translate-x-1" />
            </div>
          </Card>
        ))}
      </div>

      {/* Intro Section for Laypeople */}
      <Card className="mt-12 bg-gold/5 border-gold/10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-gold/10 text-gold shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gold mb-2">Como usar o Checkpoint?</h4>
            <p className="text-sm text-gold/70 leading-relaxed">
              Os checkpoints têm uma ordem recomendada, como os andares de um prédio. Comece pelo <b>CORPO</b> para silenciar a mente e observar os sinais antes de qualquer conversa profunda. Cada letra do acrônimo representa uma etapa da sua investigação.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
