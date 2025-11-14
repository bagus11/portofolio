import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EducationSection = ({ educationRef, education }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={educationRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text"
        >
          Education
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 rounded-xl text-center"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-neon-cyan mb-2">{education.degree}</h3>
          <p className="text-gray-300">{education.institution}</p>
          <p className="text-gray-400">{education.year}</p>
          <p className="text-gray-400">{education.ipk}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
