import { useRef, useState } from 'react';
import audioFile from '../assets/audio/radhanam.mp3';
import { setupAudio } from '../utils/audioAnalyzer'; // Import the analyzer

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!isPlaying) {
      // Initialize the audio analyzer on first play
      setupAudio(audioRef.current);
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="z-30 pointer-events-auto flex flex-col items-center">
      <button
        onClick={togglePlay}
        className="relative group px-14 py-5 rounded-full bg-black/40 border border-orange-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(255,85,0,0.2)] hover:shadow-[0_0_60px_rgba(255,85,0,0.6)] hover:bg-black/60 hover:border-orange-500/60 transition-all duration-500 ease-out overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-500/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out -translate-x-full"></div>
        
        <span className="relative text-orange-100 text-lg md:text-xl font-bold tracking-[0.4em] drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] uppercase">
          {isPlaying ? 'STOP' : 'START'}
        </span>
      </button>

      {/* Added crossOrigin anonymous to allow audio processing */}
      <audio ref={audioRef} src={audioFile} loop crossOrigin="anonymous" />
    </div>
  );
}