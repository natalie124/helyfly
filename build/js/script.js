'use strict';
(function() {
  // проверяет наличие скроллбара
  function getScrollBarWidth() {
    var block = $('<div>').css({ 'height': '50px', 'width': '50px' }),
      indicator = $('<div>').css({ 'height': '200px' });

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();

    return (w1 - w2);
  }
  // добавляет для body класс 'scrollbar' если есть скроллбар
  function checkScrollbar() {
    var scrollWidth = getScrollBarWidth();
    scrollWidth > 0 ? $('body').addClass('scrollbar') : $('body').removeClass('scrollbar');
  }
  checkScrollbar();
})();

'use strict'
jQuery(function($){
  // маски для текстовых полей в форме
   $("#booking-date").mask("99.99.9999");
   $('#booking-tel').mask('+7 (999) 999-99-99');
   $('#booking-card-number').mask('9999 9999 9999 9999');
   $('#booking-card-date').mask('99.99');
   $('#booking-card-code').mask('999');
});

'use strict';
(function() {
  var hideClass = 'js-hide';
  var scrollHiddenClass = 'scroll-hidden';

  var codeEsc = 27;
  var codeEnter = 13;

  var modalSelector = [
    // для открытия модалок
    { // для примера
      BTN: 'селектор кнопки',
      MODAL: 'селектор модалки'
    },
    { // для модалки бронирования
      BTN: '.js-booking-btn',
      MODAL: '.js-booking-modal'
    }
  ];

  function addInputFocus() {
    // добавляет фокус на первое поле
    var input = $('.modal').find('form input[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])');

    input.filter(':first').focus();
  }

  function modalOpen(modalSelector) {
    $('.modal').removeClass(hideClass);
    $('body').addClass(scrollHiddenClass);
    addInputFocus();
  }

  function modalClose() {
    // закрывает модалку
    $('.modal').addClass(hideClass);
    $('body').removeClass(scrollHiddenClass);
  }

  function activateModalOpen() {
    Array.prototype.forEach.call(modalSelector, function(it) {
      $(document).click(function(evt) {
        if (evt.target.closest(it.BTN)) {
          evt.preventDefault();
          modalOpen(it.MODAL);
        }
      });

      $(document).keydown(function(evt) {
        if (evt.target.closest(it.BTN) && evt.keyCode === codeEnter) {
          evt.preventDefault();
          modalOpen(it.MODAL);
        }
      });
    });
  }

  function activateModalClose() {
    $('.js-close-btn').click(function() {
      modalClose();
    });

    $('.modal').click(function(evt) {
      if (evt.target !== this) return;
      modalClose();
    });

    $(document).on('keydown', function(evt) {
      if (evt.keyCode === codeEsc) {
        evt.preventDefault();
        modalClose();
      }
    });
  }

  activateModalClose();
  activateModalOpen();
})();

'use strict'
$(document).ready(function () {
// показывает / скрывает элементы
  $('.js-show-container').each(function () {
    var btn = $(this).find('.js-show-btn'),    // кнопка показать еще
        dataText = btn.attr('data-text'),      // текст после активации
        data = btn.attr('data-count'),         // количество видимых блоков
        items = $(this).find('.js-show-item'), // все блоки
        dots = $(this).find('.js-dots'),       // точки в конце видимого текста
        allItems = $(this).find('.js-show-all');// контейнер для отображения количества блоков

    allItems.text('(' + items.length + ')');

    var text = btn.text(); // текст кнопки

    items.each(function (index, el) {
      // скрывает все блоки кроме количества в атрибуте data-count
      if (index >= data) {
        el.classList.add('js-hide');
      }
    });

    btn.click(function () {
      if (!btn.hasClass('js-show-btn-active')) {
        // показывает все блоки после клика на кнопку и меняет текст кнопки на текст в атрибуте data-text
        btn.addClass('js-show-btn-active');
        dots.addClass('js-hide');
        btn.text(dataText);

        items.each(function (index, el) {
          el.classList.remove('js-hide');
        });
      } else {
        // скрывает все блоки кроме количества в атрибуте data-count и меняте текст кнопки на дефолтный
        btn.removeClass('js-show-btn-active');
        dots.removeClass('js-hide');
        btn.text(text);

        items.each(function (index, el) {
          if (index >= data) {
            el.classList.add('js-hide');
          }
        });
      }
    });
  });
});

'use strict'
$(document).ready(function () {
  // запускает плеер YouTube при нажатии на кнопку
  $('.video-yt__btn').click(function () {
    var item = $(this).closest('.video-yt'),
        data = item.attr('data-youtube'); // адрес видео в атрибуте data-youtube

    item.children().fadeOut('slow', function () {
      item.html('<div><iframe src="https://www.youtube.com/embed/' + data + '?autoplay=1" allowfullscreen autoplay></iframe></div>');
    });
  });
});
