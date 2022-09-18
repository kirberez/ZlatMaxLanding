export const sprite = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.lp.plumber(
			app.lp.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.lp.svgSprite({ // Оборачивает картинки SVG
			mode: {
				stack: {
					sprite: `../icons/icons.svg`, // Сюда выведется готовый собранный спрайт
					// Создавать страницу с перечнем иконок
					example: true
				}
			},
		}
		))
		.pipe(app.gulp.dest(`${app.path.build.img}`));
}