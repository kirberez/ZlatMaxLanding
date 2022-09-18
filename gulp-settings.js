const buildFolder = './dist';
const source_folder= "./src"; 

// Пути до файлов:
export const path={
  build: {
    html: `${buildFolder}/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },
  src: {
  // Все файлы source_folder + "/*.html" КРОМЕ _*.html
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    pug: source_folder + "/pug/*.pug", 
    scss: [`${source_folder}/scss/style.scss`, `${source_folder}/scss/fonts.scss`],
    js: `${source_folder}/js/script.js`,
    img: `${source_folder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${source_folder}/img/**/*.svg`,
    fonts: `${source_folder}/fonts/*.*`,
    files: `${source_folder}/files/**/*.*`,
		svgicons: `${source_folder}/svgicons/*.svg`,
  },
  // Прослушиваемые файлы
  watch: {
    html: `${source_folder}/**/*.html`,
    scss: `${source_folder}/scss/**/*.scss`,
    js: `${source_folder}/js/**/*.js`,
		pug: `${source_folder}/pug/**/*.pug`,
    img: `${source_folder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`
  },
  clean: buildFolder, // Путь к папкам которые удаляются при каждом запуске Gulp
  buildFolder: buildFolder,
	// rootFolder: rootFolder, 
  srcFolder: source_folder, 
	ftp: `` // Путь к нужной папке на удаленном сервере. gulp добавит имя папки проекта автоматически
};

// Настройка FTP соединения
export const configFTP = {
	host: "", // Адрес FTP сервера
	user: "", // Имя пользователя
	password: "", // Пароль
	parallel: 5 // Кол-во одновременных потоков
}