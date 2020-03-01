$(document).ready(function() {
  // запускает плеер YouTube при нажатии на кнопку
  $('.video-yt__btn').click(function() {
    var item = $(this).closest('.video-yt'),
        data = item.attr('data-youtube'); // адрес видео в атрибуте data-youtube

    item.children().fadeOut('slow', function() {
      item.html('<div><iframe src="https://www.youtube.com/embed/' + data + '?autoplay=1" allowfullscreen autoplay></iframe></div>');
    });
  });
});
