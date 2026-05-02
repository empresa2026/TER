import { Matrix } from '../types';

export const MATRICES: Matrix[] = [
  {
    id: 'corpo',
    number: '01',
    title: 'C.O.R.P.O.',
    acronym: 'CORPO',
    category: 'O QUE ESTÁ ACONTECENDO?',
    author: 'Stephen Porges e Peter Levine',
    concept: 'O corpo guarda o que a mente ainda não consegue dizer',
    help: {
      what: 'Você está rastreando o estado atual do Sistema Nervoso Autônomo (SNA) — a biologia sobrevivente por trás do discurso. Observe os sinais de ativação ou colapso: Ombros (elevados/rígidos), Respiração (curta/bloqueada no peito), Mandíbula (travada/tensa) e a Prosódia da Voz (timbre apertado ou sem ritmo).',
      how: 'Você encontrou o ponto de intervenção ao detectar uma Incongruência Neurocognitiva. É o choque entre a narrativa mental e a resposta biológica. Acontece quando a pessoa declara "paz" ou "resolução", mas o corpo exibe um marcador físico de perigo, alerta ou defesa (Ex: Diz "estou bem" enquanto mantém os punhos cerrados).',
      do: 'Não ofereça explicações teóricas. Faça um convite direto à Interocepção (percepção sensorial interna). Pergunte: "Posso te fazer uma observação? Percebi que seu tônus muscular mudou agora e seus ombros tensionaram. Você consegue notar essa sensação física?". O objetivo é tirar a atenção da história mental e ancorá-la na experiência do corpo presente.',
      cure: 'A cura ocorre através da Integração Neural e da restauração da segurança visceral. Quando uma tensão é nomeada e sentida sem julgamento, o Córtex Pré-frontal sinaliza ao sistema que o perigo passou. Isso permite que o Ciclo de Sobrevivência Incompleto (a defesa biológica que estava travada no corpo) finalmente se complete e relaxe, liberando o sistema para sustentar a nova Aliança.'
    },
    fields: [
      { 
        letter: 'C', 
        label: 'CONDIÇÃO (SNA)', 
        description: 'Qual é o estado atual do seu Sistema Nervoso Autônomo? (Tensão/Rigidez ou Peso/Colapso)', 
        hints: ['Ombros subindo', 'Mandíbula apertada', 'Aperto no peito', 'Trancando a respiração'] 
      },
      { 
        letter: 'O', 
        label: 'OBSERVAÇÃO', 
        description: 'Onde reside a sua Incongruência Neurocognitiva? (O que o seu corpo diz que a sua mente tenta esconder?)', 
        hints: ['Contradição entre fala e corpo', 'Tensão súbita ao mudar de assunto', 'Olhar perdido', 'Voz perdendo o ritmo'] 
      },
      { 
        letter: 'R', 
        label: 'RITMO', 
        description: 'Como está o seu Ritmo Respiratório agora? (Bloqueado, acelerado ou fluido?)', 
        hints: ['No topo do peito (curta)', 'Bloqueada (suspensa)', 'Acelerada (ansiosa)', 'Fluida e profunda'] 
      },
      { 
        letter: 'P', 
        label: 'PERFIL', 
        description: 'Qual Estado de Sobrevivência o seu corpo assumiu para lidar com o padrão familiar?', 
        details: 'OS 5 ESTADOS\n\n1. DISSOCIAÇÃO (Resposta Dorsal):\nSINAL: Sensação de "saída" do corpo, dormência, peso extremo.\nBIOLOGIA: Sistema desligado para poupar energia.\n\n2. MOBILIZAÇÃO (Simpática):\nSINAL: Inquietude, batimentos acelerados, necessidade de controle.\nBIOLOGIA: Pronto para Luta ou Fuga.\n\n3. CONGELAMENTO (Freeze):\nSINAL: "Travado" com muita energia interna; ombros rígidos.\nBIOLOGIA: Ativação simultânea de alerta e freio.\n\n4. AUTOANULAÇÃO (Fawn):\nSINAL: Necessidade imediata de agradar e se adaptar.\nBIOLOGIA: Segurança através da expectativa do outro.\n\n5. REGULAÇÃO (Ventral Vagal):\nSINAL: Respiração fluida, conexão e presença plena.\nBIOLOGIA: Estado de Unidade e segurança visceral.',
        hints: [
          'DISSOCIAÇÃO',
          'MOBILIZAÇÃO',
          'CONGELAMENTO',
          'AUTOANULAÇÃO',
          'REGULAÇÃO (VENTRAL)'
        ] 
      },
      { 
        letter: 'O', 
        label: 'ORGANIZAÇÃO', 
        description: 'Ao nomear a sensação, você consegue sustentar a Integração Neural necessária para o relaxamento?', 
        hints: ['Sinto a tensão relaxar', 'Minha respiração se aprofundou', 'Consigo estar presente na dor', 'O sistema entende que está seguro'] 
      }
    ]
  },
  {
    id: 'familia',
    number: '02',
    title: 'F.A.M.I.L.I.A.',
    acronym: 'FAMILIA',
    category: 'COM QUEM É O PROBLEMA?',
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
        label: 'FUSÃO OU AFASTAMENTO', 
        description: 'Como a sua família reage aos problemas?', 
        hints: ['Vivem grudados, sem limites e se metendo na vida um do outro', 'Param de se falar e se afastam completamente'] 
      },
      { 
        letter: 'A', 
        label: 'ANCESTRAL', 
        description: 'Olhando para trás, qual história dolorosa insiste em se repetir?', 
        hints: ['Os casamentos sempre acabam em traição', 'As mulheres sempre criam os filhos sozinhas', 'Falências financeiras aos 40 anos'] 
      },
      { 
        letter: 'M', 
        label: 'MAPA (Genograma)', 
        description: 'Liste quem é quem nas suas últimas 3 gerações (Avós, Pais, Você e seus irmãos).', 
        hints: ['Marque quem foi excluído da família', 'Quem sofreu muito', 'Quem tem vícios', 'Quem saiu de casa cedo'] 
      },
      { 
        letter: 'I', 
        label: 'INDIVÍDUO', 
        description: 'De 0 a 10, o quanto você consegue ser você mesmo perto deles sem se sentir culpado?', 
        hints: ['Você concorda com tudo só para evitar brigas', "Consegue dizer 'não' e manter a sua posição"] 
      },
      { 
        letter: 'L', 
        label: 'LEALDADE', 
        description: 'A quem você está imitando ou sendo fiel sem perceber?', 
        hints: ['Sinto que não posso ter dinheiro porque meu pai morreu pobre', 'Repito o comportamento agressivo da minha mãe'] 
      },
      { 
        letter: 'I', 
        label: 'INTERVIR', 
        description: 'Qual pequena atitude você pode tomar hoje para quebrar esse padrão com respeito?', 
        hints: ['Vou parar de tentar salvar e resolver os problemas do meu irmão', "Vou dizer 'não' para aquele encontro obrigatório de domingo"] 
      },
      { 
        letter: 'A', 
        label: 'ACOMPANHAR', 
        description: 'Como você vai notar que conseguiu quebrar o padrão?', 
        hints: ['O que vai acontecer de diferente no seu corpo ou na sua vida que provará que você não está mais repetindo o roteiro do passado?'] 
      }
    ]
  },
  {
    id: 'leal',
    number: '03',
    title: 'L.E.A.L.',
    acronym: 'LEAL',
    category: 'COM QUEM É O PROBLEMA?',
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
        description: 'Alguém na sua família se sacrificou muito, sofreu injustiças ou foi deixado para trás?', 
        hints: ['Minha mãe abriu mão dos sonhos por mim', 'Meu avô trabalhou até morrer e perdeu tudo', 'Um irmão que foi apagado da família'] 
      },
      { 
        letter: 'E', 
        label: 'EXPLORAR LEALDADES', 
        description: 'Você sente que sabota o próprio sucesso para não "ultrapassar" ou ferir essa pessoa?', 
        hints: ['Fico doente logo que sou promovido', 'Perco dinheiro rápido porque sinto que é errado ter mais do que meus pais tiveram'] 
      },
      { 
        letter: 'A', 
        label: 'ATRIBUIÇÃO', 
        description: 'Essa "missão" de sofrimento foi exigida de você ou você a assumiu sozinho em segredo?', 
        hints: ['Eles jogam na minha cara que eu lhes devo isso', 'Eles nem sabem e eu mesmo me puno e me saboto para me sentir leal?'] 
      },
      { 
        letter: 'L', 
        label: 'LIBERTAR COM HONRA', 
        description: 'Como você pode ter sucesso como uma forma de honrar (e não de trair) essa pessoa?', 
        hints: ['Vou usar o meu sucesso e a minha alegria como a maior homenagem ao sacrifício que vocês fizeram'] 
      }
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
    category: 'POR QUE O PROBLEMA SE REPETE?',
    author: 'Joseph Weiss — Teoria do Controle',
    concept: 'O inconsciente da pessoa está testando você — agora',
    help: {
      what: 'Você procura COMPORTAMENTOS QUE PARECEM RESISTÊNCIA mas são PERGUNTAS DISFARÇADAS. O inconsciente pergunta: "Posso confiar? É seguro mudar?".',
      how: 'Você percebe que achou quando consegue formular a pergunta que o comportamento está fazendo. (Ex: Atrasos = "Você vai embora se eu falhar?").',
      do: 'Responda DIFERENTE DO ESPERADO. Se a pessoa testa sua paciência sendo irritante, responda com calma e curiosidade em vez de irritação.',
      cure: 'A cura acontece por DESCONFIRMAÇÃO DA CRENÇA PATOGÊNICA. Quando você responde diferente do trauma passado, o inconsciente atualiza a crença.'
    },
    fields: [
      { 
        letter: 'T', 
        label: 'TRIGGER (Gatilho)', 
        description: 'O que a outra pessoa fez (ou deixou de fazer) que fez você reagir de forma exagerada, estranha ou sabotadora?', 
        hints: ['Ele demorou duas horas para responder a mensagem', 'Ela discordou de mim na frente de todos', 'Não me elogiaram no projeto'] 
      },
      { 
        letter: 'E', 
        label: 'ESPERANÇA', 
        description: 'No fundo, o que você queria que essa pessoa fizesse para provar que você está seguro com ela?', 
        hints: ['Queria que ele largasse tudo e me respondesse', 'Queria que ela provasse que não vai me abandonar igual às outras pessoas do passado'] 
      },
      { 
        letter: 'S', 
        label: 'SABOTAGEM', 
        description: 'Qual dor antiga você estava tentando evitar ao agir assim?', 
        hints: ['Fiquei frio e distante para não me sentir rejeitado', 'Criei uma briga enorme para afastar a pessoa logo, antes que ela pudesse me deixar'] 
      },
      { 
        letter: 'T', 
        label: 'TIPO DE TESTE', 
        description: 'Como você testou os limites ou a paciência dessa pessoa?', 
        hints: ['Cheguei atrasado várias vezes para ver se ele desistia de mim', 'Fui provocador', 'Fui passivo demais para ver se ela ia me controlar'] 
      },
      { 
        letter: 'E', 
        label: 'ÊXITO?', 
        description: 'A pessoa passou no seu teste de forma positiva? O que ela fez?', 
        hints: ['Ela não gritou de volta, manteve a calma, não foi embora... e isso quebrou a minha crença invisível de que todos sempre me abandonam'] 
      }
    ]
  },
  {
    id: 'drama',
    number: '05',
    title: 'D.R.A.M.A.',
    acronym: 'DRAMA',
    category: 'COM QUEM É O PROBLEMA?',
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
        description: 'Qual papel você mais assumiu neste conflito?', 
        hints: ['Vítima (esperando que alguém o salve)', 'Perseguidor (criticando e atacando)', 'Salvador (resolvendo tudo pelo outro sem perguntar se ele quer)'] 
      },
      { 
        letter: 'R', 
        label: 'RECONHECER', 
        description: 'Qual necessidade secreta esse papel satisfaz em você?', 
        hints: ['Sendo a Vítima, ganho atenção e ausência de responsabilidade', 'Sendo Perseguidor, ganho controle', 'Sendo Salvador, me sinto amado e com propósito'] 
      },
      { 
        letter: 'A', 
        label: 'ATENÇÃO AO GIRO', 
        description: 'Em que momento exato da situação o seu papel mudou?', 
        hints: ['Comecei como Salvador tentando ajudar, a pessoa não fez o que eu mandei, fiquei com raiva e virei o Perseguidor acusando-a de ser ingrata'] 
      },
      { 
        letter: 'M', 
        label: 'MOVER', 
        description: 'Como você poderia agir com poder, sem precisar usar nenhum desses papéis dramáticos?', 
        hints: ['Em vez de me fazer de Vítima, posso pedir o que preciso diretamente', 'Em vez de Salvador, posso apenas apoiar sem fazer o trabalho pelo outro'] 
      },
      { 
        letter: 'A', 
        label: 'ASSUMIR RESPONSABILIDADE', 
        description: 'O que você, e apenas você, poderia ter dito ou feito de diferente?', 
        hints: ['"Eu percebi que assumi o controle de algo que era seu. Dessa vez, vou deixar que você resolva do seu jeito"'] 
      }
    ]
  },
  {
    id: 'neces',
    number: '06',
    title: 'N.E.C.E.S.',
    acronym: 'NECES',
    category: 'POR QUE O PROBLEMA SE REPETE?',
    author: 'Cloé Madanes',
    concept: 'Todo comportamento, mesmo destrutivo, serve uma necessidade legítima',
    help: {
      what: 'Você procura a NECESSIDADE DOMINANTE escondida por trás do comportamento indesejado.',
      how: 'Você achou quando a pessoa reconhece a necessidade e algo alivia — o comportamento deixa de parecer loucura.',
      do: 'Pergunte: "O que você ganha com isso que não sabe pedir de outra forma?". Incentive a substituição por uma estratégia saudável.',
      cure: 'A cura acontece pela SUBSTITUIÇÃO DE ESTRATÉGIA. A necessidade é permanente, a forma de satisfazê-la é que muda.'
    },
    fields: [
      { 
        letter: 'N', 
        label: 'NECESSIDADE DOMINANTE', 
        description: 'Qual destas necessidades profundas está controlando suas decisões hoje?', 
        hints: ['Preciso muito de Certeza (segurança), Variedade (novidade)', 'Significância (ser importante)', 'Conexão (amor)', 'Crescimento ou Contribuição'] 
      },
      { 
        letter: 'E', 
        label: 'ESTRATÉGIA ATUAL', 
        description: 'O que você faz hoje (bom ou ruim) para conseguir satisfazer essa necessidade?', 
        hints: ['Para me sentir "Significante", eu trabalho 14 horas por dia e não delego', 'Para sentir "Conexão", eu aceito amizades ou relacionamentos que me fazem mal'] 
      },
      { 
        letter: 'C', 
        label: 'CUSTO', 
        description: 'Qual é o preço altíssimo que você está pagando por agir assim?', 
        hints: ['Trabalhar 14 horas está destruindo a minha saúde e a minha família', 'Aceitar abusos está custando a minha paz e autoestima'] 
      },
      { 
        letter: 'E', 
        label: 'ESTRATÉGIA ALTERNATIVA', 
        description: 'Que outra forma mais leve e saudável você poderia usar para preencher essa mesma necessidade?', 
        hints: ['Posso me sentir "Significante" e valioso ajudando pessoas num projeto voluntário, em vez de me matar de trabalhar na empresa'] 
      },
      { 
        letter: 'S', 
        label: 'SUBSTITUIR', 
        description: 'Qual é o pequeno passo prático que você vai dar hoje para substituir o mau hábito pelo novo?', 
        hints: ['Vou fechar o computador pontualmente às 18h hoje e usar o meu tempo para estudar algo que me faz crescer de verdade'] 
      }
    ]
  },
  {
    id: 'imune',
    number: '07',
    title: 'I.M.U.N.E.',
    acronym: 'IMUNE',
    category: 'POR QUE O PROBLEMA SE REPETE?',
    author: 'Robert Kegan & Lisa Lahey',
    concept: 'Quando a pessoa não muda, há uma razão mais forte que a vontade',
    help: {
      what: 'Você procura a SUPOSIÇÃO GIGANTE — a crença inconsciente que torna a mudança ameaçadora.',
      how: 'Você achou quando ela soa como LEI DA REALIDADE. Ex: "Se eu me impuser, serei destruído". A pessoa hesita ao ser questionada se é verdade.',
      do: 'Proponha um EXPERIMENTO SEGURO. Não tente convencer, colete dados reais contra a suposição sem grande risco.',
      cure: 'A cura acontece pela ATUALIZAÇÃO DA SUPOSIÇÃO por evidência real. A suposição antiga perde força frente à realidade experimentada.'
    },
    fields: [
      { 
        letter: 'I', 
        label: 'INTENÇÃO', 
        description: 'O que você genuinamente quer mudar na sua vida, mas parece impossível?', 
        hints: ['Quero cobrar mais caro pelos meus serviços', 'Quero parar de procrastinar', 'Quero me impor e dar minha opinião nas reuniões de trabalho'] 
      },
      { 
        letter: 'M', 
        label: 'MAPEIE A SABOTAGEM', 
        description: 'O que você faz (ou deixa de fazer) que destrói e sabota esse seu objetivo?', 
        hints: ['Eu dou descontos antes mesmo do cliente pedir', 'Eu passo o dia organizando a mesa em vez de executar', 'Eu fico calado quando pedem ideias'] 
      },
      { 
        letter: 'U', 
        label: 'UNCOVERING (Descobrindo o Medo)', 
        description: 'Seja muito honesto: se você finalmente conseguisse mudar isso, o que você tem medo que aconteça?', 
        hints: ['Se eu cobrar mais caro, vou ser rejeitado e perder todos os clientes', 'Se eu falar o que penso, vão rir de mim ou me achar arrogante'] 
      },
      { 
        letter: 'N', 
        label: 'NOMEIE A SUPOSIÇÃO', 
        description: 'Complete a frase revelando a lei invisível que governa a sua mente: "Eu acredito que se eu mudar..."', 
        hints: ['"...serei completamente abandonado e fracassarei"', '"...vou chamar muita atenção e serei destruído"'] 
      },
      { 
        letter: 'E', 
        label: 'EXPERIMENTO SEGURO', 
        description: 'Qual teste pequeno, quase sem risco, você pode fazer esta semana para provar que a sua mente está mentindo?', 
        hints: ['Vou oferecer o preço mais alto para apenas UM cliente novo e observar', 'Vou dar apenas UMA opinião rápida na reunião de quinta-feira e ver o que acontece'] 
      }
    ]
  },
  {
    id: 'narra',
    number: '08',
    title: 'N.A.R.R.A.',
    acronym: 'NARRA',
    category: 'QUAL MENTIRA CONFIÁVEL ESTÁ SENDO CONTADA?',
    author: 'Michael Gazzaniga',
    concept: 'O cérebro esquerdo inventa histórias — e você acredita nelas',
    help: {
      what: 'Você procura a CONTRADIÇÃO entre a narrativa que a pessoa conta sobre si mesma e o comportamento concreto.',
      how: 'Quando você mostra a diferença sem julgamento e a pessoa ri ou percebe o absurdo da justificativa.',
      do: 'Separe Fatos de Explicações. "Você diz ser independente, mas não dormiu porque ele não respondeu. Como junta essas duas coisas?".',
      cure: 'A cura acontece pela CONSTRUÇÃO DE UMA NARRATIVA MAIS HONESTA — baseada no que o comportamento realmente mostra.'
    },
    fields: [
      { 
        letter: 'N', 
        label: 'NARRATIVA', 
        description: 'Qual história repetitiva (de vítima, herói ou sofredor) você sempre conta sobre si mesmo para os outros?', 
        hints: ['"Eu sou independente demais, não preciso de ninguém"', '"Sempre tenho azar nos negócios"', '"As pessoas sempre me sugam"'] 
      },
      { 
        letter: 'A', 
        label: 'AÇÃO REAL', 
        description: 'Olhando friamente para a realidade, o que o seu comportamento concreto mostra, independentemente do que você fala?', 
        hints: ['Digo que sou independente, mas cobro atenção e entro em pânico se demoram a responder', 'Digo que sou forte, mas evito desafios novos há anos'] 
      },
      { 
        letter: 'R', 
        label: 'RACIONALIZAÇÃO', 
        description: 'Qual desculpa "lógica" a sua mente inventa para justificar que a sua atitude não bate com a sua história?', 
        hints: ['"Eu só cobrei atenção porque a pessoa foi irresponsável"', '"Eu só desisti do projeto porque o mercado estava ruim, não por medo"'] 
      },
      { 
        letter: 'R', 
        label: 'REFORMULAR', 
        description: 'Se você fosse brutalmente honesto consigo mesmo agora, qual seria a verdadeira história?', 
        hints: ['"A verdade é que eu não sou tão independente assim, eu exijo controle porque morro de medo de ser abandonado"'] 
      },
      { 
        letter: 'A', 
        label: 'ANCORAR NOVA HISTÓRIA', 
        description: 'O que você vai fazer na prática, hoje, para agir de acordo com essa nova (e mais honesta) versão de si mesmo?', 
        hints: ['Vou admitir para o meu parceiro que me sinto inseguro e pedir apoio, em vez de me fingir de autossuficiente e brigar por controle'] 
      }
    ]
  },
  {
    id: 'abcde',
    number: '09',
    title: 'A.B.C.D.E.',
    acronym: 'ABCDE',
    category: 'QUAL MENTIRA CONFIÁVEL ESTÁ SENDO CONTADA?',
    author: 'Albert Ellis — TREC',
    concept: 'Não é o evento que te perturba — é o que você pensa sobre ele',
    help: {
      what: 'Você procura ABSOLUTISMOS no pensamento: "sempre", "nunca", "tenho que", "é horrível".',
      how: 'Você achou quando consegue isolar a crença irracional e a pessoa ri ao ver a fragilidade lógica do "sempre".',
      do: 'Questione a catástrofe. "Alguém morreu? É realmente impossível suportar isso?". Direcione para a Preferência em vez da Exigência.',
      cure: 'A cura acontece quando exigências absolutas são transformadas em PREFERÊNCIAS FLEXÍVEIS. "Prefiro ir bem, mas posso tolerar ir mal".'
    },
    fields: [
      { 
        letter: 'A', 
        label: 'ADVERSIDADE', 
        description: 'O que aconteceu de ruim de forma crua, sem colocar nenhum drama ou interpretação emocional?', 
        hints: ['Meu chefe corrigiu um erro no meu relatório', 'Meu parceiro visualizou a mensagem e não respondeu na mesma hora'] 
      },
      { 
        letter: 'B', 
        label: 'BELIEF (Crença Absoluta)', 
        description: 'Qual foi o pensamento extremista ("Sempre", "Nunca", "Tenho que") que explodiu na sua mente logo após o evento?', 
        hints: ['"Ele acha que sou um inútil"', '"Eu NUNCA faço nada direito, isso é HORRÍVEL!"'] 
      },
      { 
        letter: 'C', 
        label: 'CONSEQUÊNCIA', 
        description: 'Como essa crença extremista fez você se sentir e agir no minuto seguinte?', 
        hints: ['Senti vergonha extrema, quis desistir do meu trabalho e passei o resto do dia maltratando as pessoas da minha equipe'] 
      },
      { 
        letter: 'D', 
        label: 'DISPUTAR', 
        description: 'Onde estão as provas REAIS de que esse seu pensamento drástico é 100% verdadeiro? Tem certeza?', 
        hints: ['Ele apenas corrigiu um parágrafo. Não há prova de que ele me odeie ou que eu seja um péssimo profissional por causa de uma frase'] 
      },
      { 
        letter: 'E', 
        label: 'EFEITO (Nova Crença)', 
        description: 'Como você pode reescrever esse pensamento trocando a sua "exigência de perfeição" por uma "preferência flexível"?', 
        hints: ['"Eu PREFIRO não ser criticado, mas se for, EU SUPORTO. Isso não me destrói e me ajuda a melhorar"'] 
      }
    ]
  },
  {
    id: 'senso',
    number: '10',
    title: 'S.E.N.S.O.',
    acronym: 'SENSO',
    category: 'COMO AGIR?',
    author: 'Viktor Frankl',
    concept: 'O sofrimento sem sentido destrói — o sofrimento com sentido transforma',
    help: {
      what: 'Você procura VAZIO EXISTENCIAL — a pessoa que funciona no piloto automático, sem um "para quê".',
      how: 'Quando a pergunta "para quê você vive?" provoca um silêncio profundo e reflexivo, não por timidez, mas por falta de resposta.',
      do: 'Ajude a encontrar o fio que dá sentido. "Se tudo estivesse resolvido hoje, o que você faria com o resto da vida?".',
      cure: 'A cura não é a eliminação do sofrimento — é encontrar um propósito que faça o sofrimento valer a pena.'
    },
    fields: [
      { 
        letter: 'S', 
        label: 'SOFRIMENTO PRESENTE', 
        description: 'Qual é o peso ou a dor exata que você está carregando hoje e que parece não ter fim?', 
        hints: ['Sinto um vazio existencial mesmo tendo ganhado dinheiro', 'Estou exausto de lutar para manter minha empresa aberta'] 
      },
      { 
        letter: 'E', 
        label: 'ESPAÇO DE ESCOLHA', 
        description: 'Nessa situação difícil, o que você definitivamente NÃO pode mudar, e o que você AINDA PODE escolher como vai reagir?', 
        hints: ['Não posso controlar a economia do país, mas posso escolher agir com honra e inovar no meu produto em vez de apenas reclamar'] 
      },
      { 
        letter: 'N', 
        label: 'NECESSIDADE DE SENTIDO', 
        description: 'Você está apenas "sobrevivendo" no piloto automático sem saber o "para quê" faz o que faz todos os dias?', 
        hints: ['Sim, perdi a paixão. Faço tudo por pura obrigação para pagar boletos e não sinto mais alegria em nada que construo'] 
      },
      { 
        letter: 'S', 
        label: 'SENTIDO POSSÍVEL', 
        description: 'Se essa dor estivesse sendo usada para esculpir o seu caráter, o que ela estaria tentando te ensinar a ser?', 
        hints: ['Talvez essa quebra financeira esteja me ensinando a ter mais humildade e a construir algo baseado em valores reais, não só em ego'] 
      },
      { 
        letter: 'O', 
        label: 'ORIENTAÇÃO FUTURA', 
        description: 'Qual futuro possível faria valer a pena suportar e atravessar toda essa dificuldade hoje?', 
        hints: ['Atravessar isso faz sentido porque estou quebrando o ciclo de pobreza e desistência da minha família, criando um legado diferente para os meus filhos'] 
      }
    ]
  },
  {
    id: 'humor',
    number: '11',
    title: 'H.U.M.O.R.',
    acronym: 'HUMOR',
    category: 'QUAL MENTIRA CONFIÁVEL ESTÁ SENDO CONTADA?',
    author: 'Frank Farrelly',
    concept: 'Às vezes rir de si mesmo libera o que a seriedade mantém preso',
    help: {
      what: 'Você procura o PERSONAGEM DO SOFRIMENTO — quando a pessoa está tão identificada com a dor que ela virou identidade.',
      how: 'Você achou quando percebe que a seriedade serve ao problema, não à pessoa. Use apenas se o vínculo for forte.',
      do: 'Exagere o personagem com carinho. "Você é muito bom nessa história de sofrimento! Quando foi a última vez que saiu do personagem?".',
      cure: 'O riso cria distância psicológica. O que estava grudado se solta um pouco e nesse espaço entra o movimento.'
    },
    fields: [
      { 
        letter: 'H', 
        label: 'HUMANIDADE', 
        description: 'Se a sua dor fosse um personagem de novela dramático, qual seria o nome e a atitude dele?', 
        hints: ['O "Mártir Supremo" que suspira e sofre por todos', 'A "Guerreira Cansada" que reclama, mas não deixa ninguém ajudá-la'] 
      },
      { 
        letter: 'U', 
        label: 'UNICIDADE', 
        description: 'Qual é o discurso vitimista favorito que esse seu personagem sempre repete?', 
        hints: ['"Tudo sobra para mim"', '"Se eu não fizer, ninguém faz"', '"Vocês não entendem o nível de pressão que eu carrego"'] 
      },
      { 
        letter: 'M', 
        label: 'MOMENTO CERTO', 
        description: 'Em que situações exatas esse seu personagem adora pular no palco e roubar a cena?', 
        hints: ['Sempre que alguém aponta uma falha minha', 'Logo depois que faço um favor que eu nem queria ter feito e não sou reconhecido'] 
      },
      { 
        letter: 'O', 
        label: 'OBSERVAR A REAÇÃO', 
        description: 'Se alguém imitasse perfeitamente esse seu exagero na sua frente agora, como você reagiria?', 
        hints: ['Eu ia rir de nervoso porque veria o quanto eu estou sendo melodramático, teimoso e apegado ao problema'] 
      },
      { 
        letter: 'R', 
        label: 'REDIRECIONAR AO RECURSO', 
        description: 'Rindo do seu próprio personagem, o que a sua versão madura e resolvida faria diferente hoje?', 
        hints: ['Riria da minha mania de carregar o mundo nas costas e simplesmente pediria ajuda de forma direta e leve'] 
      }
    ]
  },
  {
    id: 'aceit',
    number: '12',
    title: 'A.C.E.I.T.A.',
    acronym: 'ACEITA',
    category: 'COMO AGIR?',
    author: 'Steven Hayes — ACT',
    concept: 'Você não precisa eliminar o pensamento difícil — precisa parar de obedecê-lo',
    help: {
      what: 'Você procura FUSÃO COGNITIVA (quando a pessoa É o pensamento) e EVITAÇÃO EXPERIENCIAL (fugir de sentir).',
      how: 'Quando ela consegue observar o pensamento em vez de ser ele. "Estou tendo o pensamento de que sou um fracasso" e algo alivia.',
      do: 'Mude a relação com o pensamento. "Se esse pensamento fosse apenas um rádio ligado ao fundo, o que você faria hoje que seus valores mandam?".',
      cure: 'A cura é a FLEXIBILIDADE PSICOLÓGICA — agir com base em valores, não em emoções passageiras ou medos.'
    },
    fields: [
      { 
        letter: 'A', 
        label: 'ACEITAÇÃO', 
        description: 'Qual sentimento terrível você gasta muita energia tentando esconder, fingir que não existe ou evitar sentir?', 
        hints: ['Morro de medo de fracassar e passar vergonha', 'Sinto muita ansiedade de não ser bom o suficiente no que eu faço'] 
      },
      { 
        letter: 'C', 
        label: 'CONTEXTO DO SELF', 
        description: 'Você consegue perceber que você NÃO É a sua ansiedade, mas apenas a pessoa que está OBSERVANDO ela acontecer?', 
        hints: ['Consigo perceber que a sensação de fracasso é só um barulho passando pela minha mente, e não o que eu realmente sou'] 
      },
      { 
        letter: 'E', 
        label: 'ESTAR NO PRESENTE', 
        description: 'Puxe o ar fundo. O que o seu corpo físico está percebendo neste exato momento, no mundo real e físico?', 
        hints: ['Sinto meus pés no chão', 'Percebo o vento na janela', 'Noto que meu peito estava travado, mas está soltando'] 
      },
      { 
        letter: 'I', 
        label: 'IDENTIFICAR VALORES', 
        description: 'Apesar dessa emoção difícil existir, qual é a bússola inegociável que você quer seguir na vida?', 
        hints: ['Mesmo com medo, eu valorizo ser um pai presente', 'Eu quero construir um negócio íntegro que ajude pessoas'] 
      },
      { 
        letter: 'T', 
        label: 'TRANSFORMAR PELA DEFUSÃO', 
        description: 'Tire o poder do pensamento negativo, reescrevendo-o com o início: "Estou tendo o pensamento de que..."', 
        hints: ['Em vez de "Sou um fracassado ansioso", diga: "ESTOU TENDO O PENSAMENTO DE QUE serei um fracasso se tentar isso"'] 
      },
      { 
        letter: 'A', 
        label: 'AÇÃO COMPROMETIDA', 
        description: 'Carregando esse pequeno desconforto na mochila, qual atitude prática você vai executar hoje?', 
        hints: ['Mesmo morrendo de medo e com as mãos tremendo, vou ligar para aquele cliente importante e fechar o negócio'] 
      }
    ]
  },
  {
    id: 'genio',
    number: '13',
    title: 'G.E.N.I.O.',
    acronym: 'GENIO',
    category: 'COMO AGIR?',
    author: 'Gay Hendricks',
    concept: 'O maior inimigo da alegria não é o sofrimento — é o medo de sustentá-la',
    help: {
      what: 'Você procura o UPPER LIMIT — sabotagem que ocorre quando algo vai muito bem.',
      how: 'Quando o padrão de sabotagem se repete em momentos de alegria. Ex: Brigar com o parceiro após uma ótima viagem.',
      do: 'Aprenda a TOLERAR DOSES DE ALEGRIA. Note a vontade de sabotar sem agir nela. Expanda seu teto interno.',
      cure: 'A cura é a expansão progressiva da capacidade de desfrutar e habitar sua Zona de Genialidade.'
    },
    fields: [
      { 
        letter: 'G', 
        label: 'GATILHO SUPERIOR', 
        description: 'Qual foi a última vez que as coisas estavam indo maravilhosamente bem e, de repente, você criou um problema?', 
        hints: ['Bati minha meta do ano inteiro e, no mesmo final de semana, criei uma briga terrível com o meu parceiro sem nenhum motivo'] 
      },
      { 
        letter: 'E', 
        label: 'EVIDÊNCIA DO PADRÃO', 
        description: 'Como você costuma "apertar o botão de autodestruição" toda vez que atinge muita paz ou sucesso?', 
        hints: ['Fico misteriosamente doente logo antes de uma conquista', 'Começo a gastar dinheiro compulsivamente quando sobra', 'Afasto pessoas que me tratam bem'] 
      },
      { 
        letter: 'N', 
        label: 'NARRATIVA LIMITANTE', 
        description: 'Por que, lá no fundo, você acha que é "perigoso" ou "injusto" ser muito feliz e bem-sucedido?', 
        hints: ['Sinto que se eu brilhar demais, vou humilhar minha família', 'Acredito que alegria demais sempre atrai alguma tragédia'] 
      },
      { 
        letter: 'I', 
        label: 'INOCULAÇÃO', 
        description: 'Como você pode treinar o seu sistema a suportar o sucesso hoje, sem sabotar a alegria?', 
        hints: ['Vou aceitar um elogio no trabalho e apenas agradecer com um sorriso, sem tentar diminuir o que eu fiz ou justificar'] 
      },
      { 
        letter: 'O', 
        label: 'OPERAR NA ZONA', 
        description: 'Onde está o seu verdadeiro "dom"? Aquilo que você faz de forma tão natural e genial que perde até a noção do tempo?', 
        hints: ['Minha zona de genialidade não é executar tarefas chatas, é criar narrativas e conectar pessoas que precisavam se conhecer'] 
      }
    ]
  }
];
