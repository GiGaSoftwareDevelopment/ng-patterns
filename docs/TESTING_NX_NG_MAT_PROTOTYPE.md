# Testing nx-ng-mat-prototype

`npm link` does not work consistently. On my mac, the `npm unlink ...` command is not removing the links from global, which prevents 
me from easily updating the links for testing. This procedure works and is much easier.

In the file `libs/packages/nx-ng-mat-prototype/bin/generate.sh`

to test schematics locally:
  
Comment this:
```_#yarn add @ngpat/schematics@latest_```
Add this:
```yarn add @ngpat/schematics@file:/Users/[name]/Dev/@giga/ng-patterns/dist/libs/packages/schematics```


1. Create a `testing` directory sibling to `ng-patterns` repo
2. In the `ng-patterns` repo, build the `nx-ng-mat-prototype` package by running `npm run build:nx-ng-mat-prototype`
3. In the `testing` directory, run `npm install file:../ng-patterns/dist/libs/packages/nx-ng-mat-prototype`
4. run `npx nx-ng-mat-prototype`

To update `nx-ng-mat-prototype` for testing,
1. `rm -rf [test repo]`
2. `rm -rf node_modules`
3. Repeat install steps

## References
- https://blog.scottlogic.com/2018/04/05/npx-the-npm-package-runner.html
