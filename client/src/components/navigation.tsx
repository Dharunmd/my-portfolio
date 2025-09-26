import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id || "");
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize active section on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('experience')}
              className={`nav-link text-sm font-medium ${activeSection === 'experience' ? 'text-primary' : ''}`}
              data-testid="nav-experience"
            >
              01.Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className={`nav-link text-sm font-medium ${activeSection === 'skills' ? 'text-primary' : ''}`}
              data-testid="nav-skills"
            >
              02.Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`nav-link text-sm font-medium ${activeSection === 'projects' ? 'text-primary' : ''}`}
              data-testid="nav-projects"
            >
              03.Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`nav-link text-sm font-medium ${activeSection === 'contact' ? 'text-primary' : ''}`}
              data-testid="nav-contact"
            >
              04.Contact
            </button>
          </div>

          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="primary-btn px-6 py-2 rounded-full text-primary-foreground font-medium text-sm"
            data-testid="button-resume"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
