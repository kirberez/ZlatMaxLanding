export const images = () => {
	return app.gulp.src(app.path.src.img)
		.pipe(app.lp.plumber(
			app.lp.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.lp.newer(app.path.build.img))
		.pipe(
			app.lp.if(
				app.isWebP,
				app.lp.if(
					app.isBuild,
					app.lp.webp()
				)
			)
		)
		.pipe(
			app.lp.if(
				app.isWebP,
				app.lp.if(
					app.isBuild,
					app.gulp.dest(app.path.build.img)
				)
			)
		)
		.pipe(
			app.lp.if(
				app.isWebP,
				app.lp.if(
					app.isBuild,
					app.gulp.src(app.path.src.img)
				)
			)
		)
		.pipe(
			app.lp.if(
				app.isWebP,
				app.lp.if(
					app.isBuild,
					app.lp.newer(app.path.build.img)
				)
			)
		)
		.pipe(
			app.lp.if(
				app.isBuild,
				app.lp.imagemin({  // Оптимизирует картинки
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.img));
};

// return src(path.src.img) // 1. Берём путь src(path.src.img)
// .pipe(newer(path.build.img))
// .pipe(
//   imagemin([
//     webp({
//       quality: 75
//     })
//   ])
// )
// .pipe(
//   rename({
//     extname: ".webp"
//   })
// )
// .pipe(dest(path.build.img)) // 2. Несём в path.build.img
// .pipe(src(path.src.img)) // Снова берём путь src(path.src.img) - Для браузеров без Webp
// .pipe(
//   imagemin({
//     progressive: true,
//     svgoPlugins: [{ removeViewbox: false }],
//     interlaced: true,
//     optimizationlevel: 3 // 0 to 7
//   })
// )
// .pipe(dest(path.build.img)) // 2. Несём в path.build.img
// .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream() ** Nado li?