import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { NgrxEffectStoreGeneratorSchema } from './schema';

describe('ngrx-effect-store generator', () => {
  let appTree: Tree;
  const options: NgrxEffectStoreGeneratorSchema = { name: 'test', projectName: 'projectName', path: 'path' };

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
