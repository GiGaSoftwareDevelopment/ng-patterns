export interface PackageJsonConfig {
  libName: string;
  outputs: string;
  packagePath: string;
}

export interface PackageJson {
  peerDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
}


export interface PkdDict {
  [name: string]: string;
}

