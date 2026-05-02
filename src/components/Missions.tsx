import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, Calendar, Users, Target } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const MISSIONS = [
  {
    id: '01',
    title: 'ARES COLONY',
    target: 'MARS',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1974&auto=format&fit=crop',
    description: 'Establishing the first permanent human outpost on the Red Planet using advanced bio-regenerative systems.',
    status: 'In Progress',
    launchDate: 'OCT 2026',
    crew: '12 Specialists',
    objectives: ['Base Construction', 'Atmosphere Harvesting', 'Soil Remediation']
  },
  {
    id: '02',
    title: 'EUROPA DEPTHS',
    target: 'JUPITER II',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop', // Updated URL
    description: 'Sub-surface robotic exploration of the icy moon Europa to search for signs of hydrothermal life.',
    status: 'Scheduled',
    launchDate: 'JUL 2027',
    crew: 'Autonomous Fleet',
    objectives: ['Ice Penetration', 'Sub-ocean Mapping', 'Biological Sampling']
  },
  {
    id: '03',
    title: 'VOID WATCHER',
    target: 'BLACK HOLE SV1',
    image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=2080&auto=format&fit=crop', // Updated URL
    description: 'Deploying a swarm of gravitational wave detectors around the event horizon of a supermassive black hole.',
    status: 'Drafting',
    launchDate: 'EST 2030',
    crew: 'Remote Operator Group',
    objectives: ['Event Horizon Imaging', 'Hawking Radiation Test', 'Gravitational Profiling']
  }
];

const STATUS_FILTERS = ['All', 'In Progress', 'Scheduled', 'Drafting'];

export function Missions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');
  const [selectedMission, setSelectedMission] = useState<typeof MISSIONS[0] | null>(null);

  const filteredMissions = filter === 'All' 
    ? MISSIONS 
    : MISSIONS.filter(m => m.status === filter);

  useLayoutEffect(() => {
    // Refresh ScrollTrigger to ensure position is correct after filter changes
    ScrollTrigger.refresh();
  }, [filter, filteredMissions]); 

  return (
    <section id="missions" ref={containerRef} className="relative py-40 border-t border-white/5 overflow-hidden min-h-[800px]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      <div className="relative z-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-12 sm:mb-24 gap-8 lg:gap-16">
          <div className="max-w-4xl">
            <span className="text-space-accent mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.6em] uppercase font-bold block mb-3">Transmission Log / Operations</span>
            <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5vw] xl:text-[8.5rem] font-black uppercase tracking-tighter leading-[0.8] text-white">
              Active <br /> Protocols
            </h2>
          </div>
          
          <motion.div 
            layout 
            className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm w-full sm:w-fit overflow-x-auto no-scrollbar scroll-smooth"
          >
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative flex-1 sm:flex-none px-4 sm:px-10 py-3 text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-300 rounded-full cursor-pointer z-10 group whitespace-nowrap min-w-fit flex items-center justify-center font-mono"
              >
                {filter === f && (
                  <motion.div 
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-space-accent rounded-full -z-10 shadow-[0_0_30px_rgba(255,99,33,0.3)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.55 }}
                  />
                )}
                <span className={cn(
                  "transition-colors duration-300 relative z-20",
                  filter === f ? "text-white font-black" : "text-white/30 group-hover:text-white"
                )}>
                  {f}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission) => (
            <motion.div 
              layout
              key={mission.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mission-card group relative aspect-3/4 overflow-hidden bg-space-black p-8 flex flex-col justify-end cursor-pointer"
              onClick={() => setSelectedMission(mission)}
            >
              <img 
                src={mission.image} 
                alt={mission.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-space-black via-transparent to-transparent opacity-90" />
              
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mono text-space-accent text-[9px] tracking-widest mb-2 uppercase">Destination: {mission.target}</div>
                <h3 className="text-4xl font-display font-black leading-none mb-4 uppercase">{mission.title}</h3>
                <p className="text-[11px] text-white/50 mb-6 line-clamp-2">
                  {mission.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-space-accent">
                   Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              <div className="absolute top-8 right-8 text-4xl font-display font-black text-white/5 group-hover:text-space-accent/10 transition-colors">
                {mission.id}
              </div>
              
              <div className="absolute top-8 left-8 flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", 
                  mission.status === 'In Progress' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                  mission.status === 'Scheduled' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 
                  'bg-white/20'
                )} />
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">{mission.status}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal moved outside constrained width div */}
    </div>

    <AnimatePresence>
        {selectedMission && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMission(null)}
              className="absolute inset-0 bg-space-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              layoutId={`modal-${selectedMission.id}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl glass overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-48 sm:h-64 md:h-full">
                <img src={selectedMission.image} className="w-full h-full object-cover opacity-60" alt={selectedMission.title} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-linear-to-r from-space-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <span className="mono text-space-accent text-[9px] sm:text-[10px] tracking-[0.4em] mb-2 block">{selectedMission.id} // ACTIVE MISSION</span>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter">{selectedMission.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 flex flex-col gap-8 bg-space-dark">
                <button onClick={() => setSelectedMission(null)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/40 hover:text-white transition-colors z-20">
                  <X size={20} />
                </button>

                <div>
                   <h4 className="mono text-white/30 text-[10px] tracking-widest uppercase mb-4 border-b border-white/5 pb-2">Overview</h4>
                   <p className="text-white/60 leading-relaxed text-sm">{selectedMission.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-space-accent">
                         <Calendar size={14} />
                         <span className="mono text-[9px] uppercase tracking-widest">Launch Date</span>
                      </div>
                      <div className="text-sm font-bold">{selectedMission.launchDate}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-space-accent">
                         <Users size={14} />
                         <span className="mono text-[9px] uppercase tracking-widest">Crew Config</span>
                      </div>
                      <div className="text-sm font-bold">{selectedMission.crew}</div>
                   </div>
                </div>

                <div>
                   <h4 className="mono text-white/30 text-[10px] tracking-widest uppercase mb-4 border-b border-white/5 pb-2">Mission Objectives</h4>
                   <ul className="space-y-3">
                      {selectedMission.objectives.map((obj, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs text-white/80">
                           <Target size={12} className="text-space-accent" />
                           {obj}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="mt-auto pt-8">
                   <button className="w-full py-4 bg-space-accent text-white font-black uppercase tracking-widest text-[10px] hover:bg-space-accent-hover transition-colors rounded-none">
                      Initiate Protocol Deployment
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
