// https://www.npmjs.com/package/recursive-copy
const copyScssConfig = {
  overwrite: true,
  expand: true,
  // dot: false,
  // junk: true,
  filter: [
    '**/*.scss',
    '!**/*.component.scss'
  ],
  // rename: function(filePath) {
  //   return filePath.replace('src/lib/', '');
  // },
  // transform: function(src, dest, stats) {
  //   if (path.extname(src) !== '.txt') { return null; }
  //   return through(function(chunk, enc, done)  {
  //     var output = chunk.toString().toUpperCase();
  //     done(null, output);
  //   });
  // }
};

exports.copyScssConfig = copyScssConfig;


