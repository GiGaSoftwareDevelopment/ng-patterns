import { Tree } from '@nx/devkit';
import { DomainGeneratorSchema } from './schema';
import { wrapAngularDevkitSchematic } from 'nx/src/adapter/ngcli-adapter';
import { default as api } from '../ddd-api/generator';
import { default as domain } from '../ddd-domain/generator';
import { default as feature } from '../ddd-feature/generator';
import { default as ui } from '../ddd-ui/generator';
import { default as util } from '../ddd-util/generator';
// import { default as add-material-to-project } from '../add-material-to-project/generator'

export default async function (tree: Tree, options: DomainGeneratorSchema) {
  // https://nx.dev/more-concepts/nx-devkit-angular-devkit
  const appGenerator = wrapAngularDevkitSchematic('@nx/angular', 'application');

  // npx nx generate @nx/angular:application --name=foo --directory=my-domain --routing --standalone
  await appGenerator(tree, {
    name: options.appName,
    directory: options.domain,
    routing: true,
    standalone: true,
    standaloneConfig: true,
    strict: true,
    style: 'scss',
    tags: `domain:${options.domain}, type:app`
  });

  const chain: Promise<any>[] = [
    api(tree, {
      name: options.appName,
      domain: options.domain,
      standalone: true
    }),
    domain(tree, {
      name: options.domain,
      standalone: false
    }),
    feature(tree, {
      name: options.domain,
      standalone: false,
      domain: options.domain,
      noApp: true
    }),
    ui(tree, {
      name: options.appName,
      domain: options.domain,
      standalone: true
    }),
    util(tree, {
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
