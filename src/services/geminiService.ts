import { GoogleGenAI, Type } from "@google/genai";
import { Quiz } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const PROTOCOL_SYSTEM_INSTRUCTION = `
Você é um especialista em psicologia profunda e auto-investigação terapêutica.
Sua tarefa é gerar um "Protocolo de Auto-Investigação" baseado em um tema/termo fornecido.

ESTRUTURA FIXA DO PROTOCOLO:
1. ESTRUTURA IDENTIFICADA: Mapeie a Ferida Primária, Domínio de Dor, Máscara do Ego e Modo Operante relacionados ao tema.
2. ESTABELECIMENTO DE EIXO: Um texto de ancoragem profundo e uma instrução de leitura (ex: "Leia em voz alta, sentindo o peso de cada palavra").
3. SEÇÕES DE INVESTIGAÇÃO: Divida a jornada em seções (ex: 1. A ORIGEM, 2. O PADRÃO, O SALTO). Cada seção deve ter perguntas introspectivas com 4 opções de resposta que representam diferentes níveis de consciência ou padrões de comportamento. NÃO use a palavra "BLOCO" nos títulos.
4. ORAÇÃO FINAL: Um texto de renúncia e entrega para encerrar o protocolo.

TOM E ESTILO:
- Linguagem sofisticada, poética e direta.
- Foco em revelação e transformação.
- Evite clichês; busque a raiz psicológica do tema.
`;

export async function generateQuizFromPrompt(instructions: string, topic: string): Promise<Omit<Quiz, 'id' | 'createdAt' | 'createdBy'>> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Tema do Protocolo: ${topic}\n\nInstruções Adicionais: ${instructions}`,
    config: {
      systemInstruction: PROTOCOL_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título impactante do protocolo" },
          identifiedStructure: {
            type: Type.OBJECT,
            properties: {
              ferida: { type: Type.STRING },
              dominio: { type: Type.STRING },
              mascara: { type: Type.STRING },
              modo: { type: Type.STRING }
            },
            required: ["ferida", "dominio", "mascara", "modo"]
          },
          axisEstablishment: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              instruction: { type: Type.STRING }
            },
            required: ["text", "instruction"]
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Ex: 1. A ORIGEM" },
                intro: { type: Type.STRING, description: "Texto introdutório da seção" },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "4 opções de resposta"
                      }
                    },
                    required: ["question", "options"]
                  }
                }
              },
              required: ["title", "questions"]
            }
          },
          finalPrayer: { type: Type.STRING, description: "Oração Final de Renúncia" }
        },
        required: ["title", "identifiedStructure", "axisEstablishment", "sections", "finalPrayer"]
      }
    }
  });

  return JSON.parse(response.text);
}
