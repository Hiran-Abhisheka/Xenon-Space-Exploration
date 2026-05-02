import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[1000] transition-all duration-500",
      scrolled 
        ? "bg-space-black/95 backdrop-blur-xl border-b border-white/5 py-3 sm:py-4 px-4 sm:px-8 shadow-2xl" 
        : "bg-transparent py-6 sm:py-8 px-4 sm:px-8"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-[1100]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-space-accent rounded-full flex items-center justify-center">
             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-space-accent rounded-full animate-pulse" />
          </div>
          <span className="font-display text-[14px] sm:text-lg font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase whitespace-nowrap">XENON <span className="text-space-accent">SYSTEMS</span></span>
        </motion.div>

        <div className="hidden md:flex gap-12 items-center font-display text-[11px] uppercase tracking-[0.3em] font-medium opacity-70">
          {['Missions', 'Technology', 'Discovery', 'Careers'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover:text-space-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-space-accent group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mono"
          >
            Launch Protocol
          </motion.button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 border border-white/10 rounded-full relative z-[1200] bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1050] bg-space-black backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-start sm:justify-center gap-8 sm:gap-10 font-display text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] uppercase items-start overflow-y-auto pt-24 sm:pt-12"
          >
            <div className="absolute top-0 right-0 w-[50%] h-full bg-space-accent/5 -skew-x-12 transform origin-right" />
            {['Missions', 'Technology', 'Discovery', 'Careers'].map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => setIsOpen(false)} 
                className="hover:text-space-accent transition-colors py-2 w-full text-left relative z-20 group flex items-center gap-4"
              >
                <span className="text-white/10 font-mono text-xs">0{i+1}</span>
                {item}
                <span className="h-px bg-space-accent w-0 group-hover:w-12 transition-all duration-500" />
              </motion.a>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-12 h-px bg-space-accent my-4" 
            />
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-space-accent mono text-sm tracking-[0.4em] hover:brightness-125 transition-all"
            >
              System Sync
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
