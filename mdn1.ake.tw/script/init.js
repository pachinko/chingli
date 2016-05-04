function init(){
	$('#header').load('includes/header.html div#headerWrapper', function(responseText, textStatus, XMLHttpRequest){
		$('#menu').find('img').each(function(index){
			var path = $(this).attr('src')
			$(this).data().source_name = path;
			$(this).hover(
				function(){
					$(this).attr('src', getOnImage(path));
				}, 
				function(){
					$(this).attr('src', path);
				}
			);
		});
	});
	$('#bottom').load('includes/footer.html div');
}

function getOnImage(path){
	var p = path.lastIndexOf('.');
	return path.substring(0, p) + '-on' + path.substring(p);
}