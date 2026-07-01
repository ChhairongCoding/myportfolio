import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, Clock, AlertTriangle } from 'lucide-react';

import Navigation from './components/Navigation';
import HomeView from './components/HomeView';

// Dynamic lazy imports for views not displayed on first paint
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const ProjectsView = lazy(() => import('./components/ProjectsView'));
const SkillsView = lazy(() => import('./components/SkillsView'));
const ExperienceView = lazy(() => import('./components/ExperienceView'));
const AiTwinChat = lazy(() => import('./components/AiTwinChat'));

import { ChatMessage, ContactMessage } from './types';
import { DEVELOPER_INFO } from './data';

// Isolated Clock component to prevent root App component re-renders every 1 second
function LiveClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] bg-white/5 border border-white/5 px-3 py-1.5 rounded-full tracking-wider text-white/60">
      <Clock className="w-3.5 h-3.5 text-white/40" />
      Atlanta: {time || '10:57 AM'}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Submit Contact Form Message & Get Instant AI Twin Reply
  const handleContactSubmit = async (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): Promise<string | null> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `CONTACT FORM INQUIRY SUBMITTED!
Sender Name: ${msg.name}
Sender Email: ${msg.email}
Subject: ${msg.subject}
Message Body: ${msg.message}

Please write a brief, friendly reply thanking them, mentioning you (Rong's AI Twin) will notify Rong, and stating we will be in touch shortly. Keep it under 80 words.`,
        }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      return data.reply;
    } catch (e) {
      console.error('Failed to get contact AI reply:', e);
      return null;
    }
  };

  // Submit Standalone Chat Message to AI Twin
  const handleSendChatMessage = async (text: string): Promise<string> => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(-10), // Pass recent context to maintain chatbot flow
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, aiMsg]);
      return data.reply;

    } catch (error) {
      console.error('Failed to connect to AI Twin:', error);
      // Fallback response inside the client if server fails or is unreachable
      const fallbackReply = "I'm having a brief connection interruption. Feel free to contact Rong directly at chhinchhairong18@gmail.com and we can set up a personal consultation!";
      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      throw error;
    }
  };

  // Switch View Helper
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onDownloadResume={() => setIsResumeOpen(true)}
            onNavigateToContact={() => setActiveTab('contact')}
            onNavigateToChat={() => setActiveTab('chat')}
          />
        );
      case 'skills':
        return <SkillsView />;
      case 'projects':
        return <ProjectsView />;
      case 'experience':
        return <ExperienceView />;
      case 'chat':
        return (
          <AiTwinChat
            chatHistory={chatHistory}
            onSendMessage={handleSendChatMessage}
          />
        );
      case 'contact':
        return <ContactForm onSendMessage={handleContactSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative overflow-hidden selection:bg-white selection:text-black">

      {/* 1. Cinematic Ambient Lighting background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft white glow top right */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_70%)] ambient-glow-1" />
        {/* Delicate white glow bottom left */}
        <div className="absolute bottom-[-15%] left-[-15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_70%)] ambient-glow-2" />
      </div>

      {/* 2. Top Navigation Brand Header */}
      <header className="relative z-10 w-full border-b border-white/5 bg-neutral-950/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-serif italic text-white shadow-lg bg-white/5 font-medium">
              R
            </div>
            <div>
              <p className="text-base font-serif tracking-widest italic text-neutral-100">Rong Chhin</p>
              <p className="text-[9px] font-bold font-mono text-neutral-500 uppercase tracking-[0.2em]">Creative Code Lab</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400">
            {/* Live timezone clock */}
            <LiveClock />
            {/* <button
              id="header-chat-twin-btn"
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-1.5 text-white/80 hover:text-black bg-white/5 hover:bg-white border border-white/10 rounded-full px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300"
            > */}
            {/* <Bot className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ask AI Twin</span> */}
            {/* </button> */}
          </div>
        </div>
      </header >

      {/* 3. Main Bento grid display window */}
      < main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16 pb-36" >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
          >
            <Suspense fallback={
              <div className="h-64 flex flex-col items-center justify-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-white/5 border-t-white/40 animate-spin" />
                <span className="text-[9px] font-bold font-mono tracking-[0.2em] text-neutral-600 uppercase">Loading hub...</span>
              </div>
            }>
              {renderActiveView()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main >

      {/* 4. Sliding bottom pill hover Navigation */}
      < Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 5. Resume/CV overlay print Modal */}
      <Suspense fallback={null}>
        < ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>
    </div >
  );
}
