// Подключение списка активных модулей
import { flsModules } from "../modules.js";
// Подключение из node_modules
import tippy from 'tippy.js';
// Подключение cтилей из src/scss/libs
import "../../scss/tippy.scss";

// Запускаем и добавляем в объект модулей
flsModules.tippy = tippy('[data-tippy-content]', {

});