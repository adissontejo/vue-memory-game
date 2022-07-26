import flip from '@/assets/audio/flip.mp3';
import hit from '@/assets/audio/hit.mp3';

export const playSFX = (src?: string) => {
  const audio = new Audio(src);

  audio.autoplay = true;
};

export const sfx = {
  flip: () => playSFX(flip),
  hit: () => playSFX(hit),
};
