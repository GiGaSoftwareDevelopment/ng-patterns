import {createBuilder} from '../util';
import {packages} from './config';
import * as shelljs from 'shelljs';
import {Arguments, getArgsDict} from '../otp';
import {publishablePackages} from '../build/_build.config';

const argDict: Arguments = getArgsDict(process.argv);

if (!argDict.otp) {
  throw Error(
    `Need to provide -- otp=123456 param, use authenticator app get get code.`
  );
}

/**
 * Publish release to NPM on "latest" tag
 */
export async function publishLatestToNpm() {
  for (let pkg of publishablePackages) {
    console.log(`Publishing @uiux/${pkg}`);

    const cmd = [
      'npm publish',
      `./dist/packages/${pkg}`,
      '--access=public',
      '--tag=latest',
      `--otp=${argDict.otp}`
    ];

    shelljs.exec(cmd.join(' '));
  }
}

const publishLatest = createBuilder([
  ['Publish packages on latest\n', publishLatestToNpm]
]);

publishLatest({
  scope: '@uiux',
  packages
}).catch(err => {
  console.error(err);
  process.exit(1);
});
