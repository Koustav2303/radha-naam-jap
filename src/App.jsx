import Background3D from './components/Background3D';
import UIOverlay from './components/UIOverlay';

export default function App() {
  return (
    // Changed to h-screen w-screen to forcefully lock the viewport
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      <Background3D />
      <UIOverlay />
    </main>
  );
}