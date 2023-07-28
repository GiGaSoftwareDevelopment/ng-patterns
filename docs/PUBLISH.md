# Publish NPM


### Clean npx cache

- [See Stack Overflow](https://stackoverflow.com/questions/63510325/how-can-i-clear-the-central-cache-for-npx)

```angular2html
npx clear-npx-cache
```


### Run the following commands

1. `npm run update:versions`

    ```
     What is the new version? provide [x.x.x] 16.1.8
     Do you want to update versions of packages? y|n y
     Do you want to update version in peer dependencies? y|n y
    ```
2. `npm run build:libs`
3. `npm run publish:[set number] -- otp=[google authenticator number]`
    - `npm run publish:set1 -- otp=`
    - `npm run publish:set2 -- otp=`

# Publish firebase np-patterns
`npm run d.patterns`

# Publish CompoDocs
`npm run compodoc:all`

# Build Individual Libraries

api: `npm run api:build`
charts: `npm run charts:build`
date: `npm run date:build`
fn: `npm run fn:build`
material: `npm run material:build`
ng-prototype: `npm run ng-prototype:build`
schematics: `npm run schematics:build`
rxjs: `npm run rxjs:build`
utils: `npm run utils:build`
