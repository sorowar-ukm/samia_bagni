import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "", darker = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 ${darker ? 'bg-slate-950' : 'bg-slate-900'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <motion.div 
            {...({
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 }
            } as any)}
            className="mb-16 text-center"
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400 mb-4 inline-block">
                {title}
              </h2>
            )}
            {subtitle && (
              <div className="h-1 w-20 bg-slate-700 mx-auto rounded-full mt-2"></div>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};