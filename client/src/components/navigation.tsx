import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  // openResume: put it here (inside the component, before return)
  const openResume = () => {
    try {
      const url = `${window.location.origin}/resume.pdf`; // absolute URL
      // Try opening normally
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (win) {
        win.focus();
        return;
      }
      // Fallback: create a real anchor and click it (bypasses router)
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Failed to open resume:", err);
    }
  };

  // Scroll listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["experience", "skills", "projects", "contact"].map((id, index) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`nav-link text-sm font-medium ${
                activeSection === id ? "text-primary" : ""
              }`}
              data-testid={`nav-${id}`}
            >
              {`0${index + 1}.${id.charAt(0).toUpperCase() + id.slice(1)}`}
            </button>
          ))}
        </div>

        {/* Resume Button — uses openResume */}
     <a
  href="https://drive.google.com/uc?export=download&id=1RyTTioFjkCEwJ22mh3rpxTxOdLoe54vO"
  target="_blank"
  rel="noopener noreferrer"
  className="primary-btn px-6 py-2 rounded-full text-primary-foreground font-medium text-sm"
>
  Resume
</a>
      </div>
    </motion.nav>
  );
}


  


  