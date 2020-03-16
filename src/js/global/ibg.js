'use strict';
$(document).ready(function() {
  var userAgent = navigator.userAgent.toLowerCase();
  var internetExplorer = false;

  if ((/mozilla/.test(userAgent) && !/firefox/.test(userAgent) && !/chrome/.test(userAgent) && !/safari/.test(userAgent) && !/opera/.test(userAgent)) || /msie/.test(userAgent)) {
    internetExplorer = true;
  }

  function ibg() {
    $.each($('.ibg'), function(index, val) {
      if ($(this).find('img').length > 0) {
        $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
      }
    });
  }

  if (internetExplorer) {
    ibg();
  }

});
