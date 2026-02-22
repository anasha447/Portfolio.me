import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * LogoLoop — infinite horizontal scrolling marquee.
 *
 * Props:
 *   items         — array of data objects
 *   renderItem    — (item, index) => ReactNode  (custom card renderer)
 *   logos         — legacy: array of ReactNodes (used if renderItem not provided)
 *   speed         — pixels-per-second base speed (default 60)
 *   direction     — "left" | "right"
 *   fadeOut        — show edge fade gradients
 *   fadeOutColor  — CSS color for edge fade (default dark blue)
 *   pauseOnHover  — freeze the scroll on hover
 *   scaleOnHover  — scale individual items on hover (legacy)
 *   gap           — gap between items in px (default 24)
 *   className     — extra wrapper classes
 */
export default function LogoLoop({
    items = [],
    renderItem,
    logos = [],
    speed = 60,
    direction = 'left',
    fadeOut = true,
    fadeOutColor = 'rgba(0,48,73,1)',
    pauseOnHover = false,
    scaleOnHover = false,
    gap = 24,
    className = '',
}) {
    const innerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    /* Resolve what to render */
    const elements = renderItem
        ? items.map((item, i) => <div key={i}>{renderItem(item, i)}</div>)
        : logos.map((logo, i) => <div key={i}>{logo}</div>);

    /* Duplicate children for seamless loop */
    const setupScroller = useCallback(() => {
        const inner = innerRef.current;
        if (!inner || isReady) return;
        const children = Array.from(inner.children);
        children.forEach((child) => {
            const clone = child.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            inner.appendChild(clone);
        });
        setIsReady(true);
    }, [isReady]);

    useEffect(() => {
        setupScroller();
    }, [setupScroller]);

    const count = elements.length || 1;
    const itemWidth = 244 + gap; // approx card width + gap
    const duration = (count * itemWidth) / speed;

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            onTouchStart={() => pauseOnHover && setIsPaused(true)}
            onTouchEnd={() => pauseOnHover && setIsPaused(false)}
        >
            {/* Edge fade gradients */}
            {fadeOut && (
                <>
                    <div
                        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 md:w-48"
                        style={{
                            background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
                        }}
                    />
                    <div
                        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 md:w-48"
                        style={{
                            background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
                        }}
                    />
                </>
            )}

            {/* Scrolling strip */}
            <div
                ref={innerRef}
                className="flex items-center w-max"
                style={{
                    gap: `${gap}px`,
                    animationName: isReady ? 'logoScroll' : 'none',
                    animationDuration: `${duration}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDirection: direction === 'right' ? 'reverse' : 'normal',
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {elements}
            </div>
        </div>
    );
}
