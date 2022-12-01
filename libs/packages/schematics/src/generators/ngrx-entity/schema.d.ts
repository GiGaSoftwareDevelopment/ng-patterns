export interface NgrxEntityGeneratorSchema {
  projectName: string;
  name: string;
  path: string;
}

export interface SchematicOptions extends NgrxEntityGeneratorSchema {
  directory: string;
}
