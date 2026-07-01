export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'design' | 'ai';
  categoryLabel: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  achievements: string[];
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'work' | 'education';
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface SoftwareTool {
  name: string;
  category: 'design' | 'development' | 'other';
  icon: string; // lucide icon name or visual shorthand
  color: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
