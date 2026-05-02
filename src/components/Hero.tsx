import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-bg", {
        scale: 1.1,
        filter: "blur(10px)",
        duration: 2.5,
        ease: "expo.out"
      })
      .from(".technical-lines", {
        opacity: 0,
        duration: 1,
      }, "-=1.5")
      .from(titleRef.current, {
        y: 150,
        opacity: 0,
        rotateX: -45,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.5")
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");

      // Scroll Parallax
      gsap.fromTo(titleRef.current, 
        { opacity: 1, y: 0, scale: 1 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
          y: 200,
          opacity: 0,
          scale: 0.9,
          ease: "none",
          immediateRender: false,
          overwrite: "auto"
        }
      );

      gsap.fromTo(".hero-bg", 
        { scale: 1, y: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          scale: 1.1,
          y: 50,
          ease: "none",
          immediateRender: false
        }
      );
      
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden grid-bg">
      {/* Background with Parallax */}
      <div className="hero-bg absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-[filter] duration-[2000ms]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-the-stars-in-space-23945-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-space-black via-transparent to-space-black" />
      </div>

      {/* Technical Overlay */}
      <div className="technical-lines absolute inset-0 z-5 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
         <div className="absolute top-0 left-1/2 w-px h-full bg-white/10" />
         <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] border border-white/5" />
      </div>

      <div className="relative z-10 text-center px-4 w-full">
        <div ref={subtitleRef} className="mb-4 inline-block px-4 sm:px-6 py-1 glass mono text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-space-accent font-bold">
          XENON SYSTEMS / ALPHA-01
        </div>
        <h1 ref={titleRef} className="text-[14vw] sm:text-[14vw] leading-[0.9] sm:leading-[0.8] uppercase tracking-[-0.05em] text-gradient font-black selection:text-white perspective-1000">
          ARTEMIS <br className="hidden sm:block" /> REACH
        </h1>
        
        <div className="mt-8 sm:mt-20 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-12 items-center text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono text-white/30 min-h-[31px]">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-space-accent mb-0.5">LATITUDE</span>
            <span className="text-white">41.40338 N</span>
          </div>
          <div className="hidden sm:block w-12 h-px bg-white/10" />
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-space-accent mb-0.5">LONGITUDE</span>
            <span className="text-white">2.17403 E</span>
          </div>
          <div className="hidden sm:block w-12 h-px bg-white/10" />
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-space-accent mb-0.5">STATUS</span>
            <span className="text-white animate-pulse">NOMINAL</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 z-50">
        <span className="mono text-[8px] uppercase tracking-[0.5em]">Scroll to Access</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>

      {/* Side Numbers (Editorial Style) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 mono text-[10px] text-white/10 select-none hidden lg:flex">
         {['01', '02', '03', '04'].map((n) => (
           <span key={n} className="hover:text-space-accent cursor-default transition-colors">{n}</span>
         ))}
      </div>
    </section>
  );
}
