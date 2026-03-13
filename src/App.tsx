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
import { Quiz, UserResult, UserProfile, Category } from './types';
import { motion } from 'framer-motion';
import { Crown, Loader2, User as UserIcon, ShieldCheck } from 'lucide-react';
import { handleFirestoreError, OperationType } from './lib/firestore';

// Components
import { Button } from './components/ui/Button';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { LibraryView } from './components/quiz/LibraryView';
import { QuizPlayer } from './components/quiz/QuizPlayer';
import { HistoryView } from './components/quiz/HistoryView';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<'library' | 'admin' | 'quiz' | 'history'>('library');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [history, setHistory] = useState<UserResult[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
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
          email: role === 'admin' ? 'admin@lux.com' : 'user@lux.com',
          role,
          displayName: role === 'admin' ? 'Administrador Lux' : 'Explorador Lux'
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
            <h1 className="text-5xl font-serif mb-4 gold-text">The Ego Reset</h1>
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
            setView('library');
            setActiveQuiz(null);
          }} 
        />

        <main className="max-w-7xl mx-auto px-6">
          {activeQuiz ? (
            <QuizPlayer 
              quiz={activeQuiz} 
              userId={user.uid}
              onComplete={() => {
                setActiveQuiz(null);
                setView('history');
              }}
              onBack={() => setActiveQuiz(null)}
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
                  quizzes={quizzes}
                  onBack={() => setView('library')}
                />
              )}
            </>
          )}
        </main>

        {!activeQuiz && (
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
