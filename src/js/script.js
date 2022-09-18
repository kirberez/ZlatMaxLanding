// Подключение основного файла стилей
import "../scss/style.scss";

// Динамический адаптив 
import "./libs/dynamic_adapt.js";

// Основные модули ========================================================================================================================================================================================================================================================
import * as flsFunctions from './functions.js';
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
flsFunctions.isWebp();
/* Модуль для работы с меню (Бургер) */
flsFunctions.menuInit();
/* Модуль работы со спойлерами */
flsFunctions.spollers();
/* Модуль работы с табами */
flsFunctions.tabs();
/* Модуль "показать еще" */
// flsFunctions.showMore();
/* Попапы */
// Для включения ??? (подсказок в консоли) передать true * /
flsFunctions.initPopups(false);

// Работа с формами ========================================================================================================================================================================================================================================================
import * as flsForms from "./forms/forms.js";
/* Работа с полями формы: добавление классов, работа с placeholder. */
flsForms.formFieldsInit();
/* Oтправка формы со встроенной валидацией полей. false - отключит валидацию */
flsForms.formSubmit(true);
/* Модуль формы "количество" */
flsForms.formQuantity();
/* Модуль формы "показать пароль" */
// flsForms.formViewpass();
/* Модуль звездного рейтинга */
flsForms.formRating();
/* Модуль работы с select. Для включения ??? (подсказок в консоли) передать true */
flsForms.formSelect(false);

// Модуль работы с ползунком  ===================================================================================================================================================================================================================================================================================
// Документация плагина: https://refreshless.com/nouislider/
import "./libs/range.js";
// Модуль работы с подсказками (tippy)  =========================================================================================================================================================================================================================================================================
import "./libs/tippy.js";
// Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
import "./libs/sliders.js";


function documentActions(e) {
  const targetElement = e.target; // Нажатый элемент
  if (targetElement.closest('[data-parent]')) {   
    const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null; // ИД нажатого эл-та
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`); // Блок меню, с-щий нажатому эл-ту
    if (subMenu) {
      const activeLink = document.querySelector('._sub-menu-active');
      const activeBlock = document.querySelector('._sub-menu-open');

      if (activeLink && activeLink !== targetElement) {
        activeLink.classList.remove('_sub-menu-active');
        activeBlock.classList.remove('_sub-menu-open');
        document.documentElement.classList.remove('sub-menu-open');
      };
      document.documentElement.classList.toggle('sub-menu-open');
      targetElement.classList.toggle('_sub-menu-active');
      subMenu.classList.toggle('_sub-menu-open');
    };
    e.preventDefault();
  }

  if (targetElement.closest('.menu-top-header__link_catalog')) {
    document.documentElement.classList.add('catalog-open');
    e.preventDefault();
  }

  if (targetElement.closest('.menu-catalog__back')) {
    document.documentElement.classList.remove('catalog-open');

    document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
    document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;

    e.preventDefault();
  }

  if (targetElement.closest('.sub-menu-catalog__back')) {
    document.documentElement.classList.remove('sub-menu-open');
    document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
    document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;

    e.preventDefault();
  }
}

document.addEventListener('click', documentActions);

const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block'); // Все объекты блоков
if (menuBlocks.length) {
  menuBlocks.forEach(menuBlock => { // menuBlock - конкретная кнопка (ссылка) из пункта меню блока
    const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length; // Кол-во пунктов (ссылок) в блоке
    menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`) // Класс - кол-во категорий в блоке
  })
}

if (document.querySelector('.filter-catalog__title')) {
  document.querySelector('.filter-catalog__title').addEventListener('click', function(elem) {
    if (window.innerWidth < 992) {
      document.querySelector('.filter-catalog__items').classList.toggle('_active');
    }
  })
}