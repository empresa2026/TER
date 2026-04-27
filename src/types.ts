export interface ProtocolQuestion {
  question: string;
  options: string[];
}

export interface ProtocolSection {
  title: string;
  intro?: string;
  questions: ProtocolQuestion[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  categoryId?: string;
  identifiedStructure: {
    ferida: string;
    dominio: string;
    mascara: string;
    modo: string;
  };
  axisEstablishment: {
    text: string;
    instruction: string;
  };
  sections: ProtocolSection[];
  finalPrayer: string;
  createdAt: string;
  createdBy: string;
}

export interface UserResult {
  id: string;
  userId: string;
  quizId: string;
  answers: Record<string, number>; // question index -> option index
  completedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName?: string;
}

export interface MatrixField {
  letter: string;
  label: string;
  description: string;
  hints?: string[];
}

export interface MatrixHelp {
  what: string;   // O que procurar
  how: string;    // Como sei que achei
  do: string;     // O que faço quando acho
  cure: string;   // Como isso leva à cura
}

export interface Matrix {
  id: string;
  number: string;
  title: string;
  acronym: string;
  author: string;
  concept: string;
  help: MatrixHelp;
  fields: MatrixField[];
  extraQuestions?: string[];
}

export interface MatrixResult {
  id: string;
  userId: string;
  matrixId: string;
  answers: Record<string, string>;
  completedAt: string;
}

export interface Protocol {
  id: string;
  title: string;
  code: string;
  description: string;
  quote: string;
  useCase: string;
}

export interface ProtocolResult {
  id: string;
  userId: string;
  protocolId: string;
  answers: Record<string, any>;
  completedAt: string;
}

export interface EnjoymentPlanResult {
  id: string;
  userId: string;
  xray: Record<string, number>;
  xrayReflections: {
    r1: string;
    r2: string;
    r3: string;
  };
  pillars: Record<string, {
    image: {
      a: string;
      b: string;
      c: string;
    };
    objectives: Array<{
      what: string;
      when: string;
      how: string;
    }>;
    actions: string[];
  }>;
  finalVision: {
    phrase: {
      where: string;
      who: string;
    };
    vida: {
      visao: string;
      intencao: string;
      direcao: string;
      acao: string;
    };
  };
  createdAt: string;
}
