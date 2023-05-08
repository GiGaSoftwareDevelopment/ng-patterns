import { spawn } from 'child_process';

export function spawnBashCommand(
  command: string,
  cwd: string
): Promise<boolean> {
  return new Promise((resolve, reject): void => {
    const childProcess = spawn(command, {
      stdio: 'inherit',
      cwd,
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
