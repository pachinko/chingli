(function ($) {
    $.fn.cyclotron = function (options) {
        var settings = $.extend({
            dampingFactor: 0.93,
            historySize: 5,
            width: 0
        }, options);
        return this.each(function () {
            var container, sx, dx, armed, offset = 0, tick, prev, h = [], init = true;
            container = $(this);

            container.mousedown(function (e) {
                sx = e.pageX - offset;
                armed = true;
                init = false;
                e.preventDefault();
            });
            container.mousemove(function (e) {
                var px;
                if (armed) {
                    px = e.pageX;
                    if (prev === undefined) {
                        prev = px;
                    }
                    offset = px - sx;
                    if (h.length > settings.historySize) {
                        h.shift();
                    }
                    h.push(prev - px);
                    if (settings.width > 0) {
                        if (offset > 0) offset = 0;
                        if (offset < -settings.width + 700) offset = -settings.width + 700;
                    }
                    container.css('background-position', offset);

                    prev = px;
                }
            });
            container.bind('mouseleave mouseup', function () {
                if (armed) {
                    var i, len = h.length, v = h[len - 1];
                    for (i = 0; i < len; i++) {
                        v = (v * len + (h[i])) / (len + 1);
                    }
                    dx = v;
                }
                armed = false;
            });
            tick = function () {
                if (init) {
                    offset -= 1;
                    if (settings.width > 0) {
                        if (offset > 0) offset = 0;
                        if (offset < -settings.width + 700) offset = -settings.width + 700;
                    }
                    container.css('background-position', offset);
                    if (Math.abs(offset) < 0.001) {
                        offset = 0;
                    }
                    return;
                }
                if (!armed && dx) {
                    dx *= settings.dampingFactor;
                    offset -= dx;
                    if (settings.width > 0) {
                        if (offset > 0) offset = 0;
                        if (offset < -settings.width + 700) offset = -settings.width + 700;
                    }
                    container.css('background-position', offset);
                    if (Math.abs(dx) < 0.001) {
                        dx = 0;
                    }
                }
            };
            setInterval(tick, 16);
        });
    };
} (jQuery));