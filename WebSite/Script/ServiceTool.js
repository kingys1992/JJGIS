//TODO:自动生成部分 吴洋 2016.3.11
WebSite.Script.ServiceTool = function () {
    this.__JsonInfo = null;         //数据资源列表json串
    this._StTopLeft = null;         //隐藏、显示服务列表按钮
    this._StTopRight = null;        //数据资源列表按钮
    this._StBottomLeft = null;      //对象列表按钮
    this._StBottomRight = null;     //图层列表按钮

    this._ServiceList = null;       //服务框面板
    this._ServiceListIn = null;     //服务框架内层
    this._ServiceListFront = null;  //服务框面板前面
    this._ServiceListBack = null;   //服务框面板后面

    this._win = window;             //window对象
    this._doc = document;           //document对象
    this._disX = this._disY = 0;    //x、y平移量 
    this._isDrag = false;           //是否可拖拽

    this._serviceInfoPanl = null;   //数据资源列表面板
    this._serviceCovePanl = null;   //图层列表面板
    this._serviceObjPanl = null;    //对象列表面板

    this._elem = null;
    this.layerId = null;
};
WebSite.Script.ServiceTool.Instance = function () {
    var obj = new WebSite.Script.ServiceTool();
    obj.init();
    return obj;
}
WebSite.Script.ServiceTool.prototype = {
    //初始化方法
    init: function () {
        this._StTopLeft = $get("divStTopLeft");
        this._StTopRight = $get("divStTopRight");
        this._StBottomLeft = $get("divStBottomLeft");
        this._StBottomRight = $get("divStBottomRight");

        this._ServiceList = $get("divServiceList");
        this._ServiceListIn = $get("divServiceListIn");
        this._ServiceListFront = $get("divServiceListFront");
        this._ServiceListBack = $get("divServiceListBack");

        $addHandler(this._StTopRight, "click", Function.createDelegate(this, this.StTopRightBtnClick));
        $addHandler(this._StBottomRight, "click", Function.createDelegate(this, this.StBottomRightBtnClick));
        $addHandler(this._StBottomLeft, "click", Function.createDelegate(this, this.StBottomLeftBtnClick));
        $addHandler(this._StTopLeft, "click", Function.createDelegate(this, this.StTopLeftBtnClick));
        $addHandler($get("divServiceListRestore1"), "click", Function.createDelegate(this, this.RestoreBtnClick));
        $addHandler($get("divServiceListRestore2"), "click", Function.createDelegate(this, this.RestoreBtnClick));
        //$addHandler(this._win, "resize", Function.createDelegate(this, this.ServiceListResize));
        //$addHandler(this._win, "load", Function.createDelegate(this, this.ServiceListResize));

        this._serviceCovePanl = document.createElement("div");
        this._serviceCovePanl.className = "ServiceListBox";
        this._serviceCovePanl.id = "divServiceCovePanl";
        $get("divServiceListBMain").appendChild(this._serviceCovePanl);
        this.CreateCoveDom();
        this._serviceCovePanl.style.display = "none";

        this._serviceInfoPanl = document.createElement("div");
        this._serviceInfoPanl.className = "ServiceListBox";
        this._serviceInfoPanl.id = "divServiceInfoPanl";
        $get("divServiceListFMain").appendChild(this._serviceInfoPanl);
        this.CreateInfoDom();

        this._serviceObjPanl = document.createElement("div");
        this._serviceObjPanl.className = "ServiceListBox";
        this._serviceObjPanl.id = "divServiceObjPanl";
        $get("divServiceListBMain").appendChild(this._serviceObjPanl);
        this.CreateObjDom();
        this._serviceObjPanl.style.display = "none";


    },
    //service面板隐藏、显示按钮【click】事件
    StTopLeftBtnClick: function (e) {
        var type = this._StTopLeft.getAttribute("name");
        var divCards = $get("divCardList");
        if (type == "down") {
            this._StTopLeft.setAttribute("name", "up");
            this._StTopLeft.innerHTML = "<img src='Images/btn_menu_up.png' />";
            this._ServiceList.style.display = "none";
            divCards.style.right = "10px";

        }
        else {
            this._StTopLeft.setAttribute("name", "down");
            this._StTopLeft.innerHTML = "<img src='Images/btn_menu_down.png' />";
            divCards.style.right = "354px";
            this._ServiceList.style.display = "block";
            if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {
                var oExtent = new esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
                mapOne.setExtent(oExtent);
            }
        }
    },
    //数据资源按钮【click】事件
    StTopRightBtnClick: function (e) {
        var handle = new HandleClass();
        if (handle.hasClass(this._StTopRight, "stWhite")) {
            return false;
        }
        var isFront = $get("divServiceListFront").getAttribute("name") == "B";
        handle.addClass(this._StTopRight, "stWhite");
        handle.removeClass(this._StBottomRight, "stWhite");
        handle.removeClass(this._StBottomLeft, "stWhite");

        if (isFront) {
            $get("divServiceListFront").setAttribute("name", "F");
            handle.removeClass($get("divServiceListFront"), "stDisplay");
            $get("divServiceListFMain").appendChild(this._serviceInfoPanl);
            handle.addClass($get("divServiceListBack"), "stDisplay");
            handle.removeClass(this._ServiceListIn, "flipperBack");
        }
        else {
            $get("divServiceListFront").setAttribute("name", "B");
            handle.addClass($get("divServiceListFront"), "stDisplay");
            $get("divServiceListBMain").appendChild(this._serviceInfoPanl);
            handle.removeClass($get("divServiceListBack"), "stDisplay");
            handle.addClass(this._ServiceListIn, "flipperBack");
        }
        var _ins = this;
        var animatoin = new WebSite.Script.Animation();
        var WN = animatoin.fnWN();
        WN.addTranEvent(this._ServiceListIn, function (e) {
            _ins._serviceCovePanl.style.display = "none";
            _ins._serviceObjPanl.style.display = "none";
            _ins._serviceInfoPanl.style.display = "block";
        }, 0.6);
    },
    //图层列表按钮【click】事件
    StBottomRightBtnClick: function (e) {
        var handle = new HandleClass();
        if (handle.hasClass(this._StBottomRight, "stWhite")) {
            return false;
        }
        var isFront = $get("divServiceListFront").getAttribute("name") == "B";
        handle.addClass(this._StBottomRight, "stWhite");
        handle.removeClass(this._StTopRight, "stWhite");
        handle.removeClass(this._StBottomLeft, "stWhite");

        if (isFront) {
            $get("divServiceListFront").setAttribute("name", "F");
            handle.removeClass($get("divServiceListFront"), "stDisplay");
            handle.addClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListFMain").appendChild(this._serviceCovePanl);
            handle.removeClass(this._ServiceListIn, "flipperBack");
        }
        else {
            $get("divServiceListFront").setAttribute("name", "B");
            handle.addClass($get("divServiceListFront"), "stDisplay");
            handle.removeClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListBMain").appendChild(this._serviceCovePanl);
            handle.addClass(this._ServiceListIn, "flipperBack");
        }
        var _ins = this;
        var animatoin = new WebSite.Script.Animation();
        var WN = animatoin.fnWN();
        WN.addTranEvent(this._ServiceListIn, function (e) {
            _ins._serviceInfoPanl.style.display = "none";
            _ins._serviceObjPanl.style.display = "none";
            _ins._serviceCovePanl.style.display = "block";
        }, 0.6);
    },
    //对象列表按钮【click】事件
    StBottomLeftBtnClick: function (e) {
        var handle = new HandleClass();
        if (handle.hasClass(this._StBottomLeft, "stWhite")) {
            return false;
        }
        var isFront = $get("divServiceListFront").getAttribute("name") == "B";
        handle.addClass(this._StBottomLeft, "stWhite");
        handle.removeClass(this._StBottomRight, "stWhite");
        handle.removeClass(this._StTopRight, "stWhite");

        if (isFront) {
            $get("divServiceListFront").setAttribute("name", "F");
            handle.removeClass($get("divServiceListFront"), "stDisplay");
            handle.addClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListFMain").appendChild(this._serviceObjPanl);
            handle.removeClass(this._ServiceListIn, "flipperBack");
        }
        else {
            $get("divServiceListFront").setAttribute("name", "B");
            handle.addClass($get("divServiceListFront"), "stDisplay");
            handle.removeClass($get("divServiceListBack"), "stDisplay");
            $get("divServiceListBMain").appendChild(this._serviceObjPanl);
            handle.addClass(this._ServiceListIn, "flipperBack");
        }
        var _ins = this;
        var animatoin = new WebSite.Script.Animation();
        var WN = animatoin.fnWN();
        WN.addTranEvent(this._ServiceListIn, function (e) {
            _ins._serviceInfoPanl.style.display = "none";
            _ins._serviceCovePanl.style.display = "none";
            _ins._serviceObjPanl.style.display = "block";
        }, 0.6);
    },
    //service面板上下拖拽方法
    ResizeBox: function (oParent, handle, isTop, lockY) {
        var handle = handle;
        handle.onmousedown = function (event) {
            var dragMinHeight = 220;
            var bDrag = true;
            var event = event || window.event;
            var disY = event.clientY - handle.offsetTop;
            if (oParent.offsetTop < 0) {
                oParent.offsetTop = 0;
            }
            var iParentTop = oParent.offsetTop;
            var iParentHeight = oParent.offsetHeight;
            this.setCapture && this.setCapture();
            document.onmousemove = function (event) {
                if (!bDrag) return;
                var event = event || window.event;
                var iT = event.clientY - disY;
                if (oParent.offsetTop < 0) {
                    oParent.offsetTop = 0;
                }
                var maxH = document.documentElement.clientHeight - oParent.offsetTop - 84;
                var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                isTop && (oParent.style.top = iParentTop + iT + "px");
                iH < dragMinHeight && (iH = dragMinHeight);
                if (iH == dragMinHeight) {
                    oParent.style.top = (document.documentElement.clientHeight - 220 - 85) + "px";
                }
                var minTop = parseInt(oParent.style.top.split("px")[0]);
                if (minTop < 0) {
                    oParent.style.top = "0px";
                }
                iH > maxH && (iH = maxH);
                lockY || (oParent.style.height = iH + "px");
                return false;
            };
            document.onmouseup = function () {
                bDrag = false;
                handle.releaseCapture && handle.releaseCapture();
            };
            return false;
        }
    },
    //service面板回到最初的大小方法
    RestoreBtnClick: function (e) {
        var oParent = $get("divServiceList");
        if (document.getElementById("divServiceListRestore1").getAttribute("name") == "toTop") {
            document.getElementById("divServiceListRestore1").setAttribute("name", "toBottom");
            document.getElementById("divServiceListRestore2").setAttribute("name", "toBottom");
            document.getElementById("divServiceListRestore1").children[0].src = "Images/ic_menu_toBottom.png";
            document.getElementById("divServiceListRestore2").children[0].src = "Images/ic_menu_toBottom.png";
            document.getElementById("divServiceListRestore1").title = "还原";
            document.getElementById("divServiceListRestore2").title = "还原";
            oParent.style.top = "0px";
            oParent.style.height = (document.documentElement.clientHeight - 84) + "px";
        }
        else {
            document.getElementById("divServiceListRestore1").setAttribute("name", "toTop");
            document.getElementById("divServiceListRestore2").setAttribute("name", "toTop");
            document.getElementById("divServiceListRestore1").children[0].src = "Images/ic_menu_toTop.png";
            document.getElementById("divServiceListRestore2").children[0].src = "Images/ic_menu_toTop.png";
            document.getElementById("divServiceListRestore1").title = "最大化";
            document.getElementById("divServiceListRestore2").title = "最大化";
            oParent.style.top = (document.documentElement.clientHeight - 220 - 84) + "px";
            oParent.style.height = "220px";
        }
    },
    //创建数据资源面板方法
    CreateInfoDom: function () {
        var titleDiv = document.createElement("div");
        titleDiv.className = "ServiceListTitle";
        titleDiv.innerHTML = "数据资源";
        this._serviceInfoPanl.appendChild(titleDiv);

        var divState = document.createElement("div");
        divState.className = "ServiceListState";
        this._serviceInfoPanl.appendChild(divState);

        var divStateIn = document.createElement("div");
        divStateIn.className = "ServiceState";
        divStateIn.id = "divServiceState";
        divState.appendChild(divStateIn);

        var divInfoBox = document.createElement("div");
        divInfoBox.className = "ServiceListInfoBox";
        divInfoBox.id = "divServiceListInfoBox";
        this._serviceInfoPanl.appendChild(divInfoBox);


        //type:tiled[切片图]；dynamic[动态图]
        this.__JsonInfo = [{ name: "全省影像图", id: 1, stype: 1, imgname: "coveImg_1.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/ProvinceImage/MapServer", opacity: 1.0 },
            { name: "基础地形图", id: 2, stype: 1, imgname: "coveImg_2.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/Vector_New/MapServer", opacity: 1.0 },
            //{ name: "基础地形图", id: 2, stype: 1, imgname: "coveImg_2.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/VectorPro/MapServer", opacity: 1.0 },
            //{ name: "主要河流", id: 3, stype: 1, imgname: "coveImg_12.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/River28/MapServer", opacity: 1.0 },
            { name: "行政区划图", id: 4, stype: 1, imgname: "coveImg_3.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/AdministrativeRegion/MapServer", opacity: 1.0 },
            //{ name: "监控断面", id: 5, stype: 1, imgname: "coveImg_4.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer", opacity: 1.0 },
            { name: "控制单元", id: 6, stype: 1, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/ControlUnitPro/MapServer", opacity: 0.7 },
            //{ name: "重点河流", id: 7, stype: 1, imgname: "coveImg_6.png", type: "dynamic",
            //url: "http://192.168.12.197:6080/arcgis/rest/services/Special/KeyRiver/MapServer", opacity: 1.0 },
            { name: "重点河流", id: 7, stype: 1, imgname: "coveImg_6.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/DuanMianKeyRiver/MapServer", opacity: 1.0 },
            { name: "直管县", id: 8, stype: 1, imgname: "coveImg_2.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/%E7%9B%B4%E7%AE%A1%E5%8E%BF/MapServer", opacity: 0.8 },
            //{ name: "重点污染源", id: 9, stype: 1, imgname: "coveImg_8.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer", opacity: 1.0 },
            //{ name: "城市空气", id: 10, stype: 1, imgname: "coveImg_9.png", type: "", url: "", opacity: 1.0 },
            //{ name: "重点空气区域", id: 11, stype: 1, imgname: "coveImg_10.png", type: "", url: "", opacity: 1.0 },
            //{ name: "饮用水源地", id: 12, stype: 1, imgname: "coveImg_11.png", type: "", url: "", opacity: 1.0 },
            { name: "郑州市", id: 13, stype: 2, imgname: "coveImg_13.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Zhengzhou/MapServer", opacity: 1.0 },
            { name: "开封市", id: 26, stype: 2, imgname: "coveImg_26.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Kaifeng/MapServer", opacity: 1.0 },
            { name: "洛阳市", id: 14, stype: 2, imgname: "coveImg_14.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Luoyang/MapServer", opacity: 1.0 },
            { name: "平顶山市", id: 17, stype: 2, imgname: "coveImg_17.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Pingdingshan/MapServer", opacity: 1.0 },
            { name: "安阳市", id: 16, stype: 2, imgname: "coveImg_16.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Anyang/MapServer", opacity: 1.0 },
            { name: "鹤壁市", id: 19, stype: 2, imgname: "coveImg_19.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Hebi/MapServer", opacity: 1.0 },
            { name: "新乡市", id: 20, stype: 2, imgname: "coveImg_20.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Xinxiang/MapServer", opacity: 1.0 },
            { name: "焦作市", id: 15, stype: 2, imgname: "coveImg_15.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Jiaozhuo/MapServer", opacity: 1.0 },
            { name: "濮阳市", id: 24, stype: 2, imgname: "coveImg_24.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Puyang/MapServer", opacity: 1.0 },
            { name: "许昌市", id: 25, stype: 2, imgname: "coveImg_25.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Xuchang/MapServer", opacity: 1.0 },
            { name: "漯河市", id: 18, stype: 2, imgname: "coveImg_18.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Luohe/MapServer", opacity: 1.0 },
            { name: "三门峡市", id: 27, stype: 2, imgname: "coveImg_27.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Sanmenxia/MapServer", opacity: 1.0 },
            { name: "南阳市", id: 21, stype: 2, imgname: "coveImg_21.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Nanyang/MapServer", opacity: 1.0 },
            { name: "商丘市", id: 23, stype: 2, imgname: "coveImg_23.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Shangqiu/MapServer", opacity: 1.0 },
            { name: "信阳市", id: 28, stype: 2, imgname: "coveImg_28.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Xinyang/MapServer", opacity: 1.0 },
            { name: "周口市", id: 30, stype: 2, imgname: "coveImg_30.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Zhoukou/MapServer", opacity: 1.0 },
            { name: "驻马店市", id: 29, stype: 2, imgname: "coveImg_29.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Zhumadian/MapServer", opacity: 1.0 },
            { name: "济源市", id: 22, stype: 2, imgname: "coveImg_22.png", type: "tiled", url: "http://192.168.12.197:6080/arcgis/rest/services/CityImages/City_Jiyuan/MapServer", opacity: 1.0 },

            { name: "卫河新乡段", id: 31, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAVimage/MapServer", opacity: 1.0 },
            { name: "卫河滑县段", id: 32, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_WH_HX/MapServer", opacity: 1.0 },
            { name: "卫河浚县段", id: 33, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_WH_JX/MapServer", opacity: 1.0 },
            { name: "贾鲁河西华段", id: 34, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_JLH_XH/MapServer", opacity: 1.0 },
            { name: "贾鲁河中牟段", id: 35, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_JLH_ZM/MapServer", opacity: 1.0 },
            { name: "贾鲁河郑州段", id: 36, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_JLH_ZZ/MapServer", opacity: 1.0 },
            { name: "贾鲁河扶沟段", id: 37, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_JLH_FG/MapServer", opacity: 1.0 },
            { name: "惠济河柘城段", id: 38, stype: 3, imgname: "coveImg_41.png", type: "tiled", url: "http://10.41.100.96:6080/arcgis/rest/services/UAV/UAV_HJH_ZC/MapServer", opacity: 1.0 },

            // { name: "2014年COD统计分布图", id: 31, stype: 3, imgname: "coveImg_31.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_COD_2014/MapServer", opacity: 1.0 },
            // { name: "2015年COD统计分布图", id: 32, stype: 3, imgname: "coveImg_31.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_COD_2015/MapServer", opacity: 1.0 },
            // { name: "2014年氨氮统计分布图", id: 33, stype: 3, imgname: "coveImg_32.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_NN_2014/MapServer", opacity: 1.0 },
            // { name: "2015年氨氮统计分布图", id: 34, stype: 3, imgname: "coveImg_32.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_NN_2015/MapServer", opacity: 1.0 },
            //{ name: "空气质量指数", id: 99, stype: 3, imgname: "coveImg_AQI.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirAQI/MapServer", opacity: 1.0 },
            //{ name: "2014年氮氧化物统计分布图", id: 35, stype: 3, imgname: "coveImg_NOX.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_NOX_2014/MapServer", opacity: 1.0 },
            //{ name: "2015年氮氧化物统计分布图", id: 36, stype: 3, imgname: "coveImg_NOX.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_NOX_2015/MapServer", opacity: 1.0 },
            //{ name: "2014年二氧化硫统计分布图", id: 37, stype: 3, imgname: "coveImg_SO2.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_CO2_2014/MapServer", opacity: 1.0 },
            //{ name: "2015年二氧化硫统计分布图", id: 38, stype: 3, imgname: "coveImg_SO2.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_CO2_2015/MapServer", opacity: 1.0 },
            //{ name: "2014年烟尘统计分布图", id: 39, stype: 3, imgname: "coveImg_YC.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_PM_2014/MapServer", opacity: 1.0 },
            //{ name: "2015年烟尘统计分布图", id: 40, stype: 3, imgname: "coveImg_YC.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/FQ_PM_2015/MapServer", opacity: 1.0 },

            { name: "水功能区", id: 41, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/shuigongnengqu/MapServer", opacity: 1.0 },
            { name: "产业聚集区", id: 42, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/IndustrialArea/MapServer", opacity: 0.5 },
            { name: "生态功能区", id: 43, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/shengtaigongnengqu/MapServer", opacity: 1.0 },
            { name: "“四区三带”生态安全", id: 44, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/siqusandai/MapServer", opacity: 1.0 },
            { name: "四大流域", id: 444, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/Special/HeNanWatershed/MapServer", opacity: 1.0 },
            
            { name: "地表水利用能区", id: 45, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/dibiaoshuiliyong/MapServer", opacity: 1.0 },
            { name: "地下水开采", id: 46, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/dixiashuikaicai/MapServer", opacity: 1.0 },
            { name: "地质灾害", id: 47, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/dizhizhaihai/MapServer", opacity: 1.0 },
            { name: "人均GDP分布", id: 48, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/gdpfenbu/MapServer", opacity: 1.0 },
            { name: "洪水调蓄区", id: 49, stype: 4, imgname: "coveImg_5.png", type: "dynamic", url: "http://192.168.12.197:6080/arcgis/rest/services/FunctionArea/hongshuitiaoxuqu/MapServer", opacity: 1.0 },

            { name: "ESRI地形图", id: 50, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer", opacity: 1.0 },
            { name: "ESRI街道地图", id: 51, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer", opacity: 1.0 },
            { name: "ESRI街道地图(蓝)", id: 52, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer", opacity: 1.0 },
            { name: "ESRI街道地图(灰)", id: 53, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer", opacity: 1.0 },
            { name: "ESRI郑州市地形图", id: 54, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/ZhengZhou_Community_BaseMap_CHN/MapServer", opacity: 1.0 },
            { name: "ESRI影像图", id: 55, stype: 5, imgname: "coveImg_5.png", type: "ESRItiled", url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", opacity: 1.0 },
            //{ name: "百度地图地形图", id: 56, stype: 5, imgname: "coveImg_5.png", type: "outsideBD", url: "", opacity: 1.0 }, 2016年10月26日10:08:01  王岩松
            //{ name: "百度地图影像图", id: 57, stype: 6, imgname: "coveImg_5.png", type: "outsideBD", url: "", opacity: 1.0 },
            { name: "天地图地形图", id: 58, stype: 5, imgname: "coveImg_5.png", type: "outsideT", url: "", opacity: 1.0 }//,
            //{ name: "天地图影像图", id: 59, stype: 7, imgname: "coveImg_5.png", type: "outsideT", url: "", opacity: 1.0 }

        ]
        //var jsonType = [{ name: "基础图", id: 1, children: [] }, { name: "影像图", id: 2, children: [] }, { name: "功能区图", id: 4, children: [] }, { name: "ESRI地图", id: 5, children: [] }, { name: "百度地图", id: 6, children: [] }, { name: "天地图", id: 7, children: [] }];//, { name: "渲染图", id: 3, children: [] }  2016年10月26日10:07:11 王岩松  隐藏点百度没用的不可叠加的地图
        var jsonType = [{ name: "基础图", id: 1, children: [] }, { name: "影像图", id: 2, children: [] }, { name: "航拍影像", id: 3, children: [] }, { name: "功能区图", id: 4, children: [] }, { name: "外部地图", id: 5, children: [] }];//, { name: "渲染图", id: 3, children: [] }
        for (var m = 0; m < jsonType.length; m++) {
            for (var n = 0; n < this.__JsonInfo.length; n++) {
                if (jsonType[m].id == this.__JsonInfo[n].stype) {
                    var obj = this.__JsonInfo[n];
                    jsonType[m].children.push(obj);
                }
            }
        }
        for (var o = 0; o < jsonType.length; o++) {
            var divSerBox = document.createElement("div");
            divSerBox.className = "servicesListBox";
            divInfoBox.appendChild(divSerBox);

            var divTitle = document.createElement("div");
            divTitle.className = "servicesTitle";
            divTitle.setAttribute("name", "open");
            $addHandler(divTitle, "click", Function.createDelegate(this, this.ObjCityTopLeftClick));
            divSerBox.appendChild(divTitle);

            var divSerList = document.createElement("div");
            divSerList.className = "servicesCoveList";
            divSerBox.appendChild(divSerList);

            var divTitleImg = document.createElement("div");
            divTitleImg.className = "servicesTitleImg";
            divTitleImg.innerHTML = "<img src='Images/menu_open.png' class='servicesTitleIcon' />";
            divTitle.appendChild(divTitleImg);

            var divTitleText = document.createElement("div");
            divTitleText.className = "servicesTitleText";
            divTitleText.innerHTML = jsonType[o].name;
            divTitle.appendChild(divTitleText);

            for (var i = 0; i < jsonType[o].children.length; i++) {
                var divInfo = document.createElement("div");
                divInfo.className = "ServiceInfo";
                divInfo.id = "ServiceInfo_" + jsonType[o].children[i].id;
                divSerList.appendChild(divInfo);
                var divImg = document.createElement("div");
                divImg.className = "ServiceImg";
                divImg.setAttribute("type", jsonType[o].children[i].type);
                divImg.setAttribute("urlText", jsonType[o].children[i].url);
                divImg.setAttribute("opaText", jsonType[o].children[i].opacity);
                divImg.style.backgroundImage = "url(../WebSite/Images/coveImages/" + jsonType[o].children[i].imgname + ")";
                $addHandler(divImg, "mousedown", Function.createDelegate(this, this.ImgMouseDown));
                divInfo.appendChild(divImg);

                var divText = document.createElement("div");
                divText.className = "ServiceText";
                divText.innerHTML = jsonType[o].children[i].name;
                divInfo.appendChild(divText);

                var shadeDiv = document.createElement("div");
                shadeDiv.className = "ServiceInfoImg";
                divInfo.appendChild(shadeDiv);
                if (map.layerIds.length > 0) {
                    var layers = map.layerIds;
                    for (var j = 0; j < map.layerIds.length; j++) {
                        if (divImg.getAttribute("urlText") == map.getLayer(layers[j]).url) {
                            shadeDiv.style.display = "block";
                            var type = divImg.getAttribute("type");
                            var url = divImg.getAttribute("urlText");
                            var opacity = divImg.getAttribute("opaText");
                            this.MapLayersControl(type, url, opacity);
                        }
                    }
                }

                $addHandler(divInfo, "mouseover", Function.createDelegate(this, this.InfoMouseOver));
                $addHandler(divInfo, "mouseout", Function.createDelegate(this, this.InfoMouseOut));
            }
            var divboth = document.createElement("div");
            divboth.style.clear = "both";
            divSerList.appendChild(divboth);
        }

    },
    ObjCityTopLeftClick: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var state = null;
        while (elem.className) {
            if (elem.className == "servicesTitle") {
                state = elem.getAttribute("name");
                if (state == "close") {
                    elem.setAttribute("name", "open");
                    elem.children[0].children[0].src = "Images/menu_open.png";
                    elem.parentNode.children[1].style.display = "block";
                }
                else {
                    elem.setAttribute("name", "close");
                    elem.children[0].children[0].src = "Images/menu_close.png";
                    elem.parentNode.children[1].style.display = "none";
                }
                break;
            }
            elem = elem.parentNode;
        }
    },
    //创建图层列表面板方法
    CreateCoveDom: function () {
        var topDiv = document.createElement("div");
        topDiv.className = "ServiceListTitle";
        this._serviceCovePanl.appendChild(topDiv);

        var titleDiv = document.createElement("div");
        titleDiv.className = "ServiceTopLeft";
        titleDiv.innerHTML = "图层列表";
        topDiv.appendChild(titleDiv);

        var opacityDiv = document.createElement("div");
        opacityDiv.className = "ServiceTopRight";
        opacityDiv.setAttribute("unselectable", "on");
        topDiv.appendChild(opacityDiv);

        var opaTextDiv = document.createElement("div");
        opaTextDiv.className = "opaText";
        opaTextDiv.innerHTML = "透明度";
        opacityDiv.appendChild(opaTextDiv);

        var opaBoxDiv = document.createElement("div");
        opaBoxDiv.className = "opacityBox";
        opaBoxDiv.id = "divOpaBox";
        opacityDiv.appendChild(opaBoxDiv);

        var opaValueDiv = document.createElement("div");
        opaValueDiv.className = "opaValue";
        opaValueDiv.id = "divOpaValue";
        opacityDiv.appendChild(opaValueDiv);

        var slider = new neverModules.modules.slider({
            targetId: "divOpaBox",
            sliderCss: "opaSlider",
            barCss: "opaBar",
            min: 0,
            max: 100
        });
        var _ins = this;
        //slider.onstart = function () {
        //    $get("divOpaValue").innerHTML = slider.getValue() + "%";
        //}
        slider.onchange = function () {
            $get("divOpaValue").innerHTML = slider.getValue() + "%";
            if (_ins.layerId == null) {
                return;
            }
            map.getLayer(_ins.layerId).setOpacity(slider.getValue() / 100);

        };
        //slider.onend = function () {
        //    $get("divOpaValue").innerHTML = slider.getValue() + "%";
        //}
        slider.create();
        slider.setValue(0);

        var coveMainDiv = document.createElement("div");
        coveMainDiv.className = "CoveMain";
        this._serviceCovePanl.appendChild(coveMainDiv);

        var coveMainIn = document.createElement("div");
        coveMainIn.className = "CoveMainIn";
        coveMainIn.id = "divCoveMain";
        coveMainDiv.appendChild(coveMainIn);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "CoveBottom";
        this._serviceCovePanl.appendChild(bottomDiv);

        for (var j = 1; j <= 6; j++) {
            var barDiv = document.createElement("div");
            barDiv.className = "CoveToolBar";
            barDiv.id = "divBar_" + j;
            barDiv.innerHTML = "<img src='Images/CoveBottomImg_" + j + ".png' class='CoveToolBarImg' />";//Images/CoveBottomImg_
            $addHandler(barDiv, "click", Function.createDelegate(this, this.CoveBarClick));
            bottomDiv.appendChild(barDiv);
        }
    },
    //创建对象列表面板方法
    CreateObjDom: function () {
        //王岩松  2016年12月13日21:10:02   添加  站点数量
        var vard = "省管电厂(60)";
        var varw = "污水处理厂(204)";
        var varq = "废气企业(218)";
        var vars = "废水企业(146)";
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=0&pstype=D",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                vard = "省管电厂(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=0&pstype=W",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                varw = "污水处理厂(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=0&pstype=Q",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                varq = "废气企业(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=0&pstype=S",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                vars = "废水企业(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });

        var varkqs = "市级空气站(95)";
        var varkqx = "县级空气站(192)";
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=1&pstype=0",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                varkqs = "市级空气站(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });
        $.ajax({
            type: "GET",  //默认是GET
            url: "ashx/TotalSite.ashx?ison=1&pstype=1",
            dataType: "json",
            async: false,  //是否异步
            cache: false, //不加载缓存
            success: function (data) {
                //陈程修改根据权限加载卡片
                varkqx = "县级空气站(" + eval('(' + data[0].dtotal + ')') + ")";
            }
        });


        //this._serviceObjPanl = document.createElement("div");
        //this._serviceObjPanl.className = "ServiceListBox";
        //this._serviceObjPanl.id = "divServiceObjPanl";

        var topDiv = document.createElement("div");
        topDiv.className = "ObjTopDiv";
        this._serviceObjPanl.appendChild(topDiv);

        var topLeftDiv = document.createElement("div");
        topLeftDiv.className = "ObjTopLeft";
        topLeftDiv.id = "divObjTopLeft";
        topLeftDiv.innerHTML = "对象列表";
        topDiv.appendChild(topLeftDiv);

        var topRightDiv = document.createElement("div");
        topRightDiv.className = "ObjTopRight";
        this._serviceObjPanl.appendChild(topRightDiv);

        var searchTxt = document.createElement("input");
        searchTxt.type = "text";
        searchTxt.className = "searchTxt";
        searchTxt.id = "inputSearch";
        searchTxt.placeholder = "搜索";
        $addHandler(searchTxt, "keydown", Function.createDelegate(this, this.SearchTxtKeyDown));
        $addHandler(searchTxt, "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
        topRightDiv.appendChild(searchTxt);

        var middleDiv = document.createElement("div");
        middleDiv.className = "ObjMiddleDiv";
        middleDiv.id = "divCheckBoxex";
        this._serviceObjPanl.appendChild(middleDiv);

        this.CreateObjMiddleDom(middleDiv, vard, "checkBox_power","","1");
        this.CreateObjMiddleDom(middleDiv, varw, "checkBox_sewage", "", "1");
        this.CreateObjMiddleDom(middleDiv, varq, "checkBox_gas", "", "1");
        this.CreateObjMiddleDom(middleDiv, vars, "checkBox_water", "", "1");

        var middleDiv1 = document.createElement("div");
        middleDiv1.className = "ObjMiddleDiv";
        middleDiv1.style.height = "25px";
        middleDiv1.id = "divCheckBoxexTow";
        this._serviceObjPanl.appendChild(middleDiv1);

        this.CreateObjMiddleDom(middleDiv1, varkqs, "checkBox_city", "", "1");
        this.CreateObjMiddleDom(middleDiv1, varkqx, "checkBox_county", "", "0");

        var companyList = document.createElement("div");
        companyList.className = "ObjMainBox";
        this._serviceObjPanl.appendChild(companyList);

        var companyListIn = document.createElement("div");
        companyListIn.className = "ObjMainBoxIn";
        companyListIn.id = "companyListDiv";
        companyList.appendChild(companyListIn);

    },
    SearchTxtKeyDown: function (evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault();
        }
    },
    SearchTxtSelectstart: function (event) {
        event.rawEvent.cancelBubble = true;
    },
    //创建对象列表中checkbox复选框方法
    CreateObjMiddleDom: function (elem, text, id, fn,ck) {
        var middleOneDiv = document.createElement("div");
        middleOneDiv.className = "ObjMiddleIn";
        //$addHandler(middleOneDiv, "click", Function.createDelegate(this, fn));
        elem.appendChild(middleOneDiv);

        var middleOneLeft = document.createElement("div");
        middleOneLeft.className = "ObjMiddleInLeft";
        middleOneDiv.appendChild(middleOneLeft);

        //王岩松 2016年12月13日20:40:35  ）  0、 不显示复选框   1、显示复选框
        if (ck == "0")
        {
            var checkBoxOneDiv = document.createElement("div");
            checkBoxOneDiv.className = "squaredOne";
            checkBoxOneDiv.innerHTML = '<input type="checkbox" value="None" id="' + id + '" name="check"  /><label for="' + id + '"></label>';
            middleOneLeft.appendChild(checkBoxOneDiv);
        }
        else {
            var checkBoxOneDiv = document.createElement("div");
            checkBoxOneDiv.className = "squaredOne";
            checkBoxOneDiv.innerHTML = '<input type="checkbox" value="None" id="' + id + '" name="check" checked /><label for="' + id + '"></label>';
            middleOneLeft.appendChild(checkBoxOneDiv);
        }

        var middleOneRight = document.createElement("div");
        middleOneRight.className = "ObjMiddleInRight";
        middleOneRight.innerHTML = text;
        middleOneDiv.appendChild(middleOneRight);

    },

    //鼠标移入数据资源显示详情【mouseover】事件
    InfoMouseOver: function (e) {
        e = e || window.event;
        elem = e.target || e.srcElement;
        $get("divServiceState").innerHTML = "";
        while (elem.className) {
            if (elem.className == "ServiceInfo") {
                $get("divServiceState").innerHTML = elem.children[1].innerHTML;
                break;
            }
            elem = elem.parentNode;
        }
    },
    //鼠标移出数据资源框【mouseout】事件
    InfoMouseOut: function (e) {

    },
    //计算left绝对值
    getLeft: function (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
        return offset;
    },
    //计算top绝对值
    getTop: function (e) {
        var offset = e.offsetTop - e.scrollTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    },
    //鼠标在数据资源图片上按下事件【mousedown】事件
    ImgMouseDown: function (event) {
        var event = event || window.event;
        var elem = event.target || event.srcElement;
        var dis = elem.parentNode.children[2].style.display;
        if (dis == "block") {
            return;
        }
        this._elem = elem;
        var oT = this.getTop(elem);
        var oL = this.getLeft(elem);
        var div = null;
        if ($get("divDrag")) {
            div = $get("divDrag");
            div.setAttribute("type", elem.attributes["type"].value);
            div.setAttribute("urlText", elem.attributes["urlText"].value);
            div.setAttribute("opaText", elem.attributes["opaText"].value);
            div.style.top = oT + "px";
            div.style.left = oL + "px";
            div.style.backgroundImage = elem.style.backgroundImage;
            div.style.display = "block";
        }
        else {
            div = document.createElement("div");
            div.id = "divDrag";
            div.className = "ServiceImg";
            div.setAttribute("type", elem.attributes["type"].value);
            div.setAttribute("urlText", elem.attributes["urlText"].value);
            div.setAttribute("opaText", elem.attributes["opaText"].value);
            div.style.position = "fixed";
            div.style.top = oT + "px";
            div.style.left = oL + "px";
            div.style.opacity = "0.8";
            div.style.zIndex = "1000";
            div.style.backgroundImage = elem.style.backgroundImage;
            document.body.appendChild(div);
        }
        //elem.style.borderColor = "#8B0000";
        this._isDrag = true;
        this._disX = event.clientX - oL;
        this._disY = event.clientY - oT;
        this.setCapture && this.setCapture();
        $addHandler(this._doc, "mousemove", Function.createDelegate(this, this.InfoMouseMove));
        $addHandler(this._doc, "mouseup", Function.createDelegate(this, this.InfoMouseUp));
        $addHandler(this._win, "blur", Function.createDelegate(this, this.InfoWindowBlur));
        $addHandler($get("divDrag"), "losecapture", Function.createDelegate(this, this.InfoWindowBlur));
    },
    //鼠标移动事件【mousemove】事件
    InfoMouseMove: function (event) {
        if (!this._isDrag) return;
        var event = event || window.event;
        var iL = event.clientX - this._disX;
        var iT = event.clientY - this._disY;
        $get("divDrag").style.left = iL + "px";
        $get("divDrag").style.top = iT + "px";
        return false
    },
    InfoWindowBlur: function () {
        this._isDrag = false;
        $get("divDrag").releaseCapture && $get("divDrag").releaseCapture();

    },
    //鼠标左键松开事件【mouseup】事件
    InfoMouseUp: function (evt) {
        var pT = this.getTop(this._ServiceList);
        var pL = this.getLeft(this._ServiceList);
        var oT = parseFloat($get("divDrag").style.top);
        var oL = parseFloat($get("divDrag").style.left);
        this._isDrag = false;
        $get("divDrag").releaseCapture && $get("divDrag").releaseCapture();
        $get("divDrag").style.display = "none";
        $get("divDrag").style.backgroundImage = "none";
        if (pT > (oT + 67) || pL > (oL + 67)) {
            isverticalswipe = false;
            var type = $get("divDrag").getAttribute("type");
            var url = $get("divDrag").getAttribute("urlText");
            var opacity = $get("divDrag").getAttribute("opaText");
            var mapType = $get("map").getAttribute("name");
            switch (type) {
                case "tiled":
                    if (mapType != type) {
                        $.messager.confirm("操作提示", "执行操作需要切换底图，您确定要执行操作吗？", Function.createDelegate(this, this.changeMapLayerMessage));
                    }
                    else {
                        //加载图层控制
                        this._elem.parentNode.children[2].style.display = "block";
                        this.MapLayersControl(type, url, opacity);
                    }
                    break;
                case "ESRItiled":
                    if (mapType != type) {
                        $.messager.confirm("操作提示", "执行操作需要切换底图，您确定要执行操作吗？", Function.createDelegate(this, this.changeMapLayerMessage));
                    }
                    else {
                        //加载图层控制
                        this._elem.parentNode.children[2].style.display = "block";
                        this.MapLayersControl(type, url, opacity);
                    }
                    break;
                case "dynamic":
                    if (type == "outsideBD") {//|| type == "outsideT"
                        $.messager.confirm("操作提示", "不支持底图为百度地图和天地图，执行操作需要切换底图，您确定要执行操作吗？", Function.createDelegate(this, this.changeMapLayerMessage));
                    }
                    else {
                        //加载图层控制
                        this._elem.parentNode.children[2].style.display = "block";
                        this.MapLayersControl(type, url, opacity);
                    }
                    break;
                case "outsideBD":
                    if (mapType != type) {
                        $.messager.confirm("操作提示", "由于百度地图对其坐标进行了二次加密，底图改为百度地图，会不能进行其他操作，您确定要执行操作吗？", Function.createDelegate(this, this.changeMapLayerMessage));
                    }
                    break;
                case "outsideT":
                    if (mapType != type) {
                        $.messager.confirm("操作提示", "执行操作需要切换底图，您确定要执行操作吗？", Function.createDelegate(this, this.changeMapLayerMessage));
                    }
                    break;
            }
        }
        $clearHandlers(this._doc);
        $clearHandlers(this._win);
        $clearHandlers($get("divDrag"));
    },
    changeMapLayerMessage: function (data) {
        var data = data;
        var _ins = this;
        require(["esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "BDDTMapLayer/BDAnoLayer",
        "BDDTMapLayer/BDVecLayer",
        "TDTMapLayer/TDTAnnoLayer",
        "TDTMapLayer/TDTLayer",
        "dojo/dom-construct",
        "dojo/domReady!"
        ],
            function (Map, Tiled, Dynamic, BDAnoLayer, BDVecLayer, TDTAnnoLayer, TDTLayer, domConstruct) {
                if (data) {
                    var type = _ins._elem.attributes["type"].value;
                    var url = _ins._elem.attributes["urlText"].value;
                    var opacity = _ins._elem.attributes["opaText"].value;
                    if (type == "dynamic") {
                        type = "tiled";
                    }
                    map.destroy();
                    var divs = document.getElementsByClassName("ServiceInfo");
                    for (var i = 0; i < divs.length; i++) {
                        divs[i].children[2].style.display = "none";
                    }
                    _ins._elem.parentNode.children[2].style.display = "block";
                    var oExtent;
                    switch (type) {
                        case "tiled":
                            oExtent = new esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
                            break;
                        case "ESRItiled":
                            oExtent = new esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
                            break;
                        case "outsideBD":
                            oExtent = new esri.geometry.Extent({ "xmin": 7200197.211844, "ymin": 2073799.6144376, "xmax": 7970676.854297, "ymax": 2756563.6661405, "spatialReference": { wkid: 3857 } });
                            break;
                        case "outsideT":
                            oExtent = new esri.geometry.Extent({ "xmin": 110.11068156, "ymin": 31.332896687, "xmax": 117.032084004, "ymax": 36.42122389, "spatialReference": { wkid: 4326 } });
                            break;
                    }
                    //var oExtent = new esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
                    //var oExtent = new esri.geometry.Extent({ "xmin": 7200197.211844, "ymin": 2073799.6144376, "xmax": 7970676.854297, "ymax": 2756563.6661405, "spatialReference": { wkid: 3857 } });
                    map = new esri.Map("map", {
                        infoWindow: customInfoWindow,
                        logo: false,
                        extent: oExtent
                    });
                    switch (type) {
                        case "tiled":
                            var baseLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://192.168.12.197:6080/arcgis/rest/services/Vector_New/MapServer", { id: "baseMapLayer" });
                            map.addLayer(baseLayer);
                            $get("ServiceInfo_2").children[2].style.display = "block";
                            document.getElementById("map").setAttribute("name", "tiled");
                            break;
                        case "ESRItiled":
                            var baseLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer", { id: "baseMapLayer" });
                            map.addLayer(baseLayer);
                            $get("ServiceInfo_50").children[2].style.display = "block";
                            document.getElementById("map").setAttribute("name", "ESRItiled");
                            break;
                        case "outsideBD":
                            var baseLayer = new BDVecLayer();
                            baseLayer.id = "baseMapLayer";
                            map.addLayer(baseLayer);
                            $get("ServiceInfo_56").children[2].style.display = "block";
                            document.getElementById("map").setAttribute("name", "outsideBD");
                            break;
                        case "outsideT":
                            var baseLayer = new TDTLayer();
                            baseLayer.id = "baseMapLayer";
                            var tLayer = new TDTAnnoLayer();
                            map.addLayers([baseLayer,tLayer]);
                            $get("ServiceInfo_58").children[2].style.display = "block";
                            document.getElementById("map").setAttribute("name", "outsideT");
                            break;
                    }
                    _ins.MapLayersControl(type, url, opacity);
                }
                else {

                }
            });
    },
    //图层列表底部按钮【click】事件
    CoveBarClick: function (evt) {
        var e = evt || window.event;
        var elem = e.target || e.srcElement;
        var num = 0;
        while (elem.className) {
            if (elem.className == "CoveToolBar") {
                var numStr = elem.id.split("_")[1];
                num = parseInt(numStr);
                break;
            }
            elem = elem.parentNode;
        }
        var layer = map.getLayer(this.layerId)
        var coveDiv = document.getElementById("div_" + this.layerId);
        switch (num) {
            case 1:
                if (!layer) {
                    return
                }
                map.removeLayer(layer);
                var id = coveDiv.getAttribute("idtext");
                document.getElementById("ServiceInfo_" + id).children[2].style.display = "none";
                document.getElementById("divCoveMain").removeChild(coveDiv);
                $get("divOpaBox_bar").style.left = "0px";
                $get("divOpaValue").innerHTML = "0%";
                break;
            case 2:
                if (!layer) {
                    return
                }
                if (document.getElementById("divCoveMain").lastChild != coveDiv) {
                    var index = 0;
                    for (var i = 0; i < map.layerIds.length; i++) {
                        if (map.layerIds[i] == this.layerId) {
                            index = i;
                            break;
                        }
                    }
                    map.reorderLayer(layer, index - 1);
                    var topDiv = coveDiv.nextSibling;
                    document.getElementById("divCoveMain").insertBefore(coveDiv, topDiv.nextSibling);
                }
                break;
            case 3:
                if (!layer) {
                    return
                }
                if (document.getElementById("divCoveMain").firstChild != coveDiv) {
                    var index = 0;
                    for (var i = 0; i < map.layerIds.length; i++) {
                        if (map.layerIds[i] == this.layerId) {
                            index = i;
                            break;
                        }
                    }
                    map.reorderLayer(layer, index + 1);
                    var topDiv = coveDiv.previousSibling;
                    document.getElementById("divCoveMain").insertBefore(coveDiv, topDiv);
                }
                break;
            case 4:
                if (!layer) {
                    return
                }
                if (document.getElementById("divCoveMain").lastChild != coveDiv) {
                    map.reorderLayer(layer, 0);
                    var topDiv = document.getElementById("divCoveMain").lastChild;
                    document.getElementById("divCoveMain").insertBefore(coveDiv, topDiv.nextSibling);

                }
                break;
            case 5:
                if (!layer) {
                    return
                }
                if (document.getElementById("divCoveMain").firstChild != coveDiv) {
                    map.reorderLayer(layer, map.layerIds.length - 1);
                    var topDiv = document.getElementById("divCoveMain").firstChild;
                    document.getElementById("divCoveMain").insertBefore(coveDiv, topDiv);
                }
                break;
            case 6:
                var arrLayers = [];
                $.extend(true, arrLayers, map.layerIds);
                for (var j = 0; j < arrLayers.length; j++) {
                    if (arrLayers[j] != "baseMapLayer") {
                        map.removeLayer(map.getLayer(arrLayers[j]));
                        if (document.getElementById(arrLayers[j] + "_text").style.background == "rgb(30, 30, 30)") {
                            $get("divOpaBox_bar").style.left = "0px";
                            $get("divOpaValue").innerHTML = "0%";
                        }
                        coveDiv = document.getElementById("div_" + arrLayers[j]);
                        id = coveDiv.getAttribute("idtext");
                        document.getElementById("ServiceInfo_" + id).children[2].style.display = "none"
                        document.getElementById("divCoveMain").removeChild(coveDiv);
                    }
                }
                break;
            case 7:
                break;
        }
    },

    MapLayersControl: function (types, urls, opacitys) {
        var type = types;
        var url = urls;
        var opacity = opacitys;
        var _ins = this;
        require(["esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",
        "dojo/_base/Color",
        "BDDTMapLayer/BDAnoLayer",
        "BDDTMapLayer/BDVecLayer",
        "TDTMapLayer/TDTAnnoLayer",
        "TDTMapLayer/TDTLayer",
        "dojox/charting/Chart2D",
        "dojo/dom-construct",
        "dojo/domReady!"
        ],
            function (Map, Tiled, Dynamic, FeatureLayer, GraphicsLayer, Point, PictureMarkerSymbol, SimpleLineSymbol, SimpleRenderer,
                Color, BDAnoLayer,BDVecLayer,TDTAnnoLayer,TDTLayer, Chart2D, domConstruct) {
                if (url != "") {
                    var layer = null;
                    switch (type) {
                        case "tiled":
                            if (url == "http://192.168.12.197:6080/arcgis/rest/services/Vector_New/MapServer") {
                                layer = new Tiled(url, { id: "baseMapLayer" });
                            }
                            else {
                                layer = new Tiled(url);
                            }
                            layer.setOpacity(parseFloat(opacity));
                            break;
                        case "dynamic":
                            layer = new Dynamic(url);
                            layer.setOpacity(parseFloat(opacity));
                            break;
                        case "ESRItiled":
                            if (url == "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer") {
                                layer = new Tiled(url, { id: "baseMapLayer" });
                            }
                            else {
                                layer = new Tiled(url);
                            }
                            layer.setOpacity(parseFloat(opacity));
                            break;
                    }
                }
                map.addLayer(layer);
                var layers = map.layerIds;
                document.getElementById("divCoveMain").innerHTML = "";
                for (var n = 0; n < layers.length; n++) {
                    olayer = map.getLayer(layers[n]);
                    if (olayer.loaded) {
                        _ins.buildLayerList(olayer);
                    } else {
                        dojo.connect(olayer, "onLoad", Function.createDelegate(_ins, _ins.buildLayerList));
                    }
                }
                if (document.getElementById("mainPrint_button")) {
                    _ins.createPrintSelect();
                }
            });
    },
    buildLayerList: function (layer) {
        var currentLayer = layer;
        var textName = "";
        var id = 0;
        if (currentLayer.url == null) {
            if (document.getElementById("map").getAttribute("name") == "outsideT") {
                if (currentLayer.id == "baseMapLayer") {
                    textName = "天地图地形图";
                    id = 58;
                }
                else {
                    textName = "天地图地形图标注";
                    id = 59;
                }
            }
            else if (document.getElementById("map").getAttribute("name") == "outsideBD") {
                textName = "百度地图地形图";
                id = 56;
            }
        }
        else {
            for (var i = 0; i < this.__JsonInfo.length; i++) {
                if (currentLayer.url == this.__JsonInfo[i].url) {
                    textName = this.__JsonInfo[i].name;
                    id = this.__JsonInfo[i].id;
                    break;
                }
            }
        }
        var isDynamicLayer = false;
        if (layer.declaredClass == "esri.layers.ArcGISDynamicMapServiceLayer") {
            isDynamicLayer = true;
        }
        var mainBox = document.getElementById("divCoveMain");

        var divLayer = document.createElement("div");
        divLayer.className = "CaveLayer";
        divLayer.id = "div_" + currentLayer.id;
        divLayer.setAttribute("idtext", id);
        if (mainBox.children.length == 0) {
            mainBox.appendChild(divLayer);
        }
        else {
            mainBox.insertBefore(divLayer, mainBox.firstChild);
        }

        var divLayerTitle = document.createElement("div");
        divLayerTitle.className = "CaveLayerTitle";
        divLayer.appendChild(divLayerTitle);

        var divLayerTitleLeft = document.createElement("div");
        divLayerTitleLeft.className = "CaveLayerTitleLeft";
        divLayerTitleLeft.innerHTML = '<img src="Images/menu_close.png" class="CaveLayerTitleImg" />'
        $addHandler(divLayerTitleLeft, "click", Function.createDelegate(this, this.LayerTitleClick));
        divLayerTitle.appendChild(divLayerTitleLeft);

        var divChickBoxOut = document.createElement("div");
        divChickBoxOut.className = "CaveLayerCheckOut";
        divLayerTitle.appendChild(divChickBoxOut);

        var divCheckBox = document.createElement("div");
        divCheckBox.className = "squaredOne";
        if (currentLayer.visible) {
            divCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '" name="check" checked /><label for="' +
                currentLayer.id + '"></label>';
        }
        else {
            divCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '" name="check" /><label for="' +
                currentLayer.id + '"></label>';
        }
        divChickBoxOut.appendChild(divCheckBox);
        $addHandler($get(currentLayer.id), "click", Function.createDelegate(this, this.layerCheckClick));

        var divLayerName = document.createElement("div");
        divLayerName.className = 'CoveLayerNameText';
        divLayerName.id = currentLayer.id + "_text";
        divLayerName.innerHTML = textName;
        $addHandler(divLayerName, "click", Function.createDelegate(this, this.LayerTextClick));
        divLayerTitle.appendChild(divLayerName);

        var divLayerBarList = document.createElement("div");
        divLayerBarList.className = "CoveLayerBarList";
        divLayer.appendChild(divLayerBarList);

        var infos = currentLayer.layerInfos;
        if (infos) {
            for (var i = 0; i < infos.length; i++) {
                var info = infos[i];

                var pid = info.parentLayerId;
                var divLayerBar = null;
                if (pid < 0) {
                    divLayerBar = document.createElement("div");
                    divLayerBar.className = "CoveLayerBar";
                    divLayerBarList.appendChild(divLayerBar);

                    var divLayerBarChild = document.createElement("div");
                    divLayerBarChild.className = "CoveLayerBarChild";
                    divLayerBarChild.id = "div" + currentLayer.id + "_" + info.id;
                    divLayerBarList.appendChild(divLayerBarChild);
                }
                else {
                    var parentDiv = $get("div" + currentLayer.id + "_" + pid);
                    divLayerBar = document.createElement("div");
                    divLayerBar.className = "CoveLayerBar";
                    parentDiv.appendChild(divLayerBar);

                    if (info.subLayerIds != null) {
                        var divLayerBarChild = document.createElement("div");
                        divLayerBarChild.className = "CoveLayerBarChild";
                        divLayerBarChild.id = "div" + currentLayer.id + "_" + info.id;
                        parentDiv.appendChild(divLayerBarChild);
                    }
                }
                if (info.subLayerIds != null) {
                    var divLayerBarLeft = document.createElement("div");
                    divLayerBarLeft.className = "CaveLayerTitleLeft";
                    divLayerBarLeft.innerHTML = '<img src="Images/menu_close.png" class="CaveLayerTitleImg" />'
                    $addHandler(divLayerBarLeft, "click", Function.createDelegate(this, this.LayerTitleClick));
                    divLayerBar.appendChild(divLayerBarLeft);
                }
                var divBarCheckOut = document.createElement("div");
                if (info.subLayerIds != null) {
                    divBarCheckOut.className = "CoveLayerBarCheckOut";
                }
                else {
                    divBarCheckOut.className = "CoveLayerBarCheckOut CoveCheckOut_margin";
                }
                divLayerBar.appendChild(divBarCheckOut);

                var divBarCheckBox = document.createElement("div");
                divBarCheckBox.className = "squaredOne";
                if (isDynamicLayer) {
                    if (info.defaultVisibility) {
                        divBarCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '_' + info.id +
                            '" name="check" checked /><label for="' + currentLayer.id + '_' + info.id + '"></label>';
                    }
                    else {
                        divBarCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '_' + info.id +
                            '" name="check" /><label for="' + currentLayer.id + '_' + info.id + '"></label>';
                    }
                    divBarCheckOut.appendChild(divBarCheckBox);
                    $addHandler($get(currentLayer.id + '_' + info.id), "click", Function.createDelegate(this, this.CoveBarCheckBoxClick));
                }
                else {
                    if (info.defaultVisibility) {
                        divBarCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '_' + info.id +
                            '" name="check" checked disabled/><label for="' + currentLayer.id + '_' + info.id + '"></label>';
                    }
                    else {
                        divBarCheckBox.innerHTML = '<input type="checkbox" value="None" id="' + currentLayer.id + '_' + info.id +
                            '" name="check" disabled/><label for="' + currentLayer.id + '_' + info.id + '"></label>';
                    }
                    divBarCheckOut.appendChild(divBarCheckBox);
                }

                var divBarName = document.createElement("div");
                divBarName.className = "CoveLayerBarName";
                divBarName.innerHTML = info.name;
                divLayerBar.appendChild(divBarName);
            }
        }
    },
    LayerTitleClick: function (e) {
        e = e || window.event;
        elem = e.target || e.srcElement;
        while (elem.className) {
            if (elem.className == "CaveLayerTitleLeft") {
                var src = elem.children[0].attributes["src"].value;
                if (src == "Images/menu_close.png") {
                    elem.children[0].attributes["src"].value = "Images/menu_open.png";
                    elem.parentNode.nextSibling.style.display = "block";
                }
                else {
                    elem.children[0].attributes["src"].value = "Images/menu_close.png";
                    elem.parentNode.nextSibling.style.display = "none";
                }
                break;
            }
            elem = elem.parentNode;
        }
    },
    layerCheckClick: function (e) {
        e = e || window.event;
        elem = e.target || e.srcElement;
        var cLayer = map.getLayer(elem.id);
        if (elem.checked) {
            cLayer.setVisibility(true);
        }
        else {
            cLayer.setVisibility(false);
        }
    },
    LayerTextClick: function (e) {
        e = e || window.event;
        elem = e.target || e.srcElement;
        var color = elem.style.background.replace(/\s/g, "");
        if (color == "rgb(30,30,30)") {
            return;
        }
        var mainDiv = $get("divCoveMain");
        for (var j = 0; j < mainDiv.children.length; j++) {
            var colorback = mainDiv.children[j].children[0].children[2].style.background.replace(/\s/g, "");
            if (colorback == "rgb(30,30,30)") {
                mainDiv.children[j].children[0].children[2].style.background = "none";
                break;
            }
        }
        this.layerId = elem.id.split("_")[0];
        elem.style.background = "#1E1E1E";
        var cLayer = map.getLayer(this.layerId);
        $get("divOpaBox_bar").style.left = cLayer.opacity * 93 + "px";
        $get("divOpaValue").innerHTML = cLayer.opacity * 100 + "%";
    },
    CoveBarCheckBoxClick: function (e) {
        e = e || window.event;
        elem = e.target || e.srcElement;
        var arr = elem.id.split('_');
        var layer = map.getLayer(arr[0]);
        var infoId = parseInt(arr[1]);
        var childLayers = [];
        if (elem.checked) {
            layer.layerInfos[infoId].defaultVisibility = true;
        }
        else {
            layer.layerInfos[infoId].defaultVisibility = false;
        }
        for (var i = 0; i < layer.layerInfos.length; i++) {
            if (layer.layerInfos[i].defaultVisibility) {
                childLayers.push(i);
            }
        }
        layer.setVisibleLayers(childLayers);
    },
    createPrintSelect: function () {
        var _ins = this;
        require([
       "esri/map", "esri/layers/FeatureLayer",
       "esri/dijit/Print", "esri/tasks/PrintTemplate",
       "esri/request", "esri/config",
       "dojo/_base/array", "dojo/dom", "dojo/parser",
       "esri/tasks/LegendLayer",
       "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
        ], function (
       Map, FeatureLayer,
       Print, PrintTemplate,
       esriRequest, esriConfig,
       arrayUtils, dom, parser, LegendLayer
     ) {
            parser.parse();
            if (appMain.printer) {
                appMain.printer.destroy();
                appMain = {};
            }

            appMain.printUrl = "http://10.41.100.96:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

            esriConfig.defaults.io.proxyUrl = "/proxy/";

            appMain.map = map;
            // get print templates from the export web map task
            var printInfo = esriRequest({
                "url": appMain.printUrl,
                "content": { "f": "json" }
            });
            printInfo.then(handlePrintInfo, handleError);

            function handlePrintInfo(resp) {
                var layoutTemplate, templateNames, mapOnlyIndex, templates;

                layoutTemplate = arrayUtils.filter(resp.parameters, function (param, idx) {
                    return param.name === "Layout_Template";
                });

                if (layoutTemplate.length === 0) {
                    console.log("print service parameters name for templates must be \"Layout_Template\"");
                    return;
                }
                templateNames = layoutTemplate[0].choiceList;

                // remove the MAP_ONLY template then add it to the end of the list of templates 
                mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
                if (mapOnlyIndex > -1) {
                    var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
                    templateNames = templateNames.slice(0, 4);
                    templateNames.push(mapOnly);
                }

                // create a print template for each choice
                templates = arrayUtils.map(templateNames, function (ch) {
                    var plate = new PrintTemplate();
                    var arr = [];

                    var legendLayer = new LegendLayer();
                    legendLayer.layerId = map.layerIds[map.layerIds.length - 1];
                    arr.push(legendLayer)

                    var authorText = document.getElementById("txtPrintMaker").value;
                    var titleText = document.getElementById("txtPrintTitle").value;
                    plate.label = $('#PaperSelect').combobox('getValue');
                    plate.layout = $('#PaperSelect').combobox('getValue');
                    plate.format = "PDF";
                    plate.layoutOptions = {
                        "authorText": authorText,
                        "copyrightText": "<版权信息>",
                        "legendLayers": arr,
                        "titleText": titleText,
                        "scalebarUnit": "Kilometers"
                    };
                    return plate;
                });
                // create the print dijit
                appMain.printer = new Print({
                    "map": appMain.map,
                    "templates": templates,
                    url: appMain.printUrl
                }, dom.byId("mainPrint_button"));
                appMain.printer.startup();
                appMain.printer.on('print-complete', function (evt) {
                    window.open(evt.result.url);
                    if (document.getElementById("mainPrint_button")) {
                        _ins.createPrintSelect();
                    }
                });
            }

            function handleError(err) {
                if (document.getElementById("mainPrint_button")) {
                    _ins.createPrintSelect();
                }
            }
        });
    }
}
//服务框大小改变事件【resize/load】事件
window.onload = function () {
    var oParent = $get("divServiceList");
    var oTFront = $get("divServiceListTop1");
    var oTBack = $get("divServiceListTop2");

    var toolButton = new WebSite.Script.ServiceTool();
    toolButton.ResizeBox(oParent, oTFront, true, false);
    toolButton.ResizeBox(oParent, oTBack, true, false);

    oParent.style.top = (document.documentElement.clientHeight - 220 - 84) + "px";
    oParent.style.height = "220px";
}
window.onresize = function () {
    var oParent = $get("divServiceList");
    var oTFront = $get("divServiceListTop1");
    var oTBack = $get("divServiceListTop2");

    var toolButton = new WebSite.Script.ServiceTool();
    toolButton.ResizeBox(oParent, oTFront, true, false);
    toolButton.ResizeBox(oParent, oTBack, true, false);

    if (oParent.style.height) {
        var height = parseFloat(oParent.style.height);
        if (height > 220) {
            var top = parseFloat(oParent.style.top);
            var maxHeight = document.documentElement.clientHeight - top - 84;
            if (maxHeight < 220) {
                maxHeight = 220;
            }
            oParent.style.height = maxHeight + "px";
        }

    }
    oParent.style.top = (document.documentElement.clientHeight - oParent.offsetHeight - 84) + "px";

}