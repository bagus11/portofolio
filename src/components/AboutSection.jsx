import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = ({ aboutRef }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: '⚡', text: 'Full-Stack Expertise', desc: 'Backend & Frontend' },
    { icon: '🔧', text: 'Tech Stack', desc: 'Laravel, Flutter, Golang' },
    { icon: '🚀', text: 'Performance', desc: 'Scalable Solutions' },
    { icon: '🔒', text: 'Security', desc: 'Secure Applications' }
  ];

  return (
    <section ref={aboutRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center neon-text"
        >
          About Me
        </motion.h2>

        {/* Main About Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl mb-12 relative"
        >
          {/* Terminal-style header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-mono text-gray-400">about_me.sh</span>
          </div>

          <div className="font-mono text-sm mb-4">
            <span className="text-neon-cyan">$ cat about.txt</span>
          </div>

          <p className="text-lg leading-relaxed text-gray-300 mb-8">
           I’m a full-stack developer passionate about crafting clean, scalable, and secure applications. With experience in Laravel, CodeIgniter, Flutter, and Golang, I handle everything from backend logic and frontend design to server setup and security optimization.
          </p>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 hover:border-neon-cyan/50 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open('mailto:bagus.oetomo11@gmail.com', '_blank')}
            >
              <div className="text-2xl group-hover:text-neon-cyan transition-colors">📧</div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-neon-cyan font-medium group-hover:text-white transition-colors">bagus.oetomo11@gmail.com</div>
              </div>
            </motion.div>

            {/* WhatsApp Button - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open('https://wa.me/6287786873454', '_blank')}
            >
              <div className="text-2xl group-hover:text-green-400 transition-colors">💬</div>
              <div>
                <div className="text-sm text-gray-400">WhatsApp</div>
                <div className="text-neon-cyan font-medium group-hover:text-white transition-colors">+6287786873454</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open('https://www.linkedin.com/in/bagus-slamet-oetomo-61534b1a6/', '_blank')}
            >
              <div className="text-2xl group-hover:text-blue-400 transition-colors">💼</div>
              <div>
                <div className="text-sm text-gray-400">LinkedIn</div>
                <div className="text-neon-cyan font-medium group-hover:text-white transition-colors">Bagus Slamet Oetomo</div>
              </div>
            </motion.div>
          </div>

          {/* Tech highlights - Horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 md:space-x-6 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex-shrink-0 w-48 md:w-auto glass p-4 rounded-lg border border-gray-600/50 hover:border-neon-cyan/50 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2 group-hover:text-neon-cyan transition-colors">
                    {highlight.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                    {highlight.text}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {highlight.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Timeline - Vertical scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-8 rounded-2xl"
        >
          {/* <h3 className="text-xl font-bold mb-6 text-neon-cyan font-mono">
            $ ls skills/
          </h3>

          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-neon-cyan/30 scrollbar-track-gray-800/30">
            {[
              { tech: 'Laravel', level: 'Expert', color: 'text-orange-400' },
              { tech: 'CodeIgniter', level: 'Expert', color: 'text-red-400' },
              { tech: 'Flutter', level: 'Advanced', color: 'text-blue-400' },
              { tech: 'Golang', level: 'Advanced', color: 'text-cyan-400' },
              { tech: 'React', level: 'Intermediate', color: 'text-blue-500' },
              { tech: 'MySQL', level: 'Expert', color: 'text-blue-600' },
              { tech: 'Docker', level: 'Advanced', color: 'text-blue-400' },
              { tech: 'Git', level: 'Expert', color: 'text-orange-500' }
            ].map((skill, index) => (
              <motion.div
                key={skill.tech}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-800/30 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-neon-cyan font-mono text-sm">●</span>
                  <span className="font-medium text-white group-hover:text-neon-cyan transition-colors">
                    {skill.tech}
                  </span>
                </div>
                <span className={`text-sm font-medium ${skill.color}`}>
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
