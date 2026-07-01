import { motion } from 'motion/react';
import { Mail, Linkedin, Phone, MapPin, Download, ArrowRight, Github } from 'lucide-react';
import { DEVELOPER_INFO } from '../data';

interface HomeViewProps {
  onDownloadResume: () => void;
  onNavigateToContact: () => void;
  onNavigateToChat: () => void;
}

export default function HomeView({ onDownloadResume, onNavigateToContact, onNavigateToChat }: HomeViewProps) {
  // Use a beautifully illuminated creative profile portrait
  const portraitUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Bio / Headline Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Subtle glow sphere behind text */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 border-l border-white/20 pl-4 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available for Freelance & Hire
            </div>
            <button
              id="download-cv-btn-1"
              onClick={onDownloadResume}
              className="flex items-center gap-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-[10px] tracking-widest uppercase px-5 py-2.5 font-sans font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </button>
          </div>

          {/* Persona Headings */}
          <div className="space-y-4 mb-6">
            <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light italic font-serif">
              {DEVELOPER_INFO.title}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-[1.15]">
              Crafting <span className="italic font-serif font-medium text-white">immersive</span> digital atmospheres for the next web.
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/50 leading-relaxed font-light text-sm md:text-base max-w-[520px] mb-10">
            {DEVELOPER_INFO.bio}
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <a
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm truncate font-light tracking-wide">{DEVELOPER_INFO.email}</span>
            </a>
            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-sm truncate font-light tracking-wide">linkedin.com/in/rongchhin</span>
            </a>
            <a
              href={`tel:${DEVELOPER_INFO.phone}`}
              className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-light tracking-wide">{DEVELOPER_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-3.5 text-neutral-400">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-light tracking-wide">{DEVELOPER_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Action button panel */}
        <div className="relative z-10 flex flex-wrap gap-4 pt-6 border-t border-white/5">
          <button
            id="talk-ai-btn"
            onClick={onNavigateToChat}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            Chat with my AI Twin
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            id="hire-me-btn"
            onClick={onNavigateToContact}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-white/95 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            Inquire / Hire Rong
          </button>
        </div>
      </motion.div>

      {/* Visual Portrait / Aesthetic Graphic Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="lg:col-span-5 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group min-h-[350px] lg:min-h-0"
      >
        {/* Soft elegant backlighting */}
        <div className="absolute right-0 bottom-0 w-full h-full bg-radial-[circle_at_80%_60%] from-white/10 via-transparent to-transparent blur-[60px]" />

        {/* Embedded design asset */}
        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950/80 flex items-center justify-center">
          <img
            src={portraitUrl}
            alt="Rong Chhin portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter grayscale brightness-75 contrast-125 saturate-50 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle color grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent pointer-events-none" />

          {/* Visual Floating Label */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/15">
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-mono">Location</p>
              <p className="text-xs text-white font-serif italic">Studio: Atlanta, US</p>
            </div>
            <div className="flex gap-2">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
