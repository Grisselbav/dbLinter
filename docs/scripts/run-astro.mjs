#!/usr/bin/env node
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node scripts/run-astro.mjs <astro-args...>');
  process.exit(1);
}

// VS Code JavaScript Debugger may inject a bootloader via NODE_OPTIONS.
// Clearing NODE_OPTIONS avoids known V8 crashes in this project build path.
const env = { ...process.env };
delete env.NODE_OPTIONS;

const astroBin = process.platform === 'win32' ? 'astro.cmd' : 'astro';
const child = spawn(astroBin, args, {
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
