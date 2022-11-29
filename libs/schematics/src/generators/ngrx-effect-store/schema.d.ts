
export interface NgrxEffectStoreGeneratorSchema {
  projectName: string;
  name: string;
  path: string;
}

export interface SchematicOptions extends NgrxEffectStoreGeneratorSchema {
  directory: string;
}
