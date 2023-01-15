export interface JsonConfig {
  source: string;
  destination: string;
}

export interface CopyMaterialConfig {
  materialSource: string;
  materialDestination: string;
  materialDestinationLibrary: string;
  cdkSource: string;
  cdkDestination: string;

  cdkDestinationLibrary: string;
}

export interface ContentReplacement {
  description: string; // Some arbitrary name to help debug development, what are you trying to change?
  regex: RegExp;
  content: string;
}

export interface CopyContentToOverride {
  path: string;
  replacements: ContentReplacement[];
}

export interface FileData {
  path: string;
  content: string;
  copyTo?: {
    [targetPath: string]: CopyContentToOverride;
  };
}

export interface ProcessFile {
  file: FileData;
  doProcess: boolean;
}

export declare type ProcessorFunction = (content: FileData) => FileData;
export interface ProcessorFunctionConfig {
  name: string;
  func: ProcessorFunction;
}

export declare type Library = 'cdk' | 'material';

export interface ProcessorConfig {
  dryRun: boolean;
  verbose: boolean;
}

export const defaultProcessorConfig: ProcessorConfig = {
  dryRun: false,
  verbose: false
};
