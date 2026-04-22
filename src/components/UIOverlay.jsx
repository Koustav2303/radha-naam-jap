import Typography from './Typography';
import AudioPlayer from './AudioPlayer';

export default function UIOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      
      {/* Main Center Content */}
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16">
        <Typography />
        <AudioPlayer />
      </div>

      {/* Developer Credit Footer */}
      <div className="absolute bottom-8 z-20 pointer-events-auto text-orange-200/50 text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
        Developed by{' '}
        <a 
          href="https://koustav2303.github.io/koustavpan-portfolio/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-400 font-bold hover:text-orange-100 hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.8)] transition-all duration-300 ease-in-out"
        >
          Koustav
        </a>
      </div>
      
    </div>
  );
}