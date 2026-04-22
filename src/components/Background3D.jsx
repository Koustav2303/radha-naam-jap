import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Upgraded CameraRig for buttery smooth, interpolated movement
function CameraRig() {
  useFrame((state, delta) => {
    const targetX = Math.sin(state.clock.elapsedTime / 4) * 0.2;
    const targetY = Math.sin(state.clock.elapsedTime / 3) * 0.2;
    
    // Lerp smoothly glides the camera rather than snapping it, fixing micro-stutters
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#05000a]">
      {/* dpr={[1, 1.5]} ensures the canvas doesn't crash GPUs on Retina/4K screens.
        gl={{ antialias: false }} boosts performance since post-processing handles the smoothing.
      */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ff8800" />

        {/* Optimized particle counts for a solid 60fps */}
        <Stars radius={100} depth={50} count={2500} factor={3} saturation={1} fade speed={0.5} />

        {/* Lowered segment count (32) for better performance */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1.5, 32, 32]} position={[0, 0, -1]}>
            <meshBasicMaterial color="#ff5500" transparent opacity={0.08} />
          </Sphere>
        </Float>

        <Sparkles count={100} scale={15} size={6} speed={0.2} opacity={0.6} color="#ffaa00" />
        <Sparkles count={60} scale={20} size={10} speed={0.1} opacity={0.3} color="#ff3300" />
        <Sparkles count={40} scale={10} size={3} speed={0.4} opacity={0.8} color="#ffffff" />

        <CameraRig />

        {/* multisampling={0} gives a massive performance boost when using Bloom */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}