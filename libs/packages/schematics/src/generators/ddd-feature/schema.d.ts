export interface FeatureOptions {
  /**
   * Library name
   */
  name: string;
  /**
   * Subpath within libs directory
   */
  directory?: string;
  /**
   * Apply the "feature-" prefix?
   */
  prefix?: boolean;
  /**
   * Domain name
   */
  domain: string;
  /**
   * Domain name
   */
  domainDirectory?: string;
  /**
   * Don't connect this feature lib to an app
   */
  noApp?: boolean;
  /**
   * app name
   */
  app?: string;
  /**
   * Subpath within app directory
   */
  appDirectory?: string;
  /**
   * Is this feature module lazy loaded?
   */
  lazy?: boolean;
  /**
   * Optional entity to create for this feature
   */
  entity?: string;
  /**
   * A type to determine if and how to build the library.
   */
  type?: 'internal' | 'buildable' | 'publishable';
  /**
   * For publishable libs: Official package name used in import statements
   */
  importPath?: string;
  /**
   * Add ngrx for the domain (entity required)
   */
  ngrx?: boolean;

  standalone: boolean;

  [k: string]: any;
}
