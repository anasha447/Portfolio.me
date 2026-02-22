import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Deterministic pseudo-random based on index
function seededRandom(seed) {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

function getInitialTransform(index) {
    const r = (n) => seededRandom(index * 7 + n);
    return {
        x: (r(1) > 0.5 ? 1 : -1) * (600 + r(2) * 600),
        y: (r(3) > 0.5 ? 1 : -1) * (300 + r(4) * 500),
        rotate: (r(5) > 0.5 ? 1 : -1) * (90 + r(6) * 90),
    };
}

const NAME = 'ANAS HABIB';
const SUBTITLE = 'SOFTWARE ENGINEER';

// Stagger orchestrator for the individual letters
const letterStaggerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

export default function IntroSequence() {
    // Split into words, then letters — memoised so random values stay stable
    const words = useMemo(() => {
        let globalIndex = 0;
        return NAME.split(' ').map((word) =>
            word.split('').map((char) => ({
                char,
                index: globalIndex++,
                initial: getInitialTransform(globalIndex),
            }))
        );
    }, []);

    return (
        <motion.div
            className="w-screen h-screen fixed inset-0 z-50 flex flex-col items-center justify-center"
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
        >
            {/* ── Background overlay — fades out on exit ── */}
            <motion.div
                className="absolute inset-0 bg-[#003049]"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeIn' }}
            />

            {/* ── Name — shared element via layoutId ── */}
            <motion.div
                layoutId="brand-name"
                layout="position"
                className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10"
                variants={letterStaggerVariants}
                initial="hidden"
                animate="visible"
                transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
            >
                {words.map((letters, wordIdx) => (
                    <span key={wordIdx} className="inline-flex">
                        {letters.map(({ char, index, initial }) => (
                            <motion.span
                                key={index}
                                className="inline-block text-5xl md:text-8xl font-normal select-none text-[#F77F00]"
                                style={{ lineHeight: 1.1, fontFamily: '"Train One", system-ui' }}
                                variants={{
                                    hidden: {
                                        x: initial.x,
                                        y: initial.y,
                                        rotate: initial.rotate,
                                        opacity: 0,
                                    },
                                    visible: {
                                        x: 0,
                                        y: 0,
                                        rotate: 0,
                                        opacity: 1,
                                        transition: {
                                            type: 'spring',
                                            damping: 20,
                                            stiffness: 80,
                                        },
                                    },
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.div>

            {/* ── Subtitle — fades out on exit ── */}
            <motion.p
                className="relative z-10 mt-6 text-lg md:text-xl font-exo font-light tracking-[0.35em] text-[#F8F9FA]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
            >
                {SUBTITLE}
            </motion.p>

            {/* ── Decorative accent line — fades out on exit ── */}
            <motion.div
                className="relative z-10 mt-4 h-[2px] rounded-full bg-[#D62828]"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
            />
        </motion.div>
    );
}
