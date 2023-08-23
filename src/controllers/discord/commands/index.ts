import { Command } from '../command';
import { Hello } from './hello';
import { Wake } from './wake';

import { Adjudge } from './adjudge';
import { Play } from './play';
import { Queue } from './queue';
import { Skip } from './skip';
import { Loop } from './loop';
import { Pause } from './pause';
import { Resume } from './resume';
import { Clear } from './clear';
export const Commands: Command[] = [Hello, Wake, Play, Adjudge, Queue, Skip, Loop, Pause, Resume, Clear];
