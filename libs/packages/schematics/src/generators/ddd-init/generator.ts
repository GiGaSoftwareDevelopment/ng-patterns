import { Tree } from '@nx/devkit';
import { updateDepConst } from '../utils/update-dep-const';

export default async function (tree: Tree, schema: any) {
  updateDepConst(tree, depConst => {
    const jokerIndex = depConst.findIndex(
      (entry: any) =>
        entry['sourceTag'] &&
        entry['sourceTag'] === '*' &&
        entry['onlyDependOnLibsWithTags'] &&
        Array.isArray(entry['onlyDependOnLibsWithTags']) &&
        entry['onlyDependOnLibsWithTags'].length > 0 &&
        entry['onlyDependOnLibsWithTags'][0] === '*'
    );

    if (jokerIndex !== -1) {
      depConst.splice(jokerIndex, 1);
    }

    depConst.push({
      sourceTag: 'type:app',
      onlyDependOnLibsWithTags: [
        'type:api',
        'type:feature',
        'type:ui',
        'type:domain-logic',
        'type:util'
      ]
    });

    depConst.push({
      sourceTag: 'type:api',
      onlyDependOnLibsWithTags: ['type:ui', 'type:domain-logic', 'type:util']
    });

    depConst.push({
      sourceTag: 'type:feature',
      onlyDependOnLibsWithTags: ['type:ui', 'type:domain-logic', 'type:util']
    });

    depConst.push({
      sourceTag: 'type:ui',
      onlyDependOnLibsWithTags: ['type:domain-logic', 'type:util']
    });

    depConst.push({
      sourceTag: 'type:domain-logic',
      onlyDependOnLibsWithTags: ['type:util']
    });

    depConst.push({
      sourceTag: 'domain:shared',
      onlyDependOnLibsWithTags: ['domain:shared']
    });
  });

  // const projectRoot = `libs/${schema.name}`;
  // addProjectConfiguration(tree, schema.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {}
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, schema);
  // await formatFiles(tree);
}
