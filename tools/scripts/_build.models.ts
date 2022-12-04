export interface PackageJsonConfig {
  libName: string;
  outputs: string;
  packagePath: string;
}

export interface PackageUpdate extends PackageJsonConfig {
  peerDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
}

export interface NgPackageUpdate extends PackageJsonConfig {
  libName: string;
  outputs: string;
  packagePath: string;
  allowedNonPeerDependencies: string[];
}

export interface PkdDict {
  [name: string]: string;
}
