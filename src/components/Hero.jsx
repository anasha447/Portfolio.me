
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Linkedin } from 'lucide-react';
import TextType from './TextType';
import Antigravity from './Antigravity';

// ─── Dynamic role phrases ───
const ROLE_PHRASES = [
    'Full-Stack Developer: \n • Java\n • Spring Boot\n • React.js\n • wordpress',
    'Software Engineer.',
];

// ─── Social links ───
const SOCIALS = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/anas-habib-95b675263?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/anasha447', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/anas.hab?igsh=MWx5NmR1ZWNiZDk0eQ==', label: 'Instagram' },
];

const CODE_LINES = [
    { num: '01', content: [{ text: 'const ', color: '#D62828' }, { text: 'developer', color: '#F8F9FA' }, { text: ' = {', color: '#F8F9FA' }] },
    { num: '02', content: [{ text: '  name: ', color: '#F8F9FA/70' }, { text: "'Anas Habib'", color: '#F77F00' }, { text: ',', color: '#F8F9FA/50' }] },
    { num: '03', content: [{ text: '  role: ', color: '#F8F9FA/70' }, { text: "'Full-Stack Software Engineer'", color: '#F77F00' }, { text: ',', color: '#F8F9FA/50' }] },
    { num: '04', content: [{ text: '  coreStack: [', color: '#F8F9FA/70' }, { text: "'Java Spring Boot'", color: '#F77F00' }, { text: ', ', color: '#F8F9FA/50' }, { text: "'React.js'", color: '#F77F00' }, { text: ', ', color: '#F8F9FA/50' }, { text: "'SQL'", color: '#F77F00' }, { text: '],', color: '#F8F9FA/70' }] },
    { num: '05', content: [{ text: '  businessEdge: [', color: '#F8F9FA/70' }, { text: "'Meta Ads'", color: '#F77F00' }, { text: ', ', color: '#F8F9FA/50' }, { text: "'Google Analytics'", color: '#F77F00' }, { text: ', ', color: '#F8F9FA/50' }, { text: "'Advanced SEO'", color: '#F77F00' }, { text: '],', color: '#F8F9FA/70' }] },
    { num: '06', content: [{ text: '  passionate: ', color: '#F8F9FA/70' }, { text: 'true', color: '#F77F00' }, { text: ',', color: '#F8F9FA/50' }] },
    { num: '08', content: [{ text: '};', color: '#F8F9FA' }] },
    { num: '', content: [] },
    { num: '09', content: [{ text: 'developer', color: '#F8F9FA' }, { text: '.', color: '#F8F9FA/50' }, { text: 'showcase', color: '#D62828' }, { text: '();', color: '#F8F9FA' }] },
];

function resolveColor(c) {
    if (c.includes('/')) {
        const [hex, op] = c.split('/');
        return `${hex}${Math.round((parseInt(op, 10) / 100) * 255).toString(16).padStart(2, '0')}`;
    }
    return c;
}

function CodeLine({ line, index }) {
    return (
        <motion.div
            className="flex"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.06 }}
        >
            <span className="w-8 text-right mr-5 text-[#F8F9FA]/20 select-none font-exo text-xs leading-6">{line.num}</span>
            <span className="font-exo text-sm leading-6">
                {line.content.map((token, i) => <span key={i} style={{ color: resolveColor(token.color) }}>{token.text}</span>)}
            </span>
        </motion.div>
    );
}

const tiltSpring = { damping: 50, stiffness: 100, mass: 4 };

function TiltCodeEditor() {
    const ref = useRef(null);
    const rotateX = useSpring(useMotionValue(0), tiltSpring);
    const rotateY = useSpring(useMotionValue(0), tiltSpring);
    const scale = useSpring(1, tiltSpring);

    const ROTATE_AMP = 12;

    function handleMouse(e) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        rotateX.set((offsetY / (rect.height / 2)) * -ROTATE_AMP);
        rotateY.set((offsetX / (rect.width / 2)) * ROTATE_AMP);
    }
    function handleEnter() { scale.set(1.05); }
    function handleLeave() { scale.set(1); rotateX.set(0); rotateY.set(0); }

    return (
        <motion.div
            className="flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
            <figure
                ref={ref}
                className="relative w-full max-w-lg [perspective:800px] cursor-default"
                onMouseMove={handleMouse} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
            >
                <div className="absolute -inset-4 rounded-2xl bg-[#D62828]/8 blur-3xl -z-10" />
                <motion.div className="relative [transform-style:preserve-3d] will-change-transform" style={{ rotateX, rotateY, scale }}>
                    <div className="bg-[#001c2b]/80 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-[#003049]/50 border-b border-[#F8F9FA]/10 px-4 py-3 flex items-center">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#D62828]" /><span className="w-3 h-3 rounded-full bg-[#F77F00]" /><span className="w-3 h-3 rounded-full bg-[#F8F9FA]/50" /></div>
                            <div className="ml-auto flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D62828] animate-pulse" /><span className="text-xs text-[#F8F9FA]/50 font-exo">portfolio.js</span></div>
                        </div>
                        <div className="p-5 md:p-6 overflow-x-auto">{CODE_LINES.map((line, i) => <CodeLine key={i} line={line} index={i} />)}</div>
                    </div>
                </motion.div>
            </figure>
        </motion.div>
    );
}

// ────────────────────────────────────────────────────────
// ─── HERO COMPONENT ───
// ────────────────────────────────────────────────────────

export default function Hero() {
    const [isSticky, setIsSticky] = useState(false);
    const inlineContainerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // ── Robust Scroll Listener (Capture Phase) ──
    useEffect(() => {
        const handleScroll = () => {
            if (!inlineContainerRef.current) return;

            // We use getBoundingClientRect because it works even if window.scrollY is 0
            // (e.g. if scrolling happens inside a div with overflow: auto).
            const rect = inlineContainerRef.current.getBoundingClientRect();

            // Trigger when the element is scrolled up (top becomes roughly 250px or less)
            if (rect.top <= 250) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // KEY FIX: Use capture phase (true) to catch scroll events from any element in the tree
        window.addEventListener('scroll', handleScroll, true);

        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    return (
        <>
            {/* Background Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Antigravity />
            </div>

            <section
                id="home"
                className="relative z-10 min-h-0 lg:min-h-[100vh] flex flex-col items-center px-6 md:px-16 lg:px-24 pt-24 lg:pt-40 pb-12 lg:pb-0 pointer-events-auto"
            >
                <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* ─── Left Column (Text) ─── */}
                    <div className="flex flex-col items-start text-left w-full">
                        {/* Greeting */}
                        <motion.p
                            className="font-exo text-sm font-semibold uppercase tracking-[0.3em] text-[#D62828] mb-4 pl-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            HELLO, I&apos;M
                        </motion.p>

                        {/* Main Name */}
                        <motion.h1
                            layoutId="brand-name"
                            className="font-train-one font-normal text-4xl md:text-6xl text-[#F77F00] leading-none mb-6 tracking-tight w-full break-words"
                            transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
                        >
                            ANAS HABIB
                        </motion.h1>

                        {/* Multi-line Typing Role */}
                        <div className="min-h-[220px] md:min-h-[380px] w-full pt-2 mb-4 lg:mb-8">
                            <TextType
                                text={ROLE_PHRASES}
                                as="div"
                                className="font-exo font-medium text-2xl md:text-3xl lg:text-4xl leading-relaxed text-left block"
                                textColors={['#F77F00', '#F77F00', '#F77F00']}
                                primaryLineColor="#F77F00"
                                secondaryLineColor="#c6b7a8ff"
                                typingSpeed={55}
                                deletingSpeed={30}
                                pauseDuration={2500}
                                initialDelay={800}
                                loop
                                showCursor
                                cursorCharacter="|"
                                cursorClassName="text-[#F77F00]"
                                cursorBlinkDuration={0.5}
                            />
                        </div>

                        {/* ── Inline Social Bar (Desktop Only) ── */}
                        <div ref={inlineContainerRef} className="w-full h-12 relative mt-4 hidden lg:block">
                            <AnimatePresence>
                                {!isSticky && (
                                    <motion.div
                                        key="inline-social-bar"
                                        className="flex flex-row items-center gap-4 bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/10 rounded-full px-6 py-3 w-max absolute top-[-50%] left-0 -translate-y-1"
                                        initial={{ opacity: 1, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                                    >
                                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                aria-label={label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full border border-[#F8F9FA]/10 text-[#F8F9FA] transition-all duration-300 hover:text-[#F77F00] hover:border-[#F77F00] hover:shadow-[0_0_15px_rgba(247,127,0,0.4)]"
                                            >
                                                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ─── Right Column (Code Editor) ─── */}
                    <div className="pt-0 lg:pt-16 w-full flex justify-center lg:justify-end -mt-10 md:mt-0">
                        <TiltCodeEditor />
                    </div>

                    {/* ─── Flexible Social Bar (Mobile Only - After Code) ─── */}
                    <div className="flex lg:hidden justify-center items-center gap-4 bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/10 rounded-full px-6 py-3 w-max mx-auto mt-6 -translate-y-1">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-[#F8F9FA]/10 text-[#F8F9FA] transition-all duration-300 hover:text-[#F77F00] hover:border-[#F77F00] hover:shadow-[0_0_15px_rgba(247,127,0,0.4)]"
                            >
                                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                            </a>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── STICKY SOCIAL BAR — Portal to Body ─── */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isSticky && (
                        <motion.div
                            key="sticky-social-bar"
                            className="fixed top-[25%] -translate-y-[calc(50%+4px)] left-5 z-[9999] flex flex-col items-center gap-4 bg-[#003049]/20 backdrop-blur-md border border-[#F8F9FA]/10 rounded-full px-3 py-6 shadow-2xl hidden md:flex"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            {SOCIALS.map(({ icon: Icon, href, label }, index) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full border border-[#F8F9FA]/10 text-[#F8F9FA] transition-all duration-300 hover:text-[#F77F00] hover:border-[#F77F00] hover:shadow-[0_0_15px_rgba(247,127,0,0.4)]"
                                    initial={{ opacity: 0, x: -25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -25 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 20,
                                        delay: 0.1 + index * 0.1,
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                >
                                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}