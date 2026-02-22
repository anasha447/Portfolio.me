/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// ─── Global Interaction Tracker ───
const globalMouse = { x: 0, y: 0, active: false };

if (typeof window !== 'undefined') {
    const handlePointerMove = (x, y) => {
        globalMouse.x = (x / window.innerWidth) * 2 - 1;
        globalMouse.y = -(y / window.innerHeight) * 2 + 1;
        globalMouse.active = true;
    };

    window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}

const AntigravityInner = ({
    count = 50,
    magnetRadius = 15,
    fieldStrength = 8,
    particleSize = 1,
    lerpSpeed = 0.05,
    color = '#FF9FFC',
    particleShape = 'capsule',
}) => {
    const meshRef = useRef(null);
    const { viewport } = useThree();

    // Create a single dummy object for matrix calculations to save memory
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const virtualMouse = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width || 100;
        const height = viewport.height || 100;

        for (let i = 0; i < count; i++) {
            // Origin points (where particles naturally want to stay)
            const ox = (Math.random() - 0.5) * width;
            const oy = (Math.random() - 0.5) * height;
            const oz = (Math.random() - 0.5) * 20;

            temp.push({
                t: Math.random() * 100,
                speed: 0.005 + Math.random() * 0.01, // Slower ambient movement
                ox, oy, oz,      // Base positions
                cx: ox, cy: oy, cz: oz, // Current dynamic positions
                randomOffset: Math.random() * Math.PI * 2
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    useFrame((state) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const v = state.viewport;
        const scrollOffset = typeof window !== 'undefined' ? window.scrollY * 0.01 : 0;
        const m = globalMouse;

        // Smooth virtual mouse following
        const destX = m.active ? (m.x * v.width) / 2 : 0;
        const destY = m.active ? (m.y * v.height) / 2 : 0;

        virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.1;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.1;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;

        particles.forEach((p, i) => {
            p.t += p.speed;

            // 1. Set base target to their original position + gentle ambient floating + scroll
            let currentTargetX = p.ox + Math.sin(p.t + p.randomOffset) * 0.5;
            let currentTargetY = p.oy + Math.cos(p.t + p.randomOffset) * 0.5 + (scrollOffset * 2);
            let currentTargetZ = p.oz;

            // 2. Anti-Gravity Repulsion Logic (Only applies if mouse is nearby)
            const dx = p.cx - targetX;
            const dy = p.cy - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If inside the "anti-gravity bubble"
            if (dist < magnetRadius && m.active) {
                // Calculate force based on how close the mouse is (stronger closer to center)
                const force = (magnetRadius - dist) / magnetRadius;
                const angle = Math.atan2(dy, dx);

                // Push particles away
                currentTargetX += Math.cos(angle) * force * fieldStrength;
                currentTargetY += Math.sin(angle) * force * fieldStrength;
                currentTargetZ += force * (fieldStrength / 2); // Push them forward slightly
            }

            // 3. Move current position smoothly towards the target position
            p.cx += (currentTargetX - p.cx) * lerpSpeed;
            p.cy += (currentTargetY - p.cy) * lerpSpeed;
            p.cz += (currentTargetZ - p.cz) * lerpSpeed;

            // 4. Update Dummy 3D Object
            dummy.position.set(p.cx, p.cy, p.cz);

            // Make elements face the direction of the movement slightly, or face camera
            dummy.lookAt(targetX, targetY, p.cz + 10);

            // Scale based on global size
            dummy.scale.set(particleSize, particleSize, particleSize);
            dummy.updateMatrix();

            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'capsule' && <capsuleGeometry args={[0.04, 0.2, 4, 8]} />}
            {particleShape === 'sphere' && <sphereGeometry args={[0.1, 16, 16]} />}
            {particleShape === 'box' && <boxGeometry args={[0.1, 0.1, 0.1]} />}
            {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.15]} />}
            <meshBasicMaterial color={color} toneMapped={false} />
        </instancedMesh>
    );
};

export default function Antigravity({ color = '#F77F00', ...props }) {
    const MOBILE_SETTINGS = {
        count: 35,         // Actually reduced for mobile efficiency
        particleSize: 0.6, // Smaller elements
        magnetRadius: 8,   // Smaller interaction scope on touch
        fieldStrength: 5,
        particleShape: 'capsule'
    };

    const DESKTOP_SETTINGS = {
        count: 60,
        particleSize: 1,   // Smaller elements overall
        magnetRadius: 15,  // How wide the anti-gravity bubble is
        fieldStrength: 10, // How hard it pushes away
        particleShape: 'capsule'
    };

    const [settings, setSettings] = useState(DESKTOP_SETTINGS);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');

        const handleChange = (e) => setSettings(e.matches ? MOBILE_SETTINGS : DESKTOP_SETTINGS);

        setSettings(mediaQuery.matches ? MOBILE_SETTINGS : DESKTOP_SETTINGS);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 50], fov: 35 }}
                dpr={[1, 1.5]} // Keep DPR capped for performance
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <AntigravityInner
                    key={JSON.stringify(settings)}
                    {...settings}
                    color={color}
                    {...props}
                />
            </Canvas>
        </div>
    );
}