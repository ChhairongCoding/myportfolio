import { motion } from 'motion/react';
import { Calendar, Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '../data';

export default function ExperienceView() {
  const workExp = EXPERIENCE_HISTORY.filter((e) => e.type === 'work');
  const eduExp = EXPERIENCE_HISTORY.filter((e) => e.type === 'education');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Professional Work Experience Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="glass-panel rounded-3xl p-8 shadow-2xl relative"
      >
        <div className="space-y-8">
          <div className="space-y-1.5">
            <h3 className="text-xl font-serif font-light text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-white/60" /> Career History
            </h3>
            <p className="text-neutral-400 text-sm font-light">
              My progressive path through full-stack development and interactive user interface design.
            </p>
          </div>

          {/* Timeline list */}
          <div className="space-y-8 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-white/10">
            {workExp.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-8 group"
              >
                {/* Visual dynamic node */}
                <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-950 border-2 border-white/40 group-hover:bg-white group-hover:border-white group-hover:scale-125 transition-all duration-300" />

                <div className="space-y-3 p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-white transition-colors">{exp.role}</h4>
                      <p className="text-neutral-400 text-xs font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-left sm:text-right font-mono text-[10px] text-neutral-500 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 sm:justify-end text-white/40">
                        <Calendar className="w-3 h-3 text-white/30" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1 sm:justify-end">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-400 leading-relaxed font-light">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  {/* Skills badge row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((s) => (
                      <span key={s} className="text-[9px] font-bold font-mono bg-white/5 text-neutral-400 border border-white/5 px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education & Academic Experience Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="glass-panel rounded-3xl p-8 shadow-2xl relative"
      >
        <div className="space-y-8">
          <div className="space-y-1.5">
            <h3 className="text-xl font-serif font-light text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-white/60" /> Academic & Qualifications
            </h3>
            <p className="text-neutral-400 text-sm font-light">
              My structural foundation in computer design, programming concepts, and creative theories.
            </p>
          </div>

          {/* Timeline list */}
          <div className="space-y-8 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-white/10">
            {eduExp.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-8 group"
              >
                {/* Visual dynamic node */}
                <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-950 border-2 border-white/40 group-hover:bg-white group-hover:border-white group-hover:scale-125 transition-all duration-300" />

                <div className="space-y-3 p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-white transition-colors">{exp.role}</h4>
                      <p className="text-neutral-400 text-xs font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-left sm:text-right font-mono text-[10px] text-neutral-500 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 sm:justify-end text-white/40">
                        <Calendar className="w-3 h-3 text-white/30" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1 sm:justify-end">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-400 leading-relaxed font-light">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  {/* Skills badge row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((s) => (
                      <span key={s} className="text-[9px] font-bold font-mono bg-white/5 text-neutral-400 border border-white/5 px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
