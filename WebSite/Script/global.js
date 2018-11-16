




var Global = Global || {};

(function () {

    Global.SiteName = "/Config";

    Global.fnQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }

    Global.GetQueryString = function (urlSearch, name) {
        var reg = new RegExp(name + "=([^&]*)(&|$)");
        var r = decodeURI(urlSearch);
        r = r.substr(1).match(reg);
        if (r != null)
            return unescape(r[1]);
        return "";
    }

    Global.openWaiting = function () {
        try {
            layer.load(0, { shade: [0.4, '#000'] });
        }
        catch (ex) {
        }
    }

    Global.openLoad = function () {
        var loading = '<div class="loadCover"></div>' +
            '<div class="loadTip loadLeft">' +
            '<span><img src="' + Global.SiteName + '/frontend/images/loading/load6-circle.gif" align="absmiddle"></span>' +
            '<span id="loading-msg">页面加载中，请稍候...</span>' +
            '</div>';
        $("body").find("div").eq(0).after(loading);
    }
    Global.closeLoad = function () {
        $("body").find(".loadTip").remove();
        $("body").find(".loadCover").remove();
    }

    Global.closeWaiting = function () {
        try {
            layer.closeAll('loading');
        }
        catch (ex) {
        }
    }

    Global.xmlHelper = {
        toXml: function (obj) {
            if (obj.xml) {
                return obj.xml;
            }
            return (new XMLSerializer()).serializeToString(obj);
        }
    }

    //返回当前用户权限
    Global.getAuthorityData = function () {
        var funcId = Global.fnQueryString("funcid");
        var ticket = Global.fnQueryString("ticket");
        var sUrl = Global.SiteName + "/Api/Service/Auth/GetAction/" + ticket;
        var data = [];
        Global.ajaxGet(sUrl, { funcode: funcId }, function (oJson) {
            if (!oJson.Result) {
                $.messager.alert('提示', oJson.ErrorMessage, "error");
                Global.closeWaiting();
                return;
            }
            data = JSON.parse(oJson.KeyValue).rows;
        }, false);
        return data;
    }

    /*
    **
    ** 返回类型：object
    ** 属性
    ** authority ：当前用户动作权限
    ** 
    */
    Global.createAuthorityButton = function () {
        var mode = Global.fnQueryString("mode");
        var arrAuthority = Global.getAuthorityData();

        $.each($(".authority").children("div"), function () {
            if (!$(this).hasClass("more-item")) {
                //添加面板按钮
                var code = $(this).attr("code");
                var btn;
                if (code != undefined) {
                    if (code.indexOf(',') > 0) {
                        if (mode != "1") {
                            code = code.split(',')[1];
                        } else {
                            code = code.split(',')[0];
                        }
                    }
                    var hasAuthority = false;
                    //根据code过滤权限
                    arrAuthority.forEach(function(n, i) {
                        if (code == n.actioncode) {
                            hasAuthority = true;
                        }
                    });
                    if (hasAuthority) {
                        btn = Global.createButton($(this));
                    } else {
                        btn = Global.noAuthority($(this));
                    }
                } else {
                    //没有code自动初始化按钮
                    btn = Global.createButton($(this));
                }
                $(".authority").find($(this)).before(btn).remove();

            } else {
                var randomId = "btnMore" + Math.floor(Math.random() * 10 + 1);
                var moreBtn = $('<a id="btnMore" href="javascript:;" class="easyui-splitbutton btn-common" menu="#' + randomId + '" >更多操作</a>');
                var moreDiv = $('<div id="' + randomId + '" style="width: 150px;"></div>');
                var contain = null;

                //添加更多按钮
                $.each($(this).children("div"), function () {
                    contain = $(this).parent();
                    var code = $(this).attr("code");
                    var hasAuthority = false;
                    //根据code过滤权限
                    arrAuthority.forEach(function (n, i) {
                        if (code == n.actioncode) {
                            hasAuthority = true;
                        }
                    });

                    var activeDiv = $("<div>");
                    if (hasAuthority) {
                        activeDiv.html($(this).attr("name")).attr("class", $(this).attr("class")).attr("onclick", $(this).attr("click"));
                        activeDiv.removeClass("more-item-disabled");
                    } else {
                        if ($(this).hasClass("split")) {
                            activeDiv.addClass("menu-sep"); //分割线
                        } else {
                            activeDiv.html($(this).attr("name")).attr("class", $(this).attr("class"));
                        }
                    }
                    moreDiv.append(activeDiv);
                });
                $(".authority").find(contain).before(moreBtn).before(moreDiv).remove();
            }
        });

        if ($(".authority").length > 0) {
            $.parser.parse($(".authority"));
        }

        var authority = { codes: null };
        authority.codes = arrAuthority;

        return authority;
    }

    Global.createButton = function (obj) {
        var oBtn = $('<a href="javascript:;" class="' + $(obj).attr("Class") + '" onclick="' + $(obj).attr("click") + '" > ' + $(obj).attr("name") + ' </a> ');
        oBtn.removeClass("btn-disabled");
        return oBtn;
    }

    Global.noAuthority = function (obj) {
        return $('<a  href="javascript:;" class="' + $(obj).attr("Class") + '" > ' + $(obj).attr("name") + ' </a> ');
    }

    //将数据库中的pid、oid结构转换为datatree的结构
    Global.ConvertToTreeData = function (data, idFiled, parentField, isShowBlank) {
        if (parentField) {

            var i = 0;
            var l = 0;
            var treeData = [];
            var tmpMap = [];


            for (i = 0, l = data.length; i < l; i++) {
                tmpMap[data[i][idFiled]] = data[i];
            }
            for (i = 0, l = data.length; i < l; i++) {
                if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                    if (!tmpMap[data[i][parentField]]['children']) {
                        tmpMap[data[i][parentField]]['children'] = [];
                    }
                    tmpMap[data[i][parentField]]['children'].push(data[i]);
                } else {
                    treeData.push(data[i]);
                }
            }

            if (typeof (isShowBlank) != "undefined" && isShowBlank) {
                if (data.length > 0) {
                    var oBlankData = jQuery.extend(true, {}, data)[0];
                    for (var ele in oBlankData) {
                        oBlankData[ele] = "";
                        if (ele == "text") {
                            oBlankData[ele] = "";
                        }
                        if (ele == "iconCls") {
                            oBlankData[ele] = "icon-blank";
                        }
                    }
                    treeData.unshift(oBlankData);
                }
            }
            return treeData;
        }

        return data;

    }

    //添加空白项
    Global.AddBlankItem = function (obj) {
        var oBlankData = jQuery.extend(true, {}, obj)[0];
        for (var ele in oBlankData) {
            oBlankData[ele] = "";
        }
        obj.unshift(oBlankData);
        return obj;
    }

    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    space = null,
    line = "\r\n",
    depth = 0;

    function _formatDate(date, format) {
        format = format || 'yyyy-MM-dd HH:mm';
        var o = {
            "M+": date.getMonth() + 1,  //month
            "d+": date.getDate(),       //day
            "h+": date.getHours(),      //hour
            "H+": date.getHours(),      //hour
            "m+": date.getMinutes(),    //minute
            "s+": date.getSeconds(),    //second
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    /**
    * 将数值四舍五入后格式化.
    *
    * @param num 数值(Number或者String)
    * @param cent 要保留的小数位(Number)
    * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
    * @return 格式的字符串,如'1,234,567.45'
    * @type String
    */
    function _formatNumber(num, cent, isThousand) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))//检查传入数值为数值类型.
            num = "0";
        if (isNaN(cent))//确保传入小数位为数值型数值.
            cent = 0;
        cent = parseInt(cent);
        cent = Math.abs(cent); //求出小数位数,确保为正整数.
        if (isNaN(isThousand))//确保传入是否需要千分位为数值类型.
            isThousand = 0;
        isThousand = parseInt(isThousand);
        if (isThousand < 0)
            isThousand = 0;
        if (isThousand >= 1) //确保传入的数值只为0或1
            isThousand = 1;
        sign = (num == (num = Math.abs(num))); //获取符号(正/负数)
        //Math.floor:返回小于等于其数值参数的最大整数
        num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); //把指定的小数位先转换成整数.多余的小数位四舍五入.
        cents = num % Math.pow(10, cent); //求出小数位数值.
        num = Math.floor(num / Math.pow(10, cent)).toString(); //求出整数位数值.
        cents = cents.toString(); //把小数位转换成字符串,以便求小数位长度.
        while (cents.length < cent) {//补足小数位到指定的位数.
            cents = "0" + cents;
        }
        if (isThousand == 0) //不需要千分位符.
            return (((sign) ? '' : '-') + num + '.' + cents);
        //对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }


    function _xmlEscape(sXml) {
        if (sXml) {
            return sXml.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        }
        else {
            return "";
        }
    }


    function _toXML(rootName, jsObject) {
        var s = "";
        var textNode = false;
        if (!(jsObject instanceof Object)
            || jsObject instanceof Number
            || jsObject instanceof String
            || jsObject instanceof Boolean
            || jsObject instanceof Date) {

            s += space.join("") + "<" + rootName + ">";
            if (jsObject instanceof Date) {
                s += _xmlEscape(_formatDate(jsObject, "yyyy-MM-ddTHH:mm:ss"));
            }
            else {
                s += _xmlEscape(jsObject);
            }
            s += "</" + rootName + ">" + line;
        }
        else {
            var isArray = jsObject instanceof Array;
            if (depth != 0 || !isArray) {
                s += space.join("") + "<" + rootName
                var text = "";
                for (var i in jsObject) {
                    if (jsObject[i] instanceof Function) {
                        continue;
                    }
                    if (i == "__attr") {
                        var attr = jsObject[i];
                        for (var j in attr) {
                            if (attr[j] instanceof Function) {
                                continue;
                            }
                            s += " " + j + "=\"" + _xmlEscape(attr[j]) + "\" "
                        }
                    }
                    if (i == "__text") {
                        if (jsObject[i]) {
                            text = jsObject[i].toString();
                        }
                    }
                }
                if (text != "") {
                    textNode = true;
                    s += ">" + text;
                }
                else {
                    s += ">" + line;
                }
                space.push("  ");
            }
            for (var k in jsObject) {
                var instance = jsObject[k];
                if (k == "__attr" || k == "__text" || instance instanceof Function) {
                    continue;
                }
                if (instance instanceof Array) {
                    for (var l in instance) {
                        if (instance[l] instanceof Function) {
                            continue;
                        }
                        depth++;
                        s += _toXML(k, instance[l]);
                        depth--;
                    }
                }
                else {
                    depth++;
                    s += _toXML(isArray ? rootName : k, jsObject[k]);
                    depth--;
                }
            }
            if (depth != 0 || !isArray) {
                space.pop();
                if (!textNode) {
                    s += space.join("");
                }
                s += "</" + rootName + ">" + line;
            }
        }
        return s;
    }


    Global.toXml = function (rootName, jsObject) {
        ///	<summary>
        ///     将一个js对象转换为XML字符串
        ///	</summary>
        ///	<param name="rootName" type="String">
        ///		根节点元素名
        ///	</param>
        ///	<param name="jsObject" type="Object">
        ///		转换为XML字符串的对象
        ///	</param>
        ///	<returns type="String" />

        if (!rootName || !jsObject) {
            return "";
        }
        if (MapExt.trim(rootName) == "") {
            return "";
        }
        space = [];
        depth = 0;
        return _toXML(rootName, jsObject);
    }


    Global.ajaxGet = function (url, getData, fnCallback, isAsync) {

        if (typeof (isAsync) == "undefined") {
            isAsync = true;
        }
        $.ajax({
            url: url,
            type: "get",
            data: getData,
            contentType: "application/json",
            cache: false,
            async: isAsync,
            success: function (sRtn) {
                fnCallback(sRtn);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if ($.messager) {
                    Global.closeWaiting();
                    $.messager.alert('提示', jqXHR.statusText, "error");
                }
                else {
                    alert(jqXHR.statusText);
                }
                return;
            }
        })
    }

    Global.ajaxPost = function (url, postData, fnCallback, isAsync) {
        if (typeof (isAsync) == "undefined") {
            isAsync = true;
        }
        $.ajax({
            url: url,
            type: "post",
            data: JSON.stringify(postData),
            contentType: "application/json",
            cache: false,
            async: isAsync,
            success: function (sRtn) {

                fnCallback(sRtn);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if ($.messager) {
                    Global.closeWaiting();
                    $.messager.alert('提示', jqXHR.statusText, "error");
                }
                else {
                    alert(jqXHR.statusText);
                }
                return;
            }
        })

    }

    //跨域访问Get请求
    Global.ajaxCDGet = function (url, getData, fnCallback, isAsync) {
        if (typeof (isAsync) == "undefined") {
            isAsync = false;
        }
        $.ajax({
            url: url,
            type: "get",
            data: getData,
            contentType: "application/json",
            cache: false,
            async: isAsync,
            success: function (sRtn) {
                fnCallback(sRtn);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if ($.messager) {
                    Global.closeWaiting();
                    $.messager.alert('提示', jqXHR.statusText, "error");
                }
                else {
                    alert(jqXHR.statusText);
                }
                return;
            }
        })
    }

    //跨域访问POST请求
    Global.ajaxCDPost = function (url, postData, fnCallback, isAsync) {
        if (typeof (isAsync) == "undefined") {
            isAsync = false;
        }
        $.ajax({
            url: url,
            type: "post",
            data: JSON.stringify(postData),
            contentType: "application/json",
            cache: false,
            async: isAsync,
            success: function (sRtn) {
                fnCallback(sRtn);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if ($.messager) {
                    Global.closeWaiting();
                    $.messager.alert('提示', jqXHR.statusText, "error");
                }
                else {
                    alert(jqXHR.statusText);
                }
                return;
            }
        })
    }

    Global.getDeviceType = function () {

        var width = $(window).width();
        if (width < 768) {
            //超小屏幕 手机 (<768px) 
            return 0;
        }
        else if (width >= 768 && width < 992) {
            //平板 (≥768px)
            return 1;
        }
        else if (width >= 992 && width < 1200) {
            //桌面 (≥992px)
            return 2;
        }
        else {
            //桌面 (≥1200px)
            return 3;
        }
    }

    function _getWinPercent() {
        var width = $(window).width();
        if (width < 768) {
            //超小屏幕 手机 (<768px) 
            return "100%";
        }
        else {
            //中等屏幕 桌面显示器 (≥992px)
            //大屏幕 大桌面显示器 (≥1200px)
            return "80%";
        }
    }




    //全屏弹出框
    Global.openFullWindow = function (title, url, fnCallback) {
        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();

        var index = layer.open({
            type: 2,
            area: [iWinWidth + 'px', iWinHeight + 'px'],
            maxmin: false,
            shade: 0.4,
            title: title,
            content: url,
            scrollbar: false,
            fix: false,
            move: false,
            success: function (layero, index) {
                if (index) {
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    if (fnCallback) {
                        fnCallback(iframeWin);
                    }

                }
            }
        });
        layer.full(index);
    }



    //大弹出框---返回函数
    Global.openLargeWindow = function (title, url, fnCallback) {
        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();
        var iWidth = 0;
        var iHeight = 0;
        if (iWinWidth > 768) {
            iWidth = Global.calcDoubleFix(0.9, iWinWidth, "*", 0);
            iHeight = Global.calcDoubleFix(0.8, iWinHeight, "*", 0);
            layer.open({
                type: 2,
                area: [iWidth + 'px', iHeight + 'px'],
                fix: false, //不固定
                maxmin: true,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                }
            });
        } else {
            layer.open({
                type: 2,
                area: [iWinWidth + 'px', iWinHeight + 'px'],
                maxmin: false,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                            Global.closeWaiting();
                        }
                    }
                }
            });
        }
    }

    //普通弹出框——返回值
    Global.openGeneralWindow = function (title, url, fnCallback) {

        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();
        var iWidth = 0;
        var iHeight = 0;
        if (iWinWidth > 768) {
            iWidth = Global.calcDoubleFix(0.7, iWinWidth, "*", 0);
            iHeight = Global.calcDoubleFix(0.6, iWinHeight, "*", 0);
            layer.open({
                type: 2,
                area: [iWidth + 'px', iHeight + 'px'],
                fix: true, //不固定
                maxmin: true,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                }
            });
        } else {
            layer.open({
                type: 2,
                area: [iWinWidth + 'px', iWinHeight + 'px'],
                maxmin: false,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                }
            });
        }
    }

    //自定义弹出框---返回值
    Global.openFixWindow = function (title, url, iWidth, iHeight, fnCallback) {

        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();

        if (iWinWidth > 768) {
            layer.open({
                type: 2,
                area: [iWidth + 'px', iHeight + 'px'],
                fix: true, //固定
                move: true,
                shade: 0.4,
                anim: 2,
                title: title,
                content: url,
                scrollbar: false,
                moveOut: true,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                }
            });
        } else {
            layer.open({
                type: 2,
                area: [iWinWidth + 'px', iWinHeight + 'px'],
                maxmin: false,
                shade: 0.4,
                anim: 2,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                }
            });
        }
    }
    //设置窗口的标题
    Global.setWindowTitle = function (title) {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.title(title, index);
    }

    //获取新的url
    Global.getNewUrl = function (oid) {
        var url = location.href.substring(0, location.href.indexOf("?"));
        var arrParams = location.href.substr(location.href.indexOf("?") + 1).split("&");
        var newURL = url + "?mode=3&oid=" + encodeURIComponent(oid);
        for (var i = 0; i < arrParams.length; i++) {
            if (arrParams[i].toLowerCase().indexOf("mode=") != 0 && arrParams[i].toLowerCase().indexOf("oid=") != 0 && arrParams[i].toLowerCase().indexOf("ticket=") != 0) {
                newURL += "&" + arrParams[i];
            }
        }
        return newURL;
    },

    //刷新当前窗口
    Global.refreshWindow = function (oid) {
        var url = location.href.substring(0, location.href.indexOf("?"));
        var arrParams = location.href.substr(location.href.indexOf("?") + 1).split("&");
        var newURL = url + "?mode=2&oid=" + encodeURIComponent(oid);
        for (var i = 0; i < arrParams.length; i++) {
            if (arrParams[i].toLowerCase().indexOf("mode=") != 0 && arrParams[i].toLowerCase().indexOf("oid=") != 0) {
                newURL += "&" + arrParams[i];
            }
        }
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.iframeSrc(index, newURL)
    }

    //关闭窗口
    Global.closeWindow = function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }

    Global.isEmpty = function (val) {
        if (val == null || val.replace(/\s/g, '') == "") {
            return true;
        }
        return false;
    }

    Global.trim = function (s) {
        return s.replace(/^[\s　]+|[\s　]+$/g, '');
    }

    Global.isOnlyCharNumber = function (sStr) {
        var regexp = /^[a-zA-Z0-9]+$/g;
        if (sStr != "" && regexp.test(sStr) == false) return false;
        return true;
    }


    Global.formatNumber = function (num, cent, isThousand) {
        return _formatNumber(num, cent, isThousand)
    }

    Global.stringToFloat = function (strPara) {
        var strValue, decRtn;
        strValue = strPara.replace(/,/g, "");
        decRtn = (isNaN(parseFloat(strValue)) ? 0 : parseFloat(strValue));
        return decRtn;
    }
    // 根据保留位进行四舍五入
    Global.Round = function (dec, decimals) {
        var step;
        var temp;

        dec = Math.round(dec * 100000000) / 100000000;

        if (dec == 0) {
            return dec;
        }
        else {
            temp = Math.abs(dec);
            if (decimals == 0 || decimals == undefined) {
                temp = Math.round(temp);
            }
            else if (decimals > 0) {
                step = Math.pow(10, decimals);
                temp = Math.round(temp * step) / step;
            }

            if (dec > 0) { dec = temp; }
            else { dec = -temp; }
        }
        return dec;
    }


    Global.calcDoubleFix = function (num1, num2, operation, fractionDigits) {
        return _calcDoubleFix(num1, num2, operation, fractionDigits);
    }

    var __FRACTION_DIGITS = 6;

    function __expToFix(s) {
        if (s.indexOf("e") >= 0 || s.indexOf("E") >= 0) {
            var arr = s.toLowerCase().split("e");
            return __movePoint(arr[0], parseInt(arr[1]));
        }
        return s;
    }


    function _checkFloatParam(num, checkString) {
        if (!(typeof num == 'number' || typeof num == 'string')) {
            throw new Error("参数类型不正确");
        }
        if (typeof num == 'number' && isNaN(num)) {
            throw new Error("参数值是NaN");
        }
        if (typeof num == 'string') {
            if (checkString == true) {
                var str = num.toString().replace(/,/g, "");
                if (isNaN(str)) {
                    throw new Error("参数值不是数值");
                }
            }
        }
    }

    function _calcDoubleFix(num1, num2, operation, fractionDigits) {
        if (arguments.length < 3) throw new Error("参数错误");
        //3.0中通替过calcDoubleFix，因为无法明确使用情况，所以需要支持"a"+123的场景
        _checkFloatParam(num1, false);
        _checkFloatParam(num2, false);

        var n, n1, n2, s, s1, s2, ps;

        s1 = __expToFix(num1.toString().replace(/,/g, ""));
        ps = s1.split('.');
        n1 = ps[1] ? ps[1].length : 0;

        s2 = __expToFix(num2.toString().replace(/,/g, ""));
        ps = s2.split('.');
        n2 = ps[1] ? ps[1].length : 0;

        var blnNumber = !isNaN(s1) && s1 != "" && !isNaN(s2) && s2 != "";
        if (blnNumber) {
            switch (operation) {
                case '+':
                    n = n1 > n2 ? n1 : n2;
                    s = Number(__movePoint(s1, n)) + Number(__movePoint(s2, n));
                    break;
                case '-':
                    n = n1 > n2 ? n1 : n2;
                    s = Number(__movePoint(s1, n)) - Number(__movePoint(s2, n));
                    break;
                case '*':
                    n = n1 + n2;
                    s = Number(s1.replace('.', '')) * Number(s2.replace('.', ''));
                    break;
                case '/':
                    n = n1 - n2;
                    s = Number(s1.replace('.', '')) / Number(s2.replace('.', ''));
                    break;
                default:
                    throw new Error("calcDoubleFix只支持加减乘除运算");
            }
            s = __movePoint(__expToFix(s.toString()), -n);
            return accRound(Number(s), fractionDigits);
        }
        else {
            switch (operation) {
                case '+':
                    return num1 + num2;
                default:
                    throw new Error("calcDoubleFix不支持字符串的乘除减运算");
            }
        }
    }


    function accTruncate(num, fractionDigits) {
        if (arguments.length < 1) throw new Error("参数错误");
        _checkFloatParam(num, true);

        var r = (fractionDigits != undefined && !isNaN(fractionDigits) && fractionDigits < __FRACTION_DIGITS) ? fractionDigits : __FRACTION_DIGITS;
        if (r <= 0) r = 0;

        var s1 = __expToFix(num.toString().replace(/,/g, ""));
        if (parseInt(s1) == s1) {
            return parseInt(s1);
        }

        var s2;
        if (r == 0) {
            s2 = s1.substr(0, s1.indexOf("."));
        }
        else {
            s2 = s1.substr(0, s1.indexOf(".") + r + 1);
        }
        return parseFloat(s2);
    }

    function accRound(num, fractionDigits) {
        if (arguments.length < 1) throw new Error("参数错误");
        _checkFloatParam(num, true);

        var r = (fractionDigits != undefined && !isNaN(fractionDigits) && fractionDigits < __FRACTION_DIGITS) ? fractionDigits : __FRACTION_DIGITS;
        if (r <= 0) r = 0;

        var s, s1, s2, start, n;

        var s1 = __expToFix(num.toString().replace(/,/g, ""));
        start = s1.indexOf(".");
        s = __movePoint(s1, r);
        n = Number(s1);

        if (start >= 0) {
            s2 = Number(s1.substr(start + r + 1, 1));
            if (s2 >= 5 && n >= 0 || s2 < 5 && n < 0) {
                s = Math.ceil(s);
            }
            else {
                s = Math.floor(s);
            }
        }

        return Number(__movePoint(s.toString(), -r));
    }

    function __movePoint(str, scale) {
        if (scale >= 0)
            return __movePointRight(str, scale);
        else
            return __movePointLeft(str, -scale);
    }
    function __movePointLeft(str, scale) {
        var s, s1, s2, ch, ps, sign;
        ch = '.';
        sign = '';
        s = str ? str : "";

        if (scale <= 0) return s;
        ps = s.split('.');
        s1 = ps[0] ? ps[0] : "";
        s2 = ps[1] ? ps[1] : "";
        if (s1.slice(0, 1) == '-') {
            s1 = s1.slice(1);
            sign = '-';
        }
        if (s1.length <= scale) {
            ch = "0.";
            s1 = __padLeft(s1, scale);
        }
        return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
    }

    function __movePointRight(str, scale) {
        var s, s1, s2, ch, ps;
        ch = '.';
        s = str ? str : "";

        if (scale <= 0) return s;
        ps = s.split('.');
        s1 = ps[0] ? ps[0] : "";
        s2 = ps[1] ? ps[1] : "";
        if (s2.length <= scale) {
            ch = '';
            s2 = __padRight(s2, scale);
        }
        return s1 + s2.slice(0, scale) + ch + s2.slice(scale, s2.length);
    }

    function __padLeft(str, nSize, ch) {
        var len = 0;
        var s = str ? str : "";
        ch = ch ? ch : '0';

        len = s.length;
        while (len < nSize) {
            s = ch + s;
            len++;
        }
        return s;
    }

    function __padRight(str, nSize, ch) {
        var len = 0;
        var s = str ? str : "";
        ch = ch ? ch : '0';

        len = s.length;
        while (len < nSize) {
            s = s + ch;
            len++;
        }
        return s;
    }

    //获取cookie值
    function getCookie(sName) {
        var aCookie = document.cookie.split("; ");
        var lastMatch = null;
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0]) {
                lastMatch = aCrumb;
            }
        }
        if (lastMatch) {
            var v = lastMatch[1];
            if (v === undefined) return v;
            return unescape(v);
        }
        return null;
    }



    function setCookie(sName, sValue) {
        document.cookie = sName + "=" + escape(sValue) + ";path=/";
    }

    ///重置系统主题
    Global.SetSysTheme = function () {

        var s = window.location.hash;
        var start = s.indexOf('MirsThemeName') + 14;
        var themeName = s.substring(start);

        //var themeName = getCookie("MirsTheme");
        var oCssTheme = document.getElementById("cssTheme");
        if (oCssTheme) {
            if (themeName == "Landscape") {
                oCssTheme.href = Global.SiteName + "/frontend/easyui/themes/landscape/easyui.css";
            }
            else if (themeName == "Hot") {
                oCssTheme.href = Global.SiteName + "/frontend/easyui/themes/Hot_A/easyui.css";
            }
            else if (themeName == "GreenEyeProtection") {
                oCssTheme.href = Global.SiteName + "/frontend/easyui/themes/GreenEyeProtection/easyui.css";
            }
            else {
                oCssTheme.href = Global.SiteName + "/frontend/easyui/themes/Default/easyui.css";
            }
        }
    }

    ///重置门户主题
    Global.SetPortalTheme = function () {
        var s = window.location.hash;
        var start = s.indexOf('portalTheme') + 12;
        var themeName = s.substring(start);
        var oCssTheme = document.getElementById("portalTheme");
        if (oCssTheme) {
            if (themeName === "Pure") {
                oCssTheme.href = Global.SiteName + "/frontend/portal/Pure/portal.css";
            }
            else if (themeName === "Classical") {
                oCssTheme.href = Global.SiteName + "/frontend/portal/Classical/portal.css";
            }
            else if (themeName === "Green") {
                oCssTheme.href = Global.SiteName + "/frontend/portal/Green/portal.css";
            }
            else {
                oCssTheme.href = Global.SiteName + "/frontend/portal/Default/portal.css";
            }
        }
    }

    //主题切换，zhousw 20160711
    window.addEventListener("hashchange", function (e) {
        var s = window.location.hash;
        //系统主题和门户主题
        var start;
        var themeName;
        if (s.indexOf('MirsThemeName') > 0) {
            start = s.indexOf('MirsThemeName') + 14;
            themeName = s.substring(start);
            //设置
            setCookie("MirsTheme", themeName);
            //重置系统主题
            Global.SetSysTheme();
        }
        else {
            start = s.indexOf('portalTheme') + 12;
            themeName = s.substring(start);
            //设置
            setCookie("PortalTheme", themeName);
            //重置门户主题
            Global.SetPortalTheme();
        }
    });

    Global.InitSysTheme = function () {
        var themeName = getCookie("MirsTheme");
        if (themeName == null) {
            var s = window.location.hash;
            var start = s.indexOf('MirsThemeName') + 14;
            themeName = s.substring(start);
            //设置
            setCookie("MirsTheme", themeName);
        }
        //系统主题
        Global.SetSysTheme();
    }
    //表单跳转
    Global.redirect = function (oid) {
        var newURL = "";
        var index = location.href.indexOf("?");
        if (index > 0) {
            var url = location.href.substring(0, index);
            newURL = url + "?mode=2&oid=" + encodeURIComponent(oid);
            var arrParams = location.href.substr(index + 1).split("&");
            for (var i = 0; i < arrParams.length; i++) {
                if (arrParams[i].toLowerCase().indexOf("mode=") != 0 && arrParams[i].toLowerCase().indexOf("oid=") != 0) {
                    newURL += "&" + arrParams[i];
                }
            }
        }
        else {
            newURL = location.href + "?mode=2&oid=" + encodeURIComponent(oid);
        }
        layer.alert("保存成功！", function () {
            window.location.href = newURL;
        });
    }
    //表单数据渲染
    Global.loadData = function (obj) {
        var key, value, tagName, type, arr;
        for (x in obj) {
            key = x;
            value = obj[x];
            $("[name='" + key + "'],[name='" + key + "[]'],[id='" + key + "']").each(function () {
                tagName = $(this)[0].tagName;
                type = $(this).attr("type");
                if (tagName == "INPUT") {
                    if (type == "radio") {
                        $(this).attr("checked", $(this).val() == value);
                    } else if (type == "checkbox") {
                        arr = value.split(",");
                        for (var i = 0; i < arr.length; i++) {
                            if ($(this).val() == arr[i]) {
                                $(this).attr("checked", true);
                                break;
                            }
                        }
                    } else if (type == "file") {
                        var file_div = $("#fileName_" + key);
                        file_div.empty();
                        var data = JSON.parse(value);
                        for (var i = 0; i < data.length; i++) {
                            var upload_files = $("<div></div>").addClass("upload-files");
                            var upload_files_block = $("<div></div>").addClass("upload-files-block");
                            var fileicon = $("<span></span>");
                            if (typeof (data[i].doctype) == "undefined") {
                                fileicon.addClass("fileicon-all fileicon fileicon-unknow");
                            }
                            else {
                                fileicon.addClass("fileicon-all fileicon fileicon-" + data[i].doctype);
                            }
                            var uploadname = $("<span></span>").addClass("files-uploadname").text(data[i].name);
                            upload_files_block.append(fileicon).append(uploadname);
                            var upload_down = $("<div></div>").text("下载").addClass("upload-updown").attr("link", data[i].link).on("click", function () {
                                window.location.href = Global.SiteName + "/API/Components/Upload/FileDownload/" + Global.fnQueryString("ticket") + "?docguid=" + $(this).attr("link");
                            });
                            upload_files.append(upload_files_block);
                            upload_files.append(upload_down);
                            file_div.append(upload_files);
                        }
                    } else if (typeof ($(this).attr("table")) != "undefined") {
                        //table组件的input
                        return;
                    } else {
                        $(this).val(value);
                    }
                }
                else if (tagName == "SELECT") {
                    $(this).val(value);
                }
                else if (tagName == "TEXTAREA") {
                    $(this).val(value);
                    if (typeof ($(this).attr("tinymce")) != "undefined") {
                        var editor = tinymce.get(key);
                        if (editor.initialized) {
                            tinymce.activeEditor.destroy();
                            $(this).val(value);
                            Form.tinyMceRend(key);
                        }
                        else {
                            editor.isImmediatePropagationStopped();
                            Form.tinyMceRend(key);
                        }
                    }
                }
                else if (tagName == "TABLE") {
                    $(".td-border-none").remove();
                    $(this).find("tbody").empty();
                    var clolmns = $(this).children("thead").find("td[column]");
                    var valueJson = JSON.parse(value);
                    if (valueJson.length > 0) {
                        for (var i = 0; i < valueJson.length; i++) {
                            var _tr = $("<tr></tr>");
                            clolmns.each(function (index, e) {
                                var column = $(e).attr("column");
                                var _input = $("<input></input>").attr("id", "" + key + "_" + i + "_" + index + "").attr("table", "").attr("column", column);

                                for (var j = 0; j < valueJson[i].length; j++) {
                                    if (valueJson[i][j].column == column) {
                                        _input.val(valueJson[i][j].value);
                                    }
                                }
                                var _td = $("<td></td>").append(_input);
                                _tr.append(_td);
                            });

                            if (i == valueJson.length - 1) {
                                //定义操作按钮
                                var _addBtn = $("<a></a>").attr("href", "javascript:;").addClass("tr-add").on("click", function () {
                                    Form.addTr(this);
                                });
                                var _delBtn = $("<a></a>").attr("href", "javascript:;").addClass("tr-del").on("click", function () {
                                    Form.delTr(this);
                                });
                                var td = $("<td></td>").addClass("td-border-none").append(_addBtn).append(_delBtn);
                                _tr.append(td);
                            }
                            $(this).children("tbody").append(_tr);
                        }
                    }
                }
            });
        }
    }

    //自定义弹出框---流程用  pzq 2017.03.23
    Global.openFixProcessWindow = function (title, url, iWidth, iHeight, fnCallback) {
        layer.open({
            type: 3,
            move: true,
            shade: 0,
            anim: 2,
            scrollbar: false,
            moveOut: true,
            time: 1
        });
        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();
        if (iWinWidth > 768) {
            layer.open({
                type: 2,
                area: [iWidth + 'px', iHeight + 'px'],
                fix: true, //固定
                move: true,
                shade: 0.4,
                anim: 2,
                title: title,
                content: url,
                scrollbar: false,
                moveOut: true,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                },
                cancel: function () {
                    //发起审批
                    if (typeof (oInitiate) != "undefined") {
                        if (oInitiate.iframeType == 1) {
                            oInitiate.getCtrl("appIfrm").parent().show();
                        }
                    }
                    //流程处理
                    if (typeof (oHandle) != "undefined") {
                        if (oHandle.iframeType == 1) {
                            oHandle.getCtrl("appIfrm").parent().show();
                        }
                    }
                }
            });
        } else {
            layer.open({
                type: 2,
                area: [iWinWidth + 'px', iWinHeight + 'px'],
                maxmin: false,
                shade: 0.4,
                anim: 2,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                },
                cancel: function () {
                    //发起审批
                    if (typeof (oInitiate) != "undefined") {
                        if (oInitiate.iframeType == 1) {
                            oInitiate.getCtrl("appIfrm").parent().show();
                        }
                    }
                    //流程处理
                    if (typeof (oHandle) != "undefined") {
                        if (oHandle.iframeType == 1) {
                            oHandle.getCtrl("appIfrm").parent().show();
                        }
                    }
                }
            });
        }
    }
    //大弹出框---流程用  pzq 2017.03.23
    Global.openLargeProcessWindow = function (title, url, fnCallback) {
        layer.open({
            type: 3,
            move: true,
            shade: 0,
            anim: 2,
            scrollbar: false,
            moveOut: true,
            time: 1
        });
        if (title == null || title == '') {
            title = false;
        };
        if (url == null || url == '') {
            url = "404.html";
        };
        var iWinWidth = $(window).width();
        var iWinHeight = $(window).height();
        var iWidth = 0;
        var iHeight = 0;
        if (iWinWidth > 768) {
            iWidth = Global.calcDoubleFix(0.9, iWinWidth, "*", 0);
            iHeight = Global.calcDoubleFix(0.8, iWinHeight, "*", 0);
            layer.open({
                type: 2,
                area: [iWidth + 'px', iHeight + 'px'],
                fix: false, //不固定
                maxmin: true,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                        }
                    }
                },
                cancel: function () {
                    //发起审批
                    if (typeof (oInitiate) != "undefined") {
                        if (oInitiate.iframeType == 1) {
                            oInitiate.getCtrl("appIfrm").parent().show();
                        }
                    }
                    //流程处理
                    if (typeof (oHandle) != "undefined") {
                        if (oHandle.iframeType == 1) {
                            oHandle.getCtrl("appIfrm").parent().show();
                        }
                    }
                }
            });
        } else {
            layer.open({
                type: 2,
                area: [iWinWidth + 'px', iWinHeight + 'px'],
                maxmin: false,
                shade: 0.4,
                title: title,
                content: url,
                scrollbar: false,
                success: function (layero, index) {
                    if (index) {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        if (fnCallback) {
                            fnCallback(iframeWin);
                            Global.closeWaiting();
                        }
                    }
                },
                cancel: function () {
                    //发起审批
                    if (typeof (oInitiate) != "undefined") {
                        if (oInitiate.iframeType == 1) {
                            oInitiate.getCtrl("appIfrm").parent().show();
                        }
                    }
                    //流程处理
                    if (typeof (oHandle) != "undefined") {
                        if (oHandle.iframeType == 1) {
                            oHandle.getCtrl("appIfrm").parent().show();
                        }
                    }
                }
            });
        }
    }

})();

//$(function ($) {
//   Global.InitSysTheme();
//});
window.onload = function () {
    Global.InitSysTheme();
    Global.SetPortalTheme();
}


