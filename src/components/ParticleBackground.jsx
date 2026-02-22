import { useRef, useEffect } from 'react';

// ─── Brand Palette (STRICT) ───
const BG = '#003049';        // Prussian Blue
const BASE = '#F8F9FA';      // Off-White
const ORANGE = '#F77F00';    // Vivid Orange
const RED = '#D62828';       // Deep Red

// ─── Config ───
const STAR_COUNT = 400;      // Number of streaks
const SPEED = 2.5;           // Speed of the forward movement (Antigravity feel)
const FOV = 400;             // Field of view (how stretched they get)

// ─── Helpers ───
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function getBrandColor() {
    const chance = Math.random();
    // 85% Off-White, 10% Vivid Orange, 5% Deep Red
    if (chance > 0.15) return BASE;
    if (chance > 0.05) return ORANGE;
    return RED;
}

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const animIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let w = window.innerWidth;
        let h = window.innerHeight;
        let centerX = w / 2;
        let centerY = h / 2;

        // Handle High-DPI Displays
        const dpr = window.devicePixelRatio || 1;

        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            centerX = w / 2;
            centerY = h / 2;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener('resize', resize);

        // Initialize 3D Stars
        const stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: rand(-w, w),
                y: rand(-h, h),
                z: rand(1, w), // Depth
                pz: rand(1, w), // Previous depth (for drawing the streak)
                color: getBrandColor(),
                width: rand(1, 3) // Thickness of the streak
            });
        }
        starsRef.current = stars;

        function animate() {
            // Fill background with solid Prussian Blue
            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, w, h);

            const currentStars = starsRef.current;

            for (let i = 0; i < currentStars.length; i++) {
                const star = currentStars[i];

                // Save previous Z for the trailing line effect
                star.pz = star.z;

                // Move star closer to the camera
                star.z -= SPEED;

                // If the star passes the camera, reset it to the far distance
                if (star.z < 1) {
                    star.x = rand(-w, w);
                    star.y = rand(-h, h);
                    star.z = w;
                    star.pz = w;
                    star.color = getBrandColor();
                }

                // 3D to 2D Projection Math (Current position)
                const sx = (star.x / star.z) * FOV + centerX;
                const sy = (star.y / star.z) * FOV + centerY;

                // 3D to 2D Projection Math (Previous position for the tail)
                const px = (star.x / star.pz) * FOV + centerX;
                const py = (star.y / star.pz) * FOV + centerY;

                // Draw the streak
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);

                // Styling the streak
                ctx.lineWidth = star.width;
                ctx.lineCap = 'round';
                ctx.strokeStyle = star.color;

                // Add a subtle glow
                ctx.shadowBlur = star.color === BASE ? 2 : 8;
                ctx.shadowColor = star.color;

                ctx.stroke();
            }

            animIdRef.current = requestAnimationFrame(animate);
        }

        animIdRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animIdRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-screen h-screen z-0"
            style={{ pointerEvents: 'none' }} // Lets you click buttons through the background
        />
    );
}