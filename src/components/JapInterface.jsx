import { useRef, useState } from 'react';
import audioFile from '../assets/audio/radhanam.mp3';

export default function JapInterface() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none selection:bg-orange-500/30">
      
      <div className="pointer-events-auto flex flex-col items-center gap-14">
        
        {/* Typographic Core */}
        <div className="z-20 text-center flex flex-col items-center">
           <h2 className="text-orange-400/60 uppercase tracking-[0.5em] text-sm md:text-base font-semibold mb-4 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
             Divine Resonance
           </h2>
           <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-50 via-orange-300 to-orange-700 drop-shadow-[0_0_30px_rgba(255,100,0,0.6)] leading-tight tracking-tight">
             Radha<br/>Naam
           </h1>
        </div>

        {/* Interactive Play Mechanism */}
        <button
          onClick={togglePlay}
          className="relative group px-14 py-5 rounded-full bg-black/40 border border-orange-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(255,85,0,0.15)] hover:shadow-[0_0_60px_rgba(255,85,0,0.4)] hover:bg-black/60 hover:border-orange-500/50 transition-all duration-500 ease-out overflow-hidden"
        >
          {/* Subtle Button Inner Glow */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-500/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out -translate-x-full"></div>
          
          <span className="relative text-orange-100 text-lg md:text-xl font-bold tracking-[0.4em] drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            {isPlaying ? 'PAUSE' : 'INITIATE'}
          </span>
        </button>

      </div>

      <audio ref={audioRef} src={audioFile} loop />
    </div>
  );
}