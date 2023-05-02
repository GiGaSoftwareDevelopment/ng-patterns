import { SchematicContext } from '@angular-devkit/schematics';

export function checkRuleExists(filePath: string, rule: string, rules: any) {
  if (rules && !rules['rules']) {
    console.info(`${filePath}: rules expected`);
    return false;
  }

  if (rules && !rules['rules'][rule]) {
    console.info(`${filePath}: ${rule} expected`);
    return false;
  }

  if (rules && rules['rules'][rule]['length'] < 2) {
    console.info(`${filePath}: ${rule}.1 unexpected`);
    return false;
  }

  if (rules && !rules['rules'][rule][1]['depConstraints']) {
    console.info(`${filePath}: ${rule}.1.depConstraints expected.`);
    return false;
  }

  if (rules && !Array.isArray(rules['rules'][rule][1]['depConstraints'])) {
    console.info(
      `${filePath}: ${rule}.1.depConstraints expected to be an array.`
    );
    return false;
  }

  return true;
}
