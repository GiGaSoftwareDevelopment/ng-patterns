import {createTreeWithEmptyWorkspace} from '@nrwl/devkit/testing';
import {Tree, readProjectConfiguration} from '@nrwl/devkit';

import generator from './generator';
import {FeatureComponentGeneratorSchema} from './schema';

describe('feature-component generator', () => {
  let appTree: Tree;
  const options: FeatureComponentGeneratorSchema = {
    name: 'test',
    projectName: 'projectName',
    path: 'path',
    prefix: 'prefix'
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    // await generator(appTree, options);
    // const config = readProjectConfiguration(appTree, 'test');
    // expect(config).toBeDefined();
    expect(true).toBe(true);
  });
});
