import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-8 gradient-text-primary"
          data-testid="heading-contact"
        >
          LET'S CONNECT
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto"
          data-testid="text-contact-description"
        >
          "Whether it's about a project, an opportunity, or just to say hello, I'd love to hear from you! Let's create something amazing together."
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-between"
        >
          {/* Social Icons Left */}
          <div className="flex flex-col space-y-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl text-muted-foreground hover:text-primary"
              data-testid="link-social-github"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl text-muted-foreground hover:text-primary"
              data-testid="link-social-linkedin"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl text-muted-foreground hover:text-primary"
              data-testid="link-social-instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl text-muted-foreground hover:text-primary"
              data-testid="link-social-twitter"
            >
              <Twitter size={24} />
            </a>
          </div>

          {/* Center Button */}
          <button 
            className="primary-btn px-12 py-4 rounded-full text-primary-foreground font-semibold text-lg"
            onClick={() => window.location.href = 'mailto:your.email@example.com'}
            data-testid="button-reach-out"
          >
            Reach Out
          </button>

          {/* Email Right (Vertical) */}
          <div className="vertical-text text-muted-foreground text-sm tracking-wider" data-testid="text-email-vertical">
            your.email@example.com
          </div>
        </motion.div>
      </div>
    </section>
  );
}
