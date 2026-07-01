import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Linkedin, MapPin, Globe, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { DEVELOPER_INFO, EXPERIENCE_HISTORY, PROJECTS } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const resumeText = `
${DEVELOPER_INFO.name.toUpperCase()}
${DEVELOPER_INFO.title}
Email: ${DEVELOPER_INFO.email} | Phone: ${DEVELOPER_INFO.phone}
Location: ${DEVELOPER_INFO.location}
LinkedIn: ${DEVELOPER_INFO.linkedin} | GitHub: ${DEVELOPER_INFO.github}

SUMMARY
${DEVELOPER_INFO.bio}

PROFESSIONAL EXPERIENCE
${EXPERIENCE_HISTORY.filter(e => e.type === 'work').map(exp => `
- ${exp.role} | ${exp.company}
  Period: ${exp.period} | Location: ${exp.location}
  Achievements:
  ${exp.description.map(d => `* ${d}`).join('\n  ')}
  Skills Used: ${exp.skills.join(', ')}
`).join('\n')}

EDUCATION & CERTIFICATIONS
${EXPERIENCE_HISTORY.filter(e => e.type === 'education').map(edu => `
- ${edu.role} | ${edu.company}
  Period: ${edu.period} | Location: ${edu.location}
  ${edu.description.map(d => `* ${d}`).join('\n  ')}
`).join('\n')}

SELECTED PROJECTS
${PROJECTS.map(p => `
- ${p.title} (${p.categoryLabel})
  Description: ${p.description}
  Key Achievements:
  ${p.achievements.map(a => `* ${a}`).join('\n  ')}
  Technologies: ${p.technologies.join(', ')}
`).join('\n')}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${DEVELOPER_INFO.name.replace(/\s+/g, '_')}_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-[#080808] border border-white/10 rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl z-10 print:h-auto print:border-none print:bg-white print:text-black print:shadow-none"
          >
            {/* Header controls (Hidden in Print) */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 print:hidden">
              <h3 className="text-lg font-serif font-light text-white">Curriculum Vitae</h3>
              <div className="flex items-center gap-2">
                <button
                  id="print-cv-btn"
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs tracking-wider uppercase font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                >
                  <Printer className="w-4 h-4 text-white" />
                  Print CV
                </button>
                <button
                  id="download-cv-text-btn"
                  onClick={handleDownloadText}
                  className="flex items-center gap-2 bg-white hover:bg-white/95 text-black text-xs tracking-wider uppercase font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download Plain Text
                </button>
                <button
                  id="close-cv-btn"
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable CV Document */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 print:overflow-visible print:p-0">
              {/* Document Container */}
              <div className="max-w-3xl mx-auto print:max-w-none text-neutral-300 print:text-neutral-900 font-sans selection:bg-white selection:text-black">
                {/* CV Title Header */}
                <div className="border-b border-white/5 print:border-neutral-300 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-light text-white print:text-neutral-950 mb-2">
                      {DEVELOPER_INFO.name}
                    </h1>
                    <p className="text-neutral-300 print:text-neutral-700 font-medium text-base font-serif italic">
                      {DEVELOPER_INFO.title}
                    </p>
                  </div>
                  {/* Contact details for resume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-sm font-mono text-neutral-400 print:text-neutral-700">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/40 print:text-neutral-900 shrink-0" />
                      {DEVELOPER_INFO.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-white/40 print:text-neutral-900 shrink-0" />
                      linkedin.com/in/rongchhin
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/40 print:text-neutral-900 shrink-0" />
                      {DEVELOPER_INFO.location}
                    </span>
                  </div>
                </div>

                {/* Professional Statement */}
                <div className="mb-10">
                  <h2 className="text-xs font-bold text-white/50 print:text-neutral-600 tracking-[0.2em] uppercase font-mono mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0" /> Professional Summary
                  </h2>
                  <p className="text-neutral-300 print:text-neutral-800 leading-relaxed font-light">
                    {DEVELOPER_INFO.bio}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="mb-10">
                  <h2 className="text-xs font-bold text-white/50 print:text-neutral-600 tracking-[0.2em] uppercase font-mono mb-6 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 shrink-0" /> Experience History
                  </h2>
                  <div className="space-y-8">
                    {EXPERIENCE_HISTORY.filter(e => e.type === 'work').map((exp) => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-white/5 print:border-neutral-300">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-white/60 print:bg-black" />
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-bold text-white print:text-neutral-950 text-base">{exp.role}</h3>
                            <p className="text-neutral-400 print:text-neutral-600 font-medium text-sm">{exp.company}</p>
                          </div>
                          <div className="text-right sm:text-right text-xs font-mono text-neutral-500 print:text-neutral-500">
                            <p>{exp.period}</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-400 print:text-neutral-700 leading-relaxed mb-4 font-light">
                          {exp.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((s) => (
                            <span key={s} className="text-[10px] font-mono bg-white/5 text-neutral-400 px-2 py-0.5 rounded border border-white/5 print:bg-neutral-100 print:text-neutral-700 print:border-neutral-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education and Certs */}
                <div className="mb-10">
                  <h2 className="text-xs font-bold text-white/50 print:text-neutral-600 tracking-[0.2em] uppercase font-mono mb-6 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 shrink-0" /> Education & Qualifications
                  </h2>
                  <div className="space-y-8">
                    {EXPERIENCE_HISTORY.filter(e => e.type === 'education').map((edu) => (
                      <div key={edu.id} className="relative pl-6 border-l-2 border-white/5 print:border-neutral-300">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-white/60 print:bg-black" />
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-bold text-white print:text-neutral-950 text-base">{edu.role}</h3>
                            <p className="text-neutral-400 print:text-neutral-600 font-medium text-sm">{edu.company}</p>
                          </div>
                          <div className="text-right sm:text-right text-xs font-mono text-neutral-500 print:text-neutral-500">
                            <p>{edu.period}</p>
                            <p>{edu.location}</p>
                          </div>
                        </div>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-400 print:text-neutral-700 leading-relaxed font-light">
                          {edu.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Technical Proficiencies */}
                <div className="mb-10 break-inside-avoid">
                  <h2 className="text-xs font-bold text-white/50 print:text-neutral-600 tracking-[0.2em] uppercase font-mono mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4 shrink-0" /> Key Proficiencies
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-400 print:text-neutral-700 font-light">
                    <div>
                      <p className="font-semibold text-neutral-100 print:text-black mb-1.5 text-sm">Development Stack</p>
                      <p>React, Next.js, TypeScript, JavaScript (ES6+), Node.js, Express, HTML5, CSS3, Tailwind CSS, SQL, NoSQL Databases, Git/GitHub</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-100 print:text-black mb-1.5 text-sm">Creative Tools</p>
                      <p>Figma, Framer, Adobe Creative Suite (Photoshop, Illustrator), Design Systems, Spline, Blender (3D modeling), Motion Graphics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
