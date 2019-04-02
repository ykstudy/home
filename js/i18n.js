// i18n多语言切换
function loadProperties(name, apth, mode, types) {
    $.i18n.properties({
        name: name,    //属性文件名     命名格式： 文件名_国家代号.properties
        path: apth,   //注意这里路径是你属性文件的所在文件夹
        mode: mode,
        language:types,     //这就是国家代号 name+language刚好组成属性文件名：massage+zh -> massage_zh.properties
        callback:function(){
            var insertEle = $("[data-properties]");
            insertEle.each(function() {
                var properties = $.trim($(this).attr('data-properties'));
                if(properties){
                    var pType = $(this).attr('data-ptype');
                    pType = pType ? pType: 'html';
                    var pTypeArr = pType.split('/');
                    var propertiesArr = properties.split('/');
                    for(var i=0;i<pTypeArr.length;i++){
                        if($.trim(pTypeArr[i]) == 'html'){
                            $(this).html($.i18n.prop($.trim(propertiesArr[i])));
                        }else if($.trim(pTypeArr[i]) == 'text'){
                            $(this).text($.i18n.prop($.trim(propertiesArr[i])));
                        }else if($.trim(pTypeArr[i]) == 'value'){
                            $(this).val($.i18n.prop($.trim(propertiesArr[i])));
                        }else{
                            $(this).attr($.trim(pTypeArr[i]), $.i18n.prop($.trim(propertiesArr[i])));
                        };
                    };
                };
            });
        }
    });
}