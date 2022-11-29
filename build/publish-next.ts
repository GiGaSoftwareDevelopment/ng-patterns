import { createBuilder } from './util';
import { packages } from './config';
import * as shelljs from 'shelljs';
import { Arguments, getArgsDict } from './otp';

const argDict: Arguments = getArgsDict(process.argv);

if (!argDict.otp) {
  throw Error(`Need to provide -- otp=123456 param, use authenticator app get get code.`);
}

/**
 * Publish release to NPM on "next" tag
 */
export async function publishNextToNpm() {
  const publishablePackages = [
    'nx-ng-mat-prototype',
    'schematics'
  ];

  for (let pkg of publishablePackages) {
    console.log(`Publishing @uiux/${pkg}`);

    const cmd = [
      'npm publish',
      `./dist/libs/${pkg}`,
      '--access=public',
      '--tag=next',
      `--otp=${argDict.otp}`
    ];

    shelljs.exec(cmd.join(' '));
  }
}

const publishNext = createBuilder([
  ['Publish packages on next\n', publishNextToNpm],
]);

publishNext({
  scope: '@uiux',
  packages,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
