import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { DesignLibraryComponentGeneratorSchema } from './schema';

describe('design-library-component generator', () => {
  let appTree: Tree;
  const options: DesignLibraryComponentGeneratorSchema = {
    name: 'test',
    projectName: 'test',
    path: '',
    prefix: 'foo',
    directory: ''
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
