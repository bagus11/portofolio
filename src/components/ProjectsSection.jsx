import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectsSection = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-scroll to selected project
  useEffect(() => {
    if (selectedProject !== null && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedCard = container.children[selectedProject];
      if (selectedCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = selectedCard.offsetWidth;
        const cardLeft = selectedCard.offsetLeft;
        const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedProject]);

 return (
   <section ref={ref} className="py-20 px-4">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         initial={{ opacity: 0, y: 50 }}
         animate={isInView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.8 }}
         className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text"
       >
         Projects
       </motion.h2>
-
       {/* Terminal-style project selector */}
       <div className="mb-8">
         <div className="glass p-4 rounded-lg font-mono text-sm">
           <div className="text-neon-cyan mb-2">$ ls -la projects/</div>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
             {projects.map((project, index) => (
               <motion.button
                 key={project.title}
                 initial={{ opacity: 0, x: -20 }}
                 animate={isInView ? { opacity: 1, x: 0 } : {}}
                 transition={{ duration: 0.3, delay: index * 0.05 }}
                 onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                 className={`p-2 rounded border transition-all duration-300 ${
                   selectedProject === index
                     ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                     : 'border-gray-600 hover:border-neon-cyan/50 hover:text-neon-cyan'
                 }`}
               >
                 {project.title.split(' ')[0].toLowerCase()}.{index < 9 ? '0' + (index + 1) : index + 1}
               </motion.button>
             ))}
           </div>
         </div>
       </div>
-
       {/* Project details display - Modern horizontal scrolling */}
       <div className="relative">
         {/* Matrix-style scroll indicator */}
         <div className="flex justify-center mb-6">
           <div className="flex items-center space-x-2 text-sm text-neon-cyan font-mono bg-black/50 px-4 py-2 rounded border border-neon-cyan/30">
             <motion.span
               animate={{ opacity: [1, 0.5, 1] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               ◄
             </motion.span>
             <span>SCROLL_MATRIX</span>
             <motion.span
               animate={{ opacity: [1, 0.5, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
             >
               ►
             </motion.span>
           </div>
         </div>

         <div ref={scrollContainerRef} className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-neon-cyan scrollbar-track-gray-800/50">
           <div className="flex space-x-8 min-w-max px-4">
             {projects.map((project, index) => (
               <motion.div
                 key={project.title}
                 initial={{ opacity: 0, x: 100, scale: 0.8 }}
                 animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                 transition={{ duration: 0.6, delay: index * 0.15 }}
                 className={`glass p-6 transition-all duration-500 cursor-pointer flex-shrink-0 w-96 min-h-[420px] relative group border-2 ${
                   selectedProject === index
                     ? 'border-neon-cyan shadow-2xl shadow-neon-cyan/30 scale-105 bg-gradient-to-br from-neon-cyan/5 to-neon-blue/5'
                     : 'border-gray-600/50 hover:border-neon-cyan/70 hover:shadow-xl hover:shadow-neon-cyan/20 bg-gradient-to-br from-gray-800/30 to-gray-900/30'
                 }`}
                 onClick={() => setSelectedProject(selectedProject === index ? null : index)}
               >
                 {/* Matrix-style header */}
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center space-x-3">
                     <motion.div
                       className="w-4 h-4 bg-neon-cyan rounded-full"
                       animate={{ boxShadow: selectedProject === index ? '0 0 20px rgba(0, 255, 255, 0.8)' : '0 0 0' }}
                       transition={{ duration: 0.3 }}
                     />
                     <span className="text-xs font-mono text-neon-cyan font-bold tracking-wider">
                       {project.command.toUpperCase()}
                     </span>
                   </div>
                   <div className="text-xs font-mono text-gray-400">
                     [{index + 1}/{projects.length}]
                   </div>
                 </div>
-
             {/* Project content */}
             <div className="font-mono">
                   <div className="text-neon-cyan text-sm">
                     <span className="text-green-400">root@portfolio</span>:<span className="text-blue-400">~/projects</span>$ ./execute {project.command}
                   </div>
                   <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                     {project.title}
                   </h3>

                   <p className="text-gray-300 text-sm leading-relaxed">
                     {project.description}
                   </p>

                   {/* Tech stack display */}
                   <div className="space-y-2">
                     <div className="text-xs text-gray-400 font-mono">TECH_STACK:</div>
                     <div className="flex flex-wrap gap-2">
                       {project.tech.split(' ').map((tech, techIndex) => (
                         <motion.span
                           key={tech}
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={isInView ? { opacity: 1, scale: 1 } : {}}
                           transition={{ duration: 0.3, delay: (index * 0.15) + (techIndex * 0.05) }}
                           className="px-2 py-1 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 rounded text-xs text-neon-cyan font-mono"
                         >
                           {tech}
                         </motion.span>
                       ))}
                     </div>
                   </div>
-
                   {/* Interactive terminal buttons */}
                   <div className="flex space-x-3 pt-4 border-t border-gray-600/50">
                     <motion.button
                       whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
                       whileTap={{ scale: 0.95 }}
                       className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/10 border border-neon-cyan/50 rounded text-sm text-neon-cyan font-mono hover:bg-neon-cyan hover:text-black transition-all duration-300"
                     >
                       {'>'} RUN
                     </motion.button>
                     <motion.button
                       whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 128, 255, 0.5)' }}
                       whileTap={{ scale: 0.95 }}
                       className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500 rounded text-sm text-gray-300 font-mono hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
                     >
                       {'>'} VIEW
                     </motion.button>
                   </div>

                   {/* Status indicator */}
                   <div className="flex items-center justify-between text-xs font-mono">
                     <span className={`flex items-center space-x-1 ${selectedProject === index ? 'text-neon-cyan' : 'text-gray-500'}`}>
                       <motion.span
                         animate={{ opacity: selectedProject === index ? [1, 0.5, 1] : 1 }}
                         transition={{ duration: 1, repeat: selectedProject === index ? Infinity : 0 }}
                       >
                         ●
                       </motion.span>
                       <span>{selectedProject === index ? 'ACTIVE' : 'STANDBY'}</span>
                     </span>
                     <span className="text-gray-500">ID: {String(index + 1).padStart(3, '0')}</span>
                   </div>
             </div>
-
                 {/* Matrix rain effect overlay */}
                 {selectedProject === index && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                   >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent animate-pulse"></div>
                     {Array.from({ length: 5 }).map((_, i) => (
                       <motion.div
                         key={i}
                         className="absolute text-neon-cyan/30 text-xs font-mono"
                         initial={{ y: -20, x: Math.random() * 100 + '%' }}
                         animate={{ y: 420 }}
                         transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                       >
                         {Math.random().toString(2).substr(2, 8)}
                       </motion.div>
                     ))}
                   </motion.div>
                 )}
             </motion.div>
           ))}
         </div>
       </div>
     </div>
-
       {/* Terminal output for selected project */}
       {selectedProject !== null && (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mt-8 glass p-6 font-mono text-sm"
         >
           <div className="text-neon-cyan mb-2">
             $ ./run_project.sh --project="{projects[selectedProject].title}"
           </div>
           <div className="text-green-400">
             ✓ Project loaded: {projects[selectedProject].title}<br/>
             ✓ Description: {projects[selectedProject].description}<br/>
             ✓ Tech Stack: {projects[selectedProject].tech}<br/>
             ✓ Status: Active<br/>
           </div>
           <div className="text-gray-400 mt-2">
             Press Ctrl+C to exit project view
           </div>
         </motion.div>
       )}
     </div>
   </section>
 );
};

export default ProjectsSection;
