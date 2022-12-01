/**
 *
 * Get the extension of a file name.
 *
 * https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/1203361#1203361
 *
 * @param filename
 */
export function getFileExtension(filename: string): string {
  return (
    filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
    filename
  );
}
