import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';

const CVPortfolio = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const fullText = '> Hello, I’m Tomo — Fullstack Developer';

  // Refs for sections
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    let scrollTimer;

    const handleScroll = () => {
      setNavbarVisible(true); // Show navbar on scroll
      clearTimeout(scrollTimer);

      // Hide navbar after 2 seconds of no scrolling
      scrollTimer = setTimeout(() => {
        if (window.scrollY > 100) {
          setNavbarVisible(false);
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = ['CodeIgniter', 'Laravel', 'Flutter', 'Golang','ReactJs','MySQL','Docker','Git','RESTful API'];
const experiences = [
     {
      title: 'System Developer',
      company: 'PT Pralon',
      period: '2022-Present',
      description: 'Leading development of enterprise web applications using Laravel and modern web technologies.'
     },
     {
    title: 'Director',
    company: 'PT 2025 Solusi Digital Kita',
    period: 'Present',   
    description: 'Developed backend systems and APIs for various clients using PHP, Laravel, and Golang.'
     },
  {
    title: 'Commissioner',
    company: 'PT Cyber Lentera 2025',
    period: 'Present',
    description: 'Developed backend systems and APIs for various clients using PHP, Laravel, and Golang.'
  },
  {
    title: 'Web Developer',
    company: 'PT.BPR Kredit Mandiri',
    period: '2021-2022',
    description: 'Developed backend systems and APIs for various clients using PHP, Laravel, and Golang.'
  },   
];
  const projects = [
     {
      name: 'Centro (Central Operasional)',
      command : 'centro',
      description: 'Operational system for BPR Kredit Mandiri',
      title: 'WorkOrder App',
      tech: 'CodeIgniter 3 Full Stack',
     },
     {
      name: 'CMS (Customer Management System)',
      command : 'cms',
      description: 'Customer management and tracking system',
      title: 'WorkOrder App',
      tech: 'CodeIgniter 3 Full Stack',
    },
    {
      name: 'Mocca',
      command : 'mocca',
      description: 'Location tracking for collection staff field workers',
      title: 'Mocca App',
      tech: 'CodeIgniter 3 Full Stack + React Native',
    },
    {
      name: 'Work Order',
      command : 'workorder',
      description: 'IT ticketing system for IT support',
      title: 'WorkOrder App',
      tech: 'Laravel 8 Full Stack + Laravel API + Flutter Mobile',
    },
    {
      name: 'IMS (Inventory Management System)',
      command : 'ims',
      description: 'Control and monitoring of consumable items',
       title: 'ims',
      tech: 'CodeIgniter 3 Full Stack',
    },
    {
      name: 'OEE',
      command: 'oee',
      description: 'Monitoring defects and machine logs',
       title: 'OEE',
      tech: 'Laravel 8',
    },
    {
      name: 'Bagspace',
      command: 'bagspace',
      description: 'Project management system similar to Trello',
      title: 'Bagspace (Bagoes Space)',
      tech: 'Laravel 10',
    },
    {
      name: 'LIMS',
      command: 'lims',
      description: 'Laboratory QC system',
       title: 'LIMS',
      tech: 'Laravel 10 Full Stack',
    },
    {
      name: 'LMS (Learning Management System)',
      command: 'lms',
      description: 'Learning and training management platform',
       title: 'LMS',
      tech: 'Golang Backend + React Frontend',
    },
    {
      name: 'Sisinfolog OPPD',
      command: 'sisinfo-oppd',
      description: 'World peacekeeping force system with asset, marketing, training, operational modules',
       title: 'sisinfo-oppd',
      tech: 'Laravel 10 Full Stack',
    },
  
   ];
  const education = {
    degree: 'Associate Degree in Information Technology',
    institution: 'Politeknik Negeri Semarang',
    year: '2020',
    ipk : '3.54 / 4.00',
  };

  const navItems = [
    { name: 'Home', ref: heroRef },
    { name: 'About', ref: aboutRef },
    { name: 'Skills', ref: skillsRef },
    { name: 'Experience', ref: experienceRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'Education', ref: educationRef },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark text-white font-inter overflow-x-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs font-mono"
            initial={{ y: -100, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10 }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        ))}
      </div>

      {/* Modern Tech Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navbarVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-neon-cyan/30 shadow-lg shadow-neon-cyan/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">BS</span>
                </div>
                <span className="text-neon-cyan font-mono font-bold text-lg tracking-wider">BAGOES</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.ref)}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-all duration-300 rounded-lg group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    {/* Active indicator */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-neon-cyan rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                className="p-2 text-gray-300 hover:text-neon-cyan transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full border border-green-400/30">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 font-mono text-xs">ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.nav>

      {/* Header / Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <img
              src="/src/assets/hero.jpg"
              alt="Bagus Slamet Oetomo"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-neon-cyan neon-glow"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4 neon-text"
          >
            Bagus Slamet Oetomo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl mb-8 text-neon-blue"
          >
            Fullstack Developer / Mobile Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mb-8"
          >
            <span className="text-lg font-mono bg-black/50 px-4 py-2 rounded border border-neon-cyan/50 inline-block">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-6 py-3 bg-neon-cyan text-black font-semibold rounded-lg hover:neon-glow transition-all duration-300 transform hover:scale-105">
              Download CV
            </button>
            <button className="px-6 py-3 border border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 transform hover:scale-105">
              Contact Me
            </button>
          </motion.div>
        </div>
      </section>

      <AboutSection aboutRef={aboutRef} />

      <SkillsSection skillsRef={skillsRef} skills={skills} />

      <ExperienceSection experienceRef={experienceRef} experiences={experiences} />

      <section ref={projectsRef}>
        <ProjectsSection projects={projects} />
      </section>

      <EducationSection educationRef={educationRef} education={education} />
    </div>
  );
};



export default CVPortfolio;
