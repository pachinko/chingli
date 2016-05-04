/*
 * JQuery image panning Plugin
 * 
 * Version 1.2
 * Updated to jQuery 1.6
 *
 * By Christian Bruun - 9. Aug 2011  
 *
 * Like it/use it? Send me an e-mail: rockechris@rockechris.com
 * 
 * License: None. Use and abuse. Comes with no warranty, of course!
 * 
 * Usage:
 * $('div').panorer({ options });
 *  
 * Options: 
 * // infinity:	continue 
 * direction:	scroll direction - up/down or left/right, circular RDLU ("EW", "WE", "SN", "NS", "round", "random") - default: "random"
 * initialWait:	time to wait before first animation (number) - default: 1000 ms
 * duration:	duration of animation (number) - default: (image width / 0.2) ms
 * pause:		pause between pans (number) - default: 1000 ms
 * easing:		easing to use on animations - default: "swing"
 * image:		image to load in the div - default: null (use image from html)
 * 
 */
(function($) {
	$.fn.panorer = function(options) {
        var defaults = {
			duration:		0,
			initialWait:	1000,
			pause:			1000,
			direction:		'random',
			infinity:		false,
			easing:			'swing',
			image:			null
        };
        var opts = $.extend(defaults, options);		
		
        return this.each(function() {
			var tiss = this;
			if($(tiss).prop('tagName').toUpperCase() !== "DIV") { $(this).wrap('<div></div>'); tiss = $(this).parent(); }
			var bilde = $(tiss).children('img:first');			

			// litt css
			$(tiss).css({ 'position': 'relative', 'overflow': 'hidden', 'minHeight': $(bilde).height() });

			// tid
			if(opts.duration == 0) {
				if($(bilde).width() > 0) { opts.duration = Math.round($(bilde).width() / 0.2); console.log("cached img " + opts.duration); }
				else { 
					$(bilde).load(function() {
						opts.duration = Math.round($(bilde).width() / 0.2);
					});
				}
			}
			// retning v. random -- to random på samme side vil "alltid" få samme retning
			if(opts.direction == "random") {
				var d,v = Math.random();
				if(v < 0.49) { d = "A"; }
				else { d = "B"; }

				if($(bilde).width() >= $(bilde).height()) {	// <- ->
					 opts.direction = "EW";
					 if(d=="A") { opts.direction = "WE"; }
				}
				else {
					opts.direction = "SN";
					if(s=="A") { opts.direction = "NS"; }
				}
			}

			// prøv å last bilde
			if(opts.image !== null) {
				$(tiss).append('<img src="' + opts.image + '" alt="" height="' + $(tiss).innerHeight() + '" />');
			}
			
			// klikk/dra
			/*
			if(jQuery.ui) {
				$(bilde).css('cursor', 'col-resize').draggable({ axis: "x", distance: 20, revert: true, start: function() { }, stop: function() { } });
			}
			*/			
			
			// selve panoreringen
			var panLeft = function() {
				if(opts.direction === "round") { $(bilde).animate({ left: ($(tiss).width() - $(bilde).width()) }, opts.duration, opts.easing, function() {setTimeout(panUp, opts.pause);}); return; }
				$(bilde).animate({ left: ($(tiss).width() - $(bilde).width()) }, opts.duration, opts.easing, function() {setTimeout(panRight, opts.pause);});
			};			
			var panRight = function() {
				if(opts.direction === "round") { $(bilde).animate({ left: 0 }, opts.duration, opts.easing, function() {setTimeout(panDown, opts.pause);}); return; }
				$(bilde).animate({ left: 0 }, opts.duration, opts.easing, function() {setTimeout(panLeft, opts.pause);});
			};
			var panUp = function() {
				if(opts.direction === "round") { $(bilde).animate({ top: ($(tiss).height() - $(bilde).height()) }, opts.duration, opts.easing, function() {setTimeout(panRight, opts.pause);}); return; }
				$(bilde).animate({ top: ($(tiss).height() - $(bilde).height()) }, opts.duration, opts.easing, function() {setTimeout(panDown, opts.pause);});
			};
			var panDown = function() {
				if(opts.direction === "round") { $(bilde).animate({ top: 0 }, opts.duration, opts.easing, function() {setTimeout(panLeft, opts.pause);}); return; }
				$(bilde).animate({ top: 0 }, opts.duration, opts.easing, function() {setTimeout(panUp, opts.pause);});
			};
			
			// start
			switch(opts.direction) {
				case "WE":
					$(bilde).css({ 'position':'absolute', 'left':($(tiss).width() - $(bilde).width()) });
					setTimeout(panRight, opts.initialWait); // left first
					break;
				case "SN":
					$(bilde).css( { 'position':'absolute', 'left':'0', 'top':'0' });
					setTimeout(panUp, opts.initialWait); // up first
					break;
				case "NS":
					$(bilde).css( { 'position':'absolute', 'left':'0', 'top':($(tiss).height() - $(bilde).height()) });
					setTimeout(panDown, opts.initialWait); // down first
					break;
				default: // (case "EW":)
					$(bilde).css({ 'position':'absolute', 'left':'0' });
					setTimeout(panLeft, opts.initialWait); // right first
					break;
			}
		});
    };
})(jQuery);

