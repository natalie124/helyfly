'use strict';
$(document).ready(function () {
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

  function checkScrollbar() {
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

    var scrollWidth = getScrollBarWidth();
    scrollWidth > 0 ? $('body').addClass('scrollbar') : $('body').removeClass('scrollbar');
  }

  function addInputFocus() {
    // добавляет фокус на первое поле
    var input = $('.modal').find('form input[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])');

    input.filter(':first').focus();
  }

  function modalOpen(modalSelector) {
    checkScrollbar();
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
});
