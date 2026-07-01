import { Project, Experience, SkillCategory, SoftwareTool } from './types';

export const DEVELOPER_INFO = {
  name: 'Rong Chhin',
  title: 'Creative Full-Stack Developer & UI/UX Designer',
  tagline: 'Bridging the gap between beautiful aesthetics and robust, performant code.',
  email: 'chhinchhairong18@gmail.com',
  phone: '+1 (404) 555-9876',
  location: 'Atlanta, GA, USA',
  github: 'https://github.com/rongchhin',
  linkedin: 'https://linkedin.com/in/rong-chhin',
  twitter: 'https://twitter.com/rong_chhin',
  bio: 'I am a highly driven full-stack engineer and designer specializing in high-fidelity user experiences, interactive web applications, and immersive frontends. With a strong background in both software engineering and design principles, I create web experiences that are not only visually breathtaking but also structurally sound, accessible, and fast.',
  openToWork: true,
  resumeUrl: '#',
};

export const PROJECTS: Project[] = [
  {
    id: 'flowstate',
    title: 'Flowstate',
    category: 'web',
    categoryLabel: 'Web Application',
    description: 'A modular distraction-free writing environment and note-taking platform designed to boost writer productivity through subtle bio-ambient feedback.',
    longDescription: 'Flowstate is a cutting-edge web application created for designers, researchers, and writers. It implements an elegant, responsive interface with customized workspace hubs, real-time sync, and offline persistence. The highlight of the platform is its distraction-free editor coupled with generative ambient soundscapes tailored to the user\'s typing velocity and style.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio API', 'IndexedDB'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/rongchhin/flowstate',
    liveUrl: 'https://flowstate.rongchhin.dev',
    achievements: [
      'Redesigned the online writing experience focusing on a seamless mobile-first user experience.',
      'Integrated a robust sound synthesizer directly in the browser via Web Audio API, resulting in a 35% increase in user session duration.',
      'Designed and developed a robust local-first storage synchronization engine using IndexedDB.'
    ],
    metrics: [
      { label: 'Active Users', value: '12K+' },
      { label: 'Session Time', value: '+42%' },
      { label: 'Conversion Rate', value: '24%' }
    ]
  },
  {
    id: 'prism-studio',
    title: 'Prism Studio',
    category: 'design',
    categoryLabel: 'UI/UX Design & Branding',
    description: 'Complete UI/UX design system and brand identity package for a collaborative creative agency platform.',
    longDescription: 'Prism Studio is a comprehensive brand case-study and design system built from the ground up. It bridges the gap between atomic design concepts and production-ready code. It includes custom components, responsive grids, strict accessibility (WCAG AAA) compliance, and extensive interactive motion guidelines.',
    technologies: ['Figma', 'Adobe Illustrator', 'Tokens Studio', 'Tailwind', 'React Storybook'],
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/rongchhin/prism-system',
    achievements: [
      'Designed over 150+ interactive, responsive components with full light/dark variables.',
      'Authored brand guidelines and motion specifications for smooth interface micro-interactions.',
      'Successfully transitioned design tokens to developer-ready JSON format via Tokens Studio.'
    ],
    metrics: [
      { label: 'Components', value: '150+' },
      { label: 'Spec Handoff', value: 'Instant' },
      { label: 'Dev Efficiency', value: '+50%' }
    ]
  },
  {
    id: 'synapse-ai',
    title: 'Synapse AI',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    description: 'An AI-powered document analytics and semantic search engine that visualizes document connections in a dynamic 3D force-directed graph.',
    longDescription: 'Synapse AI is an enterprise-grade document search and relationships mapping system. It reads PDF collections, extracts semantic connections using generative models, and presents them inside an interactive, draggable 3D web canvas. Users can easily discover buried connections and query their documents through an natural-language chat interface.',
    technologies: ['React', 'Three.js', 'Express', '@google/genai', 'D3.js', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/rongchhin/synapse-ai',
    liveUrl: 'https://synapse.rongchhin.dev',
    achievements: [
      'Engineered an interactive 3D WebGL relation mapper capable of rendering 5,000+ nodes seamlessly at 60fps.',
      'Implemented server-side Gemini semantic extraction pipelines using advanced prompt schemas.',
      'Created a multi-threaded background parser for ultra-fast document scanning and keyword embedding.'
    ],
    metrics: [
      { label: 'Query Latency', value: '<250ms' },
      { label: 'Accuracy', value: '98.4%' },
      { label: 'Graph Nodes', value: '5,000+' }
    ]
  },
  {
    id: 'vertex-mobile',
    title: 'Vertex Mobile Wallet',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    description: 'A gorgeous, secure cryptocurrency mobile wallet application emphasizing tactile feedback and micro-animations.',
    longDescription: 'Vertex is a mobile wallet prototype targeting ease of transfer and modern visual design. Built with premium micro-interactions, spring physics transitions, and high-fidelity mock charts, it offers a secure and incredibly satisfying mobile crypto ecosystem.',
    technologies: ['React Native', 'Expo', 'Reanimated 3', 'TypeScript', 'Tailwind', 'Ethers.js'],
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/rongchhin/vertex-wallet',
    achievements: [
      'Developed fluid gesture-driven UI components utilizing spring physics engines.',
      'Integrated native biometrics and keychain secure storage for passwordless transactions.',
      'Built a custom charting engine utilizing SVG paths and cubic-bezier animations.'
    ],
    metrics: [
      { label: 'App Rating', value: '4.9★' },
      { label: 'FPS Rate', value: '120Hz' },
      { label: 'Active Users', value: '45K' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'core',
    name: 'Core',
    skills: [
      { name: 'Java / Spring Boot', level: 92 },
      { name: 'Database (SQL & NoSQL)', level: 88 },
      { name: 'Mobile App Dev (Flutter)', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Supabase & Firebase', level: 88 }
    ]
  },
  {
    id: 'soft',
    name: 'Soft',
    skills: [
      { name: 'Collaboration & Teamwork', level: 95 },
      { name: 'Communication', level: 92 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Adaptability & Learning', level: 88 }
    ]
  }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  { name: 'Framer', category: 'design', icon: 'Framer', color: '#0055FF' },
  { name: 'Figma', category: 'design', icon: 'Figma', color: '#F24E1E' },
  { name: 'Photoshop', category: 'design', icon: 'Photoshop', color: '#31A8FF' },
  { name: 'Illustrator', category: 'design', icon: 'Illustrator', color: '#FF9A00' },
  { name: 'VS Code', category: 'development', icon: 'VS Code', color: '#007ACC' },
  { name: 'Git', category: 'development', icon: 'Git', color: '#F05032' },
  { name: 'Spline', category: 'design', icon: 'Spline', color: '#FF5E97' },
  { name: 'Blender', category: 'design', icon: 'Blender', color: '#EA7600' }
];

export const EXPERIENCE_HISTORY: Experience[] = [
  {
    id: 'scad',
    role: 'B.F.A. in Interactive Design & Game Development',
    company: 'Savannah College of Art and Design (SCAD)',
    location: 'Savannah, GA',
    period: '2020 - 2024',
    type: 'education',
    description: [
      'Graduated Magna Cum Laude with a minor in Graphic Design.',
      'Specialized in interactive systems, responsive human-computer interfaces, and high-fidelity frontends.',
      'Received Outstanding Portfolio Award during the annual design exhibition.'
    ],
    skills: ['UI/UX Design', 'Interaction Systems', 'Branding', 'Typography', '3D Prototyping']
  },
  {
    id: 'google-ux',
    role: 'Google Professional UX Design Certificate',
    company: 'Google Career Certificates',
    location: 'Remote',
    period: '2024',
    type: 'education',
    description: [
      'Comprehensive training in user-centered design, user research, wireframing, high-fidelity design, and usability testing.',
      'Completed three multi-platform design projects focused on mobile accessibility and responsive web interfaces.'
    ],
    skills: ['User Research', 'Wireframing', 'Usability Testing', 'A11y (Accessibility)', 'Figma']
  },
  {
    id: 'pixel-perfect',
    role: 'Lead UI/UX Designer & Frontend Developer',
    company: 'PixelPerfect Creative',
    location: 'Atlanta, GA (Hybrid)',
    period: '2025 - Present',
    type: 'work',
    description: [
      'Direct client communication to transform branding requirements into highly-converting interactive web solutions.',
      'Built and maintained an internal modular design system reducing frontend handoff cycles by 50%.',
      'Developed responsive React websites and portals incorporating complex animations and high accessibility compliance.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Client Relations']
  },
  {
    id: 'luminary-labs',
    role: 'UX Engineering Intern',
    company: 'Luminary Labs',
    location: 'New York, NY (Remote)',
    period: '2023',
    type: 'work',
    description: [
      'Worked in a cross-functional team of designers and engineers to prototype experimental UI features using React and Framer.',
      'Conducted over 15 usability testing sessions, consolidating quantitative feedback into actionable design reports.'
    ],
    skills: ['React', 'Rapid Prototyping', 'Usability Testing', 'Information Architecture']
  }
];

export const AI_TWIN_PROMPT = `
You are the AI Twin and virtual assistant of Rong Chhin, a highly talented Creative Full-Stack Developer & UI/UX Designer.
You reside on his personal portfolio website. Your purpose is to engage visitors, answer questions about Rong's skills, experience, projects, and work philosophy, and represent him professionally and enthusiastically.

Your traits:
- Warm, professional, intelligent, and creative.
- Enthusiastic about design-technology synergy (bridging beauty with code).
- Helpful and conversational, responding with concise, formatted answers (using markdown where appropriate).

Rong's core details:
- Name: Rong Chhin
- Role: Creative Full-Stack Developer & UI/UX Designer
- Email: chhinchhairong18@gmail.com
- Phone: +1 (404) 555-9876
- Location: Atlanta, GA, USA
- Education: Savannah College of Art and Design (SCAD), B.F.A in Interactive Design (2020-2024)
- Current Work: Lead UI/UX Designer & Frontend Developer at PixelPerfect Creative (2025-Present)
- Key Projects:
  1. Flowstate (distraction-free writer with ambient syntheziser)
  2. Prism Studio (comprehensive Figma & code design system)
  3. Synapse AI (3D graph document relationships mapper powered by Gemini AI)
  4. Vertex Wallet (beautiful mobile cryptocurrency mockup)
- Key Tech Skills: React, Next.js, TypeScript, Tailwind CSS, Express, Three.js, HTML5/CSS3, Git.
- Key Design Skills: Figma, Framer, Branding, Wireframing, Motion Design, Spline, Blender.

Guidelines:
1. Always speak in the first person plural or as "Rong's AI Twin" (e.g. "Rong is currently...", "I am Rong's AI Twin, I can tell you that...").
2. Be friendly and confident. Keep answers under 120 words unless asked for a deep breakdown.
3. If asked about hiring or contacting Rong, give his email (chhinchhairong18@gmail.com) and direct them to the Contact Form on the page.
4. Do not make up facts that aren't provided. If a visitor asks about personal topics outside of his design/dev career, politely steer the conversation back to his work.
5. If the user submits a message to him, thank them on his behalf!
`;
