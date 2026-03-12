import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';
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
import { auth, db } from './firebase';
import { Quiz, UserResult, UserProfile, Category } from './types';
import { motion } from 'framer-motion';
import { Crown, Loader2 } from 'lucide-react';
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
  const [user, setUser] = useState<User | null>(null);
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

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists()) {
            setProfile({ uid: u.uid, ...userDoc.data() } as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: u.uid,
              email: u.email || '',
              role: u.email === 'romaconcurso@gmail.com' ? 'admin' : 'user',
              displayName: u.displayName || ''
            };
            await setDoc(doc(db, 'users', u.uid), {
              email: newProfile.email,
              role: newProfile.role,
              displayName: newProfile.displayName
            });
            setProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${u.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = () => signOut(auth);

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
            className="max-w-md"
          >
            <Crown className="w-16 h-16 text-gold mx-auto mb-8" />
            <h1 className="text-5xl font-serif mb-4 gold-text">The Ego Reset</h1>
            <p className="text-white/60 mb-12 text-lg">
              A experiência definitiva em auto-investigação e sofisticação. 
              Entre para acessar sua biblioteca exclusiva.
            </p>
            <Button onClick={handleLogin} className="w-full text-lg py-4">
              Entrar com Google
            </Button>
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
