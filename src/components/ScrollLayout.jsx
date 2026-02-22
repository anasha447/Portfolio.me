import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollLayout({ children }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    return (
        <motion.div
            ref={containerRef}
            className="h-screen w-screen overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {children(scrollYProgress)}
        </motion.div>
    );
}
