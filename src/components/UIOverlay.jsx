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

      {/* Developer Credit Footer - Optimized for Mobile */}
      <div className="absolute bottom-12 md:bottom-8 w-full text-center z-30 pointer-events-auto px-4">
        <p className="text-orange-200/60 text-xs md:text-sm tracking-[0.2em] uppercase font-medium drop-shadow-md">
          Developed by{' '}
          <a 
            href="https://koustav2303.github.io/koustavpan-portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-400 font-bold hover:text-orange-100 hover:drop-shadow-[0_0_15px_rgba(255,165,0,1)] transition-all duration-300 ease-in-out whitespace-nowrap"
          >
            Koustav
          </a>
        </p>
      </div>
      
    </div>
  );
}