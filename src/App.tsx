/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Missions } from './components/Missions';
import { Discoveries } from './components/Discoveries';
import { Footer } from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-space-accent selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Editorial Sub-bar (Statistics) */}
        <section className="relative z-20 bg-space-black border-y border-white/10 overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none grid-bg" />
           <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
              <div className="absolute top-0 left-1/4 w-px h-full bg-white/5 hidden lg:block" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 hidden lg:block" />
              <div className="absolute top-0 left-3/4 w-px h-full bg-white/5 hidden lg:block" />
              
              {[
                { label: 'Protocols', value: 'Alpha-09', accent: true },
                { label: 'Transmission', value: '42.8 GB/S' },
                { label: 'Distance', value: '1.2B KM' },
                { label: 'System', value: 'Nominal', pulse: true }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                   <span className="mono text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/30">{stat.label}</span>
                   <div className="flex items-center gap-2 sm:gap-3">
                      <span className={`text-base sm:text-xl font-display font-bold uppercase ${stat.accent ? 'text-space-accent' : 'text-white/80'}`}>{stat.value}</span>
                      {stat.pulse && <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />}
                   </div>
                </div>
              ))}
           </div>
        </section>

        <Missions />

        {/* Technical Feature Section */}
        <section id="technology" className="py-24 sm:py-40 bg-space-dark relative overflow-hidden grid-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative aspect-square glass flex items-center justify-center group overflow-hidden">
               <div className="absolute inset-0 bg-space-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10 w-full h-full border border-white/5 flex flex-col items-center justify-center text-center p-8 sm:p-12">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-[0.5px] border-white/10 flex items-center justify-center mb-6 sm:mb-8 relative">
                     <div className="absolute inset-2 sm:inset-4 border border-space-accent/20 rounded-full animate-[spin_10s_linear_infinite]" />
                     <div className="absolute inset-4 sm:inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-space-accent rounded-full shadow-[0_0_15px_#FF6321]" />
                  </div>
                  <div className="mono text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-space-accent mb-2">Engines / Activated</div>
                  <h4 className="text-3xl sm:text-4xl font-display font-black uppercase text-white/90 leading-tight">V5 Ion-Core <br /> Propulsion</h4>
               </div>
               
               {/* Technical Corner Markers */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
               <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
            </div>

            <div className="relative">
               <span className="text-space-accent mono text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-bold">The New Standard</span>
               <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mt-4 mb-8 sm:mb-10 leading-[0.9]">Beyond <br /> Propulsion</h2>
               <p className="text-white/40 leading-relaxed text-[13px] sm:text-sm max-w-md mb-10 sm:12">
                 Interstellar travel requires more than just thrust. Our proprietary flux-shielding technology and regenerative energy cores allow for sustained velocities across the deep void.
               </p>
               
               <div className="grid grid-cols-1 gap-8">
                  {[
                    { title: 'Zero-Emission Flux', desc: '98% efficiency increase over traditional drives.' },
                    { title: 'Regenerative Fuel', desc: 'Self-sustaining energy harvesting from solar winds.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                       <span className="mono text-[10px] text-space-accent border-b border-space-accent h-fit">0{i+1}</span>
                       <div className="space-y-1">
                          <h5 className="uppercase font-bold text-xs tracking-widest group-hover:text-space-accent transition-colors">{item.title}</h5>
                          <p className="text-[10px] text-white/30 uppercase tracking-tight">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <Discoveries />
      </main>

      <Footer />
      
      {/* Scroll Indicator (Editorial Aesthetic) */}
      <div className="fixed bottom-0 right-12 z-[200] flex flex-col items-center gap-6 hidden xl:flex">
         <div className="vertical-text mono text-[8px] text-white/30 uppercase tracking-[1em]">Scroll Progress</div>
         <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-space-accent origin-top" 
              style={{ scaleY }}
            />
         </div>
      </div>
    </div>
  );
}

