# Publish NPM


### Clean npx cache

- [See Stack Overflow](https://stackoverflow.com/questions/63510325/how-can-i-clear-the-central-cache-for-npx)

```angular2html
npx clear-npx-cache
```

### Update versions
```
# global replace in this doc 16.6.1-beta.2 with the new version

```

### Run the following commands

1. `npm run update:versions`

    ```
     What is the new version? provide [x.x.x] 16.6.1-beta.2
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
yarn upgrade @ngpat/firebase@16.6.1-beta.2 @ngpat/calculations@16.6.1-beta.2 @ngpat/charts@16.6.1-beta.2 @ngpat/data@16.6.1-beta.2 @ngpat/date@16.6.1-beta.2 @ngpat/date@16.6.1-beta.2 @ngpat/firebase@16.6.1-beta.2 @ngpat/fn@16.6.1-beta.2 @ngpat/material@16.6.1-beta.2 @ngpat/rxjs@16.6.1-beta.2 @ngpat/schematics@16.6.1-beta.2 @ngpat/store@16.6.1-beta.2 @ngpat/utils@16.6.1-beta.2
```

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
