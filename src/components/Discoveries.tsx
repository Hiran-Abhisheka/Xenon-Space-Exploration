import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Zap, Globe, Atom } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DISCOVERIES = [
  {
    icon: <Globe className="w-10 h-10 text-space-accent" />,
    label: "Exoplanet K2-18b",
    value: "Atmospheric Water Vapor Detected",
    stat: "111LY"
  },
  {
    icon: <Zap className="w-10 h-10 text-space-accent" />,
    label: "Gamma Ray Burst",
    value: "Highest Energy Photons Observed",
    stat: "2.4B LY"
  },
  {
    icon: <Atom className="w-10 h-10 text-space-accent" />,
    label: "Dark Matter Web",
    value: "Structural Mapping Complete",
    stat: "99.2%"
  },
  {
    icon: <Star className="w-10 h-10 text-space-accent" />,
    label: "Pulsar Synchronization",
    value: "Universal Time Standard achieved",
    stat: "0.0001ms"
  }
];

export function Discoveries() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Only apply horizontal scroll on desktop
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const horizontalSections = gsap.utils.toArray(".discovery-slide");
        
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 0.5,
            snap: 1 / (horizontalSections.length - 1),
            end: () => `+=${horizontalRef.current!.offsetWidth}`,
          }
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="discovery" ref={triggerRef} className="overflow-hidden bg-space-dark grid-bg">
      <div ref={horizontalRef} className="flex flex-col md:flex-row h-auto md:h-screen w-full md:w-[600vw]">
        {/* Intro Slide */}
        <div className="discovery-slide w-full md:w-screen h-screen md:h-full flex items-center px-6 sm:px-24 border-b md:border-b-0 md:border-r border-white/5 relative">
          <div className="max-w-3xl">
            <span className="text-space-accent mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold">Deep Space Intelligence</span>
            <h2 className="text-5xl sm:text-[10vw] leading-[0.9] tracking-tighter uppercase mt-4 font-black">Data <br /> Streams</h2>
            <div className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-8">
              <div className="w-16 sm:w-32 h-[1px] bg-space-accent" />
              <p className="text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono text-[8px] sm:text-[10px]">Transmission Sequence Initiated</p>
            </div>
          </div>
          <div className="absolute bottom-12 right-6 sm:top-[70%] sm:right-24 sm:-translate-y-1/2 vertical-text rotate-180 mono text-[8px] text-white/30 uppercase tracking-[0.5em] sm:tracking-[1em] select-none z-50 hidden md:block">
             Horizontal / Scroll / Access
          </div>
        </div>

        {/* Dynamic Slides */}
        {DISCOVERIES.map((d, i) => (
          <div key={i} className="discovery-slide w-full md:w-screen h-screen md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden p-4 sm:p-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[600px] sm:h-[600px] border border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[400px] sm:h-[400px] border border-white/5 rounded-full" />
            
            <div className="glass p-6 sm:p-20 max-w-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-space-accent transition-all duration-700" />
               <div className="mb-4 sm:mb-10 opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500 origin-left">
                  {i === 1 ? React.cloneElement(d.icon as React.ReactElement, { className: "w-8 h-8 sm:w-10 sm:h-10 text-space-accent" }) : d.icon}
               </div>
               <div className="text-space-accent mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-3 sm:mb-4">{d.label}</div>
               <h3 className="text-2xl sm:text-5xl md:text-6xl font-display font-black uppercase mb-6 sm:mb-10 tracking-tighter leading-tight">{d.value}</h3>
               <div className="flex flex-col">
                  <span className="text-white/30 uppercase mono text-[7px] sm:text-[9px] tracking-widest mb-1">Signal Integrity</span>
                  <span className="text-4xl sm:text-8xl font-display font-black text-white/5 group-hover:text-space-accent transition-colors duration-700 tracking-[-0.05em]">{d.stat}</span>
               </div>
            </div>
          </div>
        ))}

        {/* Final Slide */}
        <div className="discovery-slide w-full md:w-screen h-screen md:h-full flex flex-col items-center justify-center relative bg-space-black">
            <div className="text-center p-8">
               <h4 className="text-2xl sm:text-4xl font-display uppercase tracking-[-0.02em] font-black text-white/20 mb-8 max-w-sm mx-auto">Access the full archive</h4>
               <button className="w-full sm:w-auto px-8 sm:px-16 py-4 border border-white/10 hover:border-space-accent hover:text-white hover:bg-space-accent transition-all duration-500 mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold">
                 Initialize Connection
               </button>
            </div>
            <div className="absolute bottom-12 sm:bottom-24 mono text-[8px] text-white/10 uppercase tracking-[0.5em] sm:tracking-[1em]">Xenon / Systems / 2026</div>
        </div>
      </div>
    </section>
  );
}
