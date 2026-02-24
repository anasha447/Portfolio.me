import { useRef } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
    wrap
} from 'framer-motion';

/**
 * MarqueeRow - Advanced internal component for individual rows
 * Implements the scroll-velocity acceleration pattern + manual drag/press control.
 */
function MarqueeRow({ items, renderItem, baseVelocity = 1, gap = 24 }) {
    const containerRef = useRef(null);
    const isInteracting = useRef(false);
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * We use a wrap logic. 
     * Since we duplicate the elements 4 times, we wrap between -25% and -50%
     * to ensure a seamless infinite loop.
     */
    const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

    useAnimationFrame((t, delta) => {
        if (isInteracting.current) return; // Stop loop on press/drag

        let moveBy = baseVelocity * (delta / 1000);

        /**
         * Accelerate based on scroll velocity.
         * Math.abs ensures it always speeds up whether scrolling up or down.
         */
        moveBy += moveBy * Math.abs(velocityFactor.get());

        baseX.set(baseX.get() + moveBy);
    });

    const onPan = (event, info) => {
        if (containerRef.current) {
            // Convert pixel delta to percentage offset
            // Since we duplicate 4x, each set is 25% of scrollWidth
            const rowWidth = containerRef.current.scrollWidth / 4;
            const deltaPercent = (info.delta.x / rowWidth) * 25;
            baseX.set(baseX.get() + deltaPercent);
        }
    };

    const elements = items.map((item, i) => (
        <div key={i} className="flex-shrink-0" style={{ paddingRight: `${gap}px` }}>
            {renderItem(item, i)}
        </div>
    ));

    return (
        <div
            className="flex flex-nowrap whitespace-nowrap overflow-hidden py-4 cursor-grab active:cursor-grabbing"
            onPointerDown={() => { isInteracting.current = true; }}
            onPointerUp={() => { isInteracting.current = false; }}
            onPointerLeave={() => { isInteracting.current = false; }}
        >
            <motion.div
                ref={containerRef}
                className="flex flex-nowrap"
                style={{ x }}
                onPan={onPan}
            >
                {elements}
                {elements}
                {elements}
                {elements}
            </motion.div>
        </div>
    );
}

/**
 * LogoLoop — Wrapper component for the advanced marquee effects.
 */
export default function LogoLoop({
    items = [],
    renderItem,
    baseVelocity = 1,
    fadeOut = true,
    fadeOutColor = 'rgba(0,48,73,1)',
    gap = 24,
    className = ''
}) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {fadeOut && (
                <>
                    <div
                        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40"
                        style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }}
                    />
                    <div
                        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40"
                        style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }}
                    />
                </>
            )}

            <MarqueeRow
                items={items}
                renderItem={renderItem}
                baseVelocity={baseVelocity}
                gap={gap}
            />
        </div>
    );
}
