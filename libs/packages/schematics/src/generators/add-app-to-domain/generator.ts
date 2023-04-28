import { Tree } from '@nx/devkit';
import { AddAppToDomainGeneratorSchema } from './schema';
import { wrapAngularDevkitSchematic } from 'nx/src/adapter/ngcli-adapter';
import { default as ui } from '@angular-architects/ddd/src/generators/ui';
import { default as util } from '@angular-architects/ddd/src/generators/util';
import { default as api } from '@angular-architects/ddd/src/generators/api';

export default async function (
  tree: Tree,
  options: AddAppToDomainGeneratorSchema
) {
  // https://nx.dev/more-concepts/nx-devkit-angular-devkit
  const appGenerator = wrapAngularDevkitSchematic('@nx/angular', 'application');

  // npx nx generate @nx/angular:application --name=foo --directory=my-domain --routing --standalone
  await appGenerator(tree, {
    name: options.appName,
    directory: options.domain,
    routing: true,
    standalone: true,
    style: 'scss',
    tags: `domain:${options.domain}, type:app`
  });

  // npx nx generate @angular-architects/ddd:domain --name=ford

  const chain: Promise<any>[] = [
    // domain(tree, {
    //   name: options.domain,
    //   standalone: false
    // }),
    ui(tree, {
      name: options.appName,
      domain: options.domain,
      standalone: true
    }),
    util(tree, {
      name: options.appName,
      domain: options.domain,
      standalone: true
    }),
    api(tree, {
      name: options.appName,
      domain: options.domain,
      standalone: true
    })
    // add-material-to-project(tree, {
    //   appName: options.appName,
    //   domain: options.domain
    // })
  ];

  const solveChainPromises = async (promises: Promise<any>[]) => {
    return await promises.reduce(async (accumulator, current) => {
      await accumulator;
      return await current;
    }, Promise.resolve(true));
  };

  await solveChainPromises(chain);

  return () => {
    console.log('done');
  };
}
