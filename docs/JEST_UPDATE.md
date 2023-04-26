>  NX  Jest Snapshot format changed in v29.
By default Nx kept the older style to prevent breaking of existing tests with snapshots.
It's recommend you update to the latest format.
You can do this in your project's jest config file.
Remove the snapshotFormat property and re-run tests with the --update-snapshot flag.
More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
