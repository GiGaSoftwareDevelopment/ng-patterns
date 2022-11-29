export interface SchematicInput {
  projectName: string;
  name: string;
  path: string;
  prefix: string;
}

export interface DesignLibraryComponentGeneratorSchema extends SchematicInput {
  directory: string;
}
