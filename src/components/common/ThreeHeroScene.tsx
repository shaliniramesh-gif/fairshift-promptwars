import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Industry } from '../../types';

interface ThreeHeroSceneProps {
  theme: Industry;
  isDark?: boolean;
  reducedMotion?: boolean;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({
  theme,
  isDark = false,
  reducedMotion = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  // Theme primary and accent hex mapping
  const getThemeColors = (t: Industry) => {
    switch (t) {
      case 'healthcare':
        return { primary: 0x0d9488, secondary: 0x10b981, accent: 0x2dd4bf };
      case 'manufacturing':
        return { primary: 0x475569, secondary: 0xd97706, accent: 0xf59e0b };
      case 'education':
        return { primary: 0x4338ca, secondary: 0x2563eb, accent: 0xf59e0b };
      case 'corporate':
        return { primary: 0x1e3a8a, secondary: 0x0891b2, accent: 0x38bdf8 };
      case 'retail':
        return { primary: 0x7c3aed, secondary: 0x2563eb, accent: 0x10b981 };
      default:
        return { primary: 0x0d9488, secondary: 0x10b981, accent: 0x2dd4bf };
    }
  };

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      // Scene & Camera
      const scene = new THREE.Scene();
      const width = currentMount.clientWidth || 400;
      const height = currentMount.clientHeight || 400;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.8;

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      // Colors
      const colors = getThemeColors(theme);

      // Group
      const coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Outer wireframe icosahedron
      const icoGeometry = new THREE.IcosahedronGeometry(1.4, 1);
      const icoMaterial = new THREE.MeshStandardMaterial({
        color: colors.primary,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.65 : 0.45,
        roughness: 0.2,
        metalness: 0.8
      });
      const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
      coreGroup.add(icoMesh);

      // Inner glowing octahedron / core nucleus
      const innerGeom = new THREE.OctahedronGeometry(0.85, 0);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: colors.secondary,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.85,
        thickness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      coreGroup.add(innerMesh);

      // Outer dynamic ring / torus
      const ringGeom = new THREE.TorusGeometry(1.85, 0.025, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.accent,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      coreGroup.add(ringMesh);

      // Orbiting particles (Workers & Safety nodes)
      const particleCount = 45;
      const particleGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.0 + Math.random() * 0.5;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: colors.accent,
        size: 0.05,
        transparent: true,
        opacity: 0.8
      });
      const particles = new THREE.Points(particleGeom, particleMat);
      coreGroup.add(particles);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(colors.accent, 3, 10);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Mouse reactivity
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = currentMount.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 1.8;
        targetY = y * 1.8;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Resize listener
      const handleResize = () => {
        if (!currentMount || !renderer) return;
        const newW = currentMount.clientWidth;
        const newH = currentMount.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };
      window.addEventListener('resize', handleResize);

      // Render Loop
      let clock = new THREE.Clock();
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Smooth cursor interpolation
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        coreGroup.rotation.y = elapsedTime * 0.35 + currentX;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + currentY;

        innerMesh.rotation.y = -elapsedTime * 0.5;
        innerMesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.3;

        ringMesh.rotation.z = elapsedTime * 0.2;
        ringMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.4;

        particles.rotation.y = -elapsedTime * 0.15;

        renderer?.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D canvas/SVG hero:', err);
      setHasWebGLError(true);
    }
  }, [theme, isDark, reducedMotion]);

  if (hasWebGLError || reducedMotion) {
    // Elegant fallback geometric illustration
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8 select-none" aria-hidden="true">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/30 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-emerald-500/40 animate-[spin_20s_linear_infinite_reverse]" />
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-teal-500/20 via-emerald-500/30 to-amber-500/20 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transform rotate-12">
            <div className="w-16 h-16 rounded-xl bg-teal-600/30 border border-teal-400/50 flex items-center justify-center">
              <span className="font-mono text-xl font-bold tracking-tight text-teal-600 dark:text-teal-300">SDG8</span>
            </div>
          </div>
          <div className="absolute -top-2 right-4 w-4 h-4 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
          <div className="absolute bottom-6 -left-2 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Balanced Workforce Gyroscope representing SDG 8 Decent Work Equilibrium"
    />
  );
};
