
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Atom, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateScienceResponse, generateScienceImage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ScienceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Samia's Science Assistant. Ask me a science fact, about Samia's skills, or ask me to generate a science diagram!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simple heuristic to detect image generation requests
    const isImageRequest = /generate|create|draw|make|show/i.test(userMessage) && /image|picture|photo|diagram|illustration|drawing/i.test(userMessage);

    if (isImageRequest) {
      setIsGeneratingImage(true);
      try {
        const imageData = await generateScienceImage(userMessage);
        if (imageData) {
          setMessages(prev => [...prev, { 
            role: 'model', 
            text: "Here's what I came up with based on your request:",
            image: imageData
          }]);
        } else {
          setMessages(prev => [...prev, { role: 'model', text: "I tried to generate an image, but I couldn't quite get it right. Please try again!" }]);
        }
      } catch (error) {
         setMessages(prev => [...prev, { role: 'model', text: "I encountered an error generating the image. Please make sure the API key is valid for image generation.", isError: true }]);
      } finally {
        setIsLoading(false);
        setIsGeneratingImage(false);
      }
    } else {
      // Text response
      try {
        const responseText = await generateScienceResponse(userMessage);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } catch (error) {
         setMessages(prev => [...prev, { role: 'model', text: "I'm currently offline (API Key missing). But I'd love to chat about Biology later!", isError: true }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...({
              initial: { opacity: 0, y: 20, scale: 0.9 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 20, scale: 0.9 }
            } as any)}
            className="mb-4 w-[350px] max-w-[90vw] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Atom className="w-5 h-5 animate-spin-slow" />
                <h3 className="font-semibold font-display">Science Assistant</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95 min-h-[300px]">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-sm' 
                        : msg.isError 
                            ? 'bg-red-900/50 text-red-200 border border-red-800 rounded-tl-sm'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 max-w-[85%] rounded-xl overflow-hidden border border-slate-700 shadow-lg"
                    >
                      <img src={msg.image} alt="Generated science content" className="w-full h-auto block" />
                    </motion.div>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start items-end gap-2 animate-in fade-in duration-300">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md pb-0.5">
                      {isGeneratingImage ? 
                        <ImageIcon className="w-3.5 h-3.5 text-white animate-pulse" /> : 
                        <Atom className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '3s' }} />
                      }
                    </div>
                  <div className="bg-slate-800 p-3.5 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-3 shadow-sm">
                    <span className="text-xs font-medium text-primary-300 uppercase tracking-wider">
                      {isGeneratingImage ? 'Creating Art...' : 'Analyzing...'}
                    </span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-accent-400 rounded-full"
                          {...({
                            animate: {
                              y: ["0%", "-50%", "0%"],
                              opacity: [0.3, 1, 0.3]
                            },
                            transition: {
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: "easeInOut"
                            }
                          } as any)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask biology or 'generate image'..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        {...({
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 }
        } as any)}
        onClick={toggleChat}
        className="pointer-events-auto bg-gradient-to-br from-primary-500 to-accent-500 text-white p-4 rounded-full shadow-lg shadow-primary-500/30 flex items-center justify-center group"
      >
         {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </motion.button>
    </div>
  );
};
