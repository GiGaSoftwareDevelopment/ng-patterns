
# Creating schematics

1. Generate an `@nrwl/js` library with a `tsc` compiler
2. Add a generator to the library

Add / replace the properties to the package.json:
```json
  "generators": "./generators.json",
  "executors": "./executors.json",
  "schematics": "./generators.json",
```

NX Console expects the schematics json to have a "schematics" node instead of a "generators" or "executors" nodes. Combine the 
`generators.json` and `executors.json` files into one file with the `schematics` node. ( Write a script to do this upon compilation)


## References
- https://medium.com/angularlicious/add-and-debug-schematic-projects-in-an-angular-workspace-c037fbe2930e
- 
