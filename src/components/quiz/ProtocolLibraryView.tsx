import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ChevronRight, Info } from 'lucide-react';
import { PROTOCOLS } from '../../data/protocols';
import { Protocol } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ProtocolLibraryViewProps {
  onSelect: (protocol: Protocol) => void;
}

export function ProtocolLibraryView({ onSelect }: ProtocolLibraryViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="w-8 h-8 text-gold" />
          <h2 className="text-4xl font-serif">Protocolos</h2>
        </div>
        <p className="text-white/40 max-w-xl">
          Ferramentas de resgate e diferenciação emocional para lidar com as feridas de segunda geração.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROTOCOLS.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-8 h-full flex flex-col justify-between hover:bg-white/[0.05] transition-all cursor-pointer group border-white/5"
              onClick={() => onSelect(protocol)}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
                    {protocol.code}
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{protocol.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed italic mb-4">
                  "{protocol.quote}"
                </p>
                <div className="bg-white/5 p-4 rounded-xl mb-6">
                   <p className="text-xs text-white/60 leading-relaxed">
                     {protocol.useCase}
                   </p>
                </div>
              </div>
              
              <Button className="w-full justify-between group-hover:bg-gold group-hover:text-black">
                Iniciar Protocolo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 bg-gold/5 border border-gold/10 rounded-3xl p-8 flex gap-6 items-start">
        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Info className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h4 className="text-lg font-serif text-gold mb-2">Por que usar estes protocolos?</h4>
          <p className="text-sm text-gold/70 leading-relaxed">
            Eles são projetados para descer à raiz de emoções que paralisam o seu <span className="italic">Plano do Desfrute</span>. Sempre que encontrar uma trava ou resistência em uma área do Raio-X, procure o protocolo correspondente para desbloquear o fluxo.
          </p>
        </div>
      </div>
    </div>
  );
}
