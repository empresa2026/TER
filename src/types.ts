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
