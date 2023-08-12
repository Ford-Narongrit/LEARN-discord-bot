import { Command } from '../command';
import { Hello } from './hello';
import { Wake } from './wake';
import { Play } from './play';
import { Adjudge } from './adjudge';

export const Commands: Command[] = [Hello, Wake, Play, Adjudge];
