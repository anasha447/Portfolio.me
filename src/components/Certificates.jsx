import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import cert1 from '../assets/images/certificate1.jpg';
import cert2 from '../assets/images/certificate2.jpg';
import cert3 from '../assets/images/certificate3.jpg';
import cert4 from '../assets/images/certificate4.jpeg';
import cert5 from '../assets/images/certificate5.jpg';
import cert66 from '../assets/images/certificate66.jpg';

// ─── Glass card base ───
const GLASS =
    'bg-[#003049]/60 backdrop-blur-md border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]';

// ─── Certificate Data ───
const CERTIFICATES = [
    { title: 'Python Essentials', image: cert1, link: '#' },
    { title: 'Python Data Structures', image: cert2, link: '#' },
    { title: 'Network Essentials', image: cert3, link: '#' },
    { title: 'Spring Boot Architecture', image: cert5, link: '#' },
    { title: 'Spring Boot with E-Commerce', image: cert4, link: '#' },
    { title: 'Internship Web Development', image: cert66, link: '#' },
];

// ─── Framer variants for 3D Carousel Option ───
const carouselVariants = {
    center: { x: '0%', scale: 1, zIndex: 10, opacity: 1 },
    left: { x: '-85%', scale: 0.8, zIndex: 5, opacity: 0.5 },
    right: { x: '85%', scale: 0.8, zIndex: 5, opacity: 0.5 },
    hiddenLeft: { x: '-150%', scale: 0.6, zIndex: 0, opacity: 0 },
    hiddenRight: { x: '150%', scale: 0.6, zIndex: 0, opacity: 0 },
};

// ─── Certificate Card ───
function CertificateCard({ cert, onClick, variant }) {
    return (
        <motion.div
            className={`${GLASS} absolute w-[260px] sm:w-[340px] md:w-[420px] lg:w-[420px] overflow-hidden flex flex-col`}
            variants={carouselVariants}
            initial={false}
            animate={variant}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            style={{ originX: 0.5, originY: 0.5 }}
            whileHover={variant === 'center' ? { y: -6 } : {}}
        >
            {/* Image area */}
            <div
                className="relative h-[200px] md:h-[280px] lg:h-[320px] bg-[#001c2b]/50 overflow-hidden group hover:bg-[#001c2b]/70 transition-colors duration-500 flex items-center justify-center cursor-pointer"
                onClick={() => { if (cert.image) onClick(); }}
            >
                {cert.image ? (
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top  opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    />
                ) : (
                    <span className="text-[#F8F9FA]/20 font-exo font-bold text-lg tracking-widest text-center px-4">
                        IMAGE PLACEHOLDER
                    </span>
                )}

                {/* View indication (only show on center card) */}
                {variant === 'center' && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <span className="bg-[#F8F9FA]/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Preview
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`p-4 md:p-5 flex flex-col gap-2 flex-grow border-t border-[#F8F9FA]/5 transition-opacity duration-300 ${variant === 'center' ? 'opacity-100' : 'opacity-40'}`}>
                <h3 className="font-exo font-bold text-[15px] md:text-[17px] text-[#F8F9FA] leading-tight line-clamp-2 text-center">
                    {cert.title}
                </h3>
            </div>
        </motion.div>
    );
}

// ─── Section ───
export default function Certificates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CERTIFICATES.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length);

    const handleDragEnd = (e, { offset, velocity }) => {
        if (offset.x < -50 || velocity.x < -500) nextSlide();
        else if (offset.x > 50 || velocity.x > 500) prevSlide();
    };

    const getVariant = (index) => {
        let diff = index - currentIndex;
        const count = CERTIFICATES.length;
        if (diff > Math.floor(count / 2)) diff -= count;
        if (diff < -Math.floor(count / 2)) diff += count;

        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        if (diff === -1) return 'left';
        if (diff > 1) return 'hiddenRight';
        return 'hiddenLeft';
    };

    return (
        <section
            id="certificates"
            className="relative z-10 px-0 md:px-16 lg:px-24 py-24 overflow-hidden"
        >
            <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-14 items-center">
                {/* ═══ Section Title ═══ */}
                <div className="px-6 md:px-0">
                    <SectionTitle>Certificates</SectionTitle>
                </div>

                {/* ═══ 3D Carousel container ═══ */}
                <div className="relative w-full h-[360px] md:h-[440px] lg:h-[500px] flex items-center justify-center">

                    {/* Interactive Drag Layer */}
                    <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                    >
                        {CERTIFICATES.map((cert, index) => {
                            const variant = getVariant(index);
                            return (
                                <CertificateCard
                                    key={index}
                                    cert={cert}
                                    variant={variant}
                                    onClick={() => {
                                        if (variant === 'center') {
                                            setSelectedImage(cert.image);
                                        } else if (variant === 'left') {
                                            prevSlide();
                                        } else if (variant === 'right') {
                                            nextSlide();
                                        }
                                    }}
                                />
                            );
                        })}
                    </motion.div>

                    {/* Desktop Navigation Buttons */}
                    <div className="hidden md:flex absolute inset-x-0 inset-y-0 items-center justify-between px-4 lg:px-16 z-30 pointer-events-none">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-[#003049]/50 backdrop-blur-md border border-[#F8F9FA]/10 text-white hover:bg-[#F77F00] transition-colors pointer-events-auto"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-[#003049]/50 backdrop-blur-md border border-[#F8F9FA]/10 text-white hover:bg-[#F77F00] transition-colors pointer-events-auto"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>

                {/* ═══ Pagination Indicators ═══ */}
                <div className="flex gap-3 z-30 mt-4">
                    {CERTIFICATES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-10 bg-[#F77F00]' : 'w-2 bg-[#F8F9FA]/30 hover:bg-[#F8F9FA]/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
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
        </section>
    );
}
