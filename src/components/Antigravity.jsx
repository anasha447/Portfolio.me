/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// ─── Global Interaction State (mutable ref, not triggering re-renders) ───
const globalMouse = { x: 0, y: 0, active: false };

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

    // ── Attach mouse/touch listeners inside the component so they can be cleaned up ──
    useEffect(() => {
        const handlePointerMove = (x, y) => {
            globalMouse.x = (x / window.innerWidth) * 2 - 1;
            globalMouse.y = -(y / window.innerHeight) * 2 + 1;
            globalMouse.active = true;
        };
        const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width || 100;
        const height = viewport.height || 100;

        for (let i = 0; i < count; i++) {
            const ox = (Math.random() - 0.5) * width;
            const oy = (Math.random() - 0.5) * height;
            const oz = (Math.random() - 0.5) * 20;

            temp.push({
                t: Math.random() * 100,
                speed: 0.005 + Math.random() * 0.01,
                ox, oy, oz,
                cx: ox, cy: oy, cz: oz,
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

        const destX = m.active ? (m.x * v.width) / 2 : 0;
        const destY = m.active ? (m.y * v.height) / 2 : 0;

        virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.1;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.1;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;

        particles.forEach((p, i) => {
            p.t += p.speed;

            let currentTargetX = p.ox + Math.sin(p.t + p.randomOffset) * 0.5;
            let currentTargetY = p.oy + Math.cos(p.t + p.randomOffset) * 0.5 + (scrollOffset * 2);
            let currentTargetZ = p.oz;

            const dx = p.cx - targetX;
            const dy = p.cy - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < magnetRadius && m.active) {
                const force = (magnetRadius - dist) / magnetRadius;
                const angle = Math.atan2(dy, dx);
                currentTargetX += Math.cos(angle) * force * fieldStrength;
                currentTargetY += Math.sin(angle) * force * fieldStrength;
                currentTargetZ += force * (fieldStrength / 2);
            }

            p.cx += (currentTargetX - p.cx) * lerpSpeed;
            p.cy += (currentTargetY - p.cy) * lerpSpeed;
            p.cz += (currentTargetZ - p.cz) * lerpSpeed;

            dummy.position.set(p.cx, p.cy, p.cz);
            dummy.lookAt(targetX, targetY, p.cz + 10);
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
        count: 35,
        particleSize: 0.6,
        magnetRadius: 8,
        fieldStrength: 5,
        particleShape: 'capsule'
    };

    const DESKTOP_SETTINGS = {
        count: 60,
        particleSize: 1,
        magnetRadius: 15,
        fieldStrength: 10,
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
                dpr={[1, 1.5]}
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