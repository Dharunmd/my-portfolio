import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg font-medium text-muted-foreground"
          >
            Hi, my name is
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-7xl font-bold gradient-text"
            data-testid="text-hero-name"
          >
            Dharun M
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center space-x-2 text-xl text-muted-foreground"
          >
            <span>AI</span>
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-6 bg-primary"
            />
            <span>Developer</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            data-testid="text-hero-description"
          >
            B.Tech in Artificial Intelligence and Data Science student passionate about building innovative solutions. From robotics to healthcare systems, I love creating technology that makes a difference.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="profile-img w-80 h-80 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
              <User size={120} className="text-muted-foreground" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
