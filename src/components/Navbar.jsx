
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Import icons

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        NAV_LINKS.forEach((link) => {
            const sectionId = link.href.replace('#', '');
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id) => {
        setActiveSection(id);
        setIsMenuOpen(false); // Close menu on click
    };

    return (
        <>
            {/* ─── DESKTOP NAV (Pill) — Visible only on lg screens and up ─── */}
            <motion.nav
                className="fixed top-4 left-1/2 z-50 -translate-x-1/2 pointer-events-auto hidden lg:block"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            >
                <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#003049]/40 backdrop-blur-md border border-[#F8F9FA]/10 shadow-lg shadow-black/20">
                    {NAV_LINKS.map(({ label, href }) => {
                        const sectionId = href.replace('#', '');
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={label}
                                href={href}
                                onClick={() => handleClick(sectionId)}
                                className={`relative px-4 py-1.5 text-sm font-exo font-medium rounded-full transition-colors duration-300 z-10
                                    ${isActive
                                        ? 'text-[#F77F00]'
                                        : 'text-[#F8F9FA]/80 hover:text-[#F77F00] hover:bg-[#F77F00]/10'
                                    }`}
                            >
                                {label}
                                {isActive && (
                                    <motion.span
                                        layoutId="active-nav-underline"
                                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#F77F00] -z-10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>
            </motion.nav>

            {/* ─── MOBILE HAMBURGER BUTTON — Left Aligned ─── */}
            <motion.div
                className="fixed top-4 left-4 z-50 lg:hidden pointer-events-auto"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-3 rounded-full bg-[#003049]/60 backdrop-blur-md border border-[#F8F9FA]/10 text-[#F77F00] shadow-lg active:scale-90 transition-transform"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.div>

            {/* ─── MOBILE MENU DRAWER ─── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#001c2b]/95 border-r border-[#F8F9FA]/10 shadow-2xl flex flex-col items-start justify-center gap-8 pl-8 lg:hidden"
                        >
                            {NAV_LINKS.map(({ label, href }, index) => {
                                const sectionId = href.replace('#', '');
                                const isActive = activeSection === sectionId;
                                return (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        onClick={() => handleClick(sectionId)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        className={`text-2xl font-train-one tracking-wider transition-colors hover:text-[#D62828] ${isActive ? 'text-[#F77F00]' : 'text-[#F8F9FA]/70'
                                            }`}
                                    >
                                        {label}
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
