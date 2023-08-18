import { AudioPlayer, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import { PlayableItem } from './metadata';
import { dequeue } from './queue';
import playDL from 'play-dl';

let paused = false;
let repeat = false;
let loading = false;
let currentItem: PlayableItem | undefined;
let discordPlayer: AudioPlayer;
let audio: HTMLAudioElement | undefined;

export function init() {
  if (!discordPlayer) {
    discordPlayer = createAudioPlayer();
  }

  // add listener
  discordPlayer.on(AudioPlayerStatus.Idle, async () => {
    if (repeat) {
      await play(currentItem);
    } else if (!loading) {
      await play(dequeue());
    }
  });
  return discordPlayer;
}

export async function play(item?: PlayableItem) {
  loading = true;
  if (item) {
    try {
      discordPlayer?.stop(true);
      const stream = await playDL.stream(item.url);
      const audioResource = createAudioResource(stream.stream, { inputType: stream.type });
      discordPlayer.play(audioResource);
      currentItem = item;
      loading = false;
      return true;
    } catch (error) {
      loading = false;
      throw error;
    }
  } else {
    audio?.play();
    loading = false;
    return true;
  }
}

export function pause() {
  paused = true;
  audio?.pause();
}

export function unpause() {
  paused = false;
  audio?.play();
}

export function isPaused() {
  return paused;
}

export function getRepeat() {
  return repeat;
}
export function setRepeat(value: boolean) {
  repeat = value;
}
export function getCurrentItem() {
  return currentItem;
}
