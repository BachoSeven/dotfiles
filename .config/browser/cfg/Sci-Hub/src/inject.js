var sciHubPlugin = '0.2.1';

function submit(url, domain)
{
var url = url.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
url = decodeURI(url);
url = 'https://' + domain + '/' + url;
window.location.href = url;
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		domain = 'sci-hub.ru';
		
		var checkp = $('#sci-hub-plugin-check');
		if (checkp.length)
		{
			$(checkp).val('yes-' + sciHubPlugin);
			return;
		}
		
		$.getQuery = function( query ) {
			query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var expr = "[\\?&]"+query+"=([^&#]*)";
			var regex = new RegExp( expr );
			var results = regex.exec( window.location.href );
			if( results !== null ) {
				return results[1];
				return decodeURIComponent(results[1].replace(/\+/g, " "));
			} else { return false; }
		};
		
		var request = $.getQuery('q');
		
		var panel = '<div class="donate"><a target = "_blank" href = "//vk.com/sci_hub">страничка проекта Sci-Hub в социальных сетях &rarr;</a> </div>' +
					'<div id="arovswmd_panel"><a target = "_blank" href = "https://' + domain +
					'/"><div id="arovswmd_logo">Sci-Hub</div></a><div id="arovswmd_input"><input id="arovswmd_url" type="text" value = "' +
					request + '"><p>URL статьи или журнала, или DOI, или строка для поиска</p></div><div id="arovswmd_open">▶</div><div id="arovswmd_feedback"><a href="https://' +
					domain + '/donate" target="blank"><span>Помочь проекту</span><img border="0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAW0lEQVR42mNgoDWYNWvWf2IwVQwhaBhMASFAskHYXEF7g3ApxmUYVoNwBSLJLsKlEd0QXHIkGURUrOEziKToJyZMiEqQxMQSUamaGK+QlLeoZhDFuZ1YwxjoAQD9DZbacIL0GQAAAABJRU5ErkJggg==" /></a></div></div>';

		var google = $('#gs_hdr');
		if (google.length)
		{
			$(google).css('margin-top', '30px');
			$('body').prepend(panel);

			$('.gs_rt a').each(function() {
				var link = $(this).attr('href');
				var rlink = 'https://' + domain + '/' + link;
				$(this).attr('href', rlink);
			});
			$('body').on('click','#arovswmd_open',function() {
				submit($('#arovswmd_url').val(), domain);
			});
		}
	}
	}, 2);
});
