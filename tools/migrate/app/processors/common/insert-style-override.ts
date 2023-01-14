export function insertStyleOverride(content: string): string {
  return [
    content.slice(0, content.lastIndexOf(".scss'")),
    ".scss', \n  '_ui-overrides.scss'",
    content.slice(content.lastIndexOf(".scss'") + ".scss'".length)
  ].join('');
}
