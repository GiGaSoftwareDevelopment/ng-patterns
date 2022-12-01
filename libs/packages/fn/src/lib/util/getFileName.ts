export function getFileName(filepath: string): string {
  return filepath.substring(0, filepath.lastIndexOf('.')) || filepath;
}
