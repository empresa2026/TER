import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  doc, 
  getDoc, 
  setDoc,
  getDocFromServer
} from 'firebase/firestore';
import { db } from './firebase';
import { Quiz, UserResult, UserProfile, Category, Matrix, MatrixResult, EnjoymentPlanResult, Protocol, ProtocolResult } from './types';
import { motion } from 'framer-motion';
import { Crown, Loader2, User as UserIcon, ShieldCheck, LayoutGrid, ShieldAlert } from 'lucide-react';
import { handleFirestoreError, OperationType } from './lib/firestore';

// Components
import { Button } from './components/ui/Button';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { LibraryView } from './components/quiz/LibraryView';
import { QuizPlayer } from './components/quiz/QuizPlayer';
import { MatrixLibraryView } from './components/quiz/MatrixLibraryView';
import { MatrixPlayer } from './components/quiz/MatrixPlayer';
import { HistoryView } from './components/quiz/HistoryView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EnjoymentPlanFlow } from './components/plan/EnjoymentPlanFlow';
import { ProtocolLibraryView } from './components/quiz/ProtocolLibraryView';
import { ProtocolPlayer } from './components/quiz/ProtocolPlayer';

export default function App() {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<'library' | 'admin' | 'quiz' | 'history' | 'matrices' | 'plan' | 'protocols'>('plan');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [history, setHistory] = useState<UserResult[]>([]);
  const [matrixHistory, setMatrixHistory] = useState<MatrixResult[]>([]);
  const [protocolHistory, setProtocolHistory] = useState<ProtocolResult[]>([]);
  const [planHistory, setPlanHistory] = useState<EnjoymentPlanResult[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeQuizResult, setActiveQuizResult] = useState<UserResult | null>(null);
  const [activeMatrix, setActiveMatrix] = useState<Matrix | null>(null);
  const [activeMatrixResult, setActiveMatrixResult] = useState<MatrixResult | null>(null);
  const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    // Check for saved mock session
    const savedRole = localStorage.getItem('mock_user_role');
    if (savedRole) {
      handleMockLogin(savedRole as 'admin' | 'user');
    } else {
      setLoading(false);
    }
  }, []);

  const handleMockLogin = async (role: 'admin' | 'user') => {
    setLoading(true);
    const uid = role === 'admin' ? 'mock-admin-id' : 'mock-user-id';
    const mockUser = { uid };
    
    setUser(mockUser);
    localStorage.setItem('mock_user_role', role);

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setProfile({ uid, ...userDoc.data() } as UserProfile);
      } else {
        const newProfile: UserProfile = {
          uid,
          email: role === 'admin' ? 'admin@escoladaunidade.com' : 'user@escoladaunidade.com',
          role,
          displayName: role === 'admin' ? 'Mestre da Unidade' : 'Explorador da Unidade'
        };
        await setDoc(doc(db, 'users', uid), {
          email: newProfile.email,
          role: newProfile.role,
          displayName: newProfile.displayName
        });
        setProfile(newProfile);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mock_user_role');
  };

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Category)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'categories');
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuizzes(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Quiz)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'quizzes');
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'user_results'), where('userId', '==', user.uid), orderBy('completedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as UserResult)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'user_results');
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'matrix_results'), where('userId', '==', user.uid), orderBy('completedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMatrixHistory(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as MatrixResult)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'matrix_results');
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'enjoymentPlans'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPlanHistory(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as EnjoymentPlanResult)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'enjoymentPlans');
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'protocolResults'), where('userId', '==', user.uid), orderBy('completedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProtocolHistory(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ProtocolResult)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'protocolResults');
    });
    return unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-black">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Crown className="w-16 h-16 text-gold mx-auto mb-8" />
            <h1 className="text-5xl font-serif mb-4 gold-text">Escola da Unidade</h1>
            <p className="text-white/60 mb-12 text-lg">
              A experiência definitiva em auto-investigação e sofisticação. 
              Escolha seu modo de acesso para continuar.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => handleMockLogin('admin')} 
                className="w-full text-lg py-6 flex items-center justify-center gap-3"
              >
                <ShieldCheck className="w-6 h-6" />
                Entrar como Administrador
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleMockLogin('user')} 
                className="w-full text-lg py-6 flex items-center justify-center gap-3 border-white/10 hover:bg-white/5"
              >
                <UserIcon className="w-6 h-6" />
                Entrar como Usuário
              </Button>
            </div>
          </motion.div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-luxury-black text-white pb-20">
        <Header 
          profile={profile} 
          onLogout={handleLogout} 
          onHome={() => {
            setView('plan');
            setActiveQuiz(null);
            setActiveQuizResult(null);
            setActiveMatrix(null);
            setActiveMatrixResult(null);
            setActiveProtocol(null);
          }} 
        />

        <main className="max-w-7xl mx-auto px-6">
          {activeQuiz ? (
            <QuizPlayer 
              quiz={activeQuiz} 
              userId={user.uid}
              viewResult={activeQuizResult || undefined}
              onComplete={() => {
                setActiveQuiz(null);
                setActiveQuizResult(null);
                setView('history');
              }}
              onBack={() => {
                setActiveQuiz(null);
                setActiveQuizResult(null);
              }}
            />
          ) : activeMatrix ? (
            <MatrixPlayer 
              matrix={activeMatrix}
              userId={user.uid}
              viewResult={activeMatrixResult || undefined}
              onComplete={() => {
                setActiveMatrix(null);
                setActiveMatrixResult(null);
                setView('history');
              }}
              onBack={() => {
                setActiveMatrix(null);
                setActiveMatrixResult(null);
              }}
            />
          ) : (
            <>
              {view === 'library' && (
                <LibraryView 
                  quizzes={quizzes} 
                  categories={categories}
                  onSelect={(q) => setActiveQuiz(q)}
                  history={history}
                  isAdmin={profile?.role === 'admin'}
                />
              )}
              {view === 'matrices' && (
                <MatrixLibraryView onSelect={(m) => setActiveMatrix(m)} />
              )}
              {view === 'admin' && profile?.role === 'admin' && (
                <AdminDashboard 
                  categories={categories}
                  userId={user.uid}
                  onBack={() => setView('library')}
                />
              )}
              {view === 'history' && (
                <HistoryView 
                  history={history}
                  matrixHistory={matrixHistory}
                  protocolHistory={protocolHistory}
                  planHistory={planHistory}
                  quizzes={quizzes}
                  onBack={() => setView('library')}
                  onSelectQuiz={(q, result) => {
                    setActiveQuiz(q);
                    if (result) setActiveQuizResult(result);
                  }}
                  onViewMatrixResult={(m, result) => {
                    setActiveMatrix(m);
                    setActiveMatrixResult(result);
                  }}
                />
              )}
              {view === 'plan' && user && (
                <EnjoymentPlanFlow 
                  userId={user.uid}
                  onBack={() => setView('library')}
                  onComplete={() => setView('library')}
                />
              )}
              {view === 'protocols' && !activeProtocol && (
                <ProtocolLibraryView 
                  onSelect={(p) => setActiveProtocol(p)}
                />
              )}
              {view === 'protocols' && activeProtocol && user && (
                <ProtocolPlayer 
                  userId={user.uid}
                  protocol={activeProtocol}
                  onBack={() => setActiveProtocol(null)}
                  onComplete={() => {
                    setActiveProtocol(null);
                    setView('history');
                  }}
                />
              )}
            </>
          )}
        </main>

        {!activeQuiz && !activeMatrix && (
          <Navbar 
            view={view} 
            setView={setView} 
            isAdmin={profile?.role === 'admin'} 
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
