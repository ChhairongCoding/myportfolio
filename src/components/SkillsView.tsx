import { motion } from 'motion/react';
import { Award, CheckCircle, Code, Figma, Palette, Sparkles } from 'lucide-react';
import { SOFTWARE_TOOLS, SKILL_CATEGORIES, DEVELOPER_INFO } from '../data';

export default function SkillsView() {
  // Let's create visual tags for software tools that look like professional app icons!
  // Sourcing clean visual frames to mimic the icons shown in Card 2.
  const getToolIcon = (name: string) => {
    switch (name) {
      case 'Figma':
        return '✦';
      case 'Framer':
        return '▲';
      case 'Photoshop':
        return 'Ps';
      case 'Illustrator':
        return 'Ai';
      case 'VS Code':
        return '⚡';
      case 'Git':
        return '⎇';
      case 'Spline':
        return '●';
      case 'Blender':
        return '⚙';
      default:
        return '◈';
    }
  };

  const languages = [
    { name: 'Khmer (Native)', level: 100 },
    { name: 'English (Fluent)', level: 95 },
    { name: 'French (Intermediate)', level: 60 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Software Tools Card - matches left side of Card 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-8 glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -left-16 -top-16 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="space-y-1.5">
            <h3 className="text-xl font-serif font-light text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-white/60" /> Software & Creative Tools
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Tactile proficiency in industry-standard software and development suites.
            </p>
          </div>

          {/* Grid resembling the app launcher icons in Reference Card 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SOFTWARE_TOOLS.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 relative group"
              >
                {/* Visual software icon bubble */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-md relative overflow-hidden transition-transform group-hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span className="relative z-10 font-sans tracking-wide text-white/90">
                    {getToolIcon(tool.name)}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white"
                  />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-200">{tool.name}</p>
                  <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">{tool.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages completion bars - matches languages progress indicators in Reference Card 2 */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase font-mono">Languages</h4>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-300 font-serif italic font-light">{lang.name}</span>
                    <span className="text-neutral-500 font-mono">{lang.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-neutral-400 to-white rounded-full shadow-lg shadow-white/5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skill Categories & Credentials Bento Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="lg:col-span-4 flex flex-col gap-6"
      >
        {/* Core Capabilities Box */}
        <div className="glass-panel rounded-3xl p-6 flex-1 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <Code className="w-4.5 h-4.5 text-white/60" /> Core Capabilities
            </h3>
            
            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <p className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase font-mono">{cat.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="text-xs font-medium bg-white/5 text-neutral-300 px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials / Certificates summary Box */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-white/60" /> Credentials
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">B.F.A. Interactive Design</p>
                <p className="text-[9px] text-white/50 font-mono uppercase tracking-[0.2em]">Savannah College of Art and Design</p>
                <p className="text-[11px] text-neutral-500">Graduated Magna Cum Laude with Outstanding Award</p>
              </div>
              <div className="h-px bg-white/5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Google UX Design Certificate</p>
                <p className="text-[9px] text-white/50 font-mono uppercase tracking-[0.2em]">Google Career Certificates</p>
                <p className="text-[11px] text-neutral-500">Professional training in full-lifecycle mobile & web product design</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
