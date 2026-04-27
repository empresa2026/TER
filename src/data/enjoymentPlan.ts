export interface EnjoymentPillar {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  context: string;
}

export const ENJOYMENT_PILLARS: EnjoymentPillar[] = [
  {
    id: 'saude',
    title: 'SAÚDE E CORPO',
    subtitle: 'Energia, disposição, autocuidado',
    description: 'O primeiro desfrute é sentir-se vivo dentro do próprio corpo',
    context: 'Você não pode desfrutar nenhuma outra área da vida se o seu corpo não tem energia, vitalidade e bem-estar. É o pilar que sustenta todos os outros. É também o primeiro lugar onde as Alianças se instalam — a couraça muscular de Reich diz que o corpo guarda o que a mente não processou.'
  },
  {
    id: 'relacionamentos',
    title: 'RELACIONAMENTOS',
    subtitle: 'Amor, família, amizades reais',
    description: 'Amor, família, amizade — conexões que nutrem, não que drenam',
    context: 'Nenhum ser humano desfruta plenamente em isolamento. Os relacionamentos são o canal pelo qual a maioria dos bens da vida flui — e também onde a maioria das Alianças opera. O Triângulo Dramático de Karpman, as Lealdades Invisíveis de Nagy, os Testes Inconscientes de Weiss — todos falam de relação.'
  },
  {
    id: 'financas',
    title: 'FINANÇAS E ABUNDÂNCIA',
    subtitle: 'Renda, patrimônio, liberdade financeira',
    description: 'Prosperidade sem ansiedade — a vida financeira que liberta',
    context: 'Dinheiro é o termômetro mais preciso das Alianças. Se você ganha mas não consegue manter — há uma aliança de lealdade. Se você evita ganhar — há uma aliança de fidelidade ao fracasso familiar. Se você tem mas não consegue desfrutar — há uma aliança com o limite superior. O dinheiro não é o problema. A aliança com ele é.'
  },
  {
    id: 'carreira',
    title: 'CARREIRA E PROPÓSITO',
    subtitle: 'Trabalho, missão, impacto',
    description: 'Trabalho como expressão de quem você é — não como prisão',
    context: 'A maioria das pessoas trabalha. Poucas trabalham a partir do que Hendricks chama de Zona de Genialidade — aquele cruzamento único entre o que só você faz da sua forma, o que te dá energia ao fazer, e o que o mundo precisa de você. Quando o trabalho está fora dessa zona, é exaustão disfarçada de produção.'
  },
  {
    id: 'desenvolvimento',
    title: 'DESENVOLVIMENTO',
    subtitle: 'Aprendizado, habilidades, crescimento',
    description: 'Aprender e se tornar mais — a expansão que não tem teto',
    context: 'O ser humano que para de crescer começa a murchar. O desenvolvimento não é sobre acumular certificados — é sobre expandir progressivamente quem você é capaz de ser. A Suposição Gigante de Kegan diz que muitas pessoas param de crescer porque, inconscientemente, crescer parece perigoso.'
  },
  {
    id: 'alegria',
    title: 'ALEGRIA E PRAZER',
    subtitle: 'Lazer, desfrute, experiências',
    description: 'Desfrutar o presente — sem culpa, sem limite superior',
    context: 'Esta é a dimensão mais sabotada pelas Alianças. O Upper Limit Problem de Hendricks explica que toda pessoa tem um termostato interno de alegria — e quando a temperatura sobe demais, o inconsciente cria um problema para voltar ao nível familiar. Aprender a sustentar alegria é uma habilidade que precisa ser praticada.'
  },
  {
    id: 'espiritualidade',
    title: 'ESPIRITUALIDADE',
    subtitle: 'Fé, sentido, conexão com algo maior',
    description: 'A conexão com algo maior — a fonte de onde vem a provisão',
    context: 'Não importa qual é a sua fé ou tradição. Esta dimensão é sobre a consciência de que você não é o único administrador da sua vida. Viktor Frankl, que sobreviveu a Auschwitz, descobriu que as pessoas que tinham um sentido maior — uma razão para existir além de si mesmas — eram as que mantinham dignidade no horror absoluto. O sentido sustenta tudo o mais.'
  }
];
