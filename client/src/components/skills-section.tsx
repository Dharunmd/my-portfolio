import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, Settings, FileCode, Cpu, Cloud, GitBranch, Monitor } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Java", icon: Cpu, color: "bg-orange-600" },
      { name: "SQL", icon: Database, color: "bg-blue-500" },
      { name: "HTML", icon: FileCode, color: "bg-orange-500" },
      { name: "CSS", icon: Code, color: "bg-blue-600" },
      { name: "Python", icon: FileCode, color: "bg-green-600" },
      { name: "C", icon: Code, color: "bg-blue-800" }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: Database, color: "bg-blue-500" },
      { name: "MongoDB", icon: Database, color: "bg-green-500" },
      { name: "PostgreSQL", icon: Database, color: "bg-blue-700" }
    ]
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "AWS", icon: Cloud, color: "bg-orange-500" },
      { name: "Azure", icon: Cloud, color: "bg-blue-600" },
      { name: "Git", icon: GitBranch, color: "bg-orange-600" },
      { name: "GitHub", icon: Code, color: "bg-gray-800" }
    ]
  }
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-16 text-center"
          data-testid="heading-skills"
        >
          <span className="text-primary">02.</span> My Skills
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="skill-card rounded-lg p-6 hover-lift"
              data-testid={`card-skills-${category.title.toLowerCase()}`}
            >
              <h3 className="text-xl font-semibold mb-6 text-center" data-testid={`heading-skills-${category.title.toLowerCase()}`}>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={skillIndex} className="flex flex-col items-center space-y-2">
                      <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="text-white text-xl" size={24} />
                      </div>
                      <span className="text-sm text-center" data-testid={`text-skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
