import * as readline from 'readline';
import { packages } from './config';
import { createBuilder } from '../util';
import * as shelljs from 'shelljs';
import { Arguments, getArgsDict } from '../otp';
import { publishablePackageSet2List } from '../build/_build.config';
import { publishLatestSet1ToNpm } from './publish-1';

const argDict: Arguments = getArgsDict(process.argv);

async function enterGoogleAuthenticatorCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    // if no version is provided, ask for it
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Enter Google Authenticator Code [123456]: `, code => {
      rl.close();

      resolve(code);
    });
  });
}

/**
 * Publish release to NPM on "latest" tag
 */
export function publishSet1ToNpmWithOTP(otp: string) {
  return async function publishLatestToNpm() {
    for (let pkg of publishablePackageSet2List) {
      console.log(`Publishing @ngpat/${pkg}`);

      const cmd = [
        'npm publish',
        `./dist/libs/packages/${pkg}`,
        '--access=public',
        `--tag=${argDict.tag || 'latest'}`,
        `--otp=${otp}`
      ];

      shelljs.exec(cmd.join(' '));
    }
  }

}

export function publishSet2ToNpmWithOTP(otp: string) {
  return async function publishLatestToNpm() {
    for (let pkg of publishablePackageSet2List) {
      console.log(`Publishing @ngpat/${pkg}`);

      const cmd = [
        'npm publish',
        `./dist/libs/packages/${pkg}`,
        '--access=public',
        `--tag=${argDict.tag || 'latest'}`,
        `--otp=${otp}`
      ];

      shelljs.exec(cmd.join(' '));
    }
  }
}


async function main() {
  const otp1 = await enterGoogleAuthenticatorCode();

  const publishSet1 = createBuilder([
    ['Publish packages on latest\n', publishSet1ToNpmWithOTP(otp1)]
  ]);

  await publishSet1({ scope: '@ngpat', packages });

  const otp2 = await enterGoogleAuthenticatorCode();

  const publishSet2 = createBuilder([
    ['Publish packages on latest\n', publishSet2ToNpmWithOTP(otp2)]
  ]);


  await publishSet2({ scope: '@ngpat', packages });

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
} );
