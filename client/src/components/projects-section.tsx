import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Bot, Droplets, Heart } from "lucide-react";

const projects = [
  {
    title: "Floor Marking Robot",
    description: "Designed and programmed an autonomous robot using IR sensors and microcontrollers to detect and follow floor markings, improving navigation precision in defined paths.",
    technologies: ["Arduino", "C++", "IR Sensors"],
    icon: Bot,
    gradient: "from-blue-900 to-purple-900",
    iconColor: "text-blue-300",
    githubUrl: "",
    liveUrl: ""
  },
  {
    title: "Portable Atmospheric Water Generator",
    description: "Developed an innovative device that extracts water from humidity in the air through condensation, providing a sustainable water source solution.",
    technologies: ["Engineering", "IoT", "Sensors"],
    icon: Droplets,
    gradient: "from-cyan-900 to-blue-900",
    iconColor: "text-cyan-300",
    githubUrl: "",
    liveUrl: ""
  },
  {
    title: "Hospital Management System",
    description: "Built a comprehensive role-based system using Java Swing, JDBC, and MySQL to manage patients, doctors, billing, and pharmacy with secure access controls.",
    technologies: ["Java", "MySQL", "Swing"],
    icon: Heart,
    gradient: "from-green-900 to-teal-900",
    iconColor: "text-green-300",
    githubUrl: "",
    liveUrl: ""
  }
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-16 text-center"
          data-testid="heading-projects"
        >
          <span className="text-primary">03.</span> My Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-muted-foreground mb-16"
        >
          Building innovative solutions from robotics to healthcare systems, each project demonstrates my passion for solving real-world problems through technology.
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="project-card rounded-lg p-6"
                data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                  <div className="text-center">
                    <IconComponent className={`text-4xl ${project.iconColor} mb-2`} size={48} />
                    <div className={`text-sm ${project.iconColor.replace('text-', 'text-')}`}>
                      {project.title === 'Floor Marking Robot' ? 'Autonomous Navigation' : 
                       project.title === 'Portable Atmospheric Water Generator' ? 'Water Generation Tech' : 
                       'Healthcare Management'}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3" data-testid={`text-project-title-${index}`}>
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4" data-testid={`text-project-description-${index}`}>
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-primary/20 text-primary px-2 py-1 rounded"
                        data-testid={`text-project-tech-${index}-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        data-testid={`link-project-github-${index}`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        data-testid={`link-project-live-${index}`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
