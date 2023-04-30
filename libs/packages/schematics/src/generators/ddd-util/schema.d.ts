export interface UtilOptions {
  /**
   * Name of the utility library
   */
  name: string;
  /**
   * Whether the library should be shared across all domains.
   */
  shared?: boolean;
  /**
   * Domain name, if the library belongs to a certain domain.
   */
  domain?: string;
  /**
   * Subpath of the library beneath the domain or shared folder.
   */
  directory?: string;
  /**
   * For publishable libs: Official package name used in import statements
   */
  importPath?: string;
  /**
   * A type to determine if and how to build the library.
   */
  type?: 'internal' | 'buildable' | 'publishable';

  standalone: boolean;

  [k: string]: any;
}
