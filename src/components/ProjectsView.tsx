import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, Link as LinkIcon, Github, Maximize2, Plus, X, BarChart3, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'ai', label: 'AI Integrations' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Categories Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`relative py-2 px-4 rounded-xl text-xs font-medium font-sans transition-colors duration-300 ${
              selectedCategory === cat.id
                ? 'text-black font-bold'
                : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            {selectedCategory === cat.id && (
              <motion.div
                layoutId="activeFilterIndicator"
                className="absolute inset-0 bg-white rounded-xl shadow-md"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout="position"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-3xl p-5 shadow-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Card visual content */}
              <div className="space-y-4">
                <div className="aspect-16/10 rounded-2xl overflow-hidden border border-white/5 relative bg-neutral-950/40">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 brightness-75 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 text-[9px] font-bold font-mono bg-black/90 text-white/80 px-2.5 py-1 rounded-lg border border-white/10">
                    {project.categoryLabel}
                  </span>
                  
                  {/* Subtle hover icon zoom indicator */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-serif text-white leading-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs md:text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technologies list at card bottom */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-white/5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-[9px] font-bold font-mono bg-neutral-900 text-neutral-400 px-2.5 py-1 rounded-md border border-white/5">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[9px] font-bold font-mono bg-neutral-900 text-white/60 px-2.5 py-1 rounded-md border border-white/5">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Details Inspect Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-[#080808] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close button floating inside modal */}
              <button
                id="close-project-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/80 hover:bg-black border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrolling wrapper */}
              <div className="overflow-y-auto">
                {/* Banner image */}
                <div className="relative aspect-21/9 bg-neutral-950">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.6] filter grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute bottom-6 left-6 text-[10px] font-bold font-mono tracking-wider bg-white text-black px-3 py-1.5 rounded-lg uppercase">
                    {selectedProject.categoryLabel}
                  </span>
                </div>

                {/* Main description section */}
                <div className="p-8 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-serif font-light text-white leading-tight">{selectedProject.title}</h2>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[10px] tracking-widest uppercase font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Codebase
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-white/90 text-black text-[10px] tracking-widest uppercase font-bold px-4 py-2.5 rounded-xl transition-all duration-300"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Project Performance Metrics (Bento metrics row) */}
                  {selectedProject.metrics && (
                    <div className="grid grid-cols-3 gap-4">
                      {selectedProject.metrics.map((m, idx) => (
                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                          <p className="text-2xl font-serif font-medium text-white">{m.value}</p>
                          <p className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1 font-mono">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary copy */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase font-mono">About the Project</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">{selectedProject.longDescription}</p>
                  </div>

                  {/* Key accomplishments bulleted lists */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-white" /> Key Deliverables & Outcomes
                    </h3>
                    <ul className="space-y-2.5 pl-1">
                      {selectedProject.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-xs text-neutral-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core technologies layout */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase font-mono">Engineered With</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="text-xs font-medium font-mono bg-white/5 text-white/80 border border-white/15 px-3 py-1.5 rounded-xl">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
