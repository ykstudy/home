// Themeswitcher for Themeforest
// 切换背景
imgPathStart = "images/backgrounds/";
imgPathEnd = new Array("bg_1.png","bg_2.png","bg_4.png","bg_5.png","bg_8.png","bg_9.png","selt_bg_7.jpg","top_bg.jpg","self_bg_9.gif");

$(".selector li img").click(function() {
	// Save BackgroundNr
	backgroundNumber = $(this).attr("data-nr");
	// change background settings
	$("body").css({
		background:"url('"+imgPathStart+imgPathEnd[backgroundNumber]+"') no-repeat",
        'background-attachment': 'fixed',
        'background-size': '100% 100%'
	});
});