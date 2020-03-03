'use strict'
jQuery(function($){
  // маски для текстовых полей в форме
   $("#booking-date").mask("99.99.9999");
   $('#booking-tel').mask('+7 (999) 999-99-99');
   $('#booking-card-number').mask('9999 9999 9999 9999');
   $('#booking-card-date').mask('99.99');
   $('#booking-card-code').mask('999');
});
