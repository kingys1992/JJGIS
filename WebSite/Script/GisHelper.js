!function () {
    //TODO:�Զ����ɲ��� ʷ�һ� 2015-12-02

    //��ʼ�����ƿռ�
    window.Mirs = window.Mirs || {};
    window.Mirs.Gis = window.Mirs.Gis || {};

    //ʵ��
    if (window.Mirs.Gis.Global) throw new Error('Mirs.Gis.Global ���ظ�����');
    var mirsGlobal = window.Mirs.Gis.Global = function () {
        this._masterElement = null;
    }

    //ί��
    mirsGlobal.createDelegate = function (instance, method) {
        return function () {
            return method.apply(instance, arguments);
        }
    };
    mirsGlobal.cd = mirsGlobal.createDelegate; //����

    //���� HttpRequest
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
    //�¼�ͨ�ú���
    mirsGlobal.addHandler = function (element, eventName, handler) {

        if (element.addEventListener) {

            element.addEventListener(eventName, handler, false);

        }
        else if (element.attachEvent) {

            element.attachEvent('on' + eventName, handler);
        }
    };

    mirsGlobal.ah = mirsGlobal.addHandler;

    //����element����
    mirsGlobal.createElement = function (elementName) {
        var rtn = document.createElement(elementName);
        return rtn;
    }
    mirsGlobal.ce = mirsGlobal.createElement;

    //����ID��ȡ����
    mirsGlobal.getElementById = function (x) { return window.document.getElementById(x) };

    mirsGlobal.gb = mirsGlobal.getElementById;
} ()