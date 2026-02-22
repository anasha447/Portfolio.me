
import { motion } from 'framer-motion';
import {
    Lightbulb,
    ClipboardList,
    BrainCircuit,
    CodeXml,
    Search,
    FlaskConical,
    BookOpen,
} from 'lucide-react';
import TiltedCard from './TiltedCard';
import profilephoto from '../assets/images/myfoto.png';

import SectionTitle from './SectionTitle';

// ─── Glass card base style ───
const GLASS =
    'bg-[#003049]/30 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

// ─── Process steps ───
const STEPS = [
    { icon: Lightbulb, label: 'IDEA' },
    { icon: ClipboardList, label: 'PLAN' },
    { icon: BrainCircuit, label: 'AI HELP' },
    { icon: CodeXml, label: 'CODE' },
    { icon: Search, label: 'REVIEW' },
    { icon: FlaskConical, label: 'TEST' },
    { icon: BookOpen, label: 'LEARN', active: true },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function About() {
    return (
        <section
            id="about"
            className="relative z-10 px-6 md:px-10 lg:px-24 py-10"
        >
            <motion.div
                className="w-full max-w-[1400px] mx-auto flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >

                {/* ═══ Top Section: 3-column grid (2/3 Text, 1/3 Image) ═══ */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                    {/* ─── Left Column: Content (Equal Height) ─── */}
                    <div className="lg:col-span-2 flex flex-col gap-6 h-full justify-center items-center">

                        {/* Title with Blur Background - Explicit Motion Div for visibility */}
                        <div
                            className="px-8  w-fit relative  "

                        >
                            <SectionTitle className="!mb-0">About Me</SectionTitle>
                        </div>

                        {/* Text Card with Accent Line (Fills remaining height) */}
                        <motion.div
                            className={`${GLASS} p-8 md:p-10 relative overflow-hidden flex-1 flex flex-col justify-center`}
                            variants={cardVariants}
                        >
                            {/* Vertical Accent Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#F77F00] to-[#D62828]" />

                            {/* Background Glow */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F77F00]/10 blur-3xl rounded-full pointer-events-none" />

                            <div className="space-y-6 text-[#F8F9FA] font-roboto text-base md:text-lg leading-relaxed text-justify md:text-left relative z-10 pl-4">
                                <p>
                                    I am <span className="text-[#F77F00] font-bold">Anas Habib</span>, a specialized Full-Stack Architect with a deep focus on <span className="text-[#F8F9FA] font-semibold">E-commerce ecosystems</span>. My expertise lies in architecting robust, scalable microservices using <span className="text-[#F77F00]">Java Spring Boot</span> and crafting immersive, high-conversion frontend interfaces with <span className="text-[#F77F00]">React.js</span> and <span className="text-[#F77F00]">Next.js</span>.
                                </p>
                                <p>
                                    I don't just build websites; I engineer digital marketplaces that drive growth. Leveraging advanced ORMs like <span className="text-[#F8F9FA] font-semibold">Hibernate/JPA</span> and modern state management, I bridge the gap between complex backend logic and seamless user elegance.
                                </p>
                                <p>
                                    Passionate about continuous innovation, I stay at the forefront of emerging technologies to deliver scalable, maintainable solutions that exceed expectations.
                                </p>
                            </div>

                            {/* Stats Row (Inside card for unified look) */}

                        </motion.div>
                    </div>

                    {/* ─── Right Column: Tilted Profile Card (1/3 Width, Equal Height) ─── */}
                    <div className="lg:col-span-1 h-full min-h-[400px]">
                        {/* Card container is flex-1 but TiltedCard has fixed internal size relative to prop. 
                             We set explicit height 100% on TiltedCard props. */}
                        <TiltedCard
                            imageSrc={profilephoto}
                            altText="Anas Habib Portrait"
                            captionText="E-Commerce Architect"
                            containerHeight="100%"
                            containerWidth="100%"
                            imageHeight="100%"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}



                        />
                    </div>
                </div>

                {/* ═══ Bottom Section: Process Timeline ═══ */}
                <motion.div
                    className="w-full md:bg-[#003049]/30 md:backdrop-blur-sm md:border md:border-[#F8F9FA]/10 md:rounded-3xl md:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] md:px-10 md:py-8"
                    variants={cardVariants}
                >
                    <div className="relative flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0">
                        {/* ─── Connector Lines ─── */}

                        {/* DESKTOP: Horizontal Line */}
                        <div className="hidden md:block absolute top-11 left-8 right-8 h-[2px] bg-[#D62828]/40 z-0 overflow-hidden">
                            <div
                                className="absolute top-0 h-full w-20 rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, #D62828, transparent)',
                                    animation: 'timelineGlow 4s ease-in-out infinite',
                                }}
                            />
                        </div>

                        {/* MOBILE: Unified Background Strip */}
                        <div className="mt-6 md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-40 bg-[#003049]/40 backdrop-blur-md border border-[#F8F9FA]/10 rounded-3xl z-0" />

                        {/* MOBILE: Vertical Line - Increased Visibility */}
                        <div className="mt-6 md:hidden absolute top-8 bottom-8 left-1/2 w-[2px] -translate-x-1/2 bg-[#D62828]/40 z-0 overflow-hidden">
                            <div
                                className="absolute left-0 w-full h-20 rounded-full"
                                style={{
                                    background: 'linear-gradient(180deg, transparent, #D62828, transparent)',
                                    animation: 'timelineGlowVertical 4s ease-in-out infinite',
                                }}
                            />
                        </div>

                        {/* ─── Steps ─── */}
                        {STEPS.map(({ icon: Icon, label, active }, i) => (
                            <motion.div
                                key={label}
                                className="relative z-10 flex flex-col items-center gap-2 md:bg-transparent p-3 md:p-0 rounded-2xl md:rounded-none md:backdrop-blur-none border-none w-32 md:w-auto"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                {/* Icon circle */}
                                <motion.div
                                    className={`w-10 h-10 rounded-lg mt-6 flex items-center justify-center border transition-all ${active
                                        ? 'border-[#D62828]/60 text-[#D62828] shadow-[0_0_18px_rgba(214,40,40,0.3)]'
                                        : 'border-[#F8F9FA]/10 text-[#F8F9FA]/60'
                                        }`}
                                    style={
                                        active
                                            ? { background: 'rgba(214,40,40,0.1)' }
                                            : { background: 'rgba(0,48,73,0.5)' }
                                    }
                                    whileHover={{ scale: 1.15 }}
                                >
                                    <Icon size={18} strokeWidth={1.5} />
                                </motion.div>

                                {/* Label */}
                                <span
                                    className={`font-exo text-[10px] md:text-xs tracking-wider uppercase ${active
                                        ? 'text-[#D62828] font-bold'
                                        : 'text-[#F8F9FA]/50 font-medium'
                                        }`}
                                >
                                    {label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
