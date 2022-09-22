import webpack from "webpack-stream";
import webPackConfig from "../webpack.prod.js";

export const js = () => {
  return app.gulp.src(app.path.src.js)
    .pipe(app.lp.plumber(
      app.lp.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(webpack({
      config: webPackConfig
    }))
    .pipe(app.gulp.dest(app.path.build.js));
};



// return src(path.src.js) // 1. Берём путь src(path.src.html)
// .pipe(fileinclude()) // 1.1 
// .pipe(dest(path.build.js)) // 2. Несём в path.build.html
// .pipe(
//   babel({
//     presets: ['@babel/env'] // Совмещаем с более старыии версиями
//   })
// )
// .pipe(
//   uglify() // Сжимаем js
// )
// .on('error', function (err) { console.log(err.toString()); this.emit('end'); })
// .pipe(
//   rename({
//     extname: ".min.js" // Делаем копию файла (удобно читать)
//   })
// )
// .pipe(dest(path.build.js)) // 2. Несём в path.build.js ВТОРОЙ раз
// .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream()
