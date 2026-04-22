let analyser = null;
let dataArray = null;

export const setupAudio = (audioElement) => {
  // Only initialize once
  if (analyser) return; 

  // Create an audio context (must be done after user interaction)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaElementSource(audioElement);
  
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128; // Gives us 64 frequency bands
  
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  
  dataArray = new Uint8Array(analyser.frequencyBinCount);
};

export const getAudioIntensity = () => {
  if (!analyser || !dataArray) return 0;
  
  analyser.getByteFrequencyData(dataArray);
  
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  
  // Return a normalized value between 0 and 1
  return (sum / dataArray.length) / 255; 
};