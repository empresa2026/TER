import { Matrix } from '../types';

export const MATRICES: Matrix[] = [
  {
    id: 'corpo',
    number: '01',
    title: 'C.O.R.P.O.',
    acronym: 'CORPO',
    author: 'Wilhelm Reich & Alexander Lowen',
    concept: 'O corpo guarda o que a mente ainda não consegue dizer',
    help: {
      what: 'Você está procurando TENSÃO CRÔNICA e PADRÕES POSTURAIS — não o que a pessoa diz, mas como o corpo dela está neste momento. Observe: Ombros (encolhidos/rígidos), Respiração (curta/longa), Mandíbula (travada), Pernas (cruzadas/abertas), Voz (peito/garganta).',
      how: 'Você achou quando vê COERÊNCIA entre o que a pessoa fala e o que o corpo mostra — ou uma CONTRADIÇÃO reveladora (Ex: Diz "estou bem" com mandíbula travada).',
      do: 'Não explique o que está vendo. Pergunte. "Posso te fazer uma observação? Percebi que seus ombros ficam tensionados. Você percebe?" Convide para respirar e notar o que aparece.',
      cure: 'Quando a tensão é NOMEADA com cuidado, o sistema nervoso entende que não precisa mais guardar segredo. A emoção presa no músculo começa a ter permissão de ser sentida e processada.'
    },
    fields: [
      { 
        letter: 'C', 
        label: 'COURAÇA', 
        description: 'Onde está a tensão crônica no seu corpo?',
        hints: [
          'Sinto os ombros subindo em direção às orelhas', 
          'Minha mandíbula está apertada agora', 
          'Sinto um aperto no peito ou estômago',
          'Notei que estou prendendo o ar sem perceber',
          'Meus pés estão tensos ou "agarrados" ao chão',
          'Sinto uma rigidez na base do crânio/pescoço'
        ]
      },
      { 
        letter: 'O', 
        label: 'ORIGEM', 
        description: 'Qual emoção você acha que está presa ali?',
        hints: [
          'Parece um medo de ser julgado', 
          'Sinto uma raiva que não pude expressar', 
          'Sinto uma tristeza profunda ou desamparo',
          'É uma ansiedade por querer controlar tudo',
          'Parece uma vergonha de ocupar espaço',
          'Sinto uma culpa por algo que não sei explicar'
        ]
      },
      { 
        letter: 'R', 
        label: 'RESPIRAÇÃO', 
        description: 'Como está sua respiração agora? (curta / presa / livre)',
        hints: [
          'Minha respiração está travada no topo do peito', 
          'Esqueço de respirar quando fico ansioso', 
          'Respiro apenas pela parte alta dos pulmões',
          'Sinto um bloqueio no diafragma (boca do estômago)',
          'Minha expiração é muito curta ou brusca',
          'Sinto que o ar não chega até a barriga'
        ]
      },
      { 
        letter: 'P', 
        label: 'PADRÃO', 
        description: 'Qual estrutura de caráter se parece com você?',
        hints: [
          'Esquizoide: olhar distante, desconectado', 
          'Oral: sensação de vazio, busca por preenchimento', 
          'Psicopático: peito inflado, necessidade de controle', 
          'Masoquista: corpo pesado, segurando sentimentos', 
          'Rígido: corpo tenso, busca por perfeição',
          'Misto: Percebo traços de mais de um padrão'
        ]
      },
      { 
        letter: 'O', 
        label: 'OPERAR', 
        description: 'O que você pode fazer HOJE para liberar um pouco isso?',
        hints: [
          'Vou respirar fundo 3 vezes e soltar um som de alívio', 
          'Vou fechar os olhos e permitir que meus ombros caiam', 
          'Vou dar um tempo para sentir o que está acontecendo sem julgar',
          'Vou sacudir o corpo um pouco para dispersar a tensão',
          'Vou nomear a emoção em voz alta para dar lugar a ela',
          'Vou tocar a área tensionada com carinho e presença'
        ]
      }
    ]
  },
  {
    id: 'familia',
    number: '02',
    title: 'F.A.M.I.L.I.A.',
    acronym: 'FAMILIA',
    author: 'Murray Bowen',
    concept: 'Você não é só você — é o produto de gerações de padrões',
    help: {
      what: 'Você está procurando PADRÕES QUE SE REPETEM — separações, abandono, doenças, fracassos financeiros, distância emocional ou fusão excessiva em pelo menos 2 ou 3 gerações.',
      how: 'Você achou quando a pessoa vê o padrão no mapa e diz: "Nossa... é exatamente o que eu faço." Tira o peso da culpa individual e coloca no sistema.',
      do: 'Mostre o padrão sem julgar. "Olhando para o que você contou: seu pai foi embora, o pai dele também. Você vê esse padrão?". Pergunte se quer repetir o roteiro ou escrever um novo.',
      cure: 'A cura é a DIFERENCIAÇÃO — quando a pessoa percebe que o padrão vem de antes dela, ela pode escolher conscientemente ser diferente sem sentir que está traindo a família.'
    },
    fields: [
      { 
        letter: 'F', 
        label: 'FUSÃO ou FRACTURA', 
        description: 'Minha família funde (sem fronteiras) ou se afasta emocionalmente?',
        hints: [
          'Minha família evita conflitos a todo custo', 
          'Sentimos que temos que esconder segredos uns dos outros', 
          'Não há privacidade real entre os membros', 
          'Cortamos contato por anos após brigas', 
          'Sentimos a dor um do outro como se fosse nossa', 
          'As decisões de um afetam o humor de todos'
        ]
      },
      { 
        letter: 'A', 
        label: 'ANCESTRAL', 
        description: 'Que padrão se repete há 3 ou mais gerações?',
        hints: [
          'Vários homens na família tiveram problemas financeiros', 
          'As mulheres costumam criar os filhos sozinhas', 
          'Há um histórico de doenças psicossomáticas recorrentes', 
          'Casamentos costumam acabar após o nascimento dos filhos', 
          'Existe um padrão de migração ou perda de bens', 
          'Muitas pessoas na família têm a mesma profissão'
        ]
      },
      { 
        letter: 'M', 
        label: 'MAPA', 
        description: 'Quais as principais conexões e cortes na árvore genealógica?',
        hints: [
          'Pessoas foram "esquecidas" ou não são mencionadas', 
          'Tenho dificuldade de conexão com o lado materno ou paterno', 
          'Existem triângulos onde dois se unem contra um terceiro', 
          'Sou o "porto seguro" de algum dos meus pais', 
          'Há um luto não vivido por alguém que partiu cedo', 
          'Sinto que ocupo o lugar de alguém que veio antes'
        ]
      },
      { 
        letter: 'I', 
        label: 'INDIVÍDUO', 
        description: 'Em escala 0-10, quão "você mesmo" você consegue ser sob pressão?',
        hints: [
          'Tendo a agir por impulso quando me sinto pressionado', 
          'Consigo ouvir críticas sem me desestruturar totalmente', 
          'Fico em silêncio para não causar desconforto alheio', 
          'Sinto que perco minha essência quando estou em família', 
          'Consigo dizer "não" com amor e sem culpa', 
          'Minhas emoções dependem da aprovação dos meus pais'
        ]
      },
      { 
        letter: 'L', 
        label: 'LEALDADE', 
        description: 'A quem você está sendo fiel sem perceber?',
        hints: [
          'Sinto que não posso ser mais feliz que minha mãe foi', 
          'Trabalho demais para compensar a escassez do meu pai', 
          'Repito o erro de um tio para me sentir parte do grupo', 
          'Tenho medo de prosperar e ser excluído da família', 
          'Sinto culpa quando viajo ou me divirto sozinho', 
          'Escolho parceiros que lembram figuras difíceis da infância'
        ]
      },
      { 
        letter: 'I', 
        label: 'INTERVIR', 
        description: 'O que você pode fazer diferente para se diferenciar com respeito?',
        hints: [
          'Vou estabelecer um limite claro na próxima conversa', 
          'Vou parar de cobrar de mim o que meus pais não tiveram', 
          'Vou contar minha própria história sem carregar o passado', 
          'Vou observar sem reagir na próxima reunião familiar', 
          'Vou buscar meu próprio caminho profissional com orgulho', 
          'Vou dar um lugar de honra ao passado e seguir adiante'
        ]
      },
      { 
        letter: 'A', 
        label: 'ACOMPANHAR', 
        description: 'Como você vai notar que está mudando? Qual sinal vai aparecer?',
        hints: [
          'Vou me sentir mais leve e menos responsável pelos outros', 
          'O clima nas reuniões será mais neutro para mim', 
          'Conseguirei tomar decisões sem pedir permissão interna', 
          'Sentirei menos necessidade de salvar alguém da família', 
          'Terei mais clareza sobre meus próprios desejos', 
          'A sensação de "peso" nas costas vai diminuir'
        ]
      }
    ]
  },
  {
    id: 'leal',
    number: '03',
    title: 'L.E.A.L.',
    acronym: 'LEAL',
    author: 'Ivan Boszormenyi-Nagy',
    concept: 'Às vezes vivemos a vida de outra pessoa sem saber',
    help: {
      what: 'Você procura AUTOSSABOTAGEM INEXPLICÁVEL — especialmente quando algo bom está prestes a ocorrer. Culpa ao estar bem perto de alguém que sofreu.',
      how: 'Quando a pessoa conecta a sabotagem com uma figura familiar específica. "Como você se sentiria sendo bem-sucedido perto de X?" Hesitação ou mal-estar é a lealdade falando.',
      do: 'RESSIGNIFICAR a lealdade. "E se crescer fosse a maior homenagem que você pode fazer a ela? Dizer: Mãe, eu consigo porque você me deu essa base".',
      cure: 'Quando a pessoa percebe que pode ser fiel E próspera ao mesmo tempo, a autossabotagem perde sua razão de existir. O inconsciente não precisa mais destruir para provar lealdade.'
    },
    fields: [
      { 
        letter: 'L', 
        label: 'LIVRO-RAZÃO', 
        description: 'Quais "dívidas" ou "créditos" existem na minha família?',
        hints: [
          'Sinto que devo algo que nunca foi cobrado de mim', 
          'Recebi muito e sinto que não posso retribuir', 
          'Há uma sensação de injustiça que tento equilibrar', 
          'Sinto que carrego uma herança emocional pesada', 
          'Acho que sou responsável pela felicidade de alguém', 
          'Percebo que estou pagando por erros de antepassados'
        ]
      },
      { 
        letter: 'E', 
        label: 'EXPLORAR', 
        description: 'A quem eu estou sendo leal sem perceber?',
        hints: [
          'Parece que estou vivendo a vida frustrada da minha avó', 
          'Repito o destino solitário de uma tia que admiro', 
          'Tento ser o herói que meu pai não conseguiu ser', 
          'Sinto que estou preso ao sofrimento do meu irmão', 
          'Sou fiel ao silêncio que minha mãe manteve', 
          'Tento dar orgulho a alguém que já se foi'
        ]
      },
      { 
        letter: 'A', 
        label: 'ATRIBUIÇÃO', 
        description: 'Essa "missão" foi colocada em mim ou eu a escolhi?',
        hints: [
          'Sinto que fui "escolhido" para resolver os problemas', 
          'Esta carga apareceu quando eu era muito criança', 
          'Me disseram que eu era a esperança da família', 
          'Ouvi muitas vezes que eu "puxei" a tal parente', 
          'Sinto que assumi essa missão por amor cego', 
          'Parece que fui criado para cuidar de quem me criou'
        ]
      },
      { 
        letter: 'L', 
        label: 'LIBERTAR', 
        description: 'Como posso crescer E honrar essa pessoa ao mesmo tempo?',
        hints: [
          'Posso ser feliz e ainda assim amar minha família', 
          'Meu sucesso é a maior honra que posso dar a eles', 
          'Deixo com eles o que é deles e fico com o que é meu', 
          'Não preciso sofrer para provar que pertenço a este grupo', 
          'Digo "sim" para a vida que recebi e sigo em frente', 
          'Minha libertação ajuda a liberar as próximas gerações'
        ]
      }
    ],
    extraQuestions: [
      'Alguém na sua família não conseguiu ter o que você está tentando conquistar?',
      'Se você tivesse exatamente o que deseja, o que diria a esse familiar?'
    ]
  },
  {
    id: 'drama',
    number: '05',
    title: 'D.R.A.M.A.',
    acronym: 'DRAMA',
    author: 'Stephen Karpman',
    concept: 'A maioria dos conflitos é um jogo de papéis que ninguém escolheu',
    help: {
      what: 'Papel dominante (Vítima, Perseguidor ou Salvador) e momentos de GIRO (quando troca de papel na mesma situação).',
      how: 'Quando a pessoa consegue prever o próximo movimento dentro do triângulo e se surpreende ao ver o padrão de fora.',
      do: 'Não rotule. Mostre o padrão com curiosidade. "Em qual desses momentos você se sente mais você mesmo? Qual necessidade esse papel satisfaz?".',
      cure: 'A cura acontece quando a pessoa NOMEIA a necessidade real (atenção, controle, amor) e começa a buscá-la de forma direta, sem precisar do papel.'
    },
    fields: [
      { 
        letter: 'D', 
        label: 'DETECTAR', 
        description: 'Qual papel EU joguei recentemente? (Vítima, Salvador ou Perseguidor)',
        hints: [
          'Vítima: Sinto que nada que eu faça vai adiantar', 
          'Salvador: Sinto que preciso ajudar mesmo sem ser pedido', 
          'Perseguidor: Sinto que as pessoas são incompetentes', 
          'Vítima: Acho que o mundo está conspirando contra mim', 
          'Salvador: Sinto culpa se não resolver o problema do outro', 
          'Perseguidor: Uso a ironia para "corrigir" as pessoas'
        ]
      },
      { 
        letter: 'R', 
        label: 'RECONHECER', 
        description: 'Que necessidade esse papel satisfaz em mim?',
        hints: [
          'Ganhando atenção e carinho ao me mostrar frágil', 
          'Sentindo-me superior e indispensável ao salvar alguém', 
          'Sentindo-me poderoso e no controle ao criticar', 
          'Evitando olhar para minhas próprias feridas', 
          'Evitando a responsabilidade de tomar minhas decisões', 
          'Justificando minha raiva através do erro do outro'
        ]
      },
      { 
        letter: 'A', 
        label: 'ATENÇÃO AO GIRO', 
        description: 'Em que momento os papéis trocaram?',
        hints: [
          'Ajudei e agora me sinto irritado porque não me ouviu', 
          'Tentei ajudar e agora a pessoa está me atacando', 
          'Fui vítima e agora estou culpando quem tentou ajudar', 
          'Critiquei e agora me sinto culpado e quero salvar', 
          'Fiquei em silêncio e agora estou explodindo de raiva', 
          'Troquei de papel no meio da discussão para ganhar'
        ]
      },
      { 
        letter: 'M', 
        label: 'MOVER', 
        description: 'Qual seria o papel empoderado? (Criador / Desafiador / Apoiador)',
        hints: [
          'Criador: O que eu POSSO fazer nesta situação?', 
          'Apoiador: Como posso encorajar sem tirar o peso do outro?', 
          'Desafiador: Quais são os fatos reais sem julgamento?', 
          'Criador: Qual o meu objetivo real aqui?', 
          'Apoiador: Estou disponível se você precisar de suporte', 
          'Desafiador: Eu não aceito ser tratado desta forma'
        ]
      },
      { 
        letter: 'A', 
        label: 'ASSUMIR', 
        description: 'O que EU poderia ter dito de forma diferente?',
        hints: [
          'Vou pedir exatamente o que eu preciso, sem rodeios', 
          'Vou deixar que o outro lide com as consequências dele', 
          'Vou observar minha vontade de criticar e respirar', 
          'Vou assumir que eu também erro e pedir desculpas', 
          'Vou sair da conversa quando perceber o jogo começando', 
          'Vou focar na solução em vez de procurar culpados'
        ]
      }
    ]
  }
];
