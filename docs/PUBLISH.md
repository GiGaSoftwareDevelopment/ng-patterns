# Publish NPM


### Clean npx cache

- [See Stack Overflow](https://stackoverflow.com/questions/63510325/how-can-i-clear-the-central-cache-for-npx)

```angular2html
npx clear-npx-cache
```

### Update versions
```
# global replace in this doc `16.7.7` with the new version

```

### Run the following commands

1. `npm run update:versions`

    ```
     What is the new version? provide [x.x.x] `16.7.7`
     Do you want to update versions of packages? y|n y
     Do you want to update version in peer dependencies? y|n y
    ```
2. `npm run build:libs`
3. `npm run publish:[set number] -- tag=[tag name] otp=[google authenticator number]`
    - `npm run publish:set1 -- tag=latest otp=`
    - `npm run publish:set2 -- tag=latest otp=`
    - `npm run publish:set1 -- tag=beta otp=`
    - `npm run publish:set2 -- tag=beta otp=`


### Upgrade in projects
```
npx nx migrate @ngpat/firebase @ngpat/calculations @ngpat/charts @ngpat/data @ngpat/date @ngpat/date @ngpat/firebase @ngpat/fn @ngpat/material @ngpat/rxjs @ngpat/schematics @ngpat/store @ngpat/utils
```

# Publish firebase np-patterns
`npm run d.patterns`

# Publish CompoDocs
`npm run compodoc:all`

# Build Individual Libraries

api: `npm run api:build`
charts: `npm run charts:build`
date: `npm run date:build`
firebase: `npm run build:firebase`
fn: `npm run fn:build`
material: `npm run material:build`
ng-prototype: `npm run build:nx-ng-mat-prototype`
schematics: `npm run schematics:build`
rxjs: `npm run rxjs:build`
store: `npm run build:store`
utils: `npm run utils:build`
