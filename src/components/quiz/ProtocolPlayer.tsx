import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
  Activity,
  History,
  Target,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Protocol, ProtocolResult } from '../../types';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { cn } from '../../lib/utils';

interface ProtocolPlayerProps {
  userId: string;
  protocol: Protocol;
  onComplete: () => void;
  onBack: () => void;
}

export function ProtocolPlayer({ userId, protocol, onComplete, onBack }: ProtocolPlayerProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const result: Omit<ProtocolResult, 'id'> = {
        userId,
        protocolId: protocol.id,
        answers,
        completedAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'protocolResults'), result);
      setStep(999); // Transition to success step
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'protocolResults');
    } finally {
      setSaving(false);
    }
  };

  // Define steps for each protocol
  const getProtocolSteps = () => {
    switch (protocol.id) {
      case 'culpa':
        return [
          {
            title: 'Resumo Inicial',
            description: 'Identifique o peso que você carrega.',
            fields: [
              { id: 'all_guilts', type: 'textarea', label: 'Liste as culpas que você carrega atualmente:', placeholder: 'Ex: Fui ríspido com minha mãe, Não cuidei da minha saúde...' },
              { id: 'target_guilt', type: 'textarea', label: 'Selecione UMA que mais pesa hoje para trabalharmos:', placeholder: 'Descreva a culpa escolhida...' }
            ]
          },
          {
            title: 'Mapeamento da Culpa',
            description: 'Vamos entender os envolvidos e o contexto.',
            fields: [
              { id: 'envolved', type: 'text', label: 'QUEM está envolvido nessa culpa?', placeholder: 'Pessoa ou situação...' },
              { id: 'other_feeling', type: 'text', label: 'O que essa pessoa sente ou sentia? (sua percepção)', placeholder: 'A culpa percebida...' },
              { id: 'event_context', type: 'textarea', label: 'Por causa de que acontecimento?', placeholder: 'Descreva o fato...' },
              { id: 'when_appears', type: 'text', label: 'Quando você sente essa culpa?', placeholder: 'Em que momento ela aparece?' }
            ]
          },
          {
            title: 'Análise Objetiva',
            description: 'Apenas os fatos, sem interpretações.',
            fields: [
              { id: 'objective_facts', type: 'textarea', label: 'Descreva o que aconteceu de forma objetiva:', placeholder: 'Só os fatos...' },
              { id: 'who_acted', type: 'text', label: 'Quem fez ou deixou de fazer?', placeholder: 'Foi você? Outro? Quem mais?' },
              { id: 'reason', type: 'textarea', label: 'Qual foi o motivo ou explicação para o ocorrido?', placeholder: 'A razão percebida...' }
            ]
          },
          {
             title: 'Raiz da Verdade',
             description: 'Identificando o tipo de culpa.',
             fields: [
                { 
                  id: 'guilt_type', 
                  type: 'select', 
                  label: 'Essa culpa que você sente é:',
                  options: [
                    { value: 'legitima', label: 'Culpa Legítima (Eu errei de verdade, havia escolha e não fiz)' },
                    { value: 'ilegitima', label: 'Culpa Ilegítima (Me culpo por algo fora do meu controle)' },
                    { value: 'transferida', label: 'Culpa Transferida (Carrego a culpa de outro que não assumiu)' },
                    { value: 'herdada', label: 'Culpa Herdada (Aprendi na família que devo me sentir culpado)' }
                  ]
                },
                { id: 'protection', type: 'textarea', label: 'O que essa culpa protege ou evita?', placeholder: 'Culpa recorrente sempre tem uma função...' },
                { id: 'better_truth', type: 'select', label: 'O que está mais próximo da verdade?', options: [
                  { value: 'liberacao', label: 'Eu errei, já fiz o que podia/posso reparar, me libero agora.' },
                  { value: 'reparacao_pendente', label: 'Eu errei, ainda tenho algo concreto a fazer, vou fazer e me liberar.' },
                  { value: 'nao_era_minha', label: 'Não errei, carreguei uma culpa que não era minha.' },
                  { value: 'padrao_familiar', label: 'Aprendi a me culpar, é um padrão que quero mudar.' }
                ]}
             ]
          },
          {
            title: 'V.I.D.A.',
            description: 'Consolidando a visão e ação.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo após este protocolo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide mudar ou assumir a partir de agora?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Para onde você vai? Qual o caminho que escolhe?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Qual o primeiro passo concreto nos próximos 7 dias?' }
            ]
          }
        ];
      case 'dependencia':
        return [
          {
            title: 'Mapeamento Inicial',
            description: 'Identifique a pessoa com quem você tem dependência emocional.',
            fields: [
              { id: 'person_link', type: 'text', label: 'Quem é essa pessoa e qual o vínculo? (parceiro, ex, amigo, pai...)', placeholder: 'Ex: Meu ex-namorado' },
              { id: 'time_exists', type: 'text', label: 'Há quanto tempo esse vínculo existe?', placeholder: 'Ex: 5 anos' },
              { id: 'intensification', type: 'textarea', label: 'Quando essa dependência se intensificou? (houve um evento específico?)', placeholder: 'Descreva o momento...' },
              { id: 'feeling_no_contact', type: 'textarea', label: 'O que você sente quando fica sem contato com essa pessoa?', placeholder: 'Descreva seu sentimento...' }
            ]
          },
          {
            title: 'Diagnóstico do Vínculo',
            description: 'Reflexões sobre a qualidade da relação.',
            fields: [
              { id: 'tried_reduce', type: 'select', label: 'Você já tentou reduzir o contato ou se afastar e não conseguiu?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] },
              { id: 'presence_defines_day', type: 'select', label: 'A presença ou ausência dessa pessoa define como você se sente no dia?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] },
              { id: 'sacrifices_values', type: 'select', label: 'Você abre mão dos seus próprios valores ou desejos para manter essa relação?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] },
              { id: 'incapable_happy', type: 'select', label: 'Você sente que sem essa pessoa seria incapaz de ser feliz?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] }
            ]
          },
          {
            title: 'Raiz da Dependência',
            description: 'Olhando para a origem afetiva.',
            fields: [
              { id: 'childhood_availability', type: 'select', label: 'Quando criança, como era a disponibilidade emocional de quem cuidou de você?', options: [
                { value: 'consistente', label: 'Consistente — me sentia seguro e amado' },
                { value: 'inconsistente', label: 'Inconsistente — as vezes estava lá, as vezes não' },
                { value: 'ausente', label: 'Ausente — raramente recebi presença ou cuidado' },
                { value: 'condicional', label: 'Condicional — era amado quando me comportava de certa forma' }
              ]},
              { id: 'learned_about_love', type: 'textarea', label: 'O que você aprendeu sobre amor nessa fase?', placeholder: 'Aprendi que ser amado significa...' },
              { id: 'similarity_to_caregiver', type: 'textarea', label: 'Em que essa pessoa atual se parece com quem te criou?', placeholder: 'Mesmo que de forma sutil...' }
            ]
          },
          {
            title: 'O que falta em você',
            description: 'Identificando o vazio que a relação tenta preencher.',
            fields: [
              { id: 'what_searches', type: 'select', label: 'O que você busca nessa pessoa que ainda não encontrou em si mesmo?', options: [
                { value: 'validacao', label: 'Validação — preciso que ela diga que eu sou suficiente' },
                { value: 'seguranca', label: 'Segurança — só me sinto seguro quando ela está por perto' },
                { value: 'identidade', label: 'Identidade — sem ela não sei quem eu sou' },
                { value: 'valor', label: 'Valor — só me sinto valioso quando ela me escolhe' },
                { value: 'pertencimento', label: 'Pertencimento — sem ela me sinto sozinho no mundo' }
              ]},
              { id: 'give_to_self', type: 'textarea', label: 'Se você pudesse dar para si mesmo o que busca nela, como seria?', placeholder: 'Descreva aqui...' },
              { id: 'investment_ratio', type: 'text', label: 'O quanto você investe em se conhecer (0-10) vs quanto investe nessa relação?', placeholder: 'Ex: 2 vs 9' }
            ]
          },
          {
            title: 'V.I.D.A.',
            description: 'Seu compromisso com a autonomia.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo após este protocolo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide mudar ou assumir a partir de agora?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Para onde você vai? Qual o caminho que escolhe?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Qual o primeiro passo concreto nos próximos 7 dias?' }
            ]
          }
        ];
      case 'medo':
        return [
          {
            title: 'Identificando o Medo',
            description: 'Vamos dar um nome ao que te paralisa.',
            fields: [
              { id: 'precise_fear', type: 'textarea', label: 'Descreva o medo com precisão (quanto mais específico, melhor):', placeholder: 'Ex: Medo de ser demitido e passar fome' },
              { id: 'fear_situations', type: 'textarea', label: 'Em que situações esse medo aparece?', placeholder: 'Ex: Quando meu chefe me chama para uma reunião' },
              { id: 'fear_reaction', type: 'textarea', label: 'O que você faz quando ele aparece? (foge, paralisa, ataca, evita?)', placeholder: 'Minha reação é...' },
              { id: 'fear_prevention', type: 'textarea', label: 'O que você deixa de fazer por causa desse medo?', placeholder: 'O que o medo te impede...' }
            ]
          },
          {
            title: 'A Origem do Medo',
            description: 'Buscando a primeira memória.',
            fields: [
              { id: 'first_time', type: 'textarea', label: 'Quando foi a primeira vez que você sentiu esse medo? O que estava acontecendo?', placeholder: 'Caso não lembre, escreva o que imagina...' },
              { id: 'fear_source', type: 'select', label: 'Esse medo veio de:', options: [
                { value: 'propria', label: 'Uma experiência própria dolorosa ou assustadora' },
                { value: 'alguem_proximo', label: 'Uma experiência de alguém próximo que eu observei' },
                { value: 'repetida_familia', label: 'Mensagem repetida na família (cuidado com X, X é perigoso)' },
                { value: 'crença_formada', label: 'Uma crença formada aos poucos, sem evento específico' }
              ]}
            ]
          },
          {
            title: 'A Crença por Baixo',
            description: 'Desvendando o cenário catastrófico.',
            fields: [
              { id: 'fear_belief', type: 'textarea', label: 'Complete a frase: "Tenho medo de [X] porque acredito que se acontecer..."', placeholder: 'Escreva o cenário que sua mente projeta...' },
              { id: 'happened_before', type: 'select', label: 'Esse cenário que você descreveu já aconteceu de verdade na sua vida?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] },
              { id: 'fear_probability', type: 'text', label: 'De 1 a 10, quão provável é desse cenário acontecer agora?', placeholder: 'Ex: 3' },
              { id: 'worst_case_deal', type: 'textarea', label: 'Se o pior acontecesse — o que você faria? Como lidaria?', placeholder: 'Sua estratégia de superação...' }
            ]
          },
          {
            title: 'Ressignificando',
            description: 'Transformando o medo em proteção.',
            fields: [
              { id: 'fear_protects', type: 'textarea', label: 'O que esse medo está tentando proteger em você? Qual o valor por baixo dele?', placeholder: 'Ex: Medo de falhar protege o desejo de dignidade' },
              { id: 'admiration_action', type: 'textarea', label: 'Existe alguém que você admira que enfrenta esse mesmo medo e age mesmo assim? O que ela faz?', placeholder: 'Sua referência...' },
              { id: 'next_step_fear', type: 'textarea', label: 'Se você agisse APESAR do medo, qual seria o primeiro passo?', placeholder: 'Um passo com medo, mas um passo...' }
            ]
          },
          {
            title: 'V.I.D.A.',
            description: 'Seu plano de avanço.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo após este protocolo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide mudar ou assumir a partir de agora?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Para onde você vai? Qual o caminho que escolhe?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Qual o primeiro passo concreto nos próximos 7 dias?' }
            ]
          }
        ];
      case 'autoestima':
        return [
          {
            title: 'Diagnóstico Inicial',
            description: 'Como está sua percepção de valor próprio.',
            fields: [
              { id: 'self_esteem_rate', type: 'text', label: 'De 1 a 10, como você avalia sua autoestima hoje?', placeholder: 'Sendo 1 muito baixa e 10 muito alta' },
              { id: 'area_impact', type: 'select', label: 'A baixa autoestima aparece mais em qual área?', options: [
                { value: 'aparencia', label: 'Aparência — não me sinto fisicamente suficiente' },
                { value: 'capacidade', label: 'Capacidade — não me sinto competente ou inteligente' },
                { value: 'valor', label: 'Valor — não me sinto merecedor de amor ou sucesso' },
                { value: 'pertencimento', label: 'Pertencimento — não me sinto digno nos grupos' },
                { value: 'todas', label: 'Em todas as áreas igualmente' }
              ]},
              { id: 'main_criticisms', type: 'textarea', label: 'O que você mais critica em si mesmo? (Liste até 3 críticas)', placeholder: 'Ex: Sou enrolado, Sou feio...' }
            ]
          },
          {
            title: 'A Origem da Voz Crítica',
            description: 'Identificando de onde veio essa "verdade".',
            fields: [
              { id: 'voice_resemblance', type: 'text', label: 'Essa voz crítica se parece com a voz de alguém específico?', placeholder: 'Quem era essa pessoa?' },
              { id: 'what_she_did', type: 'textarea', label: 'O que essa pessoa dizia ou fazia que plantou essa crença?', placeholder: 'Descreva as sementes da crítica...' },
              { id: 'self_conclusion', type: 'textarea', label: 'Que conclusão você tirou sobre si mesmo a partir disso?', placeholder: 'Sua percepção formada...' },
              { id: 'start_age', type: 'text', label: 'Com que idade aproximadamente isso começou?', placeholder: 'Ex: 7 anos' }
            ]
          },
          {
            title: 'Disputando a Voz Crítica',
            description: 'Analisando a objetividade da sua autocrítica.',
            fields: [
              { id: 'painful_criticism', type: 'textarea', label: 'Escolha a crítica mais dolorosa que você se faz e escreva aqui:', placeholder: 'A crítica principal...' },
              { id: 'real_evidence_for', type: 'textarea', label: 'Qual a evidência REAL (fatos concretos) que sustenta essa crítica?', placeholder: 'Só fatos, sem interpretações...' },
              { id: 'real_evidence_against', type: 'textarea', label: 'Qual a evidência REAL que CONTRADIZ essa crítica?', placeholder: 'O que você já fez que prova o contrário?' },
              { id: 'friend_advice', type: 'textarea', label: 'Se um amigo dissesse isso dele mesmo, o que você diria para ele?', placeholder: 'Seu conselho compassivo...' }
            ]
          },
          {
            title: 'Construindo Valor Real',
            description: 'Reconhecendo o que já existe.',
            fields: [
              { id: 'genuine_qualities', type: 'textarea', label: 'Liste 3 qualidades genuínas suas (mesmo que pequenas):', placeholder: 'O que as pessoas valorizam em você?' },
              { id: 'healthy_version', type: 'textarea', label: 'O que uma versão sua com autoestima saudável faria de diferente esta semana?', placeholder: 'Seja específico...' }
            ]
          },
          {
            title: 'V.I.D.A.',
            description: 'Seu manifesto de valor.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo após este protocolo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide mudar ou assumir a partir de agora?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Para onde você vai? Qual o caminho que escolhe?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Qual o primeiro passo concreto nos próximos 7 dias?' }
            ]
          }
        ];
      case 'ressentimento':
        return [
          {
            title: 'Identificando o Ressentimento',
            description: 'Dando nome à mágoa que você carrega.',
            fields: [
              { id: 'resentment_target', type: 'text', label: 'Quem é a pessoa ou qual é a situação que você ressente?', placeholder: 'Ex: Meu antigo sócio' },
              { id: 'what_happened', type: 'textarea', label: 'O que aconteceu especificamente? (fatos sem interpretação)', placeholder: 'Descreva a cena...' },
              { id: 'carry_time', type: 'text', label: 'Quanto tempo você carrega isso?', placeholder: 'Ex: 3 anos' },
              { id: 'daily_presence', type: 'textarea', label: 'Como esse ressentimento aparece no seu dia a dia?', placeholder: 'Pensamentos, emoções, comportamentos...' }
            ]
          },
          {
            title: 'Análise do que Aconteceu',
            description: 'Ampliando a visão sobre o outro.',
            fields: [
              { id: 'other_action_type', type: 'select', label: 'O que essa pessoa fez foi:', options: [
                { value: 'intencional', label: 'Uma ação intencional para me prejudicar' },
                { value: 'irresponsavel', label: 'Uma ação irresponsável ou descuidada — sem intenção' },
                { value: 'dor', label: 'Uma ação motivada pela própria dor — feridas ferem' },
                { value: 'interpretado', label: 'Uma ação que eu interpretei, mas pode não ter sido a intenção' },
                { value: 'combinacao', label: 'Uma combinação das opções acima' }
              ]},
              { id: 'other_perspective', type: 'textarea', label: 'Se você tentasse entender o que levou ela a agir assim — o que poderia explicar?', placeholder: 'Entender não é aceitar, é se libertar...' }
            ]
          },
          {
            title: 'A Função do Ressentimento',
            description: 'Por que ainda é difícil soltar?',
            fields: [
              { id: 'resentment_protection', type: 'textarea', label: 'O que o ressentimento está protegendo em você?', placeholder: 'Ex: Me protege de ser magoado de novo' },
              { id: 'resentment_help', type: 'select', label: 'Guardar esse ressentimento está te ajudando a:', options: [
                { value: 'distancia', label: 'Manter distância de alguém que me machucou' },
                { value: 'evitar_perdao', label: 'Evitar perdoar e ter que me abrir novamente' },
                { value: 'conexao', label: 'Manter uma conexão com essa pessoa — mesmo que dolorosa' },
                { value: 'punir', label: 'Punir essa pessoa — mesmo que ela não saiba' },
                { value: 'justificar', label: 'Justificar minha própria inação ou sofrimento' }
              ]}
            ]
          },
          {
            title: 'O Perdão',
            description: 'A decisão de se libertar.',
            fields: [
              { id: 'disposed_forgive', type: 'select', label: 'Você está disposto a considerar o perdão — pelo seu bem?', options: [{value: 'sim', label: 'Sim'}, {value: 'nao', label: 'Não'}, {value: 'as_vezes', label: 'Às Vezes'}] },
              { id: 'forgive_meaning', type: 'textarea', label: 'O que o perdão precisaria significar para você sem parecer traição a si mesmo?', placeholder: 'Sua definição de libertação...' },
              { id: 'liberation_gain', type: 'textarea', label: 'O que você ganha ao se libertar desse ressentimento?', placeholder: 'Seja concreto — o que muda na sua vida?' }
            ]
          },
          {
            title: 'V.I.D.A.',
            description: 'Seu passo em direção à paz.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo após este protocolo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide mudar ou assumir a partir de agora?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Para onde você vai? Qual o caminho que escolhe?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Qual o primeiro passo concreto nos próximos 7 dias?' }
            ]
          }
        ];
      default:
        // Generic structure for others while not fully implemented
        return [
           {
             title: 'Identificação',
             description: `Vamos iniciar o processamento de ${protocol.title}.`,
             fields: [
                { id: 'initial_list', type: 'textarea', label: 'Liste o que incomoda nesta área:', placeholder: 'Descreva aqui...' },
                { id: 'main_target', type: 'text', label: 'Foco principal:', placeholder: 'Escolha um ponto para trabalhar agora...' }
             ]
           },
           {
            title: 'Análise de Impacto',
            description: 'Como isso afeta sua vida hoje?',
            fields: [
               { id: 'impact_self', type: 'textarea', label: 'Como isso impacta você?' },
               { id: 'impact_others', type: 'textarea', label: 'Como impacta suas relações?' },
               { id: 'impact_results', type: 'textarea', label: 'Como afeta seus resultados?' }
            ]
           },
           {
            title: 'V.I.D.A.',
            description: 'Consolidação final.',
            fields: [
              { id: 'vida_visao', type: 'textarea', label: 'V — VISÃO: O que você enxerga sobre si mesmo?' },
              { id: 'vida_intencao', type: 'textarea', label: 'I — INTENÇÃO: O que você decide assumir?' },
              { id: 'vida_direcao', type: 'textarea', label: 'D — DIREÇÃO: Qual o caminho escolhido?' },
              { id: 'vida_acao', type: 'textarea', label: 'A — AÇÃO: Primeiro passo concreto (7 dias)?' }
            ]
          }
        ];
    }
  };

  const protocolSteps = getProtocolSteps();
  const currentStepData = protocolSteps[step];

  if (step === 999) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-12">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <Check className="w-12 h-12 text-gold" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif">Protocolo Concluído</h2>
          <p className="text-xl text-gold/60 font-serif italic">"{protocol.quote}"</p>
          <p className="text-white/40 max-w-lg mx-auto">
            Suas percepções foram seladas. Continue sua jornada com esta nova clareza.
          </p>
        </div>
        <Button onClick={onComplete} className="px-12 py-4">Voltar ao Raio-X</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-white/40">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <span className="text-gold uppercase tracking-widest text-[10px] font-bold">{protocol.code}</span>
            <h2 className="text-3xl font-serif">{protocol.title}</h2>
          </div>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-white/20">
          Passo {step + 1} de {protocolSteps.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-gold">{currentStepData.title}</h3>
            <p className="text-white/40">{currentStepData.description}</p>
          </div>

          <div className="space-y-8">
            {currentStepData.fields.map((field) => (
              <div key={field.id} className="space-y-3">
                <label className="text-lg text-white/80 font-serif">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-gold/50 transition-all min-h-[150px]"
                    placeholder={field.placeholder}
                    value={answers[field.id] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [field.id]: e.target.value }))}
                  />
                ) : field.type === 'select' ? (
                  <div className="grid gap-3">
                    {field.options?.map((opt) => (
                       <button
                         key={opt.value}
                         onClick={() => setAnswers(prev => ({ ...prev, [field.id]: opt.value }))}
                         className={cn(
                           "p-4 text-left rounded-xl border transition-all text-sm",
                           answers[field.id] === opt.value
                             ? "bg-gold border-gold text-black font-bold"
                             : "bg-white/5 border-white/5 text-white/60 hover:border-gold/30"
                         )}
                       >
                         {opt.label}
                       </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold/50 transition-all"
                    placeholder={field.placeholder}
                    value={answers[field.id] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [field.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-12">
            <Button 
              variant="outline" 
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-8 border-white/10 text-white/40"
            >
              Anterior
            </Button>
            {step === protocolSteps.length - 1 ? (
              <Button onClick={handleSave} disabled={saving} className="px-12 py-4 text-lg">
                {saving ? 'Selando...' : 'Finalizar Protocolo'}
              </Button>
            ) : (
              <Button onClick={() => setStep(s => s + 1)} className="px-12 py-4">
                Próximo <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
