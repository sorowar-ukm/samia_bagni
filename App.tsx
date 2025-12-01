import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Download, Github, Linkedin, Mail, Microscope, Award, Brain, Users, Globe, ChevronRight, Maximize2 } from 'lucide-react';
import { Section } from './components/Section';
import { ScienceAssistant } from './components/ScienceAssistant';
import { Modal } from './components/Modal';
import { PERSONAL_INFO, INTRODUCTION, ROLES_RESPONSIBILITIES, SKILLS, EXPERIENCES, ACHIEVEMENTS, CONCLUSION } from './constants';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic Icon Renderer
  const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const LucideIcon = (Icons as any)[name];
    return LucideIcon ? <LucideIcon className={className} /> : <Icons.Star className={className} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 origin-left z-50"
        style={{ scaleX } as any}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-bold text-2xl text-white tracking-tight flex items-center gap-2">
            <span className="text-primary-500 text-3xl">✦</span>
            Samia Farhana
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['About', 'Roles', 'Skills', 'Experience', 'Achievements'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all border border-slate-700">
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
            
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isNavOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-30 bg-slate-950 pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col gap-6 text-xl font-display font-medium text-white">
             {['About', 'Roles', 'Skills', 'Experience', 'Achievements'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsNavOpen(false)}
                className="border-b border-slate-800 pb-4"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            {...({
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.8 }
            } as any)}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-primary-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Science Enthusiast & Student
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white leading-tight mb-6">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                {PERSONAL_INFO.name.split(' ')[0]}
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              Student at {PERSONAL_INFO.institution} (Class {PERSONAL_INFO.class}, {PERSONAL_INFO.section}). 
              Passionate about Biology, Research, and Leadership.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-200 transition-colors">
                Explore Portfolio
              </a>
              <a href="#contact" className="px-8 py-3 bg-slate-900 border border-slate-700 text-white rounded-full font-semibold hover:border-primary-500 transition-colors">
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex gap-4 text-slate-500">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">ID NO</span>
                <span className="text-white font-mono">{PERSONAL_INFO.id}</span>
              </div>
              <div className="w-px h-10 bg-slate-800"></div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">ROLL</span>
                <span className="text-white font-mono">{PERSONAL_INFO.roll}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...({
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.2 }
            } as any)}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-[2rem] rotate-3 opacity-20 blur-lg"></div>
              <div className="absolute inset-0 bg-slate-900 rounded-[2rem] border border-slate-700 overflow-hidden flex items-center justify-center group">
                 <img 
                   src="./samia.jpg" 
                   alt="Samia Farhana Zarin" 
                   className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-700 scale-[2.0] group-hover:scale-[2.1]"
                 />
                 <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-500/20 p-2 rounded-lg text-primary-400">
                        <Microscope size={24} />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">Focus</div>
                        <div className="text-slate-400 text-xs">Science & Research</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <Icons.ChevronDown />
        </div>
      </header>

      {/* About Section */}
      <Section id="about" title="Introduction" darker>
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <motion.div 
             className="order-2 md:order-1"
             {...({
               initial: { opacity: 0, y: 20 },
               whileInView: { opacity: 1, y: 0 },
               viewport: { once: true }
             } as any)}
           >
             <div 
                onClick={() => setIsAboutModalOpen(true)}
                className="group cursor-pointer relative"
             >
                <div className="absolute -inset-4 bg-slate-800/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-light group-hover:text-white transition-colors">
                  {INTRODUCTION}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary-400 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wide">Read Full Bio</span>
                </div>
             </div>

             <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-primary-500/50 transition-colors">
                  <Brain className="text-primary-400 mb-2" />
                  <h4 className="text-white font-medium">Critical Thinking</h4>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-accent-500/50 transition-colors">
                  <Globe className="text-accent-400 mb-2" />
                  <h4 className="text-white font-medium">Global Perspective</h4>
                </div>
             </div>
           </motion.div>
           <div className="order-1 md:order-2 flex justify-center">
             <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-2xl"></div>
               <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center max-w-sm">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎓</div>
                  <h3 className="text-white text-xl font-bold mb-1">{PERSONAL_INFO.institution}</h3>
                  <p className="text-primary-400 font-medium">Class {PERSONAL_INFO.class}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase">Section</span>
                      <span className="text-white">{PERSONAL_INFO.section}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase">Roll</span>
                      <span className="text-white">{PERSONAL_INFO.roll}</span>
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </Section>

      {/* Roles Section */}
      <Section id="roles" title="Roles & Responsibilities">
        <div className="grid md:grid-cols-3 gap-6">
          {ROLES_RESPONSIBILITIES.map((role, idx) => (
            <motion.div
              key={idx}
              {...({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: idx * 0.1 },
                whileHover: { y: -5 }
              } as any)}
              className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <IconRenderer name={role.icon || 'Star'} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{role.title}</h3>
              <p className="text-slate-400 leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Skills & Expertise" darker>
        <div className="space-y-12">
          {SKILLS.map((skillGroup, idx) => (
            <motion.div 
              key={idx}
              {...({
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true }
              } as any)}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></span>
                {skillGroup.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skillGroup.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="bg-slate-900 px-6 py-4 rounded-lg border border-slate-800 flex items-center gap-3 hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                    <span className="text-slate-200 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Timeline Section */}
      <Section id="experience" title="Experience & Journey">
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-slate-800"></div>

          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx}
              {...({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true }
              } as any)}
              className={`relative flex items-center gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-4 border-primary-500 z-10"></div>

              {/* Content Side */}
              <div className="flex-1 ml-12 md:ml-0 md:w-1/2">
                <div className={`bg-slate-900 p-6 rounded-2xl border border-slate-800 relative hover:border-primary-500/30 transition-all ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  {/* Arrow only on desktop for alternating sides */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 border-t border-r border-slate-800 rotate-45 ${idx % 2 === 0 ? '-left-2 border-l border-b-0 border-r-0 border-t-0 bg-slate-900' : '-right-2'}`}></div>
                  
                  <div className={`flex items-center gap-3 mb-2 text-primary-400 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <IconRenderer name={exp.icon || 'Star'} className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">{exp.role || 'Participant'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-slate-400 text-sm">{exp.description}</p>
                </div>
              </div>

              {/* Empty Side for Desktop Layout Balance */}
              <div className="hidden md:block flex-1"></div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Achievements Section */}
      <Section id="achievements" title="Key Achievements" darker>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={idx}
              {...({
                whileHover: { scale: 1.02 }
              } as any)}
              className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-start gap-4"
            >
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-lg font-medium text-white">{ach}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Conclusion / Contact */}
      <Section id="contact" className="pb-40">
        <div className="bg-gradient-to-r from-primary-900/40 to-accent-900/40 rounded-3xl p-8 md:p-12 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect & Collaborate</h2>
            <p className="text-slate-300 text-lg mb-8 italic">"{CONCLUSION}"</p>
            
            <div className="flex justify-center gap-4">
               <button className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                 <Mail className="w-4 h-4" /> Send Email
               </button>
               {/* Social placeholders */}
               <button className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">
                 <Linkedin className="w-5 h-5" />
               </button>
               <button className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">
                 <Github className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
        <p className="mt-2">Driven by Curiosity & Science.</p>
      </footer>

      {/* Interactive Elements */}
      <ScienceAssistant />

      {/* About Modal */}
      <Modal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        title="About Samia"
      >
        <div className="space-y-6">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
               <Microscope className="w-5 h-5" />
             </div>
             <div>
               <h4 className="font-semibold text-white">Science Enthusiast</h4>
               <span className="text-xs text-slate-400 uppercase tracking-wide">Future Researcher</span>
             </div>
           </div>
           
           <p className="text-xl leading-relaxed text-slate-200 border-l-2 border-primary-500 pl-4">
             {INTRODUCTION}
           </p>

           <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent-400" />
                My Philosophy
              </h4>
              <p className="text-slate-300 italic">
                "Science is not just about memorizing facts, but about understanding the fundamental truths of our universe and using that knowledge to innovate."
              </p>
           </div>

           <p className="text-slate-300 text-lg leading-relaxed">
             Beyond my academic curriculum at {PERSONAL_INFO.institution}, I am deeply invested in extracurriculars that foster leadership and public speaking. 
             Whether it's organizing science fairs or debating international policies at MUNs, I believe in holistic growth. I constantly strive to explore the depths of scientific knowledge and apply it to real-world challenges.
           </p>

           <div className="flex flex-wrap gap-2 pt-2">
             <span className="text-sm text-slate-500 mr-2">Core Interests:</span>
             {['Biology', 'Research', 'Leadership', 'Public Speaking'].map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">
                  {tag}
                </span>
             ))}
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;