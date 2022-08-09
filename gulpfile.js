import { createRequire } from "module"; // to use import/export and require in same file
const require = createRequire(import.meta.url);

// В эту папку будет собираться проект, Эта папка (С названием проекта) передаётся на сервер заказчику 
let project_folder = 'zlatmaxGulp'
console.log(project_folder)
// Имя папки с иходниками
let source_folder="./src";
let fs = require('fs');

// Пути до файлов:
const path={
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
    files: project_folder + "/files" // ***
  },
  src: {
  // Все файлы source_folder + "/*.html" КРОМЕ _*.html
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    pug: source_folder + "/pug/*.pug", // ***
    css: source_folder + "/scss/style.scss",
    scss: source_folder + "/scss/style.scss", // ***
    js: source_folder + "/js/script.js", // *** app.js -> script.js 
    img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,webp}",
    svg: source_folder + "/img/**/*.svg", // Бесполезно
    fonts: source_folder + "/fonts/*.*",
    files: source_folder + "/files/**/*.*", // ***
		svgicons: source_folder + "/svgicons/*.svg", // ***
  },
// Прослушиваемые файлы
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/", // Путь к папкам которые удаляются при каждом запуске Gulp
  buildFolder: "./" + project_folder + "/",
	rootFolder: project_folder, // *** nodePath.basename(nodePath.resolve()); ???
  srcFolder: "./" + source_folder, // ***
	ftp: `` // Путь к нужной папке на удаленном сервере. gulp добавит имя папки проекта автоматически
};

// **************************
// Создаём переменные
import gulp from "gulp";
// import browsersync from "browser-sync";
import fileinclude from "gulp-file-include";
import del from "del";
// import scss from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import group_media from "gulp-group-css-media-queries";
import clean_css from "gulp-clean-css";
import rename from "gulp-rename";
// import uglify from "gulp-uglify-es";
import babel from "gulp-babel";
import imagemin from "gulp-imagemin";
import webphtml from "gulp-webp-html";
import webp from "imagemin-webp";
import webpcss from "gulp-webpcss";
import svgSprite from "gulp-svg-sprite";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import fonter from "gulp-fonter";
import newer from "gulp-newer";
let { src, dest } = require('gulp'),
  // gulp = require('gulp'),
  browsersync = require('browser-sync').create(), // Плагин который обновляет страницы
  // fileinclude = require('gulp-file-include'), // Плагин, который объекдиняет файлы в один общий
  // del = require('del'), // Плагин, который будет очищать папку dist
  scss = require('gulp-sass')(require('sass')), // 
  // autoprefixer = require('gulp-autoprefixer'),
  // group_media = require("gulp-group-css-media-queries"),  // Собирает по всему документу медиа-запросы
  // clean_css = require('gulp-clean-css'), // 
  // rename = require('gulp-rename'), //
  uglify = require('gulp-uglify-es').default; // Сжимает js
  // babel = require('gulp-babel'), // ** add Совмещает с более старыии версиями
  // imagemin = require('gulp-imagemin'), // Оптимизирует картинки
  // webphtml = require('gulp-webp-html'), // Конвертирует картинки в HTML
  // webp = require('imagemin-webp'), // Конвертирует картинки в формат Webp
  // webpcss = require('gulp-webpcss'),  // Конвертирует картинки в CSS
  // svgSprite = require('gulp-svg-sprite'), // Оборачивает картинки SVG
  // ttf2woff = require('gulp-ttf2woff'),
  // ttf2woff2 = require('gulp-ttf2woff2'),
  // fonter = require('gulp-fonter'),
  // newer = require('gulp-newer');
  // webpack = require('webpack-stream'); // Webpack gulp


// *****************************
// Создаём функции
function browserSync(params) {
  browsersync.init({
    // Здесь настраиваем сервер browsersync 
    server:{
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    // notify - табличка "браузер обновился" - выключаем 
    notify: false
  })
};

function html() {
  return src(path.src.html) // 1. Берём путь src(path.src.html)
    // pipe() - ф-ция, в которой мы пишем команды для Gulp
    .pipe(fileinclude()) // 1.1 
    .pipe(webphtml()) // Сокращает HTML-код для webp (обычным <img> теперь)
    .pipe(dest(path.build.html)) // 2. Несём в path.build.html
    .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream()
};

function css() {
  return src(path.src.css) // 1. Берём путь src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded" // Чтобы цсс файл не сжимался (для удобства чтения дальнейшего)
      }).on('error', scss.logError)
    )
    .pipe(
      group_media() // Группируем медиа-запросы
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"], // Версии браузеров для поддержки
        cascade: true // Стиль написания префиксов - каскад
      })
    )
    .pipe(
      webpcss({
        // webpClass: '.webp', 
        // noWebpClass: '.no-webp'
      })
    )
    .pipe(dest(path.build.css)) // 2. Несём в path.build.css
    .pipe(clean_css()) // Уменьшаем цсс (неудобно для чтения)
    .pipe(
      rename({
        extname: ".min.css" // Делаем копию файла (удобно читать)
      })
    )
    .pipe(dest(path.build.css)) // 2. Несём в path.build.css ВТОРОЙ раз
    .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream()
};

function js() {
  return src(path.src.js) // 1. Берём путь src(path.src.html)
    .pipe(fileinclude()) // 1.1 
    .pipe(dest(path.build.js)) // 2. Несём в path.build.html
    .pipe(
      babel({
        presets: ['@babel/env'] // Совмещаем с более старыии версиями
      })
    )
    .pipe(
      uglify() // Сжимаем js
    )
    .on('error', function (err) { console.log(err.toString()); this.emit('end'); })
    .pipe(
      rename({
        extname: ".min.js" // Делаем копию файла (удобно читать)
      })
    )
    .pipe(dest(path.build.js)) // 2. Несём в path.build.js ВТОРОЙ раз
    .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream()
};

function images() {
  return src(path.src.img) // 1. Берём путь src(path.src.img)
    .pipe(newer(path.build.img))
		.pipe(
			imagemin([
				webp({
					quality: 75
				})
			])
		)
    .pipe(
			rename({
				extname: ".webp"
			})
		)
    .pipe(dest(path.build.img)) // 2. Несём в path.build.img
    .pipe(src(path.src.img)) // Снова берём путь src(path.src.img) - Для браузеров без Webp
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewbox: false }],
        interlaced: true,
        optimizationlevel: 3 // 0 to 7
      })
    )
    .pipe(dest(path.build.img)) // 2. Несём в path.build.img
    .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream() ** Nado li?
};

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
};

function fonts_otf() {
  return src('./' + source_folder + '/fonts/*.otf')
    .pipe(fonter({
      formats: ['ttf'] // Преобразуем шрифт otf в ttf
    }))
    .pipe(gulp.dest('./' + source_folder + '/fonts/')); // Переносим ttf шрифт в папку с исходными шрифтами
}

// Исходник!
function fontsStyle() {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	return src(path.src.html).pipe(browsersync.stream());
}

function cb() {

}

// Задача для отдельного вызова (Не нужно выполнять постоянно)
gulp.task('svgSprite', function () {
  return gulp.src([source_folder + '/iconsprite/*.svg'])
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../icons.icons.svg", // Сюда выведется готовый собранный спрайт
          example: true
        }
      },
    }
    ))
    .pipe(dest(path.build.img)) // Загружаем в папку с изображениями
})

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
};


// *****************************
// ПРОЦЕСС ВЫПОЛНЕНИЯ GULP
// Внутри series() мы прописываем ф-ции, к-рые должны выполняться
let fontsBuild = gulp.series( fonts_otf, fonts, fontsStyle ); // Собирает шрифты
let buildDev = gulp.series( clean, gulp.parallel(fontsBuild, html, css, js, images) );
let watch = gulp.series( buildDev, gulp.parallel(watchFiles, browserSync) ); // ф-ция watch запустит функции

// В случае Экспорта запустится watch, к-рый запустит параллельно функции, к-рые всё сделает.
// exports.fonts = fontsBuild;
// exports.watch = watch;
// exports.default = watch;

export { fontsBuild }
export { watch }

gulp.task('default', watch);

// Настройка FTP соединения
// export const configFTP = {
// 	host: "", // Адрес FTP сервера
// 	user: "", // Имя пользователя
// 	password: "", // Пароль
// 	parallel: 5 // Кол-во одновременных потоков
// }
