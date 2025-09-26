import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Software Intern@DRDO",
    period: "June 2025 - July 2025",
    location: "Delhi, India",
    description: [
      "Working on a platform to digitalize transfer operations.",
      "Collaborating on innovative projects."
    ]
  },
  {
    title: "Mentor@MentorPal",
    period: "2024 - Present",
    location: "Remote",
    description: [
      "Mentoring students in web development and programming concepts",
      "Conducting code reviews and technical guidance sessions"
    ]
  },
  {
    title: "Core Team Member@GDSC",
    period: "2024",
    location: "University",
    description: [
      "Organizing technical workshops and events",
      "Contributing to open-source projects and community initiatives"
    ]
  }
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-16 text-center"
          data-testid="heading-experience"
        >
          <span className="text-primary">01.</span> Work Experience
        </motion.h2>
        
        <div className="space-y-12 ml-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="timeline-item"
            >
              <div className="bg-secondary/50 border border-border rounded-lg p-6 hover-lift">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary" data-testid={`text-experience-title-${index}`}>
                    {exp.title}
                  </h3>
                  <span className="text-sm text-muted-foreground" data-testid={`text-experience-period-${index}`}>
                    {exp.period}
                  </span>
                </div>
                {exp.location && (
                  <p className="text-muted-foreground mb-4" data-testid={`text-experience-location-${index}`}>
                    {exp.location}
                  </p>
                )}
                <ul className="space-y-2 text-muted-foreground">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} data-testid={`text-experience-description-${index}-${itemIndex}`}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
