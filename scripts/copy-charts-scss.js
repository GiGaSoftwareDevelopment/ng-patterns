const copyScssConfig = require('./copy-scss-config').copyScssConfig;
const copy = require('recursive-copy');

copy('libs/charts', 'dist/libs/charts', copyScssConfig)
  .on(copy.events.COPY_FILE_START, function(copyOperation) {
    console.info('Copying file ' + copyOperation.src + '...');
  })
  .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
    console.info('Copied to ' + copyOperation.dest);
  })
  .on(copy.events.ERROR, function(error, copyOperation) {
    console.error('Unable to copy ' + copyOperation.dest);
  })
  .then(function(results) {
    console.info(results.length + ' file(s) copied');
  })
  .catch(function(error) {
    return console.error('Copy failed: ' + error);
  });
