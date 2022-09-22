// Основные модули
import gulp from "gulp";
import loadPlugins from "load-plugins"; // подгрузит плагины для Галпа

// Импортируем пути
import { path } from "./gulp-settings.js"; // Импорт путей

// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
  gulp: gulp,
  path: path,
	lp: loadPlugins('gulp-*'), // загрузит нужный плагин gulp-
	rootFolder: rootFolder,
}


// Импортируем задачи для Галпа
import { reset } from "./gulp-tasks/reset.js";
import { html } from "./gulp-tasks/html.js";
import { css } from "./gulp-tasks/css.js";
import { js } from "./gulp-tasks/js.js";
import { images } from "./gulp-tasks/images.js";
import { ftp } from "./gulp-tasks/ftp.js";
import { sprite } from "./gulp-tasks/sprite.js";
import { gitignore } from "./gulp-tasks/gitignore.js";
import { otf2ttf, ttf2woff, fontStyle } from "./gulp-tasks/fonts.js";

// Преобразуем шрифты
const fonts = gulp.series(reset, otf2ttf, ttf2woff, fontStyle);

const devTasks = gulp.parallel(fonts, gitignore);
const buildTasks = gulp.series(fonts, js, gulp.parallel(html, css, images, gitignore));




// Экспортируем задачи
export { html }
export { css }
export { js }
export { images }
export { fonts }
export { sprite }
export { ftp }

// Cценарии выполнения задач Галпом
const dev = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);

// Экспортируем сценарии
export { dev }
export { build }
export { deployFTP }

// Сценарий по умолчанию
gulp.task('default', dev);
