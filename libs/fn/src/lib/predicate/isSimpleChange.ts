export function isSimpleChange(changes: any, property: string) {
  return changes.hasOwn(property) && changes[property].previousValue !== changes[property].currentValue;
}
