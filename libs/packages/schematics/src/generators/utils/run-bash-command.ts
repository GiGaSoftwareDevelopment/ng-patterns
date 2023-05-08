import { spawn } from 'child_process';
import { join } from 'path';

/**
 * Run a bash command in a child process.
 *
 * @param command - bash command to run
 * @param relativePath - path to run command, relative to process.cwd();
 */
export function runBashCommand(
  command: string,
  relativePath: string
): Promise<boolean> {
  return new Promise((resolve, reject): void => {
    const childProcess = spawn(command, {
      stdio: 'inherit',
      cwd: join(process.cwd(), relativePath),
      shell: '/bin/bash'
    });

    childProcess.on('exit', () => {
      resolve(true);
    });

    childProcess.on('error', function (err) {
      console.error('Error running', command);
      console.error(err);
    });
  });
}
