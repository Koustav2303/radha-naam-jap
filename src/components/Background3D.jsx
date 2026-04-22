import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { getAudioIntensity } from '../utils/audioAnalyzer';

// The Procedural Divine Lotus
function DivineLotus() {
  const groupRef = useRef();
  
  // Pre-calculate petal geometry to keep performance high
  const petals = useMemo(() => {
    const petalArray = [];
    const layers = 4; // 4 layers of petals
    
    for (let layer = 0; layer < layers; layer++) {
      const petalCount = 8 + (layer * 4); // More petals on outer layers
      const radius = layer * 0.2; // Push outer layers further from center
      const tilt = (Math.PI / 6) + (layer * 0.25); // Outer layers open up wider
      
      // Layer colors: White-gold core fading to deep orange edges
      const colors = ["#ffffff", "#ffcc00", "#ff6600", "#cc2200"];
      
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        
        petalArray.push(
          <mesh 
            key={`petal-${layer}-${i}`} 
            rotation={[tilt, 0, angle]} // Radiate outward
            position={[Math.sin(angle) * radius, -0.5 + (layer * 0.1), Math.cos(angle) * radius]}
            scale={[1, 1, 0.05]} // Squash the geometry so it's thin like a petal
          >
            {/* The shape of the petal */}
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial 
              color={colors[layer]} 
              wireframe 
              transparent 
              opacity={0.25 + (layer * 0.1)} 
            />
          </mesh>
        );
      }
    }
    return petalArray;
  }, []);

  useFrame((state, delta) => {
    const intensity = getAudioIntensity(); // Values from 0.0 to 1.0

    // Gentle, constant rotation
    groupRef.current.rotation.y -= delta * 0.05; // Spin slowly
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Gentle rock

    // The Lotus "breathes" (scales) slightly with the chanting
    const targetScale = 1.2 + (intensity * 0.15); 
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        {/* The glowing seed/core of the lotus */}
        <Sphere args={[0.2, 16, 16]} position={[0, -0.2, 0]}>
          <meshBasicMaterial color="#ffffff" wireframe />
        </Sphere>
        {petals}
      </group>
    </Float>
  );
}

// Gentle ambient dust floating around the lotus
function AmbientDust() {
  return (
    <group>
      <Sparkles count={80} scale={10} size={4} speed={0.1} opacity={0.4} color="#ffcc00" />
      <Sparkles count={40} scale={15} size={8} speed={0.05} opacity={0.2} color="#ff5500" />
    </group>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    const targetX = Math.sin(state.clock.elapsedTime / 6) * 0.5;
    const targetY = Math.sin(state.clock.elapsedTime / 5) * 0.3;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#0a0200]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.1} />

        {/* The new centerpiece */}
        <DivineLotus />
        
        {/* Minimal environmental particles */}
        <AmbientDust />

        <CameraRig />

        {/* The deep glow effect */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
          <Vignette eskil={false} offset={0.2} darkness={1.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}