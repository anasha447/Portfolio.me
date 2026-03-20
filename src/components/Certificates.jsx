import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import SectionTitle from './SectionTitle';
import cert1 from '../assets/images/certificate1.jpg';
import cert2 from '../assets/images/certificate2.jpg';
import cert3 from '../assets/images/certificate3.jpg';
import cert4 from '../assets/images/certificate4.jpeg';
import cert5 from '../assets/images/certificate5.jpg';
import cert66 from '../assets/images/certificate66.jpg';

// ─── Glass card base ───
const GLASS =
    'bg-[#003049]/30 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

// ─── Certificate Data ───
const CERTIFICATES = [
    {
        title: 'Python Essentials',
        image: cert1,
        link: '#',
    },
    {
        title: 'Python Data Structures',
        image: cert2,
        link: '#',
    },
    {
        title: 'Network Essentials',
        image: cert3,
        link: '#',
    },
    {
        title: 'Spring Boot Architecture',
        image: cert5,
        link: '#',
    },
    {
        title: 'Spring Boot with E-Commerce',
        image: cert4,
        link: '#',
    },
    {
        title: 'Internship Web Development',
        image: cert66,
        link: '#',
    },
];

// ─── Framer variants ───
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// ─── Certificate Card ───
function CertificateCard({ cert, onClick }) {
    return (
        <motion.div
            className={`${GLASS} overflow-hidden flex flex-col h-full group`}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Image area */}
            <div 
                className="relative h-70 bg-[#001c2b]/50 overflow-hidden group-hover:bg-[#001c2b]/70 transition-colors duration-500 flex items-center justify-center cursor-pointer"
                onClick={() => { if (cert.image) onClick(); }}
            >
                {cert.image ? (
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top  p-2 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                ) : (
                    <span className="text-[#F8F9FA]/20 font-exo font-bold text-lg tracking-widest text-center px-4">
                        IMAGE PLACEHOLDER
                    </span>
                )}

                {/* View indication */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-[#F8F9FA]/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Preview
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-grow border-t border-[#F8F9FA]/5">
                <h3 className="font-exo font-bold text-[17px] text-[#F8F9FA] leading-tight line-clamp-2">
                    {cert.title}
                </h3>
            </div>
        </motion.div>
    );
}

// ─── Section ───
export default function Certificates() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <motion.section
            id="certificates"
            className="relative z-10 px-6 md:px-16 lg:px-24 py-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-14 items-center">
                {/* ═══ Section Title ═══ */}
                <SectionTitle>Certificates</SectionTitle>

                {/* ═══ Certificates Grid — 3 columns ═══ */}
                <div className="flex flex-wrap justify-center gap-8 w-full">
                    {CERTIFICATES.map((cert, index) => (
                        <div key={index} className="w-full max-w-sm flex-grow-0 flex-shrink-0">
                            <CertificateCard
                                cert={cert}
                                onClick={() => setSelectedImage(cert.image)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ Lightbox Modal ═══ */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-[#F77F00] transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <motion.img
                            src={selectedImage}
                            alt="Certificate Fullscreen"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
