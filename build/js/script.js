'use strict';
(function() {
  var body = document.querySelector('body');
  var scrollbarClass = 'scrollbar';

  function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
  };

  function checkScrollbar() {
    var scrollWidth = getScrollBarWidth();
    scrollWidth > 0 ? body.classList.add(scrollbarClass) :body.classList.remove(scrollbarClass);
  }
  checkScrollbar();
})();

'use strict';
(function() {
  var modals = document.querySelectorAll('.modal');
  var hideClass = 'js-hide';

  var body = document.querySelector('body');
  var scrollHiddenClass = 'scroll-hidden';

  var codeEsc = 27;
  var codeEnter = 13;

  var modalSelector = [
  // для открытия модалок
    { // для примера
      BTN: 'селектор кнопки',
      MODAL: 'селектор модалки',
      CALLBACK: 'название функции (если есть)' // например CALLBACK: 'имя'
    },
    { // для модалки товар добавлен в корзину
      BTN: '.js-booking-btn',
      MODAL: '.js-booking-modal'
    }
  ];

  if (!modals) {
    return;
  }

  function addInputFocus(modal) {
    // добавляет фокус на первое поле
    var input = modal.querySelector('form input[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])');
    if (!input) {
      return;
    }
    input.focus();
  }

  function activateModalOpen() {
    function modalOpen(modalSelector) {
      // открывает модалку
      var modal = document.querySelector(modalSelector);
      if (!modal) {
        return;
      }
      modal.classList.remove(hideClass);
      body.classList.add(scrollHiddenClass);
      addInputFocus(modal);
    }
    Array.prototype.forEach.call(modalSelector, function(it) {
      document.addEventListener('click', function(evt) {
        if (evt.target.closest(it.BTN)) {
          evt.preventDefault();
          modalOpen(it.MODAL);
          it.CALLBACK && typeof window[it.CALLBACK] === 'function' ? window[it.CALLBACK]() : false;
        }
      });
      document.addEventListener('keydown', function(evt) {
        if (evt.target.closest(it.BTN) && evt.keyCode === codeEnter) {
          evt.preventDefault();
          modalOpen(it.MODAL);
          it.CALLBACK && typeof window[it.CALLBACK] === 'function' ? window[it.CALLBACK]() : false;
        }
      });
    });
  }

  function activateModalClose() {
    Array.prototype.forEach.call(modals, function(modal) {
      var closeBtns = modal.querySelectorAll('.js-close-btn');
      var container = modal.querySelector('.modal__wrapper');

      function modalClose() {
        // закрывает модалку
        modal.classList.add(hideClass);
        body.classList.remove(scrollHiddenClass);
      }

      Array.prototype.forEach.call(closeBtns, function(btn) {
        btn.addEventListener('click', modalClose);
        btn.addEventListener('keydown', function(evt) {
          if (evt.keyCode === codeEnter) {
            modalClose();
          }
        });
      });

      modal.addEventListener('click', function(evt) {
        if (!container.contains(evt.target)) {
          modalClose();
        }
      });

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === codeEsc) {
          evt.preventDefault();
          modalClose();
        }
      });
    });
  }

  (function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) { return null } else return this.parentElement.closest(selector)
    };
  }(Element.prototype));

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
