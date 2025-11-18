import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import heroImage from './assets/hero.jpg';

const codeSnippets = [
  'const developer = { skills: ["React", "Node.js", "Python"], passion: "coding" };',
  'function buildFuture() { return "innovative solutions"; }',
  'while(true) { innovate(); create(); deploy(); }',
  'git commit -m "Building tomorrow\'s technology today"',
  'npm install creativity && npm install innovation',
  'docker run -it --name future /dev/null'
];

const CVPortfolio = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const fullText = '> Hello, I’m Tomo — Fullstack Developer';

  // Refs for sections
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

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
    if (!isLoading) {
      const snippetTimer = setInterval(() => {
        setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
      }, 3000);

      return () => clearInterval(snippetTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setCodeSnippet(''); // Reset snippet
      let i = 0;
      const currentSnippet = codeSnippets[currentSnippetIndex];
      const typeTimer = setInterval(() => {
        if (i <= currentSnippet.length) {
          setCodeSnippet(currentSnippet.slice(0, i));
          i++;
        } else {
          clearInterval(typeTimer);
        }
      }, 50);

      return () => clearInterval(typeTimer);
    }
  }, [currentSnippetIndex, isLoading]);

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

      // Update active section based on scroll position
      const sections = [
        { id: 'home', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'experience', ref: experienceRef },
        { id: 'projects', ref: projectsRef },
        { id: 'education', ref: educationRef },
        { id: 'contact', ref: contactRef },
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          const offsetBottom = offsetTop + section.ref.current.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Disable right-click, inspect element, and Ctrl+U
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Disable F12 (inspect element)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+U (view source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I (inspect element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+C (inspect element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+J (console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+K (console in some browsers)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
      }
      // Disable F1 (help menu that can lead to dev tools)
      if (e.keyCode === 112) {
        e.preventDefault();
        return false;
      }
    };

    // Detect and auto-close developer tools
    const checkDevTools = () => {
      const threshold = 160; // Threshold for detecting dev tools
      const check = () => {
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
          // Developer tools detected, redirect to blank page
          window.location.href = 'about:blank';
        }
      };

      // Check every 500ms
      const interval = setInterval(check, 500);

      return () => clearInterval(interval);
    };

    const cleanupDevToolsCheck = checkDevTools();

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      cleanupDevToolsCheck();
    };
  }, []);

  const scrollToSection = (ref, sectionId) => {
    if (ref.current) {
      const navbarHeight = 64; // h-16 = 64px
      const elementPosition = ref.current.offsetTop - navbarHeight;

      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const skills = ['CodeIgniter', 'Laravel', 'Flutter', 'Golang','ReactJs','MySQL','Docker','Git','RESTful API', 'Redis'];
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
      description: 'Developed HRIS systems and APIs for various clients using PHP, Laravel, and Golang.'
     },
    {
      title: 'Commissioner',
      company: 'PT Cyber Lentera 2025',
      period: 'Present',
      description: 'Developed Cyber security systems and APIs for various clients using Reactjs and Golang with microservices architechture.'
    },
    {
      title: 'Web Developer',
      company: 'PT.BPR Kredit Mandiri',
      period: '2021-2022',
      description: 'Developed internal operation systems using PHP, Codeigniter 3.'
    },   
];
  const projects = [
     {
      name: 'Centro (Central Operasional)',
      command : 'centro',
      description: 'Operational system for BPR Kredit Mandiri',
      title: 'Centro',
      tech: 'CodeIgniter 3 Full Stack',
     },
     {
      name: 'CMS (Customer Management System)',
      command : 'cms',
      description: 'Customer management and tracking system',
      title: 'CMS',
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
      command : 'work-order',
      description: 'IT ticketing system for IT support',
      title: 'WorkOrder App',
      tech: 'Laravel 8 Full Stack + Laravel API + Flutter Mobile',
    },
    {
      name: 'IMS (Inventory Management System)',
      command : 'ims',
      description: 'Control and monitoring of consumable items',
       title: 'IMS App',
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
    { name: 'Contact', ref: contactRef },
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
                  <span className="text-black font-bold text-sm">T</span>
                </div>
                <span className="text-neon-cyan font-mono font-bold text-lg tracking-wider">TOMO</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.ref, item.name.toLowerCase())}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-neon-cyan'
                        : 'text-gray-300 hover:text-neon-cyan'
                    }`}
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
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-neon-cyan rounded-full transition-all duration-300 ${
                        activeSection === item.name.toLowerCase()
                          ? 'w-full'
                          : 'w-0 group-hover:w-3/4'
                      }`}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-neon-cyan transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
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

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-neon-cyan/30"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.ref, item.name.toLowerCase())}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === item.name.toLowerCase()
                    ? 'text-neon-cyan bg-neon-cyan/10 border-l-4 border-neon-cyan'
                    : 'text-gray-300 hover:text-neon-cyan hover:bg-neon-cyan/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

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
              src={heroImage}
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
            className="text-center space-y-4"
          >
            <motion.div
              className="bg-black/60 backdrop-blur-sm border border-neon-cyan/30 rounded-lg p-4 max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-400 font-mono ml-2">terminal</span>
              </div>
              <div className="text-left">
                <span className="text-green-400 font-mono text-sm">$ </span>
                <span className="text-neon-cyan font-mono text-sm">
                  {codeSnippet}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <div className="flex space-x-2">
                <motion.div
                  className="w-2 h-2 bg-neon-cyan rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 bg-neon-blue rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
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

      <ContactSection contactRef={contactRef} />
    </div>
  );
};



export default CVPortfolio;
