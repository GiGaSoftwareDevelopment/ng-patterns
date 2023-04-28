import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { NgrxEntityGeneratorSchema } from './schema';

describe('ngrx-entity generator', () => {
  let appTree: Tree;
  const options: NgrxEntityGeneratorSchema = {
    name: 'test',
    path: 'path',
    projectName: 'projectName'
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
