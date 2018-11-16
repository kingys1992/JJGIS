WebSite.Script.CardListTool = function () {
    this._ctTopOne = null;
    this._ctTopTwo = null;
    this._ctTopThree = null;
    this._ctTopFour = null;
    this._ctBottomLeft = null
    this._ctBottomCenter = null;
    this._ctBottomRight = null;

    this._cardListPanl = null;
    this._cardBoxPanl = null;

    this._cardBoxContent = null;
    this._win = window;
    this._doc = document;

    this.scrollWidth = 0;
    this.slider = null;

    this.__JsonCard = null;
    this.__JsonCoObj = null;
    this.__CityJson = null;

    this._serviceListTop = null;
    this._serviceListHeight = null;

    this._graphic = null;
    this._queryurl = null;
    this._whereStr = null;
    this._featureSet = null;
    this._graphics = null;

    this._timeOut1 = null;
    this._timeOut2 = null;

    this._typeCard = null;//控制query查询之后方法

    this._Outfall = null;//出水口graphic
    this._Estuary = null;//入河口graphic
    this._RiverPath = null;//入河路径graphic

    this._mapClick = null;//mapClick事件

}
WebSite.Script.CardListTool.Instance = function () {
    var o = new WebSite.Script.CardListTool();
    //$.ajax({
    //    type: "GET",  //默认是GET
    //    url: "ashx/CardList.ashx?uname=" + sessionStorage.uname,
    //    dataType: "json",
    //    async: false,  //是否异步
    //    cache: false, //不加载缓存
    //    complete: function (data) {
    //         //陈程修改根据权限加载卡片
    //        o.__JsonCard = eval('(' + data.responseText + ')');
    //    },
    //    error: function () {
    //        o.__JsonCard == undefined;
    //    }
    //});
    if (o.__JsonCard == undefined) {
        o.__JsonCard = [{
            id: 1000, name: "重点污染源自动监控专题", image: "card_1.png", children: [
                { id: 1010, name: "重点污染源自动监控专题", image: "card_1.png", ename: "back" },
                { id: 1020, name: "信息发布", image: "card_10.png", ename: "emphasis_info" },
                { id: 1030, name: "达标率统计", image: "card_12.png", ename: "emphasis_standard" },
                { id: 1040, name: "排放量统计", image: "card_11.png", ename: "emphasis_discharge" },
                { id: 1050, name: "排放量动态变化", image: "card_13.png", ename: "emphasis_dynamic" }
            ]
        }]
    }
    o.init();
    return o;
}
WebSite.Script.CardListTool.prototype = {
    //初始化方法
    init: function () {
        this._ctTopOne = $get("divCtTopOne");
        this._ctTopTwo = $get("divCtTopTwo");
        this._ctTopThree = $get("divCtTopThree");
        this._ctTopFour = $get("divCtTopFour");
        this._ctBottomLeft = $get("divCtBottomLeft");
        this._ctBottomCenter = $get("divCtBottomCenter");
        this._ctBottomRight = $get("divCtBottomRight");

        this._cardListPanl = $get("divCardList");
        this._cardBoxPanl = $get("divCardBox");
        this.__CityJson = [
        { name: "郑州市", children: [] }, { name: "开封市", children: [] }, { name: "洛阳市", children: [] },
        { name: "平顶山市", children: [] }, { name: "安阳市", children: [] }, { name: "鹤壁市", children: [] },
        { name: "新乡市", children: [] }, { name: "焦作市", children: [] }, { name: "濮阳市", children: [] },
        { name: "许昌市", children: [] }, { name: "漯河市", children: [] }, { name: "三门峡市", children: [] },
        { name: "南阳市", children: [] }, { name: "商丘市", children: [] }, { name: "信阳市", children: [] },
        { name: "周口市", children: [] }, { name: "驻马店市", children: [] }, { name: "济源市", children: [] },
        { name: "巩义市", children: [] }, { name: "兰考县", children: [] }, { name: "长垣县", children: [] },
        { name: "邓州市", children: [] }, { name: "汝州市", children: [] }, { name: "固始县", children: [] },
        { name: "永城市", children: [] }, { name: "滑县", children: [] }, { name: "鹿邑县", children: [] },
        { name: "新蔡县", children: [] }];


        $addHandler(this._ctTopTwo, "click", Function.createDelegate(this, this.CtTopTwoClick));
        $addHandler(this._ctTopThree, "click", Function.createDelegate(this, this.CtTopThreeClick));
        $addHandler(this._ctTopFour, "click", Function.createDelegate(this, this.CtTopFourClick));
        $addHandler(this._ctBottomCenter, "click", Function.createDelegate(this, this.CtBottomCenterClick));
        $addHandler(this._ctBottomRight, "click", Function.createDelegate(this, this.CtBottomRightClick));
        this.CreateMainCardList();
        var _ins = this;
        this.slider = new neverModules.modules.slider({
            targetId: "divCtTopOneIn",
            sliderCss: "scrollSlider",
            barCss: "scrollBar",
            min: 0,
            max: 100
        });
        this.slider.onchange = function () {
            var client = document.getElementById("divCardScroll").clientWidth;
            var width = document.getElementById("divCardScroll").scrollWidth;
            document.getElementById("divCardScroll").scrollLeft = (width - client) * _ins.slider.getValue() / 100;
            _ins.scrollWidth = document.getElementById("divCardScroll").scrollLeft;
        }
        this.slider.create();
        this.slider.setValue(0);
    },
    //创建卡片
    CreateCardList: function (n) {
        this._cardBoxPanl.innerHTML = "";
        for (var i = 0; i < this.__JsonCard[n].children.length; i++) {
            var div = document.createElement("div");
            if (i == 0) {
                div.className = "cardDiv cardOne";
            }
            else {
                div.className = "cardDiv cardTow";
            }
            div.id = "divCard_" + this.__JsonCard[n].children[i].id;
            div.setAttribute("name", this.__JsonCard[n].children[i].ename);
            div.innerHTML = "<img src='Images/cardImages/" + this.__JsonCard[n].children[i].image + "'/>";
            $addHandler(div, "click", Function.createDelegate(this, this.MinCardClick));
            this._cardBoxPanl.appendChild(div);
        }
    },
    //创建主卡
    CreateMainCardList: function () {
        this._cardBoxPanl.innerHTML = "";
        var n = 0;
        for (var i = 0; i < this.__JsonCard.length; i++) {
            var div = document.createElement("div");
            if (i == 0) {
                div.className = "cardDiv cardOne";
            }
            else {
                div.className = "cardDiv cardTow";
            }
            div.id = "divCard_" + i;
            div.innerHTML = "<img src='Images/cardImages/" + this.__JsonCard[i].image + "'/>";
            $addHandler(div, "click", Function.createDelegate(this, this.MainCardClick));
            this._cardBoxPanl.appendChild(div);

        }
    },
    //卡片左移按钮点击事件
    CtTopTwoClick: function (e) {
        if ($get("divCtTopOneShade").style.display == "none") {
            var width = document.getElementById("divCardScroll").scrollWidth;
            var client = document.getElementById("divCardScroll").clientWidth;
            this.scrollWidth -= (width - client) * 0.1;
            if (this.scrollWidth < 0) {
                this.scrollWidth = 0;
            }
            document.getElementById("divCardScroll").scrollLeft = this.scrollWidth;
            document.getElementById("divCtTopOneIn_bar").style.left = (this.scrollWidth * 64 / (width - client)) + "px";
        }
    },
    //卡片右移按钮点击事件
    CtTopThreeClick: function (e) {
        if ($get("divCtTopOneShade").style.display == "none") {
            var width = document.getElementById("divCardScroll").scrollWidth;
            var client = document.getElementById("divCardScroll").clientWidth;
            this.scrollWidth += (width - client) * 0.1;
            if (this.scrollWidth > width - client) {
                this.scrollWidth = width - client;
            }
            document.getElementById("divCardScroll").scrollLeft = this.scrollWidth;
            document.getElementById("divCtTopOneIn_bar").style.left = (this.scrollWidth * 64 / (width - client)) + "px";
        }
    },
    //隐藏卡片按钮点击事件
    CtTopFourClick: function (e) {
        var handle = new HandleClass();
        if (handle.hasClass(this._cardListPanl, "CardHide")) {
            handle.removeClass(this._cardListPanl, "CardHide");
            handle.addClass(this._cardListPanl, "CardShow");
            this._ctTopFour.children[0].innerHTML = "<img src='Images/btn_menu_down.png' />";
        }
        else {
            handle.removeClass(this._cardListPanl, "CardShow");
            handle.addClass(this._cardListPanl, "CardHide");
            this._ctTopFour.children[0].innerHTML = "<img src='Images/btn_menu_up.png' />";
        }
    },
    //展开主卡按钮点击事件
    CtBottomCenterClick: function (e) {
        if ($get("divCtBottomCenterShade").style.display == "block") {
            return;
        }
        var dives = this._cardBoxPanl.children;
        for (var i = 0; i < dives.length; i++) {
            var handle = new HandleClass();
            handle.removeClass(dives[i], "cardOne");
            handle.removeClass(dives[i], "cardTow")
            handle.addClass(dives[i], "cardTile");
        }
        $get("divCtTopOneShade").style.display = "none";
        $get("divCardScroll").style.width = "100%";
    },
    //折叠主卡按钮点击事件
    CtBottomRightClick: function (e) {
        if ($get("divCtBottomRightShade").style.display == "block") {
            return;
        }
        var dives = this._cardBoxPanl.children;
        document.getElementById("divCtTopOneIn_bar").style.left = "0px";
        this.scrollWidth = 0;
        for (var i = 0; i < dives.length; i++) {
            var handle = new HandleClass();
            handle.removeClass(dives[i], "cardTile");
            if (i == 0) {
                handle.addClass(dives[i], "cardOne");
            }
            else {
                handle.addClass(dives[i], "cardTow")
            }
        }
        $get("divCtTopOneShade").style.display = "block";
        $get("divCardScroll").style.width = "150%";
    },
    //主卡点击事件
    MainCardClick: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var handle = new HandleClass();
        $get("divCtTopOneShade").style.display = "none";
        $get("divCtBottomCenterShade").style.display = "block";
        $get("divCtBottomRightShade").style.display = "block";
        document.getElementById("divCtTopOneIn_bar").style.left = "0px";
        this.scrollWidth = 0;
        this._cardBoxPanl.className = "cardBoxIn2";
        var _ins = this;
        var arr;
        var mainCardId = -1;
        while (elem) {
            if (elem.id) {
                arr = elem.id.split('_');
                if (arr[0] == "divCard") {
                    mainCardId = parseInt(arr[1]);
                    for (var i = 0; i < this._cardBoxPanl.children.length; i++) {
                        if (i == 0) {
                            handle.addClass(this._cardBoxPanl.children[i], "mainCardHideFrist");
                        } else {
                            handle.addClass(this._cardBoxPanl.children[i], "mainCardHide");
                        }
                    }
                    this._timeOut1 = window.setTimeout(function () {
                        _ins.CreateCardList(mainCardId);
                        for (var j = 0; j < _ins._cardBoxPanl.children.length; j++) {
                            handle.addClass(_ins._cardBoxPanl.children[j], "minCardShow");
                        }
                        window.clearTimeout(_ins.timeOut1);
                        _ins.timeOut1 = null;
                    }, 500);
                    this._timeOut2 = window.setTimeout(function () {
                        for (var n = 0; n < _ins._cardBoxPanl.children.length; n++) {
                            if (n == 0) {
                                handle.removeClass(_ins._cardBoxPanl.children[n], "cardOne");
                            } else {
                                handle.removeClass(_ins._cardBoxPanl.children[n], "cardTow");
                            }
                        }
                        _ins._cardBoxPanl.className = "cardBoxIn";
                        $get("divCardScroll").style.width = "100%";
                        _ins._serviceListTop = $get("divServiceList").style.top;
                        if ($get("divServiceList").style.height) {
                            _ins._serviceListHeight = $get("divServiceList").style.height;
                        }
                        window.clearTimeout(_ins.timeOut2);
                        _ins.timeOut2 = null;

                    }, 1000);
                    break;
                }
            }
            elem = elem.parentNode;
        }
    },
    //小卡点击事件
    MinCardClick: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var handle = new HandleClass();
        var arr;
        var _ins = this;
        var name = "";
        while (elem) {
            if (elem.id) {
                arr = elem.id.split('_');
                if (arr[0] == "divCard") {
                    var name = elem.attributes["name"].value;
                    break;
                }
            }
            elem = elem.parentNode;
        }
        switch (name) {
            //主卡返回
            case "back":
                this._cardBoxPanl.className = "cardBoxIn2";
                document.getElementById("divCtTopOneIn_bar").style.left = "0px";
                this.scrollWidth = 0;
                $get("divCtTopOneShade").style.display = "block";
                $get("divCtBottomCenterShade").style.display = "none";
                $get("divCtBottomRightShade").style.display = "none";
                $get("divCardBoxShade").style.display = "block";
                for (var i = 0; i < this._cardBoxPanl.children.length; i++) {
                    handle.removeClass(this._cardBoxPanl.children[i], "minCardShow");
                    handle.addClass(this._cardBoxPanl.children[i], "minCardHide");
                }
                this._timeOut1 = window.setTimeout(function () {
                    _ins.CreateMainCardList();
                    for (var j = 0; j < _ins._cardBoxPanl.children.length; j++) {
                        if (j == 0) {
                            handle.addClass(_ins._cardBoxPanl.children[j], "mainCardShowFrist");
                        } else {
                            handle.addClass(_ins._cardBoxPanl.children[j], "mainCardShow");
                        }
                    }
                    window.clearTimeout(_ins.timeOut1);
                    _ins.timeOut1 = null;
                }, 500);
                this._timeOut2 = window.setTimeout(function () {
                    for (var n = 0; n < _ins._cardBoxPanl.children.length; n++) {
                        if (n == 0) {
                            handle.removeClass(_ins._cardBoxPanl.children[n], "mainCardShowFrist");
                        } else {
                            handle.removeClass(_ins._cardBoxPanl.children[n], "mainCardShow");
                        }
                    }
                    _ins.ObjectPanlInit();
                    window.clearTimeout(_ins.timeOut2);
                    _ins.timeOut2 = null;
                }, 1000);
                break;
                //重点污染源信息发布
            case "emphasis_info":
                if (this._queryurl == null) {
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    $get("divCheckBoxex").style.display = "block";
                    $get("companyListDiv").parentNode.style.top = "112px";
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 490);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 1;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = "POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";//2016年9月3日19:15:19  王岩松 去掉 没有编码的企业 和非重点污染源企业。
                    this.queryObjList(this._queryurl);
                }
                break;
                //重点污染源排放量统计
            case "emphasis_discharge":
                var iframe = new PopWindow(680, 930, "排放量统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "ZDWYY/Paifangliang.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //重点污染源超标情况查询（注：原是达标率统计）
            case "emphasis_standard":
                var iframe = new PopWindow(680, 1120, "超标情况查询", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "ZDWYY/Dbiaolv.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //重点污染源排放量动态演变
            case "emphasis_dynamic":
                var iframe = new PopWindow(700, 1000, "排放量动态演变", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "ZDWYY/Dongtaibijiao.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //城市空气信息发布
            case "air_info":
                if (this._queryurl == null) {
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    $get("divCheckBoxexTow").style.display = "block";
                    $get("companyListDiv").parentNode.style.top = "87px";
                    map.infoWindow.resize(365, 260);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 5;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = "1=1";
                    this.queryObjList(this._queryurl);
                }
                break;
                //城市空气优良天数统计
            case "air_good":
                var iframe = new PopWindow(580, 880, "优良天数统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "CSKQ/Kqyouliangtianshu.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

                //城市空气动态评价
            case "air_dynamic":
                var iframe = new PopWindow(680, 1000, "空气质量演变", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "CSKQ/AQIYanBianDaoHang.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //城市空气 AQI 查询 渲染
            case "air_aqi_cx":
                var iframe = new PopWindow(700, 1000, "城市空气AQI查询", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "CSKQ/CityAQIDaoHang.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //饮用水源地信息发布
            case "drink_info":
                if (this._queryurl == null) {
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 240);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/DrinkWaterSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 6;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/DrinkWaterSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = "1=1";
                    this.queryObjList(this._queryurl);
                }
                break;
                //引用水源地达标率统计
            case "drink_standard":
                var iframe = new PopWindow(550, 940, "达标率统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "YYSYD/Yysdabiaolv.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //综合整治区域环境质量信息发布
            case "synthesize_info":
                if (this._queryurl == null) {
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 240);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/AreaSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 8;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/AreaSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = "SITETYPENA='重点区域'";
                    this.queryObjList(this._queryurl);
                }
                break;
                //综合整治区域环境质量达标率统计
            case "synthesize_standard":
                var iframe = new PopWindow(610, 1120, "综合整治区域达标率统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "ZHZZ/Zhdabiaolv.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //地表水信息发布
            case "water_info":
                if (this._queryurl == null) {
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 240);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 7;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = "   ISON <> 0 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //地表水河流沿程断面分析
            case "water_fracture":
                var iframe = new PopWindow(680, 1000, "河流沿程断面分析", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "DBS/DbsDuanmianfenxi.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //地表水水质动态评价
            case "water_dynamic":
                var iframe = new PopWindow(680, 1000, "地表水环境质量动态评价", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "DBS/DbsShuizhipingjia.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境管理-环评审批  2016年6月14日11:40:23  王岩松
            case "enterrise_approval":
                if (this._queryurl == null || this._queryurl != "http://192.168.12.197:6080/arcgis/rest/services/Special/FinalSite/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }

                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();

                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 300);
                    this._typeCard = 9;
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/AreaSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/FinalSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //环境管理-环评审批查询  2016年7月1日17:56:25  王岩松
            case "enterrise_approvals":
                var iframe = new PopWindow(700, 1000, "环评审批统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "GNQH/Huanpingshenpi.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境管理-行政处罚 2016年6月14日11:40:34  王岩松
            case "enterrise_punish":
                if (this._queryurl == null || this._queryurl != "http://192.168.12.197:6080/arcgis/rest/services/Special/PunishSite/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 200);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/PunishSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 10;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/PunishSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //环境管理-行政处罚查询  2016年7月1日17:56:25  王岩松
            case "enterrise_punishs":
                //var iframe = new PopWindow(650, 1000, "行政处罚统计", true);
                var iframe = new PopWindow(700, 1077, "行政处罚统计", true);

                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "HJGL/XingzhengchufaInfo.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境管理-排污许可管理  2016年10月10日16:37:18 王岩松
            case "enterrise_permission":
                var iframe = new PopWindow(700, 1250, "排放许可统计", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "HJGL/Paiwuxukeinfo.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境管理-医疗固废2016年8月23日11:19:32  王岩松
            case "enterrise_medicalwaste":
                if (this._queryurl == null || this._queryurl != "http://192.168.12.197:6080/arcgis/rest/services/Special/MedicalwasteSite/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 200);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/MedicalwasteSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 13;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/MedicalwasteSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                /////企业信息公开专题，信息发布  2016年10月23日11:26:17 王岩松。
            case "business_message":
                if (this._queryurl == null || this._queryurl != "http://192.168.12.197:6080/arcgis/rest/services/Special/BusinessOvertSite/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 200);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/BusinessOvertSite/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 14;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/BusinessOvertSite/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //展示地表水的 照片
            case "zbsxs":
                if (this._queryurl == null || this._queryurl == "http://192.168.12.197:6080/arcgis/rest/services/Special/IndustrialAreas/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 400);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/ShuiYuanDiFenBu/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 11;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/ShuiYuanDiFenBu/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //污染源与断面水质响应分析水质分析
            case "pollution_simulation":
                var iframe = new PopWindow(680, 1100, "水质模拟", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "JCFX/JSshuizhifenxi.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //污染源与断面水质响应分析水质预警
            case "pollution_early":
                var iframe = new PopWindow(680, 1100, "水质预警", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "JCFX/Shuizhimoxingfenxi.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //污染源与断面水质响应分析溯源分析
            case "pollution_decision":
                var iframe = new PopWindow(680, 1100, "溯源分析", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "JCFX/Shuoyuanfenxi.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //流量调控模拟分析
            case "flow_simulation":
                var iframe = new PopWindow(680, 1150, "流量调控模拟分析", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "JCFX/Huanjingliuliangtiaok.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

            case "province_rivers":               
                var iframe = new PopWindow(680, 1100, "全省层次河流", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "JCFX/Quanshengcengciheliu.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境功能区划分析专题图查询
            case "function_query":
                var iframe = new PopWindow(680, 1000, "专题图查询", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "ZTTCX/ZttInfo.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境功能区划分析产业集聚区差别化审批
            case "function_early":

                if (this._queryurl == null || this._queryurl == "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/ShuiYuanDiFenBu/MapServer/0/") {
                    if (map.graphicsLayerIds.length > 0) {
                        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                                var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                                map.removeLayer(graphicLayer);
                            }
                        }
                        if (map.getLayer("ponitTextLayer")) {
                            map.removeLayer(map.getLayer("ponitTextLayer"));
                        }
                        this._graphic = null;
                        this._queryurl = null;
                        this._whereStr = null;
                        this._graphics = null;
                        if (map.infoWindow.isShowing) {
                            map.infoWindow.hide();
                        }
                        this._featureSet = null;
                        if (this._mapClick != null) {
                            dojo.disconnect(this._mapClick);
                            this._mapClick = null;
                        }
                        $get("companyListDiv").innerHTML = "";
                    }
                    var loading = new LoadingAnimation();
                    var loadingDiv = loading.create();
                    document.body.appendChild(loadingDiv);
                    map.infoWindow.resize(365, 350);
                    var textLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/IndustrialAreas/MapServer", { id: "ponitTextLayer" });
                    map.addLayer(textLayer);
                    this._typeCard = 12;
                    this._queryurl = "http://192.168.12.197:6080/arcgis/rest/services/Special/IndustrialAreas/MapServer/0/";
                    this.ObjCheckBoxHandler();
                    this._whereStr = " 1=1 ";
                    this.queryObjList(this._queryurl);
                }
                break;
                //环境功能区划-专题数据查询  2016年10月10日17:06:23   王岩松
            case "function_data":
                var iframe = new PopWindow(650, 1000, "专题数据查询", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "GNQH/SearchInfo.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
                //环境功能区划分析决策分析
            case "function_forecast":
                var iframe = new PopWindow(680, 980, "环境容量查询", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "GNQH/ControlTotals.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

                //管理系统
            case "Card_User":
                var iframe = new PopWindow(680, 980, "用户维护", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "System/User.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

            case "Card_Role":
                var iframe = new PopWindow(680, 980, "角色维护", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "System/Permission.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

            case "Card_Assion":
                var iframe = new PopWindow(680, 980, "权限分配", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "System/UserAssesion.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;

            case "UPDATE_SITE":
                var iframe = new PopWindow(680, 980, "更新站点", true);
                var inDiv = iframe.CreateWindow();
                if (inDiv != null) {
                    inDiv.setAttribute("src", "System/updatesite.aspx?n=" + Math.random());
                    inDiv.onload = function () {
                        var loading = new LoadingAnimation();
                        loading.hide();
                    }
                }
                break;
        }
    },
    //点击回主卡页面初始化主卡页面
    ObjectPanlInit: function () {
        this._cardBoxPanl.className = "cardBoxIn";
        $get("divCardScroll").style.width = "150%";
        $get("divCardBoxShade").style.display = "none";
        if (map.graphicsLayerIds.length > 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
        }
        this._graphic = null;
        this._queryurl = null;
        this._whereStr = null;
        this._graphics = null;

        $get("companyListDiv").innerHTML = "";
        $get("inputSearch").value = "";
        $get("checkBox_power").checked = true;
        $get("checkBox_sewage").checked = true;
        $get("checkBox_water").checked = true;
        $get("checkBox_gas").checked = true;
        $get("divCheckBoxex").style.display = "none";
        $get("divCheckBoxexTow").style.display = "none";
        $get("companyListDiv").parentNode.style.top = "52px";
        if (map.infoWindow.isShowing) {
            map.infoWindow.hide();
        }
        this.ObjCheckBoxRemoveHandler();
        this._featureSet = null;
        if (this._mapClick != null) {
            dojo.disconnect(this._mapClick);
            this._mapClick = null;
        }
        if (map.getLayer("approvalLayer")) {
            map.removeLayer(map.getLayer("approvalLayer"));
        }
        if (map.getLayer("ponitTextLayer")) {
            map.removeLayer(map.getLayer("ponitTextLayer"));
        }
    },
    //显示【对象列表】
    ObjectListShow: function () {
        var handle = new HandleClass();
        if (handle.hasClass($get("divStBottomLeft"), "stWhite")) {
            //this._serviceListTop = $get("divServiceList").style.top;
            //if ($get("divServiceList").style.height) {
            //    this._serviceListHeight = $get("divServiceList").style.height;
            //}
            document.getElementById("divServiceListRestore1").setAttribute("name", "toBottom");
            document.getElementById("divServiceListRestore2").setAttribute("name", "toBottom");
            document.getElementById("divServiceListRestore1").children[0].src = "Images/ic_menu_toBottom.png";
            document.getElementById("divServiceListRestore2").children[0].src = "Images/ic_menu_toBottom.png";
            document.getElementById("divServiceListRestore1").title = "还原";
            document.getElementById("divServiceListRestore2").title = "还原";
            $get("divServiceList").style.top = "0px";
            $get("divServiceList").style.height = (document.documentElement.clientHeight - 84) + "px";
            return false;
        }
        var isFront = $get("divServiceListFront").getAttribute("name") == "B";
        handle.addClass($get("divStBottomLeft"), "stWhite");
        handle.removeClass($get("divStBottomRight"), "stWhite");
        handle.removeClass($get("divStTopRight"), "stWhite");

        //this._serviceListTop = $get("divServiceList").style.top;
        //if ($get("divServiceList").style.height) {
        //    this._serviceListHeight = $get("divServiceList").style.height;
        //}
        document.getElementById("divServiceListRestore1").setAttribute("name", "toBottom");
        document.getElementById("divServiceListRestore2").setAttribute("name", "toBottom");
        document.getElementById("divServiceListRestore1").children[0].src = "Images/ic_menu_toBottom.png";
        document.getElementById("divServiceListRestore2").children[0].src = "Images/ic_menu_toBottom.png";
        document.getElementById("divServiceListRestore1").title = "还原";
        document.getElementById("divServiceListRestore2").title = "还原";
        $get("divServiceList").style.top = "0px";
        $get("divServiceList").style.height = (document.documentElement.clientHeight - 84) + "px";
        if (isFront) {
            $get("divServiceListFront").setAttribute("name", "F");
            handle.removeClass($get("divServiceListFront"), "stDisplay");
            handle.addClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListFMain").appendChild($get("divServiceObjPanl"));
            handle.removeClass($get("divServiceListIn"), "flipperBack");
        }
        else {
            $get("divServiceListFront").setAttribute("name", "B");
            handle.addClass($get("divServiceListFront"), "stDisplay");
            handle.removeClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListBMain").appendChild($get("divServiceObjPanl"));
            handle.addClass($get("divServiceListIn"), "flipperBack");
        }
        var animatoin = new WebSite.Script.Animation();
        var WN = animatoin.fnWN();
        WN.addTranEvent($get("divServiceListIn"), function (e) {
            $get("divServiceInfoPanl").style.display = "none";
            $get("divServiceCovePanl").style.display = "none";
            $get("divServiceObjPanl").style.display = "block";
        }, 0.6);
    },
    //query查询
    queryObjList: function (url) {
        whereStr = this._whereStr;
        var coQueryTask = new esri.tasks.QueryTask(url);
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = true;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = whereStr;
        switch (this._typeCard) {
            //重点污染源
            case 1:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addCompanyFeatureSetToMap));
                break;
                //出水口、
            case 2:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addOutfallFeatureSetToMap));
                break;
                //入河口
            case 3:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addEstuaryFeatureSetToMap));
                break;
                //入河路径
            case 4:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addRiverPathFeatureSetToMap));
                break;
                //城市空气
            case 5:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addCityAirFeatureSetToMap));
                break;
                //饮用水
            case 6:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addDrinkWaterFeatureSetToMap));
                break;
                //地表水
            case 7:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addSurfaceWaterFeatureSetToMap));
                break;
                //综合整治区域环境质量
            case 8:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addSynthesizeFeatureSetToMap));
                break;
                ///环评审批
            case 9:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addApprovalFeatureSetToMap));
                break;
                ///行政处罚
            case 10:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addPunishFeatureSetToMap));
                break;
                //地表水 展示
            case 11:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addWaterSiteFeatureSetToMap));
                break;
                //产业聚集区审批  
            case 12:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addIndustrialAreaFeatureSetToMap));
                break;
                //医疗固废查询 enterrise_medicalwaste 
            case 13:
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addMedicalWasteSetToMap));
                break;
            case 14://企业信息公开情况
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addBusinessMessageSetToMap));
                break;
        }
    },
    //重点污染源渲染地图、加载公司列表
    addCompanyFeatureSetToMap: function (featureSet) {
        //Create graphics layer for cities
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        // Flag icons are from http://twitter.com/thefella, released under creative commons.
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${NAME}</b>");
        template.setContent(Function.createDelegate(this, this.getWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);
        //map.reorderLayer(coLayer, 1);
        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded)
        var n = -1;
        //clone对象到oJson
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        //Add cities to the graphics layer
        var text = $get("inputSearch").value.trim();
        var layerDefinitions = [];
        var pstypeText = "";
        if (!$get("checkBox_power").checked) {
            pstypeText = "PSTYPE!='D' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
        }
        if (!$get("checkBox_water").checked) {
            if (pstypeText == "") {
                pstypeText = " PSTYPE not  like  '%S%'   and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
            else {
                pstypeText += " AND PSTYPE not  like  '%S%'    and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
        }
        if (!$get("checkBox_sewage").checked) {
            if (pstypeText == "") {
                pstypeText = "PSTYPE!='W' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
            else {
                pstypeText += " AND PSTYPE!='W' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
        }
        if (!$get("checkBox_gas").checked) {
            if (pstypeText == "") {
                pstypeText = " PSTYPE not  like  '%Q%' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
            else {
                pstypeText += " AND PSTYPE not  like  '%Q%' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
        }
        if (text != "" && text != null) {
            if (pstypeText == "") {
                pstypeText = "NAME LIKE '%" + text + "%' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
            else {
                pstypeText += " AND NAME LIKE '%" + text + "%' and POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
            }
        }
        layerDefinitions[1] = pstypeText;
        map.getLayer("ponitTextLayer").setLayerDefinitions(layerDefinitions);
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
                    return;
                }
            }
            if (!$get("checkBox_power").checked && feature.attributes.PSTYPE == "D") {
                return;
            }
            if (!$get("checkBox_water").checked && feature.attributes.PSTYPE == "S") {
                return;
            }
            if (!$get("checkBox_water").checked && feature.attributes.PSTYPE == "S,Q") {
                return;
            }
            if (!$get("checkBox_sewage").checked && feature.attributes.PSTYPE == "W") {
                return;
            }
            if (!$get("checkBox_gas").checked && feature.attributes.PSTYPE == "Q") {
                return;
            }
            if (!$get("checkBox_gas").checked && feature.attributes.PSTYPE == "S,Q") {
                return;
            }
            var companyObj = new Object();
            companyObj.id = feature.attributes.OBJECTID;
            companyObj.name = feature.attributes.NAME;
            companyObj.type = feature.attributes.PSTYPE;
            companyObj.pscode = feature.attributes.PSCODE;
            companyObj.x = feature.attributes.X;
            companyObj.y = feature.attributes.Y;
            companyObj.video = feature.attributes.VIDEO;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name == feature.attributes.CITY) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(companyObj);
            var symbol;
            switch (feature.attributes.PSTYPE) {
                case "W":
                    symbol = _ins.MarkerSymbol("darkorange_sewage");
                    break;
                case "S":
                    symbol = _ins.MarkerSymbol("darkorange_wastewater");
                    break;
                default:
                    symbol = _ins.MarkerSymbol("darkorange_wastegas");
                    break;
            }
            coLayer.add(feature.setSymbol(symbol));
        });
        this.__JsonCoObj = oJson;
        this.ObjectListShow();
        //var loading = new LoadingAnimation();
        //var loadingDiv = loading.createMin();
        //$get("companyListDiv").appendChild(loadingDiv);
        this.CreateCompanyList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showCompanyInfo));
        map.addLayer(coLayer);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }
    },
    //重点污染源地图点击事件
    showCompanyInfo: function (evt) {
        if (evt.graphic) {
            //if (evt.graphic.symbol.url != "Images/mapImages/point30_6.png") {
            //    return;
            //}
            if (this._graphic != null) {
                var blueSymbol;
                switch (this._graphic.attributes.PSTYPE) {
                    case "W":
                        blueSymbol = this.MarkerSymbol("darkorange_sewage");
                        break;
                    case "S":
                        blueSymbol = this.MarkerSymbol("darkorange_wastewater");
                        break;
                    default:
                        blueSymbol = this.MarkerSymbol("darkorange_wastegas");
                        break;
                }
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var gLayer = evt.graphic.getLayer();
            if (this._Outfall != null) {
                gLayer.remove(this._Outfall);
                this._Outfall = null;
            }
            if (this._Estuary != null) {
                gLayer.remove(this._Estuary);
                this._Estuary = null;
            }
            if (this._RiverPath != null) {
                gLayer.remove(this._RiverPath);
                this._RiverPath = null;
            }
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //map.infoWindow.show(evt.mapPoint);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}

        }
    },
    //重点污染源地图infoWindow内容
    getWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeft";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "关注程度：&nbsp;&nbsp;" + graphic.attributes["PROPERTY"];
        topLeftDiv.appendChild(topLeftDegree);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var btnInfo = document.createElement("div");
        btnInfo.className = "InfoWindowDetailBtn";
        btnInfo.innerHTML = "详细信息";
        btnInfo.setAttribute("cname", graphic.attributes["NAME"]);
        $addHandler(btnInfo, "click", Function.createDelegate(this, this.DetailInfoBtnClick));
        topRightDiv.appendChild(btnInfo);

        /* 2016年5月24日15:06:53 王岩松  添加动态获取企业照片
        电厂和污水厂实时动态获取照片
        一般废水 废气 没有照片
        */
        if (graphic.attributes["PSTYPE"] == "D" || graphic.attributes["PSTYPE"] == "W") {
            var middleDiv = document.createElement("div");
            middleDiv.className = "InfoWindowMiddle";
            middleDiv.innerHTML = "<img src='Images/IMG/" + graphic.attributes["PSCODE"] + ".png' style='width:100%;height:100%;'/>";
            infoWindow.appendChild(middleDiv);
        } else if (graphic.attributes["PSTYPE"] == "Q") { //废气照片  2016年9月21日17:52:21  王岩松
            var middleDiv = document.createElement("div");
            middleDiv.className = "InfoWindowMiddle";
            middleDiv.innerHTML = "<img src='Images/IMG/Q.jpg' style='width:100%;height:100%;'/>";
            infoWindow.appendChild(middleDiv);
        } else {
            var middleDiv = document.createElement("div"); //废水照片  2016年9月21日17:52:26  王岩松
            middleDiv.className = "InfoWindowMiddle";
            middleDiv.innerHTML = "<img src='Images/IMG/S.jpg' style='width:100%;height:100%;'/>";
            infoWindow.appendChild(middleDiv);
        }

        var timeDiv = document.createElement("div");
        timeDiv.className = "SuperviseTime";
        infoWindow.appendChild(timeDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowBottom";
        infoWindow.appendChild(bottomDiv);

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var table = document.createElement("table");
        table.className = "InfoWindowTable";
        bottomDiv.appendChild(table);

        varPscode = graphic.attributes.PSCODE;  //企业编码
        varPstype = graphic.attributes.PSTYPE;  //企业类型 D/电厂      W/污水厂     Q/一般废气     S/一般废水 
        var oJson = new Object();
        oJson.PSCODE = varPscode;
        oJson.PSTYPE = varPstype;
        localStorage.psCodeAndType = JSON.stringify(oJson);
        var urls = "ashx/ZDWRY/PointInfo.ashx?pscode=" + varPscode + "&pstype=" + varPstype;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);

                    var rows = table.getElementsByTagName("tr");

                    for (i = 0; i < rows.length; i++) {
                        if (i % 2 == 0) {
                            rows[i].className = "evenrowcolor";
                        } else {
                            rows[i].className = "oddrowcolor";
                        }
                    }
                    table.innerHTML = "";
                    if (varPstype == "D" || varPstype == "Q") {

                        table.innerHTML += " <tr ><td  rowspan='2'>  监 控 点</td><td colspan='2' align='center'>烟尘(mg/m³)</td><td colspan='2' align='center'>SO₂(mg/m³)</td><td colspan='2' align='center'>NOx(mg/m³)</td><td   align='center' rowspan='2'>流量(m³/h)</td></tr>  <tr><td> 折算值</td><td> 标准值</td><td> 折算值</td><td > 标准值</td><td>折算值</td><td> 标准值</td></tr>";

                        if (result == "" || result == null) {
                            table.innerHTML += "<tr><td colspan='8' align='center'> 暂时没有数据&nbsp;</td> </tr>";
                        } else {

                            var sj = "";
                            var sjtext = "";
                            for (i = 0; i < result.length; i++) {
                                sj = result[0].sj;
                                var varll = (Math.round(result[i].COUFLOWHOUR * 1000) / 1000).toFixed(0);
                                table.innerHTML += "<tr><td   align='left' >" + result[i].OUTPUTNAME + "</td><td  class='tdG'  align='right'>" + result[i].ITEMSTRENGTHZS1 + "</td><td  align='right'>" + result[i].ITEMSTRENGTHALARM1 + "</td><td class='tdG'  align='right' >" + result[i].ITEMSTRENGTHZS2 + "</td><td  align='right'>" + result[i].ITEMSTRENGTHALARM2 + "</td><td class='tdG'  align='right'>" + result[i].ITEMSTRENGTHZS3 + "</td><td  align='right'>" + result[i].ITEMSTRENGTHALARM3 + "</td><td   align='right'>" + varll + "</td></tr>";
                                if (sj < result[i].sj) {
                                    sj = result[i].sj;
                                    sjtext = result[i].MONITORTIME;
                                } else {
                                    sjtext = result[0].MONITORTIME;
                                }
                            }
                            timeDiv.innerHTML = "监测日期：" + sjtext;
                            if (result.length < 6) {
                                var r = 6 - result.length;
                                for (j = 0; j < r; j++) {
                                    table.innerHTML += "<tr><td   align='center'>&nbsp;</td><td  class='tdG'>&nbsp;</td><td>   &nbsp; </td><td class='tdG'>&nbsp;</td><td>&nbsp;</td><td class='tdG'>&nbsp;</td><td class='tdG'>&nbsp;</td><td class='tdG'>&nbsp;</td> </tr>";
                                }
                            }
                            rows = table.getElementsByTagName("tr");
                            for (i = 0; i < rows.length; i++) {
                                if (i % 2 == 0) {
                                    rows[i].className = "evenrowcolor";
                                } else {
                                    rows[i].className = "oddrowcolor";
                                }
                            }
                        }
                    }
                    else {
                        table.innerHTML += "<tr ><td   rowspan='2' align='left'> 监 控 点</td><td colspan='2' align='right' >COD(mg/l)</td><td colspan='2'align='right'> 氨氮(mg/l)</td><td align='right' rowspan='2'>  流 量(t/h)</td></tr>  <tr><td align='center' > 监测值</td><td align='center'> 标准值</td><td> 监测值</td><td> 标准值</td></tr>";
                        if (result == "" || result == null) {
                            table.innerHTML += "<tr><td colspan='6' align='center'> 暂时没有数据&nbsp;</td> </tr>";
                        } else {

                            var sj = "";
                            var sjtext = "";
                            var varcod = (Math.round(result[i].ITEMSTRENGTHALARM1 * 1000) / 1000).toFixed(2);
                            var varnn = (Math.round(result[i].ITEMSTRENGTHALARM2 * 1000) / 1000).toFixed(2);

                            for (i = 0; i < result.length; i++) {
                                sj = result[0].sj;
                                table.innerHTML += "<tr><td   align='left'>" + result[i].OUTPUTNAME + "</td><td  class='tdG'  align='right'>" + result[i].ITEMSTRENGTH1 + "</td><td  align='right'>" + varcod + "</td><td class='tdG'  align='right'>" + result[i].ITEMSTRENGTH2 + "</td><td  align='right'>" + varnn + "</td><td    align='right'>" + result[i].COUFLOWHOUR + "</td></tr>";
                                if (sj < result[i].sj) {
                                    sj = result[i].sj;
                                    sjtext = result[i].MONITORTIME;
                                } else {
                                    sjtext = result[0].MONITORTIME;
                                }
                                timeDiv.innerHTML = "监测日期：" + sjtext;
                            }
                            if (result.length < 6) {
                                var r = 6 - result.length;
                                for (j = 0; j < r; j++) {
                                    table.innerHTML += "<tr><td  align='center'>&nbsp;</td><td  class='tdG'>&nbsp;</td><td>   &nbsp; </td><td class='tdG'>&nbsp;</td><td>&nbsp;</td><td class='tdG'>&nbsp;</td> </tr>";
                                }
                            }
                            rows = table.getElementsByTagName("tr");
                            for (i = 0; i < rows.length; i++) {
                                if (i % 2 == 0) {
                                    rows[i].className = "evenrowcolor";
                                } else {
                                    rows[i].className = "oddrowcolor";
                                }
                            }
                        }
                    }
                }
                loading.hideMin();
            }

        }
        return infoWindow;
    },
    //污水企业出水口渲染
    addOutfallFeatureSetToMap: function (featureSet) {
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        if (featureSet.features.length > 0 && this._Outfall == null) {
            var symbol = this.MarkerSymbol("red");
            graphicsLayer.add(featureSet.features[0].setSymbol(symbol));
            this._Outfall = featureSet.features[0];
            map.centerAt(featureSet.features[0].geometry);
        }
    },
    //污水企业入河口渲染
    addEstuaryFeatureSetToMap: function (featureSet) {
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        if (featureSet.features.length > 0 && this._Estuary == null) {
            var symbol = this.MarkerSymbol("red");
            graphicsLayer.add(featureSet.features[0].setSymbol(symbol));
            this._Estuary = featureSet.features[0];
            map.centerAt(featureSet.features[0].geometry);
        }
    },
    //污水企业入河路径渲染
    addRiverPathFeatureSetToMap: function (featureSet) {
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        if (featureSet.features.length > 0 && this._RiverPath == null) {
            var symbol = new esri.symbol.SimpleLineSymbol(
                    esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                    new esri.Color([0, 0, 205]),
                    5);
            graphicsLayer.add(featureSet.features[0].setSymbol(symbol));
            this._RiverPath = featureSet.features[0];
            //map.centerAt(featureSet.features[0].geometry);
        }

    },
    //【出水口】按钮点击事件
    GotoOutfallClick: function (e) {
        var obj = JSON.parse(localStorage.psCodeAndType);
        this._typeCard = 2;
        var url = "http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/0/";
        this._whereStr = "PSCODE=" + obj.PSCODE + " and POINT='出水口'";
        this.queryObjList(url);
    },
    //【入河口】按钮点击事件
    GotoEstuaryClick: function (e) {
        var obj = JSON.parse(localStorage.psCodeAndType);
        this._typeCard = 3;
        var url = "http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/0/";
        this._whereStr = "PSCODE=" + obj.PSCODE + " and POINT='入河口'";
        this.queryObjList(url);
    },
    //【入河路径】按钮点击事件
    GotoRiverPathClick: function (e) {
        var obj = JSON.parse(localStorage.psCodeAndType);
        this._typeCard = 4;
        var url = "http://192.168.12.197:6080/arcgis/rest/services/Special/Riverpath/MapServer/0/";
        this._whereStr = "PSCODE=" + obj.PSCODE;
        this.queryObjList(url);
    },
    //重点污染源【详细信息】按钮点击事件
    DetailInfoBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var name;
        while (elem) {
            if (elem.className == "InfoWindowDetailBtn") {
                name = elem.attributes["cname"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var iframe = new PopWindow(610, 1100, name + " - 详细信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "ZDWYY/Info.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //重点污染源创建各市公司名称列表

    CreateCompanyList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name",  json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML =json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;家&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("type", json[o].children[i].type);
                li.setAttribute("pscode", json[o].children[i].pscode);
                li.setAttribute("x", json[o].children[i].x);
                li.setAttribute("y", json[o].children[i].y);
                $addHandler(li, "click", Function.createDelegate(this, this.CompanyBarClick))
                $addHandler(li, "mouseover", Function.createDelegate(this, this.ShowTitle))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";

                //当存在 视频监控的时候显示不同的图标 0 没有视频，1含有视频 王岩松  2017年3月16日15:00:09   
                if (json[o].children[i].video==0) {
                    coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                } else {
                    coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/video_qy.png' class='coImg' />";
                }
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);
                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }

        var vartotal = "627";
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=0&pstype=ALL",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                vartotal = eval('(' + data[0].dtotal + ')');
                objCityTop1.innerHTML = "全省重点污染源自动监控企业（" + vartotal + "家）";
            }
        });

        var loading = new LoadingAnimation();
        loading.hide();
    },
    //定位城市所有公司按钮【click】事件
    ObjLocationBtnClick: function (evt) {

    },

    //显示出企业的全部名称
    ShowTitle: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                //elem.style.background = "#666666";
                //var coTextDiv = document.createElement("div");
                //coTextDiv.id = "" + psCode + ""
                //var objDiv = "#" + psCode + "";     
                //$(objDiv).css("width", "200px");
                //$(objDiv).css("height", "200px");
                //$(objDiv).css("display", "block");
                //$(objDiv).css("left", event.clientX);
                //$(objDiv).css("top", event.clientY + 10);
                //$(objDiv).css("z-Index", 9999);//9999保证是最大即可

                // Window.appendChild(coTextDiv);
               break;
            }
            elem = elem.parentNode;
        }
    },
    //点击公司定位【click】事件
    CompanyBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.PSCODE == psCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["PSCODE"] == psCode) {
                if (_ins._graphic != null) {
                    var blueSymbol;
                    switch (_ins._graphic.attributes.PSTYPE) {
                        case "W":
                            blueSymbol = _ins.MarkerSymbol("darkorange_sewage");
                            break;
                        case "S":
                            blueSymbol = _ins.MarkerSymbol("darkorange_wastewater");
                            break;
                        default:
                            blueSymbol = _ins.MarkerSymbol("darkorange_wastegas");
                            break;
                    }
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                if (_ins._Outfall != null) {
                    gLayer.remove(_ins._Outfall);
                    _ins._Outfall = null;
                }
                if (_ins._Estuary != null) {
                    gLayer.remove(_ins._Estuary);
                    _ins._Estuary = null;
                }
                if (_ins._RiverPath != null) {
                    gLayer.remove(_ins._RiverPath);
                    _ins._RiverPath = null;
                }
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() > 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
            }
        });
    },
    //城市空气渲染
    addCityAirFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        // Flag icons are from http://twitter.com/thefella, released under creative commons.
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${STATIONNAM}</b>");
        template.setContent(Function.createDelegate(this, this.getAirWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }
        //map.reorderLayer(coLayer, 1);
        var n = -1;
        //clone对象到oJson
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        //Add cities to the graphics layer
        var text = $get("inputSearch").value.trim();
        var layerDefinitions = [];
        var pstypeText = "";
        if (!$get("checkBox_city").checked) {
            pstypeText = "ISON!='0'";
        }
        if (!$get("checkBox_county").checked) {
            if (pstypeText == "") {
                pstypeText = "PSTYPE!='1'";
            }
            else {
                pstypeText += " AND PSTYPE!='1'";
            }
        }
        if (text != "" && text != null) {
            if (pstypeText == "") {
                pstypeText = "STATIONNAM LIKE '%" + text + "%'";
            }
            else {
                pstypeText += " AND STATIONNAM LIKE '%" + text + "%'";
            }
        }
        layerDefinitions[0] = pstypeText;
        map.getLayer("ponitTextLayer").setLayerDefinitions(layerDefinitions);
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.STATIONNAM.indexOf(text) < 0) {
                    return;
                }
            }
            if (!$get("checkBox_city").checked && feature.attributes.ISON == "0") {
                return;
            }
            if (!$get("checkBox_county").checked && feature.attributes.ISON == "1") {
                return;
            }
            var airObj = new Object();
            airObj.id = feature.attributes.OBJECTID;
            airObj.name = feature.attributes.STATIONNAM;
            airObj.stationcode = feature.attributes.STATIONCOD;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name == feature.attributes.CITYNAME) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(airObj);
            var symbol = _ins.MarkerSymbol("skyblue");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        //this.__JsonCoObj = oJson;
        this.ObjectListShow();
        this.CreateAirCityList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showAirCityInfo));
    },
    //城市空气站点点击事件【地图】
    showAirCityInfo: function (evt) {
        if (evt.graphic) {

            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("skyblue");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            map.centerAt(evt.mapPoint);
        }
    },
    //加载城市空气InfoWindow内容
    getAirWindowContent: function (graphic) {

        if (graphic.attributes["ISON"] == "0") {
            var infoWindow = document.createElement("div");
            infoWindow.className = "InfoWindowCSS";

            var topDiv = document.createElement("div");
            topDiv.className = "InfoWindowTop";
            infoWindow.appendChild(topDiv);

            var topLeftDiv = document.createElement("div");
            topLeftDiv.className = "InfoWindowTopLeft";
            topDiv.appendChild(topLeftDiv);

            var topLeftCity = document.createElement("div");
            topLeftCity.className = "InfoWindowLeftIn";
            topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITYNAME"];
            topLeftDiv.appendChild(topLeftCity);

            var topLeftDegree = document.createElement("div");
            topLeftDegree.className = "InfoWindowLeftIn";
            topLeftDegree.innerHTML = "站点类型：&nbsp;&nbsp;" + graphic.attributes["NATURENAME"];
            topLeftDiv.appendChild(topLeftDegree);

            var topRightDiv = document.createElement("div");
            topRightDiv.className = "InfoWindowTopRight";
            topDiv.appendChild(topRightDiv);

            var btnInfo = document.createElement("div");
            btnInfo.className = "InfoWindowDetailBtn";
            btnInfo.innerHTML = "详细信息";
            btnInfo.setAttribute("cname", graphic.attributes["STATIONNAM"]);
            $addHandler(btnInfo, "click", Function.createDelegate(this, this.AirDetailInfoBtnClick));
            topRightDiv.appendChild(btnInfo);

            var timeDiv = document.createElement("div");
            timeDiv.className = "SuperviseTitle";
            timeDiv.innerHTML = "实时监测数据";
            infoWindow.appendChild(timeDiv);


            var divAqiShow = document.createElement("div");
            divAqiShow.className = "InfoWindowCityAirShow";
            infoWindow.appendChild(divAqiShow);
            var table = document.createElement("table");
            //table.className = "InfoWindowTable";
            divAqiShow.appendChild(table);


            var bottomDiv = document.createElement("div");
            bottomDiv.className = "InfoWindowBottom1";
            infoWindow.appendChild(bottomDiv);

            this.CreateLineInDiv(bottomDiv, "PM10", "divPM10Value", "PM2.5", "divPM25Value");
            this.CreateLineInDiv(bottomDiv, "臭氧", "divOzoneValue", "二氧化硫", "divSO2Value");
            this.CreateLineInDiv(bottomDiv, "一氧化碳", "divNOValue", "二氧化氮", "divNO2Value");

            var loading = new LoadingAnimation();
            var loadingDiv = loading.createMin();
            bottomDiv.appendChild(loadingDiv);

            var stationcode = graphic.attributes.STATIONCOD;  //站点编码
            localStorage.airCityStationCode = stationcode;
            var urls = "ashx/CSKQ/GasKqshishishujuJson.ashx?citycode=" + stationcode;
            var _ins = this;
            var xmlhttp = window.Mirs.Gis.Global.creq();
            xmlhttp.open("GET", urls, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {

                        var rows = table.getElementsByTagName("tr");
                        var result = JSON.parse(xmlhttp.responseText);
                        if (result.length > 0) {
                            if (result[0].JSONSTIME_NAME.length != 0) {
                                timeDiv.innerHTML = "监测日期：" + result[0].JSONSTIME_NAME;
                            }
                            else {
                                timeDiv.innerHTML = "监测日期：无"
                            }
                            if (result[0].JSONPHS.length != 0) {
                                $get("divPM10Value").innerHTML = (Math.round(result[0].JSONPHS * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divPM10Value").innerHTML = "-";
                            }
                            if (result[0].JSONPHESW.length != 0) {
                                $get("divPM25Value").innerHTML = (Math.round(result[0].JSONPHESW * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divPM25Value").innerHTML = "-";
                            }
                            if (result[0].JSONCY.length != 0) {
                                $get("divOzoneValue").innerHTML = (Math.round(result[0].JSONCY * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divOzoneValue").innerHTML = "-";
                            }
                            if (result[0].JSONSO2.length != 0) {
                                $get("divSO2Value").innerHTML = (Math.round(result[0].JSONSO2 * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divSO2Value").innerHTML = "-";
                            }
                            if (result[0].JSONCO.length != 0) {
                                $get("divNOValue").innerHTML = (Math.round(result[0].JSONCO * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divNOValue").innerHTML = "-";
                            }
                            if (result[0].JSONNO2.length != 0) {
                                $get("divNO2Value").innerHTML = (Math.round(result[0].JSONNO2 * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divNO2Value").innerHTML = "-";
                            }

                            var trClass = "td1";
                            if (result[0].ZL == "优") {
                                trClass = "td1";

                            } else if (result[0].ZL == "良") {
                                trClass = "td2";
                            }
                            else if (result[0].ZL == "轻度污染") {
                                trClass = "td3";
                            }
                            else if (result[0].ZL == "中度污染") {
                                trClass = "td4";
                            }
                            else if (result[0].ZL == "重度污染") {
                                trClass = "td5";
                            }
                            else if (result[0].ZL == "严重污染") {
                                trClass = "td6";
                            }
                            else {
                                trClass = "td0";
                            }
                            table.innerHTML += "<tr ><td   text-align='right'   > &nbsp;&nbsp;AQI：</td><td    >&nbsp;" + result[0].AQI + "</td><td     text-align='right'    >&nbsp;&nbsp;&nbsp;&nbsp;空气质量：</td><td   class='" + trClass + "'  text-align='center'>" + result[0].ZL + "</td><td  align='right'      >&nbsp;&nbsp;&nbsp;首要污染物：</td><td   >&nbsp;&nbsp;" + result[0].WRY + "</td> </tr>";
                            //rows[0].className = "oddrowcolor";
                        }
                    }
                    loading.hideMin();
                }

            }

        } else {
            var infoWindow = document.createElement("div");
            infoWindow.className = "InfoWindowCSS";

            var topDiv = document.createElement("div");
            topDiv.className = "InfoWindowTop";
            infoWindow.appendChild(topDiv);

            var topLeftDiv = document.createElement("div");
            topLeftDiv.className = "InfoWindowTopLeft";
            topDiv.appendChild(topLeftDiv);

            var topLeftCity = document.createElement("div");
            topLeftCity.className = "InfoWindowLeftIn";
            topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITYNAME"];
            topLeftDiv.appendChild(topLeftCity);

            var topLeftDegree = document.createElement("div");
            topLeftDegree.className = "InfoWindowLeftIn";
            topLeftDegree.innerHTML = "站点类型：&nbsp;&nbsp;" + graphic.attributes["NATURENAME"];
            topLeftDiv.appendChild(topLeftDegree);

            var topRightDiv = document.createElement("div");
            topRightDiv.className = "InfoWindowTopRight";
            topDiv.appendChild(topRightDiv);

            var btnInfo = document.createElement("div");
            btnInfo.className = "InfoWindowDetailBtn";
            btnInfo.innerHTML = "详细信息";
            btnInfo.setAttribute("cname", graphic.attributes["STATIONNAM"]);
            $addHandler(btnInfo, "click", Function.createDelegate(this, this.AirDetailInfoBtnClick));
            topRightDiv.appendChild(btnInfo);

            var timeDiv = document.createElement("div");
            timeDiv.className = "SuperviseTitle";
            timeDiv.innerHTML = "实时监测数据";
            infoWindow.appendChild(timeDiv);
            var bottomDiv = document.createElement("div");
            bottomDiv.className = "InfoWindowBottom1";
            infoWindow.appendChild(bottomDiv);

            this.CreateLineInDiv(bottomDiv, "PM10", "divPM10Value", "PM2.5", "divPM25Value");
            this.CreateLineInDiv(bottomDiv, "臭氧", "divOzoneValue", "二氧化硫", "divSO2Value");
            this.CreateLineInDiv(bottomDiv, "一氧化碳", "divNOValue", "二氧化氮", "divNO2Value");

            var loading = new LoadingAnimation();
            var loadingDiv = loading.createMin();
            bottomDiv.appendChild(loadingDiv);

            var stationcode = graphic.attributes.STATIONCOD;  //站点编码
            localStorage.airCityStationCode = stationcode;
            var urls = "ashx/CSKQ/GasKqshishishujuJson.ashx?citycode=" + stationcode;
            var _ins = this;
            var xmlhttp = window.Mirs.Gis.Global.creq();
            xmlhttp.open("GET", urls, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {

                        var result = JSON.parse(xmlhttp.responseText);
                        if (result.length > 0) {
                            if (result[0].JSONSTIME_NAME.length != 0) {
                                timeDiv.innerHTML = "监测日期：" + result[0].JSONSTIME_NAME;
                            }
                            else {
                                timeDiv.innerHTML = "监测日期：无"
                            }
                            if (result[0].JSONPHS.length != 0) {
                                $get("divPM10Value").innerHTML = (Math.round(result[0].JSONPHS * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divPM10Value").innerHTML = "-";
                            }
                            if (result[0].JSONPHESW.length != 0) {
                                $get("divPM25Value").innerHTML = (Math.round(result[0].JSONPHESW * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divPM25Value").innerHTML = "-";
                            }
                            if (result[0].JSONCY.length != 0) {
                                $get("divOzoneValue").innerHTML = (Math.round(result[0].JSONCY * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divOzoneValue").innerHTML = "-";
                            }
                            if (result[0].JSONSO2.length != 0) {
                                $get("divSO2Value").innerHTML = (Math.round(result[0].JSONSO2 * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divSO2Value").innerHTML = "-";
                            }
                            if (result[0].JSONCO.length != 0) {
                                $get("divNOValue").innerHTML = (Math.round(result[0].JSONCO * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divNOValue").innerHTML = "-";
                            }
                            if (result[0].JSONNO2.length != 0) {
                                $get("divNO2Value").innerHTML = (Math.round(result[0].JSONNO2 * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;" + "mg/m³";
                            }
                            else {
                                $get("divNO2Value").innerHTML = "-";
                            }
                        }
                    }
                    loading.hideMin();
                }
            }
        }



        return infoWindow;
    },
    //城市空气InfoWindow【详细信息】点击事件
    AirDetailInfoBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var name;
        while (elem) {
            if (elem.className == "InfoWindowDetailBtn") {
                name = elem.attributes["cname"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var iframe = new PopWindow(610, 1100, name + " - 详细信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "CSKQ/CskqInfo.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建数据表格
    CreateLineInDiv: function (oParent, text_1, id_1, text_2, id_2) {
        var div1 = document.createElement("div");
        div1.className = "tableLine";
        oParent.appendChild(div1);

        var div2 = document.createElement("div");
        div2.className = "tableLineBar";
        div2.innerHTML = text_1;
        div1.appendChild(div2);

        var div3 = document.createElement("div");
        div3.className = "tableLineBars";
        div3.id = id_1;
        div1.appendChild(div3);

        var div4 = document.createElement("div");
        div4.className = "tableLineBar";
        div4.innerHTML = text_2;
        div1.appendChild(div4);

        var div5 = document.createElement("div");
        div5.className = "tableLineBarLasts";
        div5.id = id_2;
        div1.appendChild(div5);
    },
    //加载城市空气对象列表
    CreateAirCityList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("stationcode", json[o].children[i].stationcode);
                $addHandler(li, "click", Function.createDelegate(this, this.AirCityBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;"+ "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }

        var vartotal = "288";
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=1&pstype=ALL",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                vartotal = eval('(' + data[0].dtotal + ')');
                objCityTop1.innerHTML = "全省空气自动监控站（" + vartotal + "个）";
            }
        });

        var loading = new LoadingAnimation();
        loading.hide();
    },
    //城市空气站点点击事件【列表】
    AirCityBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["stationcode"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.STATIONCOD == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["STATIONCOD"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("skyblue");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
            }
        });
    },
    //饮用水
    addDrinkWaterFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        // Flag icons are from http://twitter.com/thefella, released under creative commons.
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${SITENAME}</b>");
        template.setContent(Function.createDelegate(this, this.getDrinkWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        //clone对象到oJson
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        //Add cities to the graphics layer
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.SITENAME.indexOf(text) < 0) {
                    return;
                }
            }
            var drinkObj = new Object();
            drinkObj.id = feature.attributes.OBJECTID;
            drinkObj.name = feature.attributes.SITENAME;
            drinkObj.sitecode = feature.attributes.SITENO;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name == feature.attributes.CITY) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(drinkObj);
            var symbol = _ins.MarkerSymbol("blue");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        //this.__JsonCoObj = oJson;
        this.ObjectListShow();
        this.CreateDrinkWaterList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showDrinkWaterInfo));
    },
    //饮用水站点点击事件【地图】
    showDrinkWaterInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("blue");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载饮用水InfoWindow内容
    getDrinkWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeft";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftInOne";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var btnInfo = document.createElement("div");
        btnInfo.className = "InfoWindowDetailBtn";
        btnInfo.innerHTML = "详细信息";
        btnInfo.setAttribute("cname", graphic.attributes["SITENAME"]);
        $addHandler(btnInfo, "click", Function.createDelegate(this, this.DrinkDetailInfoBtnClick));
        topRightDiv.appendChild(btnInfo);

        var timeDiv = document.createElement("div");
        timeDiv.className = "SuperviseTitle";

        infoWindow.appendChild(timeDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowBottom1";
        infoWindow.appendChild(bottomDiv);

        this.CreateLineInDiv(bottomDiv, "生物毒性(%)", "divViruValue", "总磷(mg/l)", "divTPalue");
        this.CreateLineInDiv(bottomDiv, "溶解氧(mg/l)", "divDisOValue", "高锰酸盐指数", "divKMnOValue");
        this.CreateLineInDiv(bottomDiv, "氨氮(mg/l)", "divNHNValue", "总氮(mg/l)", "divTNValue");

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.SITENO;  //站点编码
        var varx = graphic.attributes.X;  //站点编码
        var vary = graphic.attributes.Y;  //站点编码
        localStorage.drinkWaterSiteCode = sitecode;
        localStorage.drinkWaterx = varx;
        localStorage.drinkWatery = vary;
        var urls = "ashx/YYSYD/GasYysshishishujuJson.ashx?sitecode=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    if (result[0].JSONGENTIME.length != 0) {
                        timeDiv.innerHTML = "监测日期：" + result[0].JSONGENTIME[0];
                    }
                    else {
                        timeDiv.innerHTML = "监测日期：-";
                    }
                    if (result[0].JSONItem01.length != 0) {
                        $get("divViruValue").innerHTML = (Math.round(result[0].JSONItem01[0] * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divViruValue").innerHTML = "-";
                    }
                    if (result[0].JSONItem02.length != 0) {
                        $get("divTPalue").innerHTML = (Math.round(result[0].JSONItem02[0] * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divTPalue").innerHTML = "-";
                    }
                    if (result[0].JSONItem07.length != 0) {
                        $get("divDisOValue").innerHTML = (Math.round(result[0].JSONItem07[0] * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divDisOValue").innerHTML = "-";
                    }
                    if (result[0].JSONItem08.length != 0) {
                        $get("divKMnOValue").innerHTML = (Math.round(result[0].JSONItem08[0] * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divKMnOValue").innerHTML = "-";
                    }
                    if (result[0].JSONItem09.length != 0) {
                        $get("divNHNValue").innerHTML = (Math.round(result[0].JSONItem09[0] * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divNHNValue").innerHTML = "-";
                    }
                    if (result[0].JSONItem10.length != 0) {
                        $get("divTNValue").innerHTML = (Math.round(result[0].JSONItem10[0] * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divTNValue").innerHTML = "-";
                    }
                }
                loading.hideMin();
            }

        }
        return infoWindow;
    },
    //饮用水【详细信息】点击事件
    DrinkDetailInfoBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var name;
        while (elem) {
            if (elem.className == "InfoWindowDetailBtn") {
                name = elem.attributes["cname"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var iframe = new PopWindow(610, 1100, name + " - 详细信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "YYSYD/YysydInfo.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建饮用水站点列表
    CreateDrinkWaterList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("sitecode", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.DrinkWaterBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省饮用水源地自动站（" + coAll + "个）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //饮用水站点点击事件【列表】
    DrinkWaterBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["sitecode"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.SITENO == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["SITENO"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("blue");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["SITENAME"] + "</b>");
                //var div = _ins.getDrinkWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
                //map.infoWindow.reposition();
            }
        });
    },
    //地表水
    addSurfaceWaterFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        // Flag icons are from http://twitter.com/thefella, released under creative commons.
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${SITENAME}</b>");
        template.setContent(Function.createDelegate(this, this.getSurfaceWaterWindowContent));
        coLayer.setInfoTemplate(template);

        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }
        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        //Add cities to the graphics layer
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.SITENAME.indexOf(text) < 0) {
                    return;
                }
            }
            var surfaceObj = new Object();
            surfaceObj.id = feature.attributes.OBJECTID;
            surfaceObj.name = feature.attributes.SITENAME;
            surfaceObj.sitecode = feature.attributes.SITENO;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.DISTRICT) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(surfaceObj);
            var symbol = _ins.MarkerSymbol("seagreen");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        //this.__JsonCoObj = oJson;
        this.ObjectListShow();
        this.CreateSurfaceWaterCityList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showSurfaceWaterCityInfo));
    },
    //地表水点位点击事件【地图】
    showSurfaceWaterCityInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("seagreen");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载地表水InfoWindow内容
    getSurfaceWaterWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeft";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["DISTRICT"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "站点类型：&nbsp;&nbsp;" + graphic.attributes["SITEAUTHOR"];
        topLeftDiv.appendChild(topLeftDegree);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var btnInfo = document.createElement("div");
        btnInfo.className = "InfoWindowDetailBtn";
        btnInfo.innerHTML = "详细信息";
        btnInfo.setAttribute("cname", graphic.attributes["SITENAME"]);
        $addHandler(btnInfo, "click", Function.createDelegate(this, this.SurfaceDetailInfoBtnClick));
        topRightDiv.appendChild(btnInfo);

        var timeDiv = document.createElement("div");
        timeDiv.className = "SuperviseTitle";
        timeDiv.innerHTML = "监测日期：-";
        infoWindow.appendChild(timeDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowBottom1";
        infoWindow.appendChild(bottomDiv);

        //this.CreateLineInDiv(bottomDiv, "PH值", "divPHValue", "浊度", "divTPValue");
        //this.CreateLineInDiv(bottomDiv, "溶解氧", "divDisOValue", "COD", "divTOCValue");
        //this.CreateLineInDiv(bottomDiv, "氨氮", "divNHNValue", "总氮", "divTNValue");

        this.CreateLineInDiv(bottomDiv, "PH值", "divPH", "水温（℃）", "divWD");
        this.CreateLineInDiv(bottomDiv, "溶解氧（%）", "divYJY", "浊度（NTU）", "divZD");
        this.CreateLineInDiv(bottomDiv, "COD（mg/l）", "divCOD", "氨氮（mg/l）", "divNN");

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.SITENO;  //站点编码
        localStorage.serfaceWaterSiteCode = sitecode;
        var urls = "ashx/Dbs/GasDbshishishujuJson.ashx?siteinfoid=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    if (result[0].JSONrecordtime.length != 0) {
                        timeDiv.innerHTML = "监测日期：" + result[0].JSONrecordtime[0];
                    }
                    else {
                        timeDiv.innerHTML = "监测日期：-";
                    }
                    if (result[0].JSONf11.length != 0 && result[0].JSONf11[0] != "0") {
                        $get("divPH").innerHTML = (Math.round(result[0].JSONf11[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divPH").innerHTML = "-";
                    }
                    if (result[0].JSONf12.length != 0 && result[0].JSONf12[0] != "0") {
                        $get("divWD").innerHTML = (Math.round(result[0].JSONf12[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divWD").innerHTML = "-";
                    }
                    if (result[0].JSONf13.length != 0 && result[0].JSONf13[0] != "0") {
                        $get("divYJY").innerHTML = (Math.round(result[0].JSONf13[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divYJY").innerHTML = "-";
                    }
                    if (result[0].JSONf14.length != 0 && result[0].JSONf14[0] != "0") {
                        $get("divZD").innerHTML = (Math.round(result[0].JSONf14[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divZD").innerHTML = "-";
                    }
                    if (result[0].JSONf16.length != 0 && result[0].JSONf16[0] != "0") {
                        $get("divCOD").innerHTML = (Math.round(result[0].JSONf16[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divCOD").innerHTML = "-";
                    }
                    if (result[0].JSONf17.length != 0 && result[0].JSONf17[0] != "0") {
                        $get("divNN").innerHTML = (Math.round(result[0].JSONf17[0] * 100) / 100).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divNN").innerHTML = "-";
                    }
                }
                loading.hideMin();
            }

        }
        return infoWindow;
    },
    //地表水【详细信息】点击事件
    SurfaceDetailInfoBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var name;
        while (elem) {
            if (elem.className == "InfoWindowDetailBtn") {
                name = elem.attributes["cname"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var iframe = new PopWindow(610, 1100, name + " - 详细信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "DBS/DbsInfo.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建地表水站点列表
    CreateSurfaceWaterCityList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("sitecode", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.SurfaceWaterBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省地表水自动站（72个）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //地表水站点点击事件【列表】
    SurfaceWaterBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["sitecode"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.SITENO == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["SITENO"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("seagreen");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["SITENAME"] + "</b>");
                //var div = _ins.getSurfaceWaterWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
                //map.infoWindow.reposition();
            }
        });
    },
    //综合整治区域环境质量
    addSynthesizeFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        // Flag icons are from http://twitter.com/thefella, released under creative commons.
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${SITENAME}</b>");
        template.setContent(Function.createDelegate(this, this.getSynthesizeWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        //Add cities to the graphics layer
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.SITENAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.name = feature.attributes.SITENAME;
            synObj.sitecode = feature.attributes.SITEID;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.CITYNAME) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("skyblue");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        //this.__JsonCoObj = oJson;
        this.ObjectListShow();
        this.CreateSynthesizeList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showSynthesizeInfo));
    },
    //综合整治区域环境质量点位点击事件【地图】
    showSynthesizeInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("skyblue");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载综合整治区域环境质量InfoWindow内容
    getSynthesizeWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeft";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITYNAME"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "区域类型：&nbsp;&nbsp;" + graphic.attributes["SITETYPENA"];
        topLeftDiv.appendChild(topLeftDegree);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var btnInfo = document.createElement("div");
        btnInfo.className = "InfoWindowDetailBtn";
        btnInfo.innerHTML = "详细信息";
        btnInfo.setAttribute("cname", graphic.attributes["SITENAME"]);
        $addHandler(btnInfo, "click", Function.createDelegate(this, this.SynthesizeDetailInfoBtnClick));
        topRightDiv.appendChild(btnInfo);

        var timeDiv = document.createElement("div");
        timeDiv.className = "SuperviseTitle";
        timeDiv.innerHTML = "监测日期：-";
        infoWindow.appendChild(timeDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowBottom1";
        infoWindow.appendChild(bottomDiv);

        this.CreateLineInDiv(bottomDiv, "PM10(mg/m³)", "divMP10Value", "SO₂(mg/m³)", "divSO2Value");
        this.CreateLineInDiv(bottomDiv, "NO(mg/m³)", "divNOValue", "NO₂(mg/m³)", "divNO2Value");
        //this.CreateLineInDiv(bottomDiv, "", "", "", "");

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.SITEID;  //站点编码
        var varx = graphic.attributes.XCOORDINAT;  //x
        var vary = graphic.attributes.YCOORDINAT;  //y
        localStorage.synthesizeSiteCode = sitecode;
        localStorage.synthesizeSitex = varx;
        localStorage.synthesizeSitey = vary;
        var urls = "ashx/ZHZZ/GasZhShishishujuJson.ashx?siteid=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    if (result[0].JSONDATATIME.length != 0) {
                        timeDiv.innerHTML = "监测日期：" + result[0].JSONDATATIME;
                    }
                    else {
                        timeDiv.innerHTML = "监测日期：-";
                    }
                    if (result[0].JSONPM10.length != 0) {
                        $get("divMP10Value").innerHTML = (Math.round(result[0].JSONPM10 * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divMP10Value").innerHTML = "-";
                    }
                    if (result[0].JSONSO2.length != 0) {
                        $get("divSO2Value").innerHTML = (Math.round(result[0].JSONSO2 * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divSO2Value").innerHTML = "-";
                    }
                    if (result[0].JSONNO.length != 0) {
                        $get("divNOValue").innerHTML = (Math.round(result[0].JSONNO * 1000) / 1000).toFixed(3) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divNOValue").innerHTML = "-";
                    }
                    if (result[0].JSONNO2.length != 0) {
                        $get("divNO2Value").innerHTML = (Math.round(result[0].JSONNO2 * 1000) / 1000).toFixed(2) + "&nbsp;&nbsp;";
                    }
                    else {
                        $get("divNO2Value").innerHTML = "-";
                    }
                }
                loading.hideMin();
            }

        }
        return infoWindow;
    },
    //综合整治区域环境质量【详细信息】点击事件
    SynthesizeDetailInfoBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var name;
        while (elem) {
            if (elem.className == "InfoWindowDetailBtn") {
                name = elem.attributes["cname"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var iframe = new PopWindow(610, 1100, name + " - 详细信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "ZHZZ/ZhzzInfo.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建综合整治区域环境质量站点列表
    CreateSynthesizeList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("sitecode", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.SynthesizeBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省重点区域自动监控站（" + coAll + "个）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //综合整治区域环境质量站点点击事件【列表】
    SynthesizeBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["sitecode"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.SITEID == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["SITEID"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("skyblue");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["SITENAME"] + "</b>");
                //var div = _ins.getSynthesizeWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
                //map.infoWindow.reposition();
            }
        });
    },

    //环境管理-环评审批 2016年6月14日20:12:28  王岩松
    addApprovalFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${ENPNAME}</b>");
        template.setContent(Function.createDelegate(this, this.getApprovalWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.ENPNAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.name = feature.attributes.ENPNAME;
            synObj.sitecode = feature.attributes.ENPCODE;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.CITY) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("blueviolet");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreateApprovalList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showApprovalInfo));
    },
    //环境管理-环评审批 点位点击事件【地图】 2016年6月14日20:12:28  王岩松
    showApprovalInfo: function (evt) {
        if (evt.graphic) {
            if (map.getLayer("approvalLayer")) {
                map.removeLayer(map.getLayer("approvalLayer"));
            }
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("blueviolet");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载环境管理-环评审批  InfoWindow内容     2016年6月14日20:12:28  王岩松
    getApprovalWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeft";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "企业类型：&nbsp;" + graphic.attributes["INTYPENAME"];
        topLeftDiv.appendChild(topLeftDegree);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowjsxm";
        bottomDiv.id = "infoWindowBottomDiv";
        infoWindow.appendChild(bottomDiv);

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.ENPCODE;  //站点编码
        var objid = graphic.attributes.OBJECTID;  //站点编码
        localStorage.ENPCODE = sitecode;

        var urls = "ashx/HJGL/EnterriseApproval.ashx?sitecode=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);

                    var bottomDivTitle = document.createElement("div");
                    bottomDivTitle.className = "InfoWindowBottomBar";
                    bottomDiv.appendChild(bottomDivTitle);

                    //var bottomTitleRight = document.createElement("div");
                    //bottomTitleRight.className = "InfoWindowBottomBarRight";
                    //bottomTitleRight.innerHTML = "查看";
                    //bottomDivTitle.appendChild(bottomTitleRight);

                    var bottomTitleLift = document.createElement("div");
                    bottomTitleLift.className = "InfoWindowBottomBarLeft";
                    bottomTitleLift.innerHTML = "环评审批建设项目";
                    bottomDivTitle.appendChild(bottomTitleLift);

                    if (result == "" || result == null) {
                        var bottomDivBar = document.createElement("div");
                        bottomDivBar.className = "InfoWindowBottomBar";
                        bottomDivBar.innerHTML = "暂时没有数据";
                        bottomDiv.appendChild(bottomDivBar);
                    }
                    else {
                        for (i = 0; i < result.length; i++) {
                            var bottomTextBarDiv = document.createElement("div");
                            bottomTextBarDiv.className = "bottomTextBar";
                            bottomDiv.appendChild(bottomTextBarDiv);

                            //var bottomTextBarRight = document.createElement("div");
                            //bottomTextBarRight.className = "bottomTextBarRight";
                            //bottomTextBarRight.id = "YXQY_" + result[i].id;
                            //bottomTextBarRight.setAttribute("name", objid);
                            //bottomTextBarRight.innerHTML = "<span style='color:green;text-decoration:underline;cursor:pointer;' > 影响区域 </span >";
                            //$addHandler(bottomTextBarRight, "click", Function.createDelegate(_ins, _ins.ApprovalDrawBtnClick));
                            //bottomTextBarDiv.appendChild(bottomTextBarRight);

                            var bottomTextBarLeft = document.createElement("div");
                            bottomTextBarLeft.className = "bottomTextBarLeft";
                            bottomTextBarLeft.id = "HJGL_" + result[i].id;
                            bottomTextBarLeft.setAttribute("name", result[i].id);
                            bottomTextBarDiv.appendChild(bottomTextBarLeft);

                            var bottomTextBarLeftIn = document.createElement("div");
                            bottomTextBarLeftIn.className = "bottomTextBarLeftIn";
                            bottomTextBarLeftIn.title = result[i].itemname;
                            bottomTextBarLeftIn.innerHTML = " <span style='color:#00F;text-decoration:underline;cursor:pointer;' >" + result[i].itemname + " </span >";
                            $addHandler(bottomTextBarLeftIn, "click", Function.createDelegate(_ins, _ins.ApprovalDetailInfoBtnClick));
                            bottomTextBarLeft.appendChild(bottomTextBarLeftIn);
                        }
                    }
                }
                loading.hideMin();
            }
        }
        return infoWindow;
    },
    //加载环境管理-环评审批   【详细信息】点击事件        2016年6月14日20:12:28  王岩松
    ApprovalDetailInfoBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id;
        while (elem) {
            if (elem.id) {
                id = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var oJson = new Object();
        oJson.ID = id;
        localStorage.ENPIDS = id;
        //localStorage.psCodeAndType = JSON.stringify(oJson);

        var iframe = new PopWindow(610, 1100, "环评审批信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "HJGL/Huanpingshenpi.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建环境管理-环评审批站点列表               2016年6月14日20:12:28  王岩松
    CreateApprovalList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;家&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("ENPCODE", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.ApprovalBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省环评审批企业（" + coAll + "家）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //  环境管理-环评审批站点点击事件【列表】        2016年6月14日20:12:28  王岩松
    ApprovalBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["ENPCODE"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        if (map.getLayer("approvalLayer")) {
            map.removeLayer(map.getLayer("approvalLayer"));
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.ENPCODE == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["ENPCODE"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("blueviolet");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["ENPNAME"] + "</b>");
                //var div = _ins.getApprovalWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
            }
        });
    },
    //  环境管理-环评审批  影响区域  2016年6月28日21:08:21 王岩松  
    ApprovalDrawBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        while (elem) {
            if (elem.className == "bottomTextBarRight") {
                stationCode = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        //var obj = JSON.parse(localStorage.psCodeAndType);
        var url = "http://192.168.12.197:6080/arcgis/rest/services/Special/FinalSite/MapServer/0/";
        var coQueryTask = new esri.tasks.QueryTask(url);
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = true;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "OBJECTID =" + stationCode;
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.addApprovalExtentToMap));
    },
    addApprovalExtentToMap: function (featureSet) {
        if (map.getLayer("approvalLayer")) {
            map.removeLayer(map.getLayer("approvalLayer"));
        }
        var graphicLayer = new esri.layers.GraphicsLayer({ id: "approvalLayer" });
        var x = featureSet.features[0].geometry.x;
        var y = featureSet.features[0].geometry.y;
        var minX = x - 10000;
        var minY = y - 10000;
        var maxX = x + 10000;
        var maxY = y + 10000;
        var extent = new esri.geometry.Extent({ "xmin": minX, "ymin": minY, "xmax": maxX, "ymax": maxY, "spatialReference": featureSet.features[0].geometry.spatialReference });
        var symbol = this.FillSymbol("Solid");
        var graphic = new esri.Graphic(extent, symbol);
        graphicLayer.add(graphic);
        map.addLayer(graphicLayer);
    },
    //环境管理-行政处罚  2016年6月20日09:07:54  王岩松
    addPunishFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${ENPNAME}</b>");
        template.setContent(Function.createDelegate(this, this.getPunishWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.ENPNAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.name = feature.attributes.ENPNAME;
            synObj.sitecode = feature.attributes.ENPCODE;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.REGIONNAME) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("red");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreatePunishList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showPunishInfo));
    },
    //环境管理-行政处罚 点位点击事件【地图】 2016年6月14日20:12:28  王岩松
    showPunishInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("red");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载环境管理-行政处罚  InfoWindow内容     2016年6月20日09:09:33  王岩松
    getPunishWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeftNew";
        topLeftDiv.style = " border-bottom-width:0px ";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "&nbsp;&nbsp; 所在城市：&nbsp;" + graphic.attributes["REGIONNAME"];
        topLeftDiv.appendChild(topLeftCity);
        var varFOUNDATION = "";
        if (graphic.attributes["FOUNDATION"] == null || graphic.attributes["FOUNDATION"] == "") {
            varFOUNDATION = "--";
        } else {
            varFOUNDATION = graphic.attributes["FOUNDATION"]
        }
        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "&nbsp;&nbsp; 调查机构：&nbsp;" + varFOUNDATION;
        topLeftDiv.appendChild(topLeftDegree);

        var messageDiv = document.createElement("div");
        messageDiv.className = "JudingWenShuHao";
        messageDiv.innerHTML = "&nbsp;&nbsp;决定书文号： ";
        topDiv.appendChild(messageDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowjdsh";
        bottomDiv.id = "infoWindowBottomDiv";
        infoWindow.appendChild(bottomDiv);

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.ENPCODE;  //站点编码
        var ids = graphic.attributes.IDS;  //站点编码
        var urls = "ashx/HJGL/EnterrisePunish.ashx?ids=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);

                    if (result == "" || result == null) {
                        var bottomDivBar = document.createElement("div");
                        bottomDivBar.className = "InfoWindowBottomBar";
                        bottomDivBar.innerHTML = "暂时没有数据";
                        bottomDiv.appendChild(bottomDivBar);
                    }
                    else {
                        for (i = 0; i < result.length; i++) {
                            var bottomDivBar = document.createElement("div");
                            bottomDivBar.className = "InfoWindowBottomBar";
                            bottomDivBar.id = "HJGL_" + result[i].IDS;
                            bottomDivBar.setAttribute("name", result[i].IDS);
                            bottomDivBar.innerHTML += "&nbsp;&nbsp;&nbsp;<span style='color:#00F;text-decoration:underline;cursor:pointer;' >" + result[i].DECIDENUM + " </span >";
                            $addHandler(bottomDivBar, "click", Function.createDelegate(_ins, _ins.PunishDetailInfoBtnClick));
                            bottomDiv.appendChild(bottomDivBar);
                        }
                    }
                }
                loading.hideMin();
            }
        }

        return infoWindow;
    },
    //加载环境管理-行政处罚   【详细信息】点击事件     2016-6-20 09:09:37  王岩松
    PunishDetailInfoBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id;
        while (elem) {
            if (elem.id) {
                id = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var oJson = new Object();
        localStorage.IDS = id;

        var iframe = new PopWindow(610, 1100, "行政处罚信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "HJGL/Xingzhengchufa.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建环境管理-行政处罚               2016年6月14日20:12:28  王岩松
    CreatePunishList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;家&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("ENPCODE", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.PunishBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省行政处罚企业（" + coAll + "家）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //  环境管理-行政处罚点击事件【列表】        2016-6-20 09:09:42  王岩松
    PunishBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["ENPCODE"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.ENPCODE == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["ENPCODE"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("red");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["ENPNAME"] + "</b>");
                //var div = _ins.getPunishWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
            }
        });
    },

    //信息公开-信息发布 2016年10月23日11:32:24 王岩松
    addBusinessMessageSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${ENPNAME}</b>");
        template.setContent(Function.createDelegate(this, this.getBusinessMessageWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.ENPNAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.name = feature.attributes.ENPNAME;
            synObj.sitecode = feature.attributes.ENPCODE;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.REGIONNAME) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("red");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreateBusinessMessageList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showBusinessMessageInfo));
    },
    ////信息公开-信息发布  点位点击事件【地图】     2016年10月23日11:32:24 王岩松
    showBusinessMessageInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("red");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    ////信息公开-信息发布  InfoWindow内容     2016年10月23日11:32:24 王岩松
    getBusinessMessageWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeftNew";
        topLeftDiv.style = " border-bottom-width:0px ";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "&nbsp;&nbsp;所在城市：&nbsp;" + graphic.attributes["REGIONNAME"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "&nbsp;&nbsp;企业类型：&nbsp;" + graphic.attributes["INTYPENAME"];
        topLeftDiv.appendChild(topLeftDegree);

        var messageDiv = document.createElement("div");
        messageDiv.className = "JudingWenShuHao";
        messageDiv.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ";
        topDiv.appendChild(messageDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowjdsh";
        bottomDiv.id = "infoWindowBottomDiv";
        infoWindow.appendChild(bottomDiv);

        //var loading = new LoadingAnimation();
        //var loadingDiv = loading.createMin();
        //bottomDiv.appendChild(loadingDiv);

        var sitecode = graphic.attributes.ENPCODE;  //站点编码
        var ids = graphic.attributes.IDS;  //站点编码
        var bottomDivBar = document.createElement("div");
        bottomDivBar.className = "InfoWindowBottomBar";
        bottomDivBar.id = "HJGL_" + sitecode;
        bottomDivBar.setAttribute("name", sitecode);
        bottomDivBar.innerHTML += "&nbsp;&nbsp;&nbsp;<span style='font-size:15px;color:#00F;text-decoration:underline;cursor:pointer;' > 查看企业档案信息 </span >";
        $addHandler(bottomDivBar, "click", Function.createDelegate(this, this.BusinessMessageDetailInfoBtnClick));
        bottomDiv.appendChild(bottomDivBar);
        //loading.hideMin();
        //var urls = "ashx/HJGL/EnterrisePunish.ashx?ids=" + ids;
        //var _ins = this;
        //var xmlhttp = window.Mirs.Gis.Global.creq();
        //xmlhttp.open("GET", urls, true);
        //xmlhttp.send();
        //xmlhttp.onreadystatechange = function () {
        //    if (xmlhttp.readyState == 4) {
        //        if (xmlhttp.status == 200) {
        //            var result = JSON.parse(xmlhttp.responseText);

        //            if (result == "" || result == null) {
        //                var bottomDivBar = document.createElement("div");
        //                bottomDivBar.className = "InfoWindowBottomBar";
        //                bottomDivBar.innerHTML = "暂时没有数据";
        //                bottomDiv.appendChild(bottomDivBar);
        //            }
        //            else {
        //                for (i = 0; i < result.length; i++) {
        //                    var bottomDivBar = document.createElement("div");
        //                    bottomDivBar.className = "InfoWindowBottomBar";
        //                    bottomDivBar.id = "HJGL_" + result[i].IDS;
        //                    bottomDivBar.setAttribute("name", result[i].IDS);
        //                    bottomDivBar.innerHTML += "&nbsp;&nbsp;&nbsp;<span style='color:#00F;text-decoration:underline;cursor:pointer;' > 查看企业档案 </span >";
        //                    $addHandler(bottomDivBar, "click", Function.createDelegate(_ins, _ins.BusinessMessageDetailInfoBtnClick));
        //                    bottomDiv.appendChild(bottomDivBar);
        //                }
        //            }
        //        }
        //        loading.hideMin();
        //    }
        //}

        return infoWindow;
    },
    ////信息公开-信息发布   【详细信息】点击事件     2016年10月23日11:32:24 王岩松
    BusinessMessageDetailInfoBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id;
        while (elem) {
            if (elem.id) {
                id = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var oJson = new Object();
        localStorage.IDS = id;

        var iframe = new PopWindow(610, 1100, "企业档案信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "HJGL/XinXiGongKai.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建//信息公开-信息发布             2016年10月23日11:32:24 王岩松
    CreateBusinessMessageList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;家&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("ENPCODE", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.BusinessMessageBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省信息公开企业（" + coAll + "家）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    // //信息公开-信息发布    点击事件【列表】       2016年10月23日11:32:24 王岩松
    BusinessMessageBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["ENPCODE"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.ENPCODE == stationCode) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["ENPCODE"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("red");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
            }
        });
    },


    //地表水展示照片--赵永辉  2016年6月21日20:06:51  王岩松
    addWaterSiteFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${SITENAME}</b>");
        template.setContent(Function.createDelegate(this, this.getWaterSiteWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.SITENAME = feature.attributes.SITENAME;
            synObj.IMGS = feature.attributes.IMGS;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.CITY) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("gray");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreateWaterSiteList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showWaterSiteInfo));
    },
    //地表水展示照片--赵永辉 点位点击事件【地图】 2016年6月14日20:12:28  王岩松
    showWaterSiteInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("gray");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //地表水展示照片--赵永辉  InfoWindow内容     2016年6月20日09:09:33  王岩松
    getWaterSiteWindowContent: function (graphic) {
        var _ins = this;
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeftNew";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "&nbsp;所在城市：&nbsp;" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);


        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "&nbsp;水源类型：&nbsp;" + graphic.attributes["TYPENAME"];
        topLeftDiv.appendChild(topLeftDegree);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        if (graphic.attributes["IMGS"] != " " && graphic.attributes["IMGS"] != "" && graphic.attributes["IMGS"] != null) {
            var middleDiv = document.createElement("div");
            middleDiv.className = "InfoWindowMiddle";
            middleDiv.innerHTML = "<img title='点击放大' width='100%'  height='100%' src='Images/YYSBHQ/" + graphic.attributes["IMGS"] + ".png'/>";
            middleDiv.id = "IMGS_" + graphic.attributes["IMGS"];
            middleDiv.setAttribute("name", graphic.attributes["IMGS"]);
            $addHandler(middleDiv, "click", Function.createDelegate(_ins, _ins.ImgsBtnClick));
            infoWindow.appendChild(middleDiv);
        } else {
            var texts = "暂无站点照片";
            var middleDiv = document.createElement("div");
            middleDiv.className = "InfoWindowMiddle";
            middleDiv.innerHTML = "<div align='center'  color='red' style='font-size:20px'>" + texts + "</div>";
            infoWindow.appendChild(middleDiv);
        }
        return infoWindow;
    },
    //地表水展示照片--赵永辉     对象列表          2016年6月14日20:12:28  王岩松
    CreateWaterSiteList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("ids", json[o].children[i].id);
                $addHandler(li, "click", Function.createDelegate(this, this.WaterSiteBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].SITENAME;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省饮用水保护区(" + coAll + "个)";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //地表水展示照片--赵永辉点击事件【列表】        2016-6-20 09:09:42  王岩松
    WaterSiteBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var OBJECTID = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                OBJECTID = elem.attributes["ids"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.OBJECTID == OBJECTID) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["OBJECTID"] == OBJECTID) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("red");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["SITENAME"] + "</b>");
                //var div = _ins.getWaterSiteWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
            }
        });
    },
    //地表水展示照片-  查看照片   【详细信息】点击事件     2016-6-20 09:09:37  王岩松
    ImgsBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id;
        while (elem) {
            if (elem.id) {
                id = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var oJson = new Object();
        localStorage.IMGSID = id;

        var iframe = new PopWindow(610, 1100, "地表水照片", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "GNQH/WaterSiteImg.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },

    //产业聚集区 -差别化审批   2016年6月23日10:01:20  王岩松
    addIndustrialAreaFeatureSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${NAME}</b>");
        template.setContent(Function.createDelegate(this, this.getIndustrialAreaWindowContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }
        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.NAME = feature.attributes.NAME;
            synObj.TJDM = feature.attributes.TJDM;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.CITY) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            //var symbol = _ins.MarkerSymbol("blueviolet");
            var symbol = _ins.FillSymbol("mian");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreateIndustrialAreaList(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showIndustrialAreaInfo));
    },
    //产业聚集区 -差别化审批点位点击事件【地图】
    showIndustrialAreaInfo: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.FillSymbol("green");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.FillSymbol("red");
            evt.graphic.setSymbol(symbol);
            //if (map.getZoom() > 5) {
            map.centerAt(evt.mapPoint);
            //}
            //else {
            //    map.centerAndZoom(evt.mapPoint, 5);
            //}
        }
    },
    //加载产业聚集区 -差别化审批InfoWindow内容
    getIndustrialAreaWindowContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeftAll";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = "所在城市：&nbsp;&nbsp;" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "InfoWindowTopRight";
        topDiv.appendChild(topRightDiv);

        var timeDiv = document.createElement("div");
        timeDiv.className = "SuperviseTitle";
        timeDiv.innerHTML = "产业聚集区概况";
        infoWindow.appendChild(timeDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowCYJJQ";
        bottomDiv.id = "InfoWindowCYJJQdiv";
        infoWindow.appendChild(bottomDiv);

        //this.CreateLineInDiv(bottomDiv, "主导产业", "divcy", "企业数", "divqy");
        //this.CreateLineInDiv(bottomDiv, "流域", "divly", "河流", "divhl");

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);

        var TJDM = graphic.attributes.TJDM;  //站点编码

        var urls = "ashx/GNQH/FunctionalAreas.ashx?ids=" + TJDM;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);

                    if (result == "" || result == null) {

                        var bottomDivBar = document.createElement("div");
                        bottomDivBar.className = "InfoWindowBottomBar";
                        bottomDivBar.innerHTML = "暂时没有数据";
                        bottomDiv.appendChild(bottomDivBar);
                    } else {

                        var topLeftCity = document.createElement("div");
                        topLeftCity.className = "InfoWindowLeftIn";
                        topLeftCity.innerHTML = "入驻企业：（" + result[0].qys + "）家&nbsp;";
                        topLeftDiv.appendChild(topLeftCity);

                        var clickDivBar = document.createElement("div");
                        clickDivBar.className = "InfoWindowBottonIn";
                        clickDivBar.id = "HJGL_" + result[0].zdcy;
                        clickDivBar.style.background = "#AFEEEE";
                        clickDivBar.setAttribute("name", result[0].zdcy);
                        var swdy = result[0].zdcy;
                        clickDivBar.innerHTML += "<span style='font-weight:600;font-size:12px; width:180px;display:inline-block;' >主导产业：</span>&nbsp;&nbsp;<span style='float:right;'>" + result[0].zdcy + "</span>";
                        bottomDiv.appendChild(clickDivBar);

                        var clickDivBar = document.createElement("div");
                        clickDivBar.className = "InfoWindowBottonIn";
                        clickDivBar.id = "HJGL_" + result[0].rh;
                        clickDivBar.style.background = "#AFEEEE";

                        clickDivBar.setAttribute("name", result[0].rh);
                        var swdy = result[0].rh;
                        clickDivBar.innerHTML += "<span style='font-weight:600;font-size:12px; width:180px;display:inline-block;' >废水排入河流：</span>&nbsp;&nbsp;<span style='float:right;'>" + result[0].ly + result[0].rh + "</span>";
                        bottomDiv.appendChild(clickDivBar);

                        var clickDivBar = document.createElement("div");
                        clickDivBar.className = "InfoWindowBottonIn";
                        clickDivBar.id = "HJGL_" + result[0].dj;
                        clickDivBar.style.background = "#AFEEEE";
                        clickDivBar.setAttribute("name", result[0].dj);
                        var swdy = result[0].dj;
                        clickDivBar.innerHTML += "<span style='font-weight:600;font-size:12px; width:180px;display:inline-block;' >污水管网与污水处理厂对接情况：</span>&nbsp;&nbsp;<span style='float:right;'>" + result[0].dj + "</span>";
                        bottomDiv.appendChild(clickDivBar);

                        var clickDivBar = document.createElement("div");
                        clickDivBar.className = "InfoWindowBottonIn";
                        clickDivBar.id = "HJGL_" + result[0].fgl;
                        clickDivBar.style.background = "#AFEEEE";
                        clickDivBar.setAttribute("name", result[0].fgl);
                        var swdy = result[0].fgl;
                        clickDivBar.innerHTML += "<span style='font-weight:600;font-size:12px; width:180px;display:inline-block;' >集聚区管网覆盖率（%）：</span>&nbsp;&nbsp;<span style='float:right;'>" + result[0].fgl + "</span>";
                        bottomDiv.appendChild(clickDivBar);

                        var divLine = document.createElement("div");
                        divLine.className = "InfoWindowBottonIn";
                        divLine.style.background = "#666666";
                        bottomDiv.appendChild(divLine);

                        if (result[0].swdy != "" && result[0].swdy != null && result[0].swdy != undefined) {
                            var clickDivBar = document.createElement("div");
                            clickDivBar.className = "InfoWindowBottonIn";
                            clickDivBar.id = "HJGL_" + result[0].swdy;
                            clickDivBar.style.background = "#8FBC8F";
                            clickDivBar.setAttribute("name", result[0].swdy);
                            var swdy = result[0].swdy;
                            clickDivBar.innerHTML += "<span style='font-weight:600;font-size:14px;color:#00F;width:180px;display:inline-block;' >✔水污染防治重点单元</span></br>&nbsp;&nbsp;" + swdy;
                            bottomDiv.appendChild(clickDivBar);
                        }
                        if (result[0].dqdy != "" && result[0].dqdy != null && result[0].dqdy != undefined) {
                            var clickDivBar = document.createElement("div");
                            clickDivBar.className = "InfoWindowBottonIn";
                            clickDivBar.id = "HJGL_" + result[0].dqdy;
                            clickDivBar.style.background = "#8FBC8F";
                            clickDivBar.setAttribute("name", result[0].dqdy);
                            var dqdy = result[0].dqdy;
                            clickDivBar.innerHTML += "<span style='font-weight:600;font-size:14px;color:#00F;width:180px;display:inline-block;' >✔大气污染防治重点单元</span></br>&nbsp;&nbsp;" + dqdy;
                            bottomDiv.appendChild(clickDivBar);
                        }
                        if (result[0].zjsdy != "" && result[0].zjsdy != null && result[0].zjsdy != undefined) {
                            var clickDivBar = document.createElement("div");
                            clickDivBar.className = "InfoWindowBottonIn";
                            clickDivBar.id = "HJGL_" + result[0].zjsdy;
                            clickDivBar.style.background = "#8FBC8F";
                            clickDivBar.setAttribute("name", result[0].zjsdy);
                            var zjsdy = result[0].zjsdy;
                            clickDivBar.innerHTML += "<span style='font-weight:600;font-size:14px;color:#00F;width:180px;display:inline-block;' >✔重金属污染防控单元</span></br>&nbsp;&nbsp;" + zjsdy;
                            bottomDiv.appendChild(clickDivBar);
                        }
                    }

                }
                loading.hideMin();
            }
        }
        return infoWindow;
    },
    //创建产业聚集区 -差别化审批站点列表
    CreateIndustrialAreaList: function (json, oParent) {
        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjIndustrialAreaCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjIndustrialAreaCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;个&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("id", json[o].children[i].id);
                $addHandler(li, "click", Function.createDelegate(this, this.IndustrialAreaBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].NAME;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }
        objCityTop1.innerHTML = "全省产业集聚区（" + coAll + "个）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //产业聚集区 -差别化审批点点击事件【列表】
    IndustrialAreaBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var OBJECTID = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                OBJECTID = elem.attributes["id"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        if (this._graphic != null && this._graphic.attributes.OBJECTID == OBJECTID) {
            return;
        }
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["OBJECTID"] == OBJECTID) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.FillSymbol("green");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.FillSymbol("red");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry.getCentroid());
                }
                else {
                    map.centerAndZoom(graphic.geometry.getCentroid(), 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["NAME"] + "</b>");
                //var div = _ins.getIndustrialAreaWindowContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry.getCentroid());
            }
        });
    },

    //环境管理-医疗固废 2016年8月23日11:31:16  王岩松
    addMedicalWasteSetToMap: function (featureSet) {
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        if (map.graphicsLayerIds.length != 0) {
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                    var graphicLayer = map.getLayer(map.graphicsLayerIds[i]);
                    map.removeLayer(graphicLayer);
                }
            }
            this._graphic = null;
            $get("companyListDiv").innerHTML = "";
        }
        var coLayer = new esri.layers.GraphicsLayer();
        var template = new esri.InfoTemplate();
        template.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  ${NAMES}</b>");
        template.setContent(Function.createDelegate(this, this.getMedicalWasteContent));
        coLayer.setInfoTemplate(template);
        coLayer.setOpacity(0);

        var _connect = dojo.connect(map, "onLayerAdd", coLayerAdded);
        function coLayerAdded(layer) {
            layer.setOpacity(1.0);
            dojo.disconnect(_connect);
        }

        //map.reorderLayer(coLayer, 1);
        var n = -1;
        var oJson = [];
        $.extend(true, oJson, this.__CityJson);
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.ENPNAME.indexOf(text) < 0) {
                    return;
                }
            }
            var synObj = new Object();
            synObj.id = feature.attributes.OBJECTID;
            synObj.name = feature.attributes.NAMES;
            synObj.sitecode = feature.attributes.OBJECTID;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name.indexOf(feature.attributes.CITY) >= 0) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(synObj);
            var symbol = _ins.MarkerSymbol("medicalcare");
            coLayer.add(feature.setSymbol(symbol));
        });
        map.addLayer(coLayer);
        this.ObjectListShow();
        this.CreateMedicalWaste(oJson, $get("companyListDiv"));
        this._mapClick = dojo.connect(map, "onClick", Function.createDelegate(this, this.showMedicalWaste));
    },
    //环境管理-医疗固废 点位点击事件【地图】 2016年8月23日11:33:37  王岩松
    showMedicalWaste: function (evt) {
        if (evt.graphic) {
            if (this._graphic != null) {
                var blueSymbol = this.MarkerSymbol("medicalcare");
                this._graphic.setSymbol(blueSymbol);
            }
            this._graphic = evt.graphic;
            var symbol = this.MarkerSymbol("green");
            evt.graphic.setSymbol(symbol);
            map.centerAt(evt.mapPoint);
        }
    },
    //加载环境管理-医疗固废  InfoWindow内容    2016年8月23日11:33:53  王岩松
    getMedicalWasteContent: function (graphic) {
        var infoWindow = document.createElement("div");
        infoWindow.className = "InfoWindowCSS";

        var topDiv = document.createElement("div");
        topDiv.className = "InfoWindowTop";
        infoWindow.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "InfoWindowTopLeftAll";
        //topLeftDiv.style = " border-bottom-width:0px ";
        topDiv.appendChild(topLeftDiv);

        var topLeftCity = document.createElement("div");
        topLeftCity.className = "InfoWindowLeftIn";
        topLeftCity.innerHTML = " 所在城市：" + graphic.attributes["CITY"];
        topLeftDiv.appendChild(topLeftCity);

        var topLeftDegree = document.createElement("div");
        topLeftDegree.className = "InfoWindowLeftIn";
        topLeftDegree.innerHTML = "企业位置：" + graphic.attributes["LOCATION"];
        topLeftDegree.title = graphic.attributes["LOCATION"];
        topLeftDiv.appendChild(topLeftDegree);

        var messageDiv = document.createElement("div");
        messageDiv.className = "JudingWenShuHao";
        messageDiv.innerHTML = "&nbsp;&nbsp;基本信息： ";
        topDiv.appendChild(messageDiv);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "InfoWindowBottom";
        bottomDiv.style.height = "50px";
        bottomDiv.id = "infoWindowBottomDiv";
        infoWindow.appendChild(bottomDiv);

        var loading = new LoadingAnimation();
        var loadingDiv = loading.createMin();
        bottomDiv.appendChild(loadingDiv);
        var sitecode = graphic.attributes.OBJECTID;  //站点编码
        var urls = "ashx/HJGL/MedicalWaste.ashx?ids=" + sitecode;
        var _ins = this;
        var xmlhttp = window.Mirs.Gis.Global.creq();
        xmlhttp.open("GET", urls, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    if (result == "" || result == null) {
                        var bottomDivBar = document.createElement("div");
                        bottomDivBar.className = "InfoWindowBottomBar";
                        bottomDivBar.innerHTML = "暂时没有数据";
                        bottomDiv.appendChild(bottomDivBar);
                    }
                    else {

                        ///2016年8月26日09:48:27  王岩松
                        var table = document.createElement("table");
                        table.className = "InfoWindowTable";
                        bottomDiv.appendChild(table);

                        var rows = table.getElementsByTagName("tr");
                        table.innerHTML = "";
                        for (i = 0; i < rows.length; i++) {
                            if (i % 2 == 0) {
                                rows[i].className = "evenrowcolor";
                            } else {
                                rows[i].className = "oddrowcolor";
                            }
                        }

                        table.innerHTML += " <tr style='height:24px'><td align='center' style='width:22%'> 处置方式</td><td style='width:29%'  align='center'>设计规模(吨/年)</td><td style='width:29%'  align='center'>实际运行(吨/年)</td><td style='width:20%'   align='center'>年份</td></tr>";

                        for (i = 0; i < result.length; i++) {
                            table.innerHTML += "<tr style='height:24px'><td align='center'  >" + result[i].TYPE + "&nbsp;&nbsp;</td><td  align='right'>" + result[i].PROJECTSIZE + "&nbsp;&nbsp;</td><td   align='right'>" + result[i].ACTUALSIZE + "&nbsp;&nbsp;</td><td  align='right'>" + result[i].YEARS + "&nbsp;&nbsp;</td></tr>";
                        }
                    }
                }
                loading.hideMin();
            }
        }

        return infoWindow;
    },
    //加载环境管理-行政处罚   【详细信息】点击事件    2016年8月23日11:35:48 王岩松
    MedicalWasteInfoBtnClick: function (e) {

        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id;
        while (elem) {
            if (elem.id) {
                id = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var oJson = new Object();
        localStorage.IDS = id;

        var iframe = new PopWindow(610, 1100, "行政处罚信息", true);
        var inDiv = iframe.CreateWindow();
        if (inDiv != null) {
            inDiv.setAttribute("src", "HJGL/Xingzhengchufa.aspx?n=" + Math.random());
            inDiv.onload = function () {
                var loading = new LoadingAnimation();
                loading.hide();
            }
        }
    },
    //创建环境管理-行政处罚           2016年8月23日11:35:52  王岩松
    CreateMedicalWaste: function (json, oParent) {

        var cityBoxDiv1 = document.createElement("div");
        cityBoxDiv1.className = "ObjCityBox";
        oParent.appendChild(cityBoxDiv1);

        var objCityTop1 = document.createElement("div");
        objCityTop1.className = "ObjCityTopALL";
        cityBoxDiv1.appendChild(objCityTop1);

        var coAll = 0;

        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBox";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            $addHandler(objCityTop, "mouseover", Function.createDelegate(this, this.ObjCityMouseover));
            $addHandler(objCityTop, "mouseout", Function.createDelegate(this, this.ObjCityMouseout));
            cityBoxDiv.appendChild(objCityTop);

            var objCityTopRight = document.createElement("div");
            objCityTopRight.className = "ObjCityTopRight";
            objCityTopRight.innerHTML = "<img src='Images/location.png' class='ObjCityTopRightImg' />";
            $addHandler(objCityTopRight, "click", Function.createDelegate(this, this.ObjLocationBtnClick));
            objCityTop.appendChild(objCityTopRight);

            var objCityTopLeft = document.createElement("div");
            objCityTopLeft.className = "ObjCityTopLeft";
            objCityTopLeft.setAttribute("name", "close");
            $addHandler(objCityTopLeft, "click", Function.createDelegate(this, this.ObjCityTopLeftClick))
            objCityTop.appendChild(objCityTopLeft);

            var objTopLeftCoin = document.createElement("div");
            objTopLeftCoin.className = "ObjTopLeftCoin";
            objTopLeftCoin.innerHTML = "<img src='Images/menu_close.png' class='objTopLeftImg' />";
            objCityTopLeft.appendChild(objTopLeftCoin);

            var objTopLeftText = document.createElement("div");
            objTopLeftText.className = "ObjTopLeftText";
            objTopLeftText.innerHTML = json[o].name;
            objCityTopLeft.appendChild(objTopLeftText);

            var objTopLeftCoCount = document.createElement("div");
            objTopLeftCoCount.className = "ObjTopLeftCoCount";
            objTopLeftCoCount.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（&nbsp;" + json[o].children.length + "&nbsp;家&nbsp;）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("OBJECTID", json[o].children[i].sitecode);
                $addHandler(li, "click", Function.createDelegate(this, this.MedicalWasteClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "&nbsp;&nbsp;" + "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = "&nbsp;&nbsp;" + json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
            coAll += json[o].children.length;
        }

        objCityTop1.innerHTML = "全省医疗固废处理企业（" + coAll + "家）";
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //  环境管理-行政处罚点击事件【列表】        2016-6-20 09:09:42  王岩松
    MedicalWasteClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var stationCode = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                stationCode = elem.attributes["OBJECTID"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (graphic.attributes["OBJECTID"] == stationCode) {
                if (_ins._graphic != null) {
                    var blueSymbol = _ins.MarkerSymbol("red");
                    _ins._graphic.setSymbol(blueSymbol);
                }
                _ins._graphic = graphic;
                var gLayer = graphic.getLayer();
                var symbol = _ins.MarkerSymbol("green");
                graphic.setSymbol(symbol);
                if (map.getZoom() >= 5) {
                    map.centerAt(graphic.geometry);
                }
                else {
                    map.centerAndZoom(graphic.geometry, 5);
                }
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }
                //map.infoWindow.setTitle("<b><img src='Images/building.png' style='width:15px;margin-bottom: -2px;margin-left: 2px;'>  " + graphic.attributes["NAMES"] + "</b>");
                //var div = _ins.getMedicalWasteContent(graphic);
                //map.infoWindow.setContent(div);
                //map.infoWindow.show(graphic.geometry);
            }
        });
    },

    //显示、隐藏城市下列表按钮【click】事件
    ObjCityTopLeftClick: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var state = null;
        while (elem.className) {
            if (elem.className == "ObjCityTopLeft") {
                state = elem.getAttribute("name");
                if (state == "close") {
                    elem.setAttribute("name", "open");
                    elem.children[0].children[0].src = "Images/menu_open.png";
                    elem.parentNode.parentNode.children[1].style.display = "block";
                }
                else {
                    elem.setAttribute("name", "close");
                    elem.children[0].children[0].src = "Images/menu_close.png";
                    elem.parentNode.parentNode.children[1].style.display = "none";
                }
                break;
            }
            elem = elem.parentNode;
        }
    },
    //创建点symbol
    MarkerSymbol: function (name) {
        var symbol = null;
        switch (name) {
            case "yellow":
                symbol = new esri.symbol.SimpleMarkerSymbol(
                        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([255, 255, 0, 0.8])
                    );
                //symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/point30_3.png", 25, 25);
                break;
            case "green":
                symbol = new esri.symbol.SimpleMarkerSymbol(
                        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([0, 255, 0, 0.8])
                    );
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/a.gif", 50, 50);
                break;
            case "red":
                symbol = new esri.symbol.SimpleMarkerSymbol(
                        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([255, 0, 255, 0.8])
                    );
                //symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/1.png", 25, 25);
                break;
            case "blue":
                //symbol = new esri.symbol.SimpleMarkerSymbol(
                //        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                //        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                //        new dojo.Color([26, 26, 26]), 1),
                //        new dojo.Color([0, 0, 238, 0.8])
                //    );
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/10.png", 25, 25);
                break;
            case "skyblue":
                //symbol = new esri.symbol.SimpleMarkerSymbol(
                //        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                //        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                //        new dojo.Color([26, 26, 26]), 1),
                //        new dojo.Color([0, 191, 255, 0.8])
                //    );
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/8.png", 25, 25);
                break;
            case "darkorange":
                //symbol = new esri.symbol.SimpleMarkerSymbol(
                //        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                //        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                //        new dojo.Color([26, 26, 26]), 1),
                //        new dojo.Color([255, 140, 0, 0.8])
                //    );
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/1.png", 25, 25);
                break;
            case "seagreen":
                //symbol = new esri.symbol.SimpleMarkerSymbol(
                //        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                //        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                //        new dojo.Color([26, 26, 26]), 1),
                //        new dojo.Color([46, 139, 87, 0.8])
                //    );
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/2.png", 25, 25);
                break;
            case "blueviolet":
                symbol = new esri.symbol.SimpleMarkerSymbol(
                        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([155, 48, 255, 0.8])
                    );
                break;
            case "mian":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_CIRCLE, 12,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([230, 230, 230, 0.6])
                    );
                break;
            case "gray":
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/3.png", 25, 25);
                break;
            case "darkorange_sewage":
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/5.png", 25, 25);
                break;
            case "darkorange_wastegas":
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/7.png", 25, 25);
                break;
            case "darkorange_wastewater":
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/6.png", 25, 25);
                break;
            case "medicalcare":
                symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/11.png", 25, 25);
                break;
        }

        return symbol;
    },
    //创建面symbol
    FillSymbol: function (name) {
        var symbol = null;
        switch (name) {
            case "mian":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([230, 230, 230, 0.5])
                    );
                break;
            case "mians":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([155, 48, 255, 0.5])
                    );
                break;
            case "Solid":
                symbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT,
                    new dojo.Color([255, 0, 0]), 2),
                    new dojo.Color([255, 255, 0, 0.5]));
                break;
            case "green":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([26, 26, 26]), 1),
                        new dojo.Color([230, 230, 230, 0.5])
                    );
                break;
            case "red":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([148, 0, 211]), 2),
                        new dojo.Color([169, 169, 169, 0.5])
                    );
                break;
            case "yellow":
                symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([255, 215, 0]), 2),
                        new dojo.Color([255, 255, 0, 0.5])
                    );
                break;
        }

        return symbol;
    },

    //鼠标移入城市名框对应点位加亮
    ObjCityMouseover: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var cityName = null;
        while (elem) {
            if (elem.className == "ObjCityTop") {
                cityName = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        this._graphics = [];
        var cityText;
        switch (this._typeCard) {
            case 5:
                cityText = "CITYNAME";
                break;
            case 6:
                cityText = "CITY";
                break;
            case 7:
                cityText = "DISTRICT";
                break;
            case 8:
                cityText = "CITYNAME";
                break;
            case 9:
                cityText = "CITY";
                break;
            case 10:
                cityText = "REGIONNAME";
                break;
            case 11:
                cityText = "CITY";
                break;
            case 13:
                cityText = "CITY";
                break;
            case 14:
                cityText = "CITY";
                break;
            default:
                cityText = "CITY";
                break;
        }

        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (cityName.indexOf(graphic.attributes[cityText]) >= 0) {
                var symbol = _ins.MarkerSymbol("yellow");
                graphic.setSymbol(symbol);
                _ins._graphics.push(graphic);
                return;
            }
        });
    },
    //鼠标移入城市名框对应产业聚集区面加亮 2016年6月29日09:21:03  王岩松
    ObjIndustrialAreaCityMouseover: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var cityName = null;
        while (elem) {
            if (elem.className == "ObjCityTop") {
                cityName = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var graphicsLayer;
        for (var i = 0; i < map.graphicsLayerIds.length; i++) {
            if (map.graphicsLayerIds[i] != "locGraphicsLayer") {
                graphicsLayer = map.getLayer(map.graphicsLayerIds[i]);
            }
        }
        var _ins = this;
        this._graphics = [];
        //var cityText;
        dojo.forEach(graphicsLayer.graphics, function (graphic) {
            if (cityName.indexOf(graphic.attributes["CITY"]) >= 0) {
                var symbol = _ins.FillSymbol("yellow");
                graphic.setSymbol(symbol);
                _ins._graphics.push(graphic);
                return;
            }
        });
    },

    //鼠标移出城市名框对应点位变回原色
    ObjCityMouseout: function (evt) {
        switch (this._typeCard) {
            case 5:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("skyblue");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 6:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("blue");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 7:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("seagreen");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 8:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("skyblue");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 9:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("blueviolet");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 10:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("red");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 11:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("gray");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            case 13:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        var symbol = this.MarkerSymbol("medicalcare");
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
            default:
                if (this._graphics != null) {
                    for (var j = 0; j < this._graphics.length; j++) {
                        switch (this._graphics[j].attributes.PSTYPE) {
                            case "W":
                                symbol = this.MarkerSymbol("darkorange_sewage");
                                break;
                            case "S":
                                symbol = this.MarkerSymbol("darkorange_wastewater");
                                break;
                            default:
                                symbol = this.MarkerSymbol("darkorange_wastegas");
                                break;
                        }
                        this._graphics[j].setSymbol(symbol);
                    }
                }
                break;
        }
        if (this._graphic != null) {
            var symbol = this.MarkerSymbol("green");
            this._graphic.setSymbol(symbol);
        }
    },

    //鼠标移出城市名框对应点位变回原色面 2016年6月29日09:22:07  王岩松
    ObjIndustrialAreaCityMouseout: function (evt) {
        var colorText;
        if (this._graphics != null) {
            for (var j = 0; j < this._graphics.length; j++) {
                var symbol = this.FillSymbol("mian");
                this._graphics[j].setSymbol(symbol);
            }
        }
        if (this._graphic != null) {
            var symbol = this.FillSymbol("red");
            this._graphic.setSymbol(symbol);
        }
    },

    //省管电厂、污水处理厂、一般废水、一般废气复选框【click】事件
    ObjCheckBoxClick: function (e) {
        this.addCompanyFeatureSetToMap(this._featureSet);
    },
    ObjCheckBoxTowClick: function (e) {
        this.addCityAirFeatureSetToMap(this._featureSet);
    },
    //搜索框内容改变事件【change】事件
    SearchTxtChange: function (e) {
        switch (this._typeCard) {
            case 5:
                this.addCityAirFeatureSetToMap(this._featureSet);
                break;
            case 6:
                this.addDrinkWaterFeatureSetToMap(this._featureSet);
                break;
            case 7:
                this.addSurfaceWaterFeatureSetToMap(this._featureSet);
                break;
            case 8:
                this.addSynthesizeFeatureSetToMap(this._featureSet);
                break;
            case 9:
                this.addApprovalFeatureSetToMap(this._featureSet);
                break;
            case 10:
                this.addPunishFeatureSetToMap(this._featureSet);
                break;
            case 11:
                this.addWaterSiteFeatureSetToMap(this._featureSet);
                break;
            default:
                this.addCompanyFeatureSetToMap(this._featureSet);
                break;
        }
    },
    //搜索框禁止提交
    SearchTxtKeyDown: function (evt) {
        if (evt.keyCode == 13) {
            if (evt && evt.preventDefault) {//如果是FF下执行这个
                evt.preventDefault();
            } else {
                window.event.returnValue = false;//如果是IE下执行这个
            }
        }
    },
    //搜索完按回车查询
    SearchTxtKeyUp: function (e) {
        if (e.keyCode == 13 && $get("inputSearch") == document.activeElement) {
            $get("inputSearch").blur();
        }
    },
    //取消事件处理
    SearchTxtSelectstart: function (event) {
        event.rawEvent.cancelBubble = true;
    },
    //绑定事件
    ObjCheckBoxHandler: function () {
        $addHandler($get("checkBox_power"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_sewage"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_water"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_gas"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_city"), "click", Function.createDelegate(this, this.ObjCheckBoxTowClick));
        $addHandler($get("checkBox_county"), "click", Function.createDelegate(this, this.ObjCheckBoxTowClick));
        $addHandler($get("inputSearch"), "change", Function.createDelegate(this, this.SearchTxtChange));
        $addHandler($get("inputSearch"), "keyup", Function.createDelegate(this, this.SearchTxtKeyUp));
    },
    //移除事件绑定
    ObjCheckBoxRemoveHandler: function () {
        $clearHandlers($get("checkBox_power"));
        $clearHandlers($get("checkBox_sewage"));
        $clearHandlers($get("checkBox_water"));
        $clearHandlers($get("checkBox_gas"));
        $clearHandlers($get("checkBox_city"));
        $clearHandlers($get("checkBox_county"));
        $clearHandlers($get("inputSearch"));
        $addHandler($get("inputSearch"), "keydown", Function.createDelegate(this, this.SearchTxtKeyDown));
        $addHandler($get("inputSearch"), "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
    }
}