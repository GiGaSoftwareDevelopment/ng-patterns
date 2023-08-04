import { createBuilder } from '../util';
import { packages } from './config';
import * as shelljs from 'shelljs';
import { Arguments, getArgsDict } from '../otp';
import { publishablePackageSet1List } from '../build/_build.config';

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
  for (let pkg of publishablePackageSet1List) {
    console.log(`Publishing @ngpat/${pkg}`);

    const cmd = [
      'npm publish',
      `./dist/libs/packages/${pkg}`,
      '--access=public',
      `--tag=${argDict.tag || 'latest'}`,
      `--otp=${argDict.otp}`
    ];

    shelljs.exec(cmd.join(' '));
  }
}

const publishLatest = createBuilder([
  ['Publish packages on latest\n', publishLatestToNpm]
]);

publishLatest({
  scope: '@ngpat',
  packages
}).catch(err => {
  console.error(err);
  process.exit(1);
});
