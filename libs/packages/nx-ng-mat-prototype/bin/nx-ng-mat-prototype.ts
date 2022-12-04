#!/usr/bin/env node

import {spawn} from 'child_process';

export function createNxNgMatPrototype() {
  spawn(`bash ${__dirname}/generate.sh`, {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: '/bin/bash'
  });
}
