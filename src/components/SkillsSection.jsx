import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsSection = ({ skillsRef, skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(0);

  const skillData = skills.map(skill => ({
    name: skill,
    level: skill === 'CodeIgniter' ? 90 : skill === 'Laravel' ? 85 : skill === 'Flutter' ? 80 : 75
  }));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(skillData.length / itemsPerPage);
  const paginatedSkills = skillData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section ref={skillsRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text"
        >
          Skills
        </motion.h2>

        {/* Clean Skills Display */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 rounded-2xl"
        >
          {/* Skills Grid/List */}
          <div className="md:hidden space-y-4">
            {paginatedSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                {/* Mobile: Horizontal List Layout */}
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 hover:border-neon-cyan/50 transition-all duration-300">
                  {/* Skill Icon */}
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-gray-600 group-hover:border-neon-cyan transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xl font-bold text-neon-cyan">
                      {skill.name.charAt(0)}
                    </span>
                  </motion.div>

                  {/* Skill Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors truncate">
                      {skill.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-neon-cyan">
                        {skill.level}%
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        skill.level >= 85
                          ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                          : skill.level >= 75
                          ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                          : 'bg-gray-600/50 text-gray-300 border border-gray-500/50'
                      }`}>
                        {skill.level >= 85 ? 'Expert' : skill.level >= 75 ? 'Advanced' : 'Intermediate'}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-r from-neon-cyan to-neon-blue h-full rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Vertical Card Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillData.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center group"
                >
                  {/* Skill Icon */}
                  <div className="relative mb-6">
                    <motion.div
                      className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-neon-cyan/10 to-neon-blue/10 border-2 border-gray-600 group-hover:border-neon-cyan transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-3xl font-bold text-neon-cyan">
                          {skill.name.charAt(0)}
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Progress Ring */}
                    <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(55, 65, 81, 0.4)"
                        strokeWidth="2"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: skill.level / 100 } : { pathLength: 0 }}
                        transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00ffff" />
                          <stop offset="100%" stopColor="#0080ff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Skill Info */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                    {skill.name}
                  </h3>

                  <div className="space-y-3">
                    {/* Percentage */}
                    <div className="text-2xl font-bold text-neon-cyan">
                      {skill.level}%
                    </div>

                    {/* Proficiency Level */}
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                      skill.level >= 85
                        ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                        : skill.level >= 75
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                        : 'bg-gray-600/50 text-gray-300 border border-gray-500/50'
                    }`}>
                      {skill.level >= 85 ? 'Expert' : skill.level >= 75 ? 'Advanced' : 'Intermediate'}
                    </div>

                    {/* Skill Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-r from-neon-cyan to-neon-blue h-full rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-neon-cyan transition-all duration-300 text-white font-medium"
            >
              Previous
            </button>
            <span className="text-gray-300">
              {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-neon-cyan transition-all duration-300 text-white font-medium"
            >
              Next
            </button>
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-gradient-to-br from-neon-cyan/5 to-transparent border border-neon-cyan/20">
                <div className="text-3xl font-bold text-neon-cyan mb-2">
                  {skillData.filter(s => s.level >= 85).length}
                </div>
                <div className="text-sm text-gray-300 font-medium">Expert Level</div>
                <div className="text-xs text-gray-400 mt-1">85%+</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-neon-blue/5 to-transparent border border-neon-blue/20">
                <div className="text-3xl font-bold text-neon-blue mb-2">
                  {skillData.filter(s => s.level >= 75 && s.level < 85).length}
                </div>
                <div className="text-sm text-gray-300 font-medium">Advanced Level</div>
                <div className="text-xs text-gray-400 mt-1">75-84%</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-gray-600/20 to-transparent border border-gray-500/30">
                <div className="text-3xl font-bold text-gray-300 mb-2">
                  {skillData.filter(s => s.level < 75).length}
                </div>
                <div className="text-sm text-gray-300 font-medium">Intermediate Level</div>
                <div className="text-xs text-gray-400 mt-1">{'<75%'}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
