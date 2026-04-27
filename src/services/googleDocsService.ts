
declare const google: any;

const CLIENT_ID = (import.meta as any).env.VITE_CLIENT_ID;
const SCOPES = [
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive.file'
].join(' ');

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export const getAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check cache
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return resolve(cachedToken);
    }

    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response: any) => {
          if (response.access_token) {
            cachedToken = response.access_token;
            tokenExpiry = Date.now() + (response.expires_in * 1000);
            resolve(response.access_token);
          } else {
            reject(new Error('Falha ao obter token de acesso: ' + (response.error || 'Erro desconhecido')));
          }
        },
      });
      client.requestAccessToken();
    } catch (error) {
      reject(error);
    }
  });
};

export async function createGoogleDoc(title: string, content: string) {
  const token = await getAccessToken();

  // 1. Create a blank document
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(`Erro ao criar documento: ${err.error?.message || 'Erro desconhecido'}`);
  }

  const doc = await createRes.json();
  const documentId = doc.documentId;

  // 2. Insert content
  const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: content
          }
        }
      ]
    })
  });

  if (!updateRes.ok) {
    const err = await updateRes.json();
    throw new Error(`Erro ao inserir conteúdo: ${err.error?.message || 'Erro desconhecido'}`);
  }

  return `https://docs.google.com/document/d/${documentId}/edit`;
}
