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
  console.log('added to queue', item);
}

export function dequeue() {
  const index = random ? Math.floor(Math.random() * queue.length) : 0;
  const item = queue.splice(index, 1)[0];
  if (item) {
    console.log('removed from queue', item);
    if (loop) {
      queue.push(item);
    }
    return item;
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
