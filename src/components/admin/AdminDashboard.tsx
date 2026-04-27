import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  FolderPlus, 
  Plus, 
  Loader2, 
  Crown, 
  Wand2, 
  Users, 
  FileText, 
  Settings, 
  Trash2, 
  Shield, 
  User as UserIcon,
  Search,
  LayoutGrid
} from 'lucide-react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Category, Quiz, UserProfile } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore';
import { generateQuizFromPrompt } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface AdminDashboardProps {
  categories: Category[];
  userId: string;
  onBack: () => void;
}

type AdminTab = 'create' | 'protocols' | 'users' | 'settings';

export function AdminDashboard({ categories, userId, onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('create');
  
  // Creation State
  const [generatorPrompt, setGeneratorPrompt] = useState(() => 
    localStorage.getItem('unidade_generator_prompt') || 
    'Crie um protocolo de auto-investigação profundo que explore as camadas do ego e a ferida primária.'
  );
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  // Protocols State
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [searchQuiz, setSearchQuiz] = useState('');
  
  // Users State
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  
  // Settings State
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    localStorage.setItem('unidade_generator_prompt', generatorPrompt);
  }, [generatorPrompt]);

  // Fetch Quizzes for Management
  useEffect(() => {
    if (activeTab === 'protocols') {
      setLoadingQuizzes(true);
      const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setQuizzes(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Quiz)));
        setLoadingQuizzes(false);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'quizzes');
        setLoadingQuizzes(false);
      });
      return unsubscribe;
    }
  }, [activeTab]);

  // Fetch Users for Management
  useEffect(() => {
    if (activeTab === 'users') {
      setLoadingUsers(true);
      const q = query(collection(db, 'users'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUsers(snapshot.docs.map(d => ({ uid: d.id, ...d.data() } as UserProfile)));
        setLoadingUsers(false);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'users');
        setLoadingUsers(false);
      });
      return unsubscribe;
    }
  }, [activeTab]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCreatingCategory(true);
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategoryName,
        createdAt: new Date().toISOString()
      });
      setNewCategoryName('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'categories');
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setError('');
    try {
      const quizData = await generateQuizFromPrompt(generatorPrompt, topic);
      await addDoc(collection(db, 'quizzes'), {
        ...quizData,
        categoryId: selectedCategoryId || null,
        createdAt: new Date().toISOString(),
        createdBy: userId
      });
      setActiveTab('protocols');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'quizzes');
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este protocolo?')) return;
    try {
      await deleteDoc(doc(db, 'quizzes', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `quizzes/${id}`);
    }
  };

  const handleUpdateUserRole = async (uid: string, newRole: 'admin' | 'user') => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const handleCleanup = async () => {
    setCleaning(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'quizzes'));
      const updates = querySnapshot.docs.map(async (quizDoc) => {
        const data = quizDoc.data() as Quiz;
        let needsUpdate = false;
        const newData: any = {};

        if (data.title && /lux/i.test(data.title)) {
          newData.title = data.title.replace(/lux/gi, '').replace(/\s+/g, ' ').trim();
          needsUpdate = true;
        }

        if (data.sections) {
          const newSections = data.sections.map(section => {
            if (section.title && /bloco/i.test(section.title)) {
              needsUpdate = true;
              return {
                ...section,
                title: section.title.replace(/bloco\s*/gi, '').trim()
              };
            }
            return section;
          });
          if (needsUpdate) newData.sections = newSections;
        }

        if (needsUpdate) {
          await updateDoc(doc(db, 'quizzes', quizDoc.id), newData);
        }
      });

      await Promise.all(updates);
      alert('Limpeza concluída com sucesso!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'quizzes');
    } finally {
      setCleaning(false);
    }
  };

  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchQuiz.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="py-8 max-w-4xl mx-auto pb-32"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-4xl font-serif">Painel Master</h2>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <TabButton 
            active={activeTab === 'create'} 
            onClick={() => setActiveTab('create')} 
            icon={<Plus className="w-4 h-4" />}
            label="Criar"
          />
          <TabButton 
            active={activeTab === 'protocols'} 
            onClick={() => setActiveTab('protocols')} 
            icon={<FileText className="w-4 h-4" />}
            label="Protocolos"
          />
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
            icon={<Users className="w-4 h-4" />}
            label="Usuários"
          />
          <TabButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<Settings className="w-4 h-4" />}
            label="Config"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'create' && (
          <motion.div 
            key="create"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="space-y-6 border-gold/10">
                <div className="flex items-center gap-3 mb-2">
                  <FolderPlus className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-serif">Categorias</h3>
                </div>
                <div className="flex gap-4">
                  <input 
                    type="text"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                    placeholder="Nova categoria..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button onClick={handleCreateCategory} disabled={creatingCategory || !newCategoryName.trim()}>
                    {creatingCategory ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <span key={cat.id} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60">
                      {cat.name}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="border-gold/20 bg-gold/5">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-serif">Limpeza Rápida</h3>
                </div>
                <p className="text-sm text-white/40 mb-6">Padronize os títulos e seções de todos os protocolos existentes com um clique.</p>
                <Button 
                  variant="outline" 
                  onClick={handleCleanup} 
                  disabled={cleaning}
                  className="w-full border-gold/20 text-gold hover:bg-gold hover:text-black"
                >
                  {cleaning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Executar Limpeza"}
                </Button>
              </Card>
            </div>

            <Card className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-5 h-5 text-gold" />
                <h3 className="text-xl font-serif">Gerador de Protocolos IA</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Categoria Alvo</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 transition-all appearance-none"
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                    >
                      <option value="" className="bg-luxury-black text-white">Nenhuma Categoria</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-luxury-black text-white">{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Tema de Investigação</label>
                    <input 
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                      placeholder="Ex: Medo da Rejeição, Escassez..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Prompt Mestre (Instruções IA)</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 min-h-[160px] transition-all text-sm leading-relaxed"
                    placeholder="Defina como a IA deve se comportar..."
                    value={generatorPrompt}
                    onChange={(e) => setGeneratorPrompt(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button 
                className="w-full py-6 text-lg" 
                onClick={handleGenerate} 
                disabled={generating || !topic.trim()}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Canalizando Conhecimento...
                  </>
                ) : (
                  <>
                    <Crown className="w-6 h-6" />
                    Gerar Protocolo Exclusivo
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        )}

        {activeTab === 'protocols' && (
          <motion.div 
            key="protocols"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="text"
                placeholder="Pesquisar protocolos..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-gold/50 transition-all"
                value={searchQuiz}
                onChange={(e) => setSearchQuiz(e.target.value)}
              />
            </div>

            {loadingQuizzes ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredQuizzes.map(quiz => (
                  <Card key={quiz.id} className="p-6 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-serif">{quiz.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] uppercase tracking-widest text-white/40">
                            {categories.find(c => c.id === quiz.categoryId)?.name || 'Sem Categoria'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[10px] uppercase tracking-widest text-white/40">
                            {quiz.sections?.length || 0} Seções
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="p-3 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </Card>
                ))}
                {filteredQuizzes.length === 0 && (
                  <div className="text-center py-20 text-white/20">Nenhum protocolo encontrado.</div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="text"
                placeholder="Pesquisar por nome ou email..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-gold/50 transition-all"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredUsers.map(user => (
                  <Card key={user.uid} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <UserIcon className="w-6 h-6 text-white/40" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">{user.displayName || 'Usuário sem nome'}</h4>
                        <p className="text-sm text-white/40">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleUpdateUserRole(user.uid, user.role === 'admin' ? 'user' : 'admin')}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-xs font-bold uppercase tracking-widest",
                          user.role === 'admin' 
                            ? "bg-gold/10 border-gold text-gold" 
                            : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"
                        )}
                      >
                        <Shield className="w-4 h-4" />
                        {user.role === 'admin' ? 'Master' : 'Membro'}
                      </button>
                    </div>
                  </Card>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-20 text-white/20">Nenhum usuário encontrado.</div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Protocolos" value={quizzes.length} icon={<FileText />} />
              <StatCard label="Total Usuários" value={users.length} icon={<Users />} />
              <StatCard label="Categorias" value={categories.length} icon={<LayoutGrid />} />
            </div>

            <Card className="space-y-6">
              <h3 className="text-xl font-serif">Preferências da Plataforma</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-medium">Modo de Manutenção</div>
                    <div className="text-xs text-white/40">Impede o acesso de usuários comuns.</div>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-white/10 relative cursor-not-allowed opacity-50">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white/20" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-medium">Geração Automática</div>
                    <div className="text-xs text-white/40">Permite que a IA gere conteúdos sem aprovação.</div>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-gold/20 relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-gold" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-widest",
        active ? "bg-gold text-black shadow-lg" : "text-white/40 hover:text-white"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <Card className="p-6 border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/5 text-gold">
          {icon}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{label}</div>
          <div className="text-3xl font-serif mt-1">{value}</div>
        </div>
      </div>
    </Card>
  );
}
