import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Code2, ShoppingCart, Store } from 'lucide-react';
import matessa from '../assets/images/matessa.png';
import ecommerce from '../assets/images/e-commerce.jpeg';


// ─── Glass card base ───
const GLASS =
    'bg-[#003049]/30 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

// ─── Project Data ───
const PROJECTS = [
    {
        title: 'Matessa',
        icon: ShoppingCart,
        image: matessa,
        description:
            'A full-featured e-commerce store with product catalog, cart management, secure checkout, and order tracking — built for a seamless shopping experience.',
        tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST API', 'JWT Auth'],
        gradient: 'from-[#F77F00]/20 via-[#003049]/40 to-[#D62828]/20',
        accent: '#F77F00',
        demo: 'https://matessa.in',
        source: '#',
    },
    {
        title: 'SyriaMart',
        icon: Store,
        image: ecommerce,
        description:
            'A multi-vendor marketplace powered by microservices architecture — featuring vendor onboarding, product management, and distributed order processing.',
        tags: ['Java', 'Spring Boot', 'React', 'Microservices', 'Docker', 'PostgreSQL', 'Kafka', 'API Gateway', 'MapStruct'],
        gradient: 'from-[#D62828]/20 via-[#003049]/40 to-[#F77F00]/20',
        accent: '#D62828',
        demo: '#',
        source: '#',
    },
];

// ─── Framer variants ───
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

// ─── Tag pill ───
function Tag({ label }) {
    return (
        <span className="px-3 py-1 text-[11px] font-exo font-medium tracking-wide uppercase rounded-full border border-[#F8F9FA]/10 bg-[#003049]/40 text-[#F8F9FA]/70 whitespace-nowrap">
            {label}
        </span>
    );
}

// ─── Project Card ───
function ProjectCard({ project }) {
    const { title, icon: Icon, image, description, tags, gradient, accent, demo, source } = project;
    const [showAllTags, setShowAllTags] = useState(false);

    const MAX_VISIBLE_TAGS = 5;
    const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
    const hiddenTags = tags.slice(MAX_VISIBLE_TAGS);
    const overflow = hiddenTags.length;

    return (
        <motion.div
            className={`${GLASS} overflow-hidden flex flex-col`}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onMouseLeave={() => setShowAllTags(false)}
        >
            {/* ── Screenshot / Hero area ── */}
            <div className={`relative h-64 bg-[#001c2b]/50 overflow-hidden group-hover:bg-[#001c2b]/70 transition-colors duration-500`}>
                {/* Image or Placeholder */}
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#F8F9FA]/20 font-exo font-bold text-lg tracking-widest">
                            PROJECT IMAGE
                        </span>
                    </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#001c2b] to-transparent">
                    <h3 className="font-exo font-bold text-2xl text-[#F8F9FA]">
                        {title}
                    </h3>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Description */}
                <p className="font-exo font-light text-sm text-[#F8F9FA]/70 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 items-center relative">
                    {visibleTags.map((tag) => (
                        <Tag key={tag} label={tag} />
                    ))}

                    {overflow > 0 && (
                        <div className="relative">
                            <motion.span
                                className="px-2.5 py-1 text-[11px] font-exo font-bold rounded-full border border-[#F77F00]/30 bg-[#F77F00]/10 text-[#F77F00] cursor-pointer hover:bg-[#F77F00]/20 transition-colors"
                                onMouseEnter={() => setShowAllTags(true)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAllTags(!showAllTags);
                                }}
                            >
                                +{overflow}
                            </motion.span>

                            <AnimatePresence>
                                {showAllTags && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="absolute bottom-full left-0 mb-3 z-50 p-3 flex flex-wrap gap-2 min-w-[200px] bg-[#001c2b]/95 backdrop-blur-xl border border-[#F8F9FA]/10 rounded-2xl shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {hiddenTags.map((tag) => (
                                            <Tag key={tag} label={tag} />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                   bg-[#F77F00] text-white font-exo font-semibold text-xs uppercase tracking-wider
                                   transition-all duration-300 hover:shadow-[0_0_20px_rgba(247,127,0,0.4)] hover:scale-[1.02]"
                    >
                        Live Demo
                    </a>
                    <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                   border border-[#F8F9FA]/15 text-[#F8F9FA]/80 font-exo font-semibold text-xs uppercase tracking-wider
                                   transition-all duration-300 hover:border-[#F77F00]/50 hover:text-[#F77F00] hover:scale-[1.02]"
                    >
                        Source
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Section ───
export default function Projects() {
    return (
        <motion.section
            id="projects"
            className="relative z-10 px-6 md:px-16 lg:px-24 py-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-14">
                {/* ═══ Section Title ═══ */}
                <motion.div
                    className="relative flex items-center justify-center"
                    variants={cardVariants}
                >
                    {/* Red accent line behind the pill */}
                    <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#D62828]/30 overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-24 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent, #D62828, transparent)',
                                animation: 'timelineGlow 4s ease-in-out infinite',
                            }}
                        />
                    </div>

                    {/* Title pill */}
                    <div className="relative z-10 bg-[#003049]/40 backdrop-blur-xl border border-[#F8F9FA]/10 rounded-full px-10 py-4 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                        <h2 className="font-['Train_One'] font-normal text-2xl md:text-3xl text-[#F77F00] text-center tracking-wider">
                            Projects Showcase
                        </h2>
                    </div>
                </motion.div>

                {/* ═══ Project Cards Grid ═══ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
