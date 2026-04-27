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
      { letter: 'C', label: 'COURAÇA', description: 'Onde está a tensão crônica no seu corpo?', hints: ['Ombros subindo', 'Mandíbula apertada', 'Aperto no peito', 'Trancando a respiração'] },
      { letter: 'O', label: 'ORIGEM', description: 'Qual emoção você acha que está presa ali?', hints: ['Medo de julgamento', 'Raiva contida', 'Tristeza oculta', 'Ansiedade de controle'] },
      { letter: 'R', label: 'RESPIRAÇÃO', description: 'Como está sua respiração agora? (curta / presa / livre)', hints: ['No topo do peito', 'Esquecendo de respirar', 'Soltando pouco o ar', 'Livre e profunda'] },
      { letter: 'P', label: 'PADRÃO', description: 'Qual estrutura de caráter se parece com você?', hints: ['Esquizoide (Desconectado)', 'Oral (Vazio)', 'Psicopático (Controle)', 'Masoquista (Peso)', 'Rígido (Perfeição)'] },
      { letter: 'O', label: 'OPERAR', description: 'O que você pode fazer HOJE para liberar um pouco isso?', hints: ['Respirar fundo 3x', 'Soltar os ombros', 'Sacudir o corpo', 'Nomear a emoção'] }
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
      { letter: 'F', label: 'FUSÃO ou FRACTURA', description: 'Minha família funde (sem fronteiras) ou se afasta emocionalmente?', hints: ['Sem privacidade', 'Evita conflitos', 'Corte emocional (silêncio)', 'Vivemos um pelo outro'] },
      { letter: 'A', label: 'ANCESTRAL', description: 'Que padrão se repete há 3 ou mais gerações?', hints: ['Falências', 'Alcoolismo', 'Abondono paterno', 'Doenças recorrentes'] },
      { letter: 'M', label: 'MAPA (Genograma)', description: 'Desenhe (mentalmente) sua árvore: quem são os excluídos?', hints: ['Parentes esquecidos', 'Segredos de família', 'Abordos e lutos não vividos'] },
      { letter: 'I', label: 'INDIVÍDUO', description: 'Em escala 0-10, quão "você mesmo" você consegue ser sob pressão?', hints: ['Ajo por impulso', 'Fico em silêncio por medo', 'Perco minha essência'] },
      { letter: 'L', label: 'LEALDADE', description: 'A quem você está sendo fiel sem perceber?', hints: ['Não posso ser mais feliz que minha mãe', 'Trabalho demais como meu pai', 'Repito erros por pertencimento'] },
      { letter: 'I', label: 'INTERVIR', description: 'O que você pode fazer diferente para se diferenciar com respeito?', hints: ['Dizer não sem culpa', 'Escolher meu próprio caminho', 'Contar minha história'] },
      { letter: 'A', label: 'ACOMPANHAR', description: 'Como você vai notar que está mudando? Qual sinal vai aparecer?', hints: ['Menos peso nas costas', 'Clima neutro em reuniões', 'Decisões próprias'] }
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
      { letter: 'L', label: 'LIVRO-RAZÃO', description: 'Quais "dívidas" ou "créditos" existem na minha família?', hints: ['Sinto que devo algo', 'Recebi demais e não pago', 'Injustiças passadas'] },
      { letter: 'E', label: 'EXPLORAR LEALDADES', description: 'A quem eu estou sendo leal sem perceber?', hints: ['Vivendo o trauma da avó', 'Repetindo a solidão da tia', 'Herói do pai'] },
      { letter: 'A', label: 'ATRIBUIÇÃO', description: 'Essa "missão" foi colocada em mim ou eu a escolhi?', hints: ['Escolhido para resolver tudo', 'Carga desde criança', 'Esperança da família'] },
      { letter: 'L', label: 'LIBERTAR COM HONRA', description: 'Como posso crescer E honrar essa pessoa ao mesmo tempo?', hints: ['Sucesso é a maior honra', 'Deixo o que é deles com eles', 'Digo sim à vida'] }
    ],
    extraQuestions: [
      'Alguém na sua família não conseguiu ter o que você está tentando conquistar?',
      'Se você tivesse exatamente o que deseja, o que diria a esse familiar?'
    ]
  },
  {
    id: 'teste',
    number: '04',
    title: 'T.E.S.T.E.',
    acronym: 'TESTE',
    author: 'Joseph Weiss — Teoria do Controle',
    concept: 'O inconsciente da pessoa está testando você — agora',
    help: {
      what: 'Você procura COMPORTAMENTOS QUE PARECEM RESISTÊNCIA mas são PERGUNTAS DISFARÇADAS. O inconsciente pergunta: "Posso confiar? É seguro mudar?".',
      how: 'Você percebe que achou quando consegue formular a pergunta que o comportamento está fazendo. (Ex: Atrasos = "Você vai embora se eu falhar?").',
      do: 'Responda DIFERENTE DO ESPERADO. Se a pessoa testa sua paciência sendo irritante, responda com calma e curiosidade em vez de irritação.',
      cure: 'A cura acontece por DESCONFIRMAÇÃO DA CRENÇA PATOGÊNICA. Quando você responde diferente do trauma passado, o inconsciente atualiza a crença.'
    },
    fields: [
      { letter: 'T', label: 'TRIGGER (Gatilho)', description: 'O que aconteceu antes do meu comportamento?', hints: ['Alguém me elogiou', 'Ficamos próximos demais', 'Uma regra foi imposta'] },
      { letter: 'E', label: 'ESPERANÇA', description: 'O que eu queria que a outra pessoa provasse?', hints: ['Que ficaria mesmo no caos', 'Que me respeitaria se eu dissesse não', 'Que não me punirá'] },
      { letter: 'S', label: 'SABOTAGEM', description: 'Que crença sobre mim mesmo ou o mundo eu estava protegendo?', hints: ['As pessoas vão embora', 'Vão me controlar se eu deixar', 'Não mereço cuidado'] },
      { letter: 'T', label: 'TIPO DE TESTE', description: 'Transferência ou Passivo-para-Ativo?', hints: ['Fiz com ela o que fizeram comigo (P-A)', 'Agi como agia com meu pai (Transf)'] },
      { letter: 'E', label: 'ÊXITO?', description: 'A outra pessoa passou no teste? O que aconteceu?', hints: ['Ela ficou calma', 'Ela me confrontou com amor', 'Sinto que o vínculo mudou'] }
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
      { letter: 'D', label: 'DETECTAR', description: 'Qual papel EU joguei?', hints: ['Vítima: sou impotente', 'Perseguidor: a culpa é sua', 'Salvador: eu resolvo pra vc'] },
      { letter: 'R', label: 'RECONHECER', description: 'Que necessidade esse papel satisfaz em mim?', hints: ['Busco carinho sendo frágil', 'Busco valor sendo indispensável', 'Busco poder criticando'] },
      { letter: 'A', label: 'ATENÇÃO AO GIRO', description: 'Em que momento os papéis trocaram?', hints: ['Ajudei e agora estou com raiva', 'Fui atacado e agora estou salvando', 'O giro do "Sim, MAS..."'] },
      { letter: 'M', label: 'MOVER', description: 'Qual seria o papel empoderado? (Criador / Desafiador / Apoiador)', hints: ['O que EU posso fazer?', 'Fatos sem julgamento', 'Apoio sem tirar a carga'] },
      { letter: 'A', label: 'ASSUMIR RESPONSABILIDADE', description: 'O que EU poderia ter dito de forma diferente?', hints: ['Pedir o que preciso direto', 'Sair da conversa no jogo', 'Assumir meu erro'] }
    ]
  },
  {
    id: 'neces',
    number: '06',
    title: 'N.E.C.E.S.',
    acronym: 'NECES',
    author: 'Cloé Madanes',
    concept: 'Todo comportamento, mesmo destrutivo, serve uma necessidade legítima',
    help: {
      what: 'Você procura a NECESSIDADE DOMINANTE escondida por trás do comportamento indesejado.',
      how: 'Você achou quando a pessoa reconhece a necessidade e algo alivia — o comportamento deixa de parecer loucura.',
      do: 'Pergunte: "O que você ganha com isso que não sabe pedir de outra forma?". Incentive a substituição por uma estratégia saudável.',
      cure: 'A cura acontece pela SUBSTITUIÇÃO DE ESTRATÉGIA. A necessidade é permanente, a forma de satisfazê-la é que muda.'
    },
    fields: [
      { letter: 'N', label: 'NECESSIDADE DOMINANTE', description: 'Qual das 6 domina seu comportamento agora?', hints: ['Certeza/Segurança', 'Variedade/Aventura', 'Significância/Valor', 'Conexão/Amor', 'Crescimento', 'Contribuição'] },
      { letter: 'E', label: 'ESTRATÉGIA ATUAL', description: 'Como eu satisfaço essa necessidade hoje? (saudável ou não)', hints: ['Vício em trabalho (Significância)', 'Ciúme (Conexão)', 'Comida (Certeza)'] },
      { letter: 'C', label: 'CUSTO', description: 'Qual o preço que pago por essa forma de satisfazer?', hints: ['Perda de saúde', 'Afastamento de amigos', 'Vazio interior'] },
      { letter: 'E', label: 'ESTRATÉGIA ALTERNATIVA', description: 'Que outra forma poderia satisfazer a mesma necessidade?', hints: ['Dizer o que sinto em vez de brigar', 'Novo hobby em vez de vício', 'Trabalhar com propósito'] },
      { letter: 'S', label: 'SUBSTITUIR', description: 'Quando e como vou praticar essa estratégia nova?', hints: ['Amanhã ao acordar', 'Na próxima discussão', 'Hoje mesmo'] }
    ]
  },
  {
    id: 'imune',
    number: '07',
    title: 'I.M.U.N.E.',
    acronym: 'IMUNE',
    author: 'Robert Kegan & Lisa Lahey',
    concept: 'Quando a pessoa não muda, há uma razão mais forte que a vontade',
    help: {
      what: 'Você procura a SUPOSIÇÃO GIGANTE — a crença inconsciente que torna a mudança ameaçadora.',
      how: 'Você achou quando ela soa como LEI DA REALIDADE. Ex: "Se eu me impuser, serei destruído". A pessoa hesita ao ser questionada se é verdade.',
      do: 'Proponha um EXPERIMENTO SEGURO. Não tente convencer, colete dados reais contra a suposição sem grande risco.',
      cure: 'A cura acontece pela ATUALIZAÇÃO DA SUPOSIÇÃO por evidência real. A suposição antiga perde força frente à realidade experimentada.'
    },
    fields: [
      { letter: 'I', label: 'INTENÇÃO', description: 'O que genuinamente desejo transformar?', hints: ['Ser mais assertivo', 'Trabalhar menos', 'Emagrecer'] },
      { letter: 'M', label: 'MAPEIE A SABOTAGEM', description: 'O que faço contra isso?', hints: ['Fico quieto em reuniões', 'Pego projetos extras', 'Como por ansiedade'] },
      { letter: 'U', label: 'UNCOVERING (Medo)', description: 'Qual o medo oculto? O que acontece se você parar de sabotar?', hints: ['Serão rudes comigo', 'Serei irrelevante', 'Terei que enfrentar meu vazio'] },
      { letter: 'N', label: 'NOMEIE A SUPOSIÇÃO', description: 'Escreva: "Eu acredito que se eu mudar..."', hints: ['...vão me rejeitar e isso me matará', '...perderei o amor de todos'] },
      { letter: 'E', label: 'EXPERIMENTO SEGURO', description: 'Que ação PEQUENA e segura você fará para testar a suposição?', hints: ['Dar uma opinião simples na reunião', 'Sair no horário um dia', 'Observar a fome'] }
    ]
  },
  {
    id: 'narra',
    number: '08',
    title: 'N.A.R.R.A.',
    acronym: 'NARRA',
    author: 'Michael Gazzaniga',
    concept: 'O cérebro esquerdo inventa histórias — e você acredita nelas',
    help: {
      what: 'Você procura a CONTRADIÇÃO entre a narrativa que a pessoa conta sobre si mesma e o comportamento concreto.',
      how: 'Quando você mostra a diferença sem julgamento e a pessoa ri ou percebe o absurdo da justificativa.',
      do: 'Separe Fatos de Explicações. "Você diz ser independente, mas não dormiu porque ele não respondeu. Como junta essas duas coisas?".',
      cure: 'A cura acontece pela CONSTRUÇÃO DE UMA NARRATIVA MAIS HONESTA — baseada no que o comportamento realmente mostra.'
    },
    fields: [
      { letter: 'N', label: 'NARRATIVA', description: 'Qual história você conta sobre si mesmo?', hints: ['Sou independente', 'Sou azarado', 'Sou burro'] },
      { letter: 'A', label: 'AÇÃO REAL', description: 'O que seu COMPORTAMENTO concreto mostra? (Só fatos)', hints: ['Fiquei ansioso por um zap', 'Perdi o prazo por procrastinação'] },
      { letter: 'R', label: 'RACIONALIZAÇÃO', description: 'Onde a história e o comportamento divergem? O que o cérebro explica?', hints: ['"Só liguei pra ver se estava bem"', '"Não era tão importante"'] },
      { letter: 'R', label: 'REFORMULAR', description: 'Qual narrativa mais honesta explicaria seu comportamento?', hints: ['"Ainda busco validação em estranhos"', '"Tenho medo de falhar no topo"'] },
      { letter: 'A', label: 'ANCORAR NOVA HISTÓRIA', description: 'Que experiência concreta você vai buscar para confirmar a nova?', hints: ['Ficar sem olhar o celular por 2h', 'Entregar uma tarefa incompleta'] }
    ]
  },
  {
    id: 'abcde',
    number: '09',
    title: 'A.B.C.D.E.',
    acronym: 'ABCDE',
    author: 'Albert Ellis — TREC',
    concept: 'Não é o evento que te perturba — é o que você pensa sobre ele',
    help: {
      what: 'Você procura ABSOLUTISMOS no pensamento: "sempre", "nunca", "tenho que", "é horrível".',
      how: 'Você achou quando consegue isolar a crença irracional e a pessoa ri ao ver a fragilidade lógica do "sempre".',
      do: 'Questione a catástrofe. "Alguém morreu? É realmente impossível suportar isso?". Direcione para a Preferência em vez da Exigência.',
      cure: 'A cura acontece quando exigências absolutas são transformadas em PREFERÊNCIAS FLEXÍVEIS. "Prefiro ir bem, mas posso tolerar ir mal".'
    },
    fields: [
      { letter: 'A', label: 'ADVERSIDADE', description: 'O evento que aconteceu (Só fatos)', hints: ['Fui criticado', 'Recebi um não', 'Cometi um erro'] },
      { letter: 'B', label: 'BELIEF (Crença)', description: 'O pensamento automático que veio? Tem "devo / tenho que"?', hints: ['Eu deveria ter ido melhor', 'É horrível ser rejeitado'] },
      { letter: 'C', label: 'CONSEQUÊNCIA', description: 'Qual emoção e comportamento resultou?', hints: ['Fiquei triste e parei de trabalhar', 'Fugi da situação'] },
      { letter: 'D', label: 'DISPUTAR', description: 'Qual a versão mais racional e flexível?', hints: ['Errar é humano, não catástrofe', 'Um não não define meu valor'] },
      { letter: 'E', label: 'EFEITO (Nova Crença)', description: 'Escreva a crença com Preferência: "Prefiro que... mas posso lidar se..."', hints: ['Prefiro ser aceito, mas sobrevivo ao não'] }
    ]
  },
  {
    id: 'senso',
    number: '10',
    title: 'S.E.N.S.O.',
    acronym: 'SENSO',
    author: 'Viktor Frankl',
    concept: 'O sofrimento sem sentido destrói — o sofrimento com sentido transforma',
    help: {
      what: 'Você procura VAZIO EXISTENCIAL — a pessoa que funciona no piloto automático, sem um "para quê".',
      how: 'Quando a pergunta "para quê você vive?" provoca um silêncio profundo e reflexivo, não por timidez, mas por falta de resposta.',
      do: 'Ajude a encontrar o fio que dá sentido. "Se tudo estivesse resolvido hoje, o que você faria com o resto da vida?".',
      cure: 'A cura não é a eliminação do sofrimento — é encontrar um propósito que faça o sofrimento valer a pena.'
    },
    fields: [
      { letter: 'S', label: 'SOFRIMENTO PRESENTE', description: 'Qual é o sofrimento que você carrega agora?', hints: ['Tédio profundo', 'Luto constante', 'Insatisfação profissional'] },
      { letter: 'E', label: 'ESPAÇO DE ESCOLHA', description: 'O que está FORA do seu controle? E o que está DENTRO?', hints: ['Não controlo o mercado, controlo minha ação', 'Controlo minha atitude diante da dor'] },
      { letter: 'N', label: 'NECESSIDADE DE SENTIDO', description: 'Você sente um vazio de propósito? Está apenas "funcionando"?', hints: ['Aperto no peito ao acordar', 'Sinto que sou uma peça substituível'] },
      { letter: 'S', label: 'SENTIDO POSSÍVEL', description: 'O que este sofrimento poderia estar ensinando?', hints: ['Estou aprendendo paciência', 'Isso me prepara para ajudar outros'] },
      { letter: 'O', label: 'ORIENTAÇÃO FUTURA', description: 'Qual futuro possível daria razão para atravessar o presente?', hints: ['Ver meus filhos crescerem', 'Construir minha obra', 'Descobrir quem sou'] }
    ]
  },
  {
    id: 'humor',
    number: '11',
    title: 'H.U.M.O.R.',
    acronym: 'HUMOR',
    author: 'Frank Farrelly',
    concept: 'Às vezes rir de si mesmo libera o que a seriedade mantém preso',
    help: {
      what: 'Você procura o PERSONAGEM DO SOFRIMENTO — quando a pessoa está tão identificada com a dor que ela virou identidade.',
      how: 'Você achou quando percebe que a seriedade serve ao problema, não à pessoa. Use apenas se o vínculo for forte.',
      do: 'Exagere o personagem com carinho. "Você é muito bom nessa história de sofrimento! Quando foi a última vez que saiu do personagem?".',
      cure: 'O riso cria distância psicológica. O que estava grudado se solta um pouco e nesse espaço entra o movimento.'
    },
    fields: [
      { letter: 'H', label: 'HUMANIDADE', description: 'Qual o personagem que você faz quando sofre? Dê um nome.', hints: ['O Mártir Supremo', 'A Vítima Indefesa', 'O Senhor Crítico'] },
      { letter: 'U', label: 'UNICIDADE', description: 'O que esse personagem sempre diz? Discurso favorito?', hints: ['"Ninguém me entende"', '"Eu tento mas nada dá certo"', '"Isso é culpa deles"'] },
      { letter: 'M', label: 'MOMENTO CERTO', description: 'Em que situações esse personagem aparece?', hints: ['Quando recebo cobrança', 'Em discussões de casal', 'Ao falar de dinheiro'] },
      { letter: 'O', label: 'OBSERVAR A REAÇÃO', description: 'O que acontece quando você se vê fazendo esse personagem?', hints: ['Sinto vergonha', 'Me dá vontade de rir', 'Percebo que é um jogo'] },
      { letter: 'R', label: 'REDIRECIONAR', description: 'Se o personagem saísse de cena, o que a pessoa real diria?', hints: ['"Estou com medo de não dar conta"', '"Eu só queria um abraço"', '"Eu errei"'] }
    ]
  },
  {
    id: 'aceit',
    number: '12',
    title: 'A.C.E.I.T.A.',
    acronym: 'ACEITA',
    author: 'Steven Hayes — ACT',
    concept: 'Você não precisa eliminar o pensamento difícil — precisa parar de obedecê-lo',
    help: {
      what: 'Você procura FUSÃO COGNITIVA (quando a pessoa É o pensamento) e EVITAÇÃO EXPERIENCIAL (fugir de sentir).',
      how: 'Quando ela consegue observar o pensamento em vez de ser ele. "Estou tendo o pensamento de que sou um fracasso" e algo alivia.',
      do: 'Mude a relação com o pensamento. "Se esse pensamento fosse apenas um rádio ligado ao fundo, o que você faria hoje que seus valores mandam?".',
      cure: 'A cura é a FLEXIBILIDADE PSICOLÓGICA — agir com base em valores, não em emoções passageiras ou medos.'
    },
    fields: [
      { letter: 'A', label: 'ACEITAÇÃO', description: 'Qual emoção difícil você está evitando?', hints: ['Tristeza', 'Vulnerabilidade', 'Desprezo'] },
      { letter: 'C', label: 'CONTEXTO DO SELF', description: 'Você É esse pensamento ou você é quem PERCEBE ele?', hints: ['Eu sou quem nota o medo', 'Pensamentos são nuvens passando'] },
      { letter: 'E', label: 'ESTAR NO PRESENTE', description: 'O que você percebe agora no seu corpo e ambiente?', hints: ['Sinto meus pés no chão', 'Ouvindo o som da sala'] },
      { letter: 'I', label: 'IDENTIFICAR VALORES', description: 'O que é verdadeiramente importante para você?', hints: ['Família', 'Honestidade', 'Beleza', 'Serviço'] },
      { letter: 'T', label: 'TRANSFORMAR (Defusão)', description: 'Reescreva: "Estou tendo o pensamento de que..."', hints: ['...não sou bom o bastante (Note o pensamento)'] },
      { letter: 'A', label: 'AÇÃO COMPROMETIDA', description: 'O que você vai fazer NA DIREÇÃO dos seus valores HOJE?', hints: ['Ligar para um amigo', 'Concluir aquela tarefa', 'Pedir desculpas'] }
    ]
  },
  {
    id: 'genio',
    number: '13',
    title: 'G.E.N.I.O.',
    acronym: 'GENIO',
    author: 'Gay Hendricks',
    concept: 'O maior inimigo da alegria não é o sofrimento — é o medo de sustentá-la',
    help: {
      what: 'Você procura o UPPER LIMIT — sabotagem que ocorre quando algo vai muito bem.',
      how: 'Quando o padrão de sabotagem se repete em momentos de alegria. Ex: Brigar com o parceiro após uma ótima viagem.',
      do: 'Aprenda a TOLERAR DOSES DE ALEGRIA. Note a vontade de sabotar sem agir nela. Expanda seu teto interno.',
      cure: 'A cura é a expansão progressiva da capacidade de desfrutar e habitar sua Zona de Genialidade.'
    },
    fields: [
      { letter: 'G', label: 'GATILHO SUPERIOR', description: 'Quando algo bom aconteceu recentemente, o que veio depois?', hints: ['Uma briga do nada', 'Ficar doente', 'Culpa súbita'] },
      { letter: 'E', label: 'EVIDÊNCIA DO PADRÃO', description: 'Quantas vezes você sabotou alegria ou sucesso?', hints: ['Sempre faço isso quando sou promovido', 'Estrago o clima em datas especiais'] },
      { letter: 'N', label: 'NARRATIVA LIMITANTE', description: 'Qual das crenças opera em você?', hints: ['Não mereço ser tão feliz', 'Vou prejudicar quem amo se brilhar', 'Se brilhar, serei abandonado'] },
      { letter: 'I', label: 'INOCULAÇÃO', description: 'Qual dose PEQUENA de alegria você pode tolerar esta semana?', hints: ['Aceitar um elogio sem negar', 'Permitir-me um descanso sem culpa'] },
      { letter: 'O', label: 'OPERAR NA ZONA', description: 'Onde está sua Zona de Genialidade? O que você faz que te energiza?', hints: ['Ouvir pessoas', 'Resolver problemas lógicos', 'Criar beleza'] }
    ]
  }
];
