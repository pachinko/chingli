(function ($) {
 $.fn.cyclotron1 = function (options) {
  var settings = $.extend({
   dampingFactor: 1,
   historySize: 5
  }, options);
  return this.each(function () {
   var container, sx, dx = 1, armed, offset = 0, tick, prev, h = [], init = true;
   container = $(this);
   tick = function () {
    if (init) {
     offset = Math.random() * 10000;
     container.css('background-position', offset);
     if (Math.abs(offset) < 0.001) {
      offset = 0;
     }
     init = false;
     return;
    } 
     dx *= settings.dampingFactor;
     offset -= dx;
     container.css('background-position', offset);
     if (Math.abs(dx) < 0.001) {
      dx = 0;
     } 
   };
   setInterval(tick, 16);
  });
 };
} (jQuery));