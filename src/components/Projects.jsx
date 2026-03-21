import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Code2, ShoppingCart, Store } from 'lucide-react';
import SectionTitle from './SectionTitle';
import matessa from '../assets/images/matessa.png';
import ecommerce from '../assets/images/e-commerce.jpeg';
import globalCsrLogo from '../assets/images/global-csr.png';
import qatarCsrLogo from '../assets/images/qatar-csr.png';
import spainCsrLogo from '../assets/images/spain-csr.png';

// ─── Glass card base ───
const GLASS =
    'bg-[#003049]/30 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

// ─── Project Data ───
const FLAGSHIP_PROJECTS = [
    {
        title: 'Matessa',
        icon: ShoppingCart,
        image: matessa,
        description:
            'A full-featured e-commerce store with secure checkout. Engineered the React frontend to capture precise Google Analytics events and integrated Meta Ads for user acquisition, optimizing the conversion funnel.',
        tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST API', 'JWT Auth'],
        gradient: 'from-[#F77F00]/20 via-[#003049]/40 to-[#D62828]/20',
        accent: '#F77F00',
        demo: 'https://matessa.in',
        source: 'https://github.com/anasha447/Matessa',
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
        isDevelopment: true,
    },
];

const SECONDARY_PROJECTS = [
    {
        title: 'Global CSR',
        icon: Globe,
        image: globalCsrLogo,
        description: 'A digital platform connecting governments, universities, and research institutions to drive sustainability and social responsibility strategies.',
        tags: ['Wordpress', 'PHP', 'Bootstrap'],
        gradient: 'from-[#003049]/40 via-[#F77F00]/10 to-[#003049]/40',
        accent: '#F8F9FA',
        demo: 'https://globalcsr.org/',
        source: '#',
        imageContain: false,
    },
    {
        title: 'QatarCSR',
        icon: Globe,
        image: qatarCsrLogo,
        description: 'A premier platform hosted by Qatar University that champions Corporate Social Responsibility through cross-sector partnerships and major events like the Qatar CSR Summit.',
        tags: ['Wordpress', 'PHP', 'Bootstrap'],
        gradient: 'from-[#003049]/40 via-[#F77F00]/10 to-[#003049]/40',
        accent: '#F8F9FA',
        demo: 'https://qatarcsr.org/',
        source: '#',
        imageContain: false,
    },
    {
        title: 'SpainCSR',
        icon: Globe,
        image: spainCsrLogo,
        description: 'academic institutions to empower students through specialized training and career placements. It elevates global university rankings while aligning academic efforts with international social responsibility and UN standards.',
        tags: ['Wordpress', 'PHP', 'Bootstrap'],
        gradient: 'from-[#003049]/40 via-[#F77F00]/10 to-[#003049]/40',
        accent: '#F8F9FA',
        demo: 'https://spaincsr.org/',
        source: '#',
        imageContain: false,
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
// Notice the new 'imgHeightClass' prop added here
function ProjectCard({ project, imgHeightClass }) {
    const { title, icon: Icon, image, description, tags, gradient, accent, demo, source, isDevelopment, imageContain } = project;
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
            {/* The hardcoded height is replaced with the dynamic 'imgHeightClass' variable */}
            <div className={`relative ${imgHeightClass} bg-[#001c2b]/50 overflow-hidden group-hover:bg-[#001c2b]/70 transition-colors duration-500`}>
                {/* Image or Placeholder */}
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${imageContain ? 'object-contain object-top p-2' : 'object-cover'}`}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#F8F9FA]/20 font-exo font-bold text-lg tracking-widest">
                            PROJECT IMAGE
                        </span>
                    </div>
                )}

                {/* Title overlay */}
                {!imageContain && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#001c2b] to-transparent">
                        <h3 className="font-exo font-bold text-2xl text-[#F8F9FA]">
                            {title}
                        </h3>
                    </div>
                )}
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                {imageContain && (
                    <h3 className="font-exo font-bold text-[22px] text-[#F8F9FA] leading-tight mt-1">
                        {title}
                    </h3>
                )}
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
                    {isDevelopment ? (
                        <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                                     bg-[#F8F9FA]/5 border border-[#F8F9FA]/10 text-[#F8F9FA]/40 font-exo font-semibold text-xs uppercase tracking-widest
                                     cursor-default select-none shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F77F00] animate-pulse" />
                            Under Development
                        </div>
                    ) : (
                        <>
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
                            {source !== '#' && (
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
                            )}
                        </>
                    )}
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
                <SectionTitle>Projects Showcase</SectionTitle>

                {/* ═══ Project Cards Grid ═══ */}
                <div className="flex flex-col gap-8">
                    {/* Row 1: Flagship Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {FLAGSHIP_PROJECTS.map((project) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                /* Set your custom mobile and PC heights here */
                                imgHeightClass="h-[250px] md:h-[350px]"
                            />
                        ))}
                    </div>

                    {/* Row 2: Secondary Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SECONDARY_PROJECTS.map((project) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                /* Set your custom mobile and PC heights here */
                                imgHeightClass="h-[180px] md:h-[220px]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}