!function () {
    //TODO:自动生成部分 史家欢 2015-12-02

    //初始化名称空间
    window.Mirs = window.Mirs || {};
    window.Mirs.Gis = window.Mirs.Gis || {};

    //实现
    if (window.Mirs.Gis.Global) throw new Error('Mirs.Gis.Global 类重复加载');
    var mirsGlobal = window.Mirs.Gis.Global = function () {
        this._masterElement = null;
    }

    //委托
    mirsGlobal.createDelegate = function (instance, method) {
        return function () {
            return method.apply(instance, arguments);
        }
    };
    mirsGlobal.cd = mirsGlobal.createDelegate; //短名

    //创建 HttpRequest
    mirsGlobal.createHttpRequest = function () {

        var req = null;
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return req;
    }
    mirsGlobal.creq = mirsGlobal.createHttpRequest;
    //事件通用函数
    mirsGlobal.addHandler = function (element, eventName, handler) {

        if (element.addEventListener) {

            element.addEventListener(eventName, handler, false);

        }
        else if (element.attachEvent) {

            element.attachEvent('on' + eventName, handler);
        }
    };

    mirsGlobal.ah = mirsGlobal.addHandler;

    //创建element对象
    mirsGlobal.createElement = function (elementName) {
        var rtn = document.createElement(elementName);
        return rtn;
    }
    mirsGlobal.ce = mirsGlobal.createElement;

    //根据ID获取对象
    mirsGlobal.getElementById = function (x) { return window.document.getElementById(x) };

    mirsGlobal.gb = mirsGlobal.getElementById;
} ()