#!/usr/bin/env node
import TmuxPaneStream from './index';

const pane = process.argv[2];

process.stdin.pipe(new TmuxPaneStream(pane)).pipe(process.stdout);
