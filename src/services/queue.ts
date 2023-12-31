import { PlayableItem } from './metadata';
let queue: PlayableItem[] = [];
let random = false;
let loop = false;

export function enqueue(item: PlayableItem | PlayableItem[]) {
  if (Array.isArray(item)) {
    queue = queue.concat(item);
  } else {
    queue.push(item);
  }
}

export function dequeue(to_index: number = 1) {
  const item = queue.splice(0, to_index);

  if (item) {
    if (loop) {
      queue.push(...item);
    }
    console.log('queue', item[to_index - 1]);

    return item[to_index - 1];
  }
}

export function setRandom(enabled: boolean) {
  random = enabled;
}
export function getRandom() {
  return random;
}

export function setLoop(enabled: boolean) {
  loop = enabled;
}
export function getLoop() {
  return loop;
}

export function list() {
  return queue;
}

export function clear() {
  queue = [];
}
