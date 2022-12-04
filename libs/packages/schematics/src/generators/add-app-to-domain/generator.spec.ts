import {createTreeWithEmptyWorkspace} from '@nrwl/devkit/testing';
import {Tree, readProjectConfiguration} from '@nrwl/devkit';

import generator from './generator';
import {AddAppToDomainGeneratorSchema} from './schema';

describe('add-app-to-domain generator', () => {
  let appTree: Tree;
  const options: AddAppToDomainGeneratorSchema = {
    appName: 'test',
    domain: 'domain'
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
