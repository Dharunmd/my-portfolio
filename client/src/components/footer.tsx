import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative py-8 px-6 border-t border-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground text-sm" data-testid="text-footer-credit">
          Developed & Designed with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> by{" "}
          <a 
            href="https://github.com/dharunmd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
            data-testid="link-footer-author"
          >
            Dharun M
          </a>
        </p>
        <p className="text-muted-foreground text-xs mt-2" data-testid="text-footer-year">
          © 2025
        </p>
      </div>
    </motion.footer>
  );
}
