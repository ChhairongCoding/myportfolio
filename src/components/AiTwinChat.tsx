import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiTwinChatProps {
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<string>;
}

export default function AiTwinChat({ chatHistory, onSendMessage }: AiTwinChatProps) {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const viewportRef = useRef<HTMLDivElement>(null);

  // Quick suggestions based on portfolio data
  const suggestions = [
    'Tell me about your project Flowstate',
    'What is your core development stack?',
    'What did you study at SCAD?',
    'How do I hire or contact Rong?',
  ];

  // Auto scroll to bottom when history or generation state changes
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory, isGenerating]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isGenerating) return;
    
    setErrorMsg(null);
    setInputText('');
    setIsGenerating(true);

    try {
      await onSendMessage(textToSend);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to fetch a reply. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[600px] lg:h-[650px]">
      {/* Intro Sidebar Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-4 glass-panel rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-white text-[10px] tracking-widest uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Gemini AI
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-light text-white">Chat with my AI Twin</h3>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
              I have compiled an artificial twin of myself loaded with details of my portfolio, qualifications, work ethic, and background. 
            </p>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
              Ask it anything—from my favorite UI trends to how we can collaborate!
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/5 space-y-3">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Quick Inquiries</p>
          <div className="flex flex-col gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                id={`suggestion-btn-${s.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleSend(s)}
                disabled={isGenerating}
                className="text-left w-full p-2.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 text-xs text-neutral-300 hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Chat Console */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-8 glass-panel rounded-3xl flex flex-col justify-between shadow-2xl overflow-hidden h-full relative"
      >
        {/* Chat Messages Viewport */}
        <div
          ref={viewportRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-2">
                <Bot className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="font-serif font-light text-lg text-white">Initiate conversation</p>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Send a custom message or select one of the quick suggestions on the side to talk with Rong's virtual twin.
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed border ${
                    isAi 
                      ? 'bg-neutral-900/60 text-neutral-200 border-neutral-800' 
                      : 'bg-white text-neutral-950 font-semibold border-white shadow-lg shadow-white/5'
                  }`}>
                    {/* Preserve line breaks and simple formatting */}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-neutral-400 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Chat Assistant Typing Indicator */}
          {isGenerating && (
            <div className="flex items-start gap-4 justify-start animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/[0.02] text-neutral-400 rounded-2xl p-4 border border-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* System error notification */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl max-w-md mx-auto text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Input Controls Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="p-4 md:p-6 bg-neutral-950/40 border-t border-neutral-800/80 flex gap-3 items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder={isGenerating ? 'Synthesizing response...' : 'Type your question...'}
            className="flex-1 p-3.5 rounded-xl text-xs md:text-sm text-white glass-input disabled:opacity-50"
          />
          <button
            type="submit"
            id="chat-submit-btn"
            disabled={!inputText.trim() || isGenerating}
            className="p-3.5 rounded-xl bg-white hover:bg-white/95 disabled:bg-white/5 text-black disabled:text-neutral-500 font-bold transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
