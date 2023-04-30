export interface DomainOptions {
  /**
   * Grouping name for the Domain
   */
  name: string;
  /**
   * Grouping folder within the apps directory
   */
  appDirectory?: string;
  /**
   * Subpath of the domain within libs directory
   */
  directory?: string;
  /**
   * Add an app for the domain?
   */
  addApp?: boolean;
  /**
   * Add ngrx for the associated app (addApp required)
   */
  ngrx?: boolean;
  /**
   * A type to determine if and how to build the library.
   */
  type?: 'internal' | 'buildable' | 'publishable';
  /**
   * For publishable libs: Official package name used in import statements
   */
  importPath?: string;
  standalone: boolean;
  [k: string]: any;
}
