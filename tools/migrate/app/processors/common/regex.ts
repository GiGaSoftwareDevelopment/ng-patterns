export function createModuleComponentImportRegex(fileName: string) {
  return new RegExp('\\.\\/' + fileName, 'g');
}

export function createComponentNameRegex(className: string) {
  return new RegExp(className + ',', 'g');
}

export function createComponentImportNameRegex(className: string) {
  return new RegExp(className + '}', 'g');
}
