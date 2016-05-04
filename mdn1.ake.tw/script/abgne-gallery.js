// JavaScript Document

// 背景區塊的透明度	
var _opacity = .7;
$(function(){
	// 把每一個 abgne_gallery 取出做處理
	$('.abgne_gallery').each(function(){
		// 取得標題及說明描述的高度
		var $this = $(this), 
			$title = $this.find('.title'), 
			_titleHeight = $title.outerHeight(true),
			$desc = $this.find('.desc'),
			_descHeight = $desc.outerHeight(true),
			_speed = 400;
 
		// 設定 $desc 的高度為 0 並顯示
		// 接著插入一個當做背景用的區塊
		$desc.css({
			height: 0,
			display: 'block'
		}).append($('<div></div>').css({
			height: _descHeight,
			opacity: _opacity
		}).addClass('maskCss')).find('p').css('position', 'absolute');
 
		// 插入一個當做背景用的區塊
		$title.append($('<div></div>').css({
			height: _titleHeight,
			opacity: _opacity
		}).addClass('maskCss'));
 
		// 當滑鼠移到區塊上時
		$this.hover(function(){
			// 改變 $desc 的高度為原本高度
			$desc.stop().animate({
				height: _descHeight
			}, _speed);
		}, function(){
			// 改變 $desc 的高度為 0
			$desc.stop().animate({
				height: 0
			}, _speed);
		});
	});
});