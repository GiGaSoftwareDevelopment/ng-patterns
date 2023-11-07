# Publish NPM


### Clean npx cache

- [See Stack Overflow](https://stackoverflow.com/questions/63510325/how-can-i-clear-the-central-cache-for-npx)

```angular2html
npx clear-npx-cache
```

### Update versions
```
  # global replace in this doc `16.9.3` with the new version

```

### Run the following commands

1. `npm run update:versions`

    ```
     What is the new version? provide [x.x.x] 
     Do you want to update versions of packages? y|n y
     Do you want to update version in peer dependencies? y|n n
    ```
2. `npm run build:libs`

[//]: # (3. `npm run publish`)
3. `npm run publish:[set number] -- tag=[tag name] otp=[google authenticator number]`
    - `npm run publish:set1 -- tag=latest otp=`
    - `npm run publish:set2 -- tag=latest otp=`
   
    - `npm run publish:set1 -- tag=beta otp=`
    - `npm run publish:set2 -- tag=beta otp=`


### Upgrade in projects
```
npx nx migrate @ngpat/firebase 
npx nx migrate @ngpat/calculations 
npx nx migrate @ngpat/charts 
npx nx migrate @ngpat/data
npx nx migrate @ngpat/date
npx nx migrate @ngpat/date 
npx nx migrate @ngpat/firebase 
npx nx migrate @ngpat/fn 
npx nx migrate @ngpat/material 
npx nx migrate @ngpat/rxjs 
npx nx migrate @ngpat/schematics 
npx nx migrate @ngpat/store 
npx nx migrate @ngpat/utils
```

# Publish firebase np-patterns
`npm run d.patterns`

# Publish CompoDocs
`npm run compodoc:all`

# Build Individual Libraries

calculations: `npm run build:calculations`
charts: `npm run build:charts`
fn: `npm run build:fn`
data: `npm run build:data`
date: `npm run build:date`
feature: `npm run build:feature-flag`
firebase: `npm run build:firebase`
material: `npm run build:material`
ng-prototype: `npm run build:nx-ng-mat-prototype`
schematics: `npm run build:schematics`
rxjs: `npm run build:rxjs`
store: `npm run build:store`
utils: `npm run build:utils`
