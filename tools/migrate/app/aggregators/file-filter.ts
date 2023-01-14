export function notIncludeFileIf(item: any): boolean {
  return (
    !item.path.includes('/schematics/') &&
    !item.path.includes('.e2e.') &&
    !item.path.includes('.bazel') &&
    !item.path.includes('.bzl') &&
    !item.path.includes('.json') && // tsconfig and tslint files
    !item.path.includes('/testing/') &&
    !item.path.includes('.spec')
  );
}
