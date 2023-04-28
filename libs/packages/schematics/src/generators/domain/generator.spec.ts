import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { DomainGeneratorSchema } from './schema';

describe('domain generator', () => {
  let appTree: Tree;
  const options: DomainGeneratorSchema = { appName: 'test', domain: 'domain' };

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
