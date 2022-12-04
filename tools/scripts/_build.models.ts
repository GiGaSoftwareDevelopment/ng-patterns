export interface PackageUpdate {
  libName: string;
  packagePath: string;
  peerDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
}

export interface PkdDict {
  [name: string]: string;
}
