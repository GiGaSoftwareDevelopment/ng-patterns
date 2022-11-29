
export interface FeatureComponentGeneratorSchema {
  projectName: string;
  name: string;
  path: string;
  prefix: string;
}

export interface SchematicOptions extends FeatureComponentGeneratorSchema {
  directory: string;
}
