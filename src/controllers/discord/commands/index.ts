import { Command } from '../command';
import { Hello } from './hello';
import { Wake } from './wake';
import { Play } from './play';

export const Commands: Command[] = [Hello, Wake, Play];
