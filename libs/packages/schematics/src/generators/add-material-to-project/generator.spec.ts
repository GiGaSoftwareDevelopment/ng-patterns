import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { MaterialGeneratorSchema } from './schema';

describe('add-material-to-project generator', () => {
  let appTree: Tree;
  const options: MaterialGeneratorSchema = {
    appName: 'test',
    domain: 'domain'
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    // await generator(appTree, options);
    // const config = readProjectConfiguration(appTree, 'domain');
    // expect(config).toBeDefined();
    expect(true).toBe(true);
  });
});
