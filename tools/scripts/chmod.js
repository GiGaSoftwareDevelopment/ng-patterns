const fs = require('fs');

fs.chmodSync(process.argv[2], 0o777);
process.exit(0);
