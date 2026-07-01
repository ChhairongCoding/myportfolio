import { motion } from 'motion/react';
import { Home, User, Briefcase, Code, FolderGit2, MessageSquare, Bot } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    // { id: 'chat', label: 'AI Twin', icon: Bot },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl">
      <div className="glass-panel rounded-full px-3 py-2 flex items-center justify-between gap-1 shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-2.5 px-2 rounded-full flex flex-col md:flex-row items-center justify-center gap-1.5 text-xs font-medium font-sans tracking-wide transition-colors duration-300 ${isActive ? 'text-black font-bold' : 'text-neutral-400 hover:text-neutral-100'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="hidden md:inline relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
