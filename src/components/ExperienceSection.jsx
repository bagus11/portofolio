import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperienceSection = ({ experienceRef, experiences }) => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={experienceRef} className="py-20 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text"
          >
            Experience
          </motion.h2>
          {/* Timeline Line */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timeline Section */}
            <motion.div
              ref={ref}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan to-neon-blue"></div>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.3 }}
                  className="relative mb-8 ml-16 cursor-pointer"
                  onClick={() => setSelectedExperience(selectedExperience === index ? null : index)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-20 w-4 h-4 rounded-full border-2 border-black transition-all duration-300 ${
                    selectedExperience === index ? 'bg-neon-cyan scale-125' : 'bg-neon-cyan/50'
                  }`}></div>

                  <motion.div
                    className={`glass-card p-6 rounded-xl transition-all duration-300 ${
                      selectedExperience === index ? 'border-2 border-neon-cyan shadow-2xl shadow-neon-cyan/20' : 'hover:border-neon-cyan/50'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-semibold text-neon-cyan mb-2">{exp.title}</h3>
                    <p className="text-neon-blue mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.period}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Details Section */}
            <div className="lg:pl-8">
              {selectedExperience !== null ? (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-8 rounded-xl sticky top-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-neon-cyan">
                      {experiences[selectedExperience].title}
                    </h3>
                    <span className="text-sm text-gray-400 font-mono">
                      {experiences[selectedExperience].period}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-neon-blue mb-2">
                      {experiences[selectedExperience].company}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {experiences[selectedExperience].description}
                    </p>
                  </div>

                  <div className="border-t border-gray-600 pt-6">
                    <h5 className="text-sm font-semibold text-neon-cyan mb-3">Key Responsibilities:</h5>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Developed and maintained web applications</li>
                      <li>• Collaborated with cross-functional teams</li>
                      <li>• Implemented best practices and coding standards</li>
                      <li>• Participated in code reviews and testing</li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 rounded-xl text-center"
                >
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-300 mb-2">Select an Experience</h4>
                  <p className="text-sm text-gray-500">
                    Click on any experience card to view detailed information
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
