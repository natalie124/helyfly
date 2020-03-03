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
