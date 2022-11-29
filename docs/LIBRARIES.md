# Creating Publishable JS Libraries

1. Open Nx Console
2. Select `@nrwl/js:library`
3. Fill in these options
    - name
    - buildable: false
    - importPath: i.e. @uiux/nx-ng-mat-prototype
    - js: false
    - publishable: true
    - strict: true
4. Update compiler options

In `libs/[ name ]/tsconfig.json`, and in the `compilerOptions` node, update to :

```json
    "target": "es5",
    "module": "CommonJS",
```

# Creating A Generator Library

1. Make a publishable js library from the instructions above.
2. Run generator for @nrwl/nx-plugin:generator
