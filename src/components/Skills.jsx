
import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';
import SectionTitle from './SectionTitle';

// ─── React Icons ───
import { FaJava } from 'react-icons/fa';
import {
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiMongodb,
    SiSpringboot,
    SiReact,
    SiDocker,
    SiGit,
    SiTailwindcss,
    SiMysql,
    SiPostgresql,
    SiMui,
    SiCanva,
    SiPostman,
    SiAdobephotoshop,
    SiAdobeillustrator,
} from 'react-icons/si';

// ─── SkillCard ───
function SkillCard({ icon: Icon, name }) {
    return (
        <div
            className="bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/5 rounded-xl
                       px-6 py-4 min-w-[180px] flex items-center gap-4
                       transition-all duration-500
                       hover:bg-[#003049]/50 hover:border-[#D62828]/30 hover:shadow-[0_4px_20px_rgba(214,40,40,0.15)]
                       group cursor-default select-none"
        >
            <Icon
                size={32}
                className="flex-shrink-0 transition-all duration-500 group-hover:scale-110"
                style={{ color: '#F77F00' }} // Base Orange
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D62828')} // Hover Danger Red
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F77F00')}
            />
            {/* 
              Tailwind hover:text-[#D62828] might not override inline style effectively 
              without !important if style is set. 
              Let's use classes for cleaner approach if possible, but inline style ensures override.
              Actually, let's use tailwind classes with !important or just classes.
            */}
            <style jsx>{`
                .skill-icon { color: #F77F00; transition: color 0.3s ease, transform 0.3s ease; }
                .group:hover .skill-icon { color: #D62828; }
            `}</style>

            <div className="flex flex-col">
                <span className="font-exo font-bold text-sm text-[#F8F9FA] uppercase tracking-wide leading-tight group-hover:text-white transition-colors">
                    {name}
                </span>
            </div>
        </div>
    );
}

// ─── Data: Core Stack ───
const coreStack = [
    { icon: FaJava, name: 'Java' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiReact, name: 'React' },
    { icon: SiTypescript, name: 'TypeScript' },
    { icon: SiNodedotjs, name: 'Node JS' },
    { icon: SiHtml5, name: 'HTML5' },
    { icon: SiCss3, name: 'CSS3' },
    { icon: SiTailwindcss, name: 'Tailwind' },
];

// ─── Data: Tools & Ecosystem ───
const ecosystem = [
    { icon: SiDocker, name: 'Docker' },
    { icon: SiGit, name: 'Git' },
    { icon: SiPostman, name: 'Postman' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: SiPostgresql, name: 'PostgreSQL' }, // Added
    { icon: SiSpringboot, name: 'Spring Boot' }, // Added (also in core, but requested here)
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiAdobephotoshop, name: 'Photoshop' }, // Added
    { icon: SiAdobeillustrator, name: 'Illustrator' }, // Added
    // Removed Figma, Firebase
];

// ─── Framer variants ───
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// ─── Component ───
export default function Skills() {
    return (
        <motion.section
            id="skills"
            className="relative z-10 py-24 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col gap-12">

                {/* ═══ Section Title ═══ */}
                <motion.div variants={itemVariants}>
                    <SectionTitle>Tech Stack</SectionTitle>
                </motion.div>

                {/* ═══ Loops Container ═══ */}
                <motion.div className="flex flex-col gap-16" variants={itemVariants}>

                    {/* Core Stack */}
                    <div className="space-y-6">
                        <h3 className="text-center font-exo text-xs text-[#F8F9FA]/40 uppercase tracking-[0.4em]">
                            Core Stack
                        </h3>
                        <LogoLoop
                            items={coreStack}
                            renderItem={(item) => (
                                <div
                                    className="bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/5 rounded-xl
                                            px-6 py-4 min-w-[180px] flex items-center gap-4
                                            transition-all duration-500
                                            hover:bg-[#003049]/50 hover:border-[#D62828]/30 hover:shadow-[0_4px_20px_rgba(214,40,40,0.15)]
                                            group cursor-default select-none"
                                >
                                    <item.icon
                                        size={32}
                                        className="flex-shrink-0 transition-all duration-500 group-hover:scale-110 text-[#F77F00] group-hover:text-[#D62828]"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-exo font-bold text-sm text-[#F8F9FA] uppercase tracking-wide leading-tight group-hover:text-white transition-colors">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            )}
                            speed={25}
                            direction="left"
                            gap={24}
                            pauseOnHover
                        />
                    </div>

                    {/* Tools & Ecosystem */}
                    <div className="space-y-6">
                        <h3 className="text-center font-exo text-xs text-[#F8F9FA]/40 uppercase tracking-[0.4em]">
                            Tools
                        </h3>
                        <LogoLoop
                            items={ecosystem}
                            renderItem={(item) => (
                                <div
                                    className="bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/5 rounded-xl
                                            px-6 py-4 min-w-[180px] flex items-center gap-4
                                            transition-all duration-500
                                            hover:bg-[#003049]/50 hover:border-[#D62828]/30 hover:shadow-[0_4px_20px_rgba(214,40,40,0.15)]
                                            group cursor-default select-none"
                                >
                                    <item.icon
                                        size={32}
                                        className="flex-shrink-0 transition-all duration-500 group-hover:scale-110 text-[#F77F00] group-hover:text-[#D62828]"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-exo font-bold text-sm text-[#F8F9FA] uppercase tracking-wide leading-tight group-hover:text-white transition-colors">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            )}
                            speed={25}
                            direction="right"
                            gap={24}
                            pauseOnHover
                        />
                    </div>

                </motion.div>
            </div>
        </motion.section>
    );
}
