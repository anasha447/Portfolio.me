
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "300px",
    rotateAmplitude = 12,
    scaleOnHover = 1.1,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
}) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    const scale = useSpring(1, { stiffness: 200, damping: 10 });

    // Use a smooth spring for the rotation values to avoid jitter
    const rotateXSpring = useSpring(rotateX, { stiffness: 200, damping: 10 });
    const rotateYSpring = useSpring(rotateY, { stiffness: 200, damping: 10 });


    function handleMouseMove(e) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
    }

    function handleMouseLeave() {
        scale.set(1);
        x.set(0);
        y.set(0);
    }

    return (
        <figure
            ref={ref}
            className="relative z-10 block group" // Visible on all screens
            style={{
                height: containerHeight,
                width: containerWidth,
                perspective: "1000px",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                style={{
                    rotateX: rotateXSpring,
                    rotateY: rotateYSpring,
                    scale,
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute inset-0 object-cover rounded-[15px] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />

                {/* Gradient Overlay - Bottom 30% */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#001c2b] to-transparent rounded-b-[15px] pointer-events-none z-10"
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div
                        className="absolute bottom-4 left-4 z-20 [transform:translateZ(30px)]"
                    >
                        {overlayContent}
                    </motion.div>
                )}

                {showTooltip && captionText && (
                    <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#001c2b]/90 text-[#F8F9FA] text-sm px-3 py-1.5 rounded-md border border-[#F8F9FA]/10 opacity-0 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                        style={{ opacity: x.get() !== 0 ? 1 : 0 }} // Simple visibility logic or just use hover
                    >
                        {captionText}
                    </motion.div>
                )}
            </motion.div>
        </figure>
    );
}
