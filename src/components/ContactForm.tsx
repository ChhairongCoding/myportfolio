import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, Inbox, Trash2, Bot, HelpCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => Promise<string | null>;
}

export default function ContactForm({ onSendMessage }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    aiReply: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiTwinReplyText, setAiTwinReplyText] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load sent messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_sent_messages');
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setAiTwinReplyText(null);

    try {
      // Call standard send message logic
      const aiReply = await onSendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      // Save to local Inbox representation
      const newMessage: ContactMessage = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };

      const updatedMessages = [newMessage, ...localMessages];
      setLocalMessages(updatedMessages);
      localStorage.setItem('portfolio_sent_messages', JSON.stringify(updatedMessages));

      if (formData.aiReply && aiReply) {
        setAiTwinReplyText(aiReply);
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', aiReply: true });

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = localMessages.filter((m) => m.id !== id);
    setLocalMessages(filtered);
    localStorage.setItem('portfolio_sent_messages', JSON.stringify(filtered));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inbox view on left or toggleable section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-4 glass-panel rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-serif font-light text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-white/60" />
              Inquire or Hire
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
              Have a proposal, project, or just want to say hi? Send a message directly. If you want an instant reply from my customized AI, check the toggle!
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 mt-6">
            <button
              id="toggle-inbox-btn"
              onClick={() => setShowInbox(!showInbox)}
              className="w-full flex items-center justify-between gap-2 p-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 rounded-xl text-neutral-300 text-xs transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-white/50" />
                Local Sent Outbox ({localMessages.length})
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-mono">
                {showInbox ? 'Hide' : 'View'}
              </span>
            </button>

            {/* Simulated sent message log */}
            <AnimatePresence>
              {showInbox && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4 space-y-3 max-h-64 overflow-y-auto pr-1"
                >
                  {localMessages.length === 0 ? (
                    <p className="text-neutral-500 text-[11px] text-center py-4 italic">No messages sent in this session.</p>
                  ) : (
                    localMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-3 group relative overflow-hidden"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-neutral-200 truncate">{msg.subject}</p>
                          <p className="text-[10px] text-neutral-500 mb-1.5">{msg.name} • {msg.timestamp}</p>
                          <p className="text-[11px] text-neutral-400 line-clamp-2">{msg.message}</p>
                        </div>
                        <button
                          id={`delete-msg-${msg.id}`}
                          onClick={(e) => handleDeleteMessage(msg.id, e)}
                          className="text-neutral-500 hover:text-rose-500 p-1 rounded-md hover:bg-neutral-800/80 shrink-0 self-start transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Actual interactive Form on Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="lg:col-span-8 glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-neutral-300">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3.5 rounded-xl text-sm text-white glass-input ${formErrors.name ? 'border-rose-500/50' : ''
                      }`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && <p className="text-xs text-rose-500 mt-1">{formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-neutral-300">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3.5 rounded-xl text-sm text-white glass-input ${formErrors.email ? 'border-rose-500/50' : ''
                      }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <p className="text-xs text-rose-500 mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-neutral-300">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full p-3.5 rounded-xl text-sm text-white glass-input ${formErrors.subject ? 'border-rose-500/50' : ''
                    }`}
                  placeholder="Inquiry about new project"
                />
                {formErrors.subject && <p className="text-xs text-rose-500 mt-1">{formErrors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-semibold text-neutral-300">Your Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-3.5 rounded-xl text-sm text-white glass-input ${formErrors.message ? 'border-rose-500/50' : ''
                    }`}
                  placeholder="How can we build something amazing together?"
                />
                {formErrors.message && <p className="text-xs text-rose-500 mt-1">{formErrors.message}</p>}
              </div>

              {/* Instant AI Reply Toggle */}
              <div className="flex items-center gap-3.5 bg-white/[0.01] p-4 rounded-xl border border-white/5">
                <input
                  type="checkbox"
                  id="ai-reply-checkbox"
                  checked={formData.aiReply}
                  onChange={(e) => setFormData({ ...formData, aiReply: e.target.checked })}
                  className="w-4.5 h-4.5 rounded border-neutral-700 text-white focus:ring-white/20 accent-white"
                />
                <div className="flex-1">
                  <label htmlFor="ai-reply-checkbox" className="text-xs font-bold text-neutral-200 cursor-pointer flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-white shrink-0 animate-pulse" />
                    Get an instant reply from my AI Twin
                  </label>
                  <p className="text-[11px] text-neutral-500 leading-normal mt-0.5">My AI counterpart will read your message and provide a tailored acknowledgment right away.</p>
                </div>
              </div>

              <button
                type="submit"
                id="submit-contact-form-btn"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-white hover:bg-white/95 disabled:bg-white/5 text-black disabled:text-neutral-500 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-neutral-500 border-t-neutral-950 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10 space-y-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/25 text-white mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-light text-white">Message Received!</h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out. I have stored your message inside our sessions inbox and will respond back personally soon!
                </p>
              </div>

              {/* AI Twin Dynamic Reply */}
              {aiTwinReplyText && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-xl mx-auto p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-left relative overflow-hidden"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                  <p className="text-[10px] font-bold text-white/60 tracking-wider font-mono uppercase mb-2 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" /> Direct Reply from Rong's AI Twin
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">{aiTwinReplyText}</p>
                </motion.div>
              )}

              <button
                id="reset-form-btn"
                onClick={() => {
                  setIsSuccess(false);
                  setAiTwinReplyText(null);
                }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 text-xs font-semibold transition-colors mt-4"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
