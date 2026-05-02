import React from 'react';
import { Rocket, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-space-black border-t border-white/5 py-16 sm:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16">
        <div className="col-span-1 md:col-span-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6 sm:mb-8">
            <Rocket className="text-space-accent" />
            <span className="font-display text-2xl font-bold tracking-tighter uppercase">XSE Systems</span>
          </div>
          <p className="max-w-md mx-auto md:mx-0 text-white/40 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-12">
            Pioneering the next era of human civilization through interstellar exploration and advanced celestial engineering. 
            The stars are not just lights in the sky; they are destinations.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
             <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
             <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
             <Linkedin className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
             <Mail className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-display text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 sm:mb-8 text-white/80">Navigation</h4>
          <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-white/40 uppercase tracking-widest font-display">
            <li className="hover:text-space-accent transition-colors"><a href="#missions">Missions</a></li>
            <li className="hover:text-space-accent transition-colors"><a href="#technology">Technology</a></li>
            <li className="hover:text-space-accent transition-colors"><a href="#discovery">Discovery</a></li>
            <li className="hover:text-space-accent transition-colors"><a>Archive</a></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-display text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 sm:mb-8 text-white/80">Legal</h4>
          <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-white/40 uppercase tracking-widest font-display">
            <li className="hover:text-white transition-colors">Privacy</li>
            <li className="hover:text-white transition-colors">Terms of Use</li>
            <li className="hover:text-white transition-colors">Cookie Policy</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 sm:mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 font-mono text-[8px] sm:text-[10px] text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-center">
         <div>© 2026 Xenon Space Exploration Systems</div>
         <div className="flex gap-6 sm:gap-8">
            <span>Transmission Port: 8080</span>
            <span>Signal: Clear</span>
         </div>
      </div>
    </footer>
  );
}
