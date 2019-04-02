$(document).ready(function() {
	// The navigation menu
	$("li.home").addClass("active");
	$(".navigation li").click(function() {
		if($(this).hasClass("active")) {
			return false;
		}
		else {
			// clicked nav item
			navClicked = $(this).attr("class");
			// all nav items
			navigationItem = $(".navigation li");
			// iterate all nav items and search for class active
			for (i=0; i <= navigationItem.length-1; i++) {
				if(navigationItem.eq(i).hasClass("active")) {
					// read class name
					className = navigationItem.eq(i).attr("class");
					// split string after " " and save to array
					classArray = className.split(" ");
					// read first class and save to variable
					activeElement = classArray[0];
				}
			}
		// remove active class
		$("."+activeElement).removeClass("active");
		// hide active element
		$(".list-"+activeElement).slideUp("800");
		setTimeout(function() {
			// show element clicked on
			$(".list-"+navClicked).slideDown("800");
		},800);
		// add class active 
		$(this).addClass("active");
		}

		// load baidumap when needed
		if ($("#gmap").hasClass("active")) {
			// delay loading for google maps
			setTimeout(function() {
                // 百度地图API功能
                var map = new BMap.Map("baiduMap");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(121.506366,31.245017), 18);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]}));
                map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			},1000);
		}

		// load isotope
		if ($("#portfolio").hasClass("active")) {
			setTimeout(function() {
				$(".isotope-portfolio").isotope({
					//options
					itemSelector : ".item",
					layoutMode : "fitRows",
					animationEngine : "jquery",
					animationOptions: {
						duration: 550,
						easing: "swing",
						queue: false
						}
				});
			},1000);
		}	

	});

	// filter isotope
	$(".isotope-filter a").click(function() {
		var selector = $(this).attr("data-filter");
		$(".isotope-portfolio").isotope({
			filter: selector
		});
		return false;
	});

	// isotope portfolio
	$(".item").hover(
		function() {
			var currentItem = $(this);
			currentItem.find("div.item-slider").animate({top:"0px"},300);
			setTimeout(function() {
				currentItem.find("div.item-name").animate({bottom:"0px"},150);
			},325);
		},
		function() {
			var currentItem = $(this);
			currentItem.find("div.item-name").animate({bottom:"-30px"},150);
			setTimeout(function() {
				currentItem.find("div.item-slider").animate({top:"-100px"},200);
			},175);
		}
	);

	// onload animation
	setTimeout(function() {
		// get elements
		innerBar = $(".inner-bar");

		if($.support.msie) {
			// do nothing
		} 
		else {
			// get length of innerbar
			for (i=0; i <= innerBar.length-1; i++) {
				innerBarStyle = innerBar.eq(i).attr("style");
				splitString = innerBarStyle.split(" ");
					// check if skill percentage has 2 or 3 characters
					if (splitString[1].length == 3) {
						innerBarWidth = splitString[1].substring(0,2);
					}	
					else {
						innerBarWidth = splitString[1].substring(0,3);
					}
				innerBar.eq(i).show().css({width:"1%"}).animate({"width":innerBarWidth+"%"},1000);
			}
		}
	},750);

	// fancybox for img
	$(".fancybox.img").fancybox();

	// validation
	$("#contact").validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: 'submit.php',
				success: function() {
					$(".icon-wrapper").show();
					$("#contact").css({opacity:"1"});				
					setTimeout(function() {
						$(".icon-wrapper").hide();
						$(".c_name, .c_email, .c_message").val("");
						$("#contact").css({opacity:"1"});
					}, 3500);						
				}
			});
		}
	});

	/*
		=============================================================================
	 	yangkun添加内容
		===============================================================================
	*/
    var language=localStorage.getItem("language");
    if(language){
        objs = $('.more_lang .lang');
        for (var i = 0; i < objs.length; i++) {
            var lang = $(objs[i]).attr('data-value');
            if (lang === language) {
                $(objs[i]).addClass('selected').siblings().removeClass('selected');
            }
		}
    } else {
        language="zh";
	}

    loadProperties('message', 'i18n/', 'map', language);
    // 切换语言关闭列表
    $('.translate_wrapper, .more_lang').click( function(e) {
        $(this).removeClass('active');
    });

    // 点击正在使用的语言打开关闭列表
    $('.translate_wrapper .current_lang').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass('active');
        setTimeout(function(){
            $('.more_lang').toggleClass('active');
        }, 5);
    });
    // 点击切换语言
    $('.more_lang .lang').click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.more_lang').removeClass('active');
        var img = $(this).find('img').attr('src');
        var lang = $(this).attr('data-value');
        localStorage.setItem("language", lang);
        loadProperties('message', 'i18n/', 'map', lang);
        $('.current_lang .lang-txt').text(lang);
        $('.current_lang img').attr('src', img);
    });
});
