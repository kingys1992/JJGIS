var gWndId = 0;
var nDirect = -1;
var nOper = -1;
var gXmlRecords;
var gRecordPath;
var bLogin = 0;



function getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}
var ocx;
function createOcx() {
    ocx = document.createElement("object");
    ocx.setAttribute("id", "DPSDK_OCX");
    ocx.setAttribute("height", "100%");
    ocx.setAttribute("width", "100%");
    ocx.setAttribute("classid", "clsid:D3E383B6-765D-448D-9476-DFD8B499926D");

    var div = document.getElementById("mviewl");
    div.appendChild(ocx);


    ShowCallRetInfo(ocx.DPSDK_Logout(), "登出");
    ShowCallRetInfo(ocx.DPSDK_Login("10.41.100.118", 9000, "jinjian", "12345"), "登录");

    ShowCallRetInfo(ocx.DPSDK_LoadDGroupInfo(), "加载组织结构");

    gWndId = ocx.DPSDK_CreateSmartWnd(0, 0, 100, 100);



    //窗体数量
    var nWndCount = 4;
    ocx.DPSDK_SetWndCount(gWndId, nWndCount);
    ocx.DPSDK_SetSelWnd(gWndId, 0);



    ocx.DPSDK_StopRealplayByCameraId($.getUrlParam('modID'));
    // var result = obj.DPSDK_SetSelWnd(nWndId, nWndNo);
    var nWndNo = ocx.DPSDK_GetSelWnd(gWndId);
    var k = $.getUrlParam('modID');

    // ShowCallRetInfo(ocx.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, $.getUrlParam('modID'), 1, 1, 1), "实时播放");


}
function init() {

    //通道ID DPSDK_OCX.DPSDK_OCXCtrl.1 
    //   alert($.getUrlParam('modID'));

    var o = new ActiveXObject("DPSDK_OCX.DPSDK_OCXCtrl.1");
    if (o) {

        //存在
        //  alert('1');
        //  createOcx();
    }

    else {

        //不存在
        alert('请注册视频ocx组件');
        return;

    }

    var obj = document.getElementById("DPSDK_OCX");



    ShowCallRetInfo(obj.DPSDK_Login("10.41.100.118", 9000, "jinjian", "12345"), "登录");
    ShowCallRetInfo(obj.DPSDK_LoadDGroupInfo(), "加载组织结构");

    gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);




    //窗体数量
    var nWndCount = 4;
    obj.DPSDK_SetWndCount(gWndId, nWndCount);
    obj.DPSDK_SetSelWnd(gWndId, 0);

    if ($.getUrlParam('modID1') != 'a') {

        obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID1'));
    }
    if ($.getUrlParam('modID2') != 'a')
        obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID2'));
    if ($.getUrlParam('modID3') != 'a')
        obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID3'));
    if ($.getUrlParam('modID4') != 'a')
        obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID4'));


    // var result = obj.DPSDK_SetSelWnd(nWndId, nWndNo);
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    //  var k = $.getUrlParam('modID');
    //创建创
    if ($.getUrlParam('modID1') != 'a') {
        ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, 0, $.getUrlParam('modID1'), 1, 1, 1), "实时播放");
    }
    if ($.getUrlParam('modID2') != 'a')
        ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, 1, $.getUrlParam('modID2'), 1, 1, 1), "实时播放");
    if ($.getUrlParam('modID3') != 'a')
        ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, 2, $.getUrlParam('modID3'), 1, 1, 1), "实时播放");
    if ($.getUrlParam('modID4') != 'a')
        ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, 3, $.getUrlParam('modID4'), 1, 1, 1), "实时播放");



}

function ShowCallRetInfo(nRet, strInfo) {
    if (nRet != 0) {
        var obj = document.getElementById("DPSDK_OCX");
        alert(strInfo + ": ErrorCode = " + obj.DPSDK_GetLastError());
    }


}
function getDate(sDRDATE) {
    var date = eval('new Date(' + sDRDATE.replace(/\d+(?=-[^-]+$)/,
	function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

function ButtonCreateWnd_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    //窗体数量
    //var nWndCount = document.getElementById("textWndNum").value;
    var nWndCount = 4;
    obj.DPSDK_SetWndCount(gWndId, nWndCount);
    obj.DPSDK_SetSelWnd(gWndId, 0);
}




function ButtonLogout_onclick() {
    var obj = document.getElementById("DPSDK_OCX");
    // obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID'));
    var oj = ShowCallRetInfo(obj.DPSDK_Logout(), "登出");


    //if ($.getUrlParam('modID1') != 'a') {

    //    obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID1'));
    //}
    //if ($.getUrlParam('modID2') != 'a')
    //    obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID2'));
    //if ($.getUrlParam('modID3') != 'a')
    //    obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID3'));
    //if ($.getUrlParam('modID4') != 'a')
    //    obj.DPSDK_StopRealplayByCameraId($.getUrlParam('modID4'));

    // ShowCallRetInfo(ocx.DPSDK_Logout(), "登出");



}


function ButtonLoadDGroupInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    ShowCallRetInfo(obj.DPSDK_LoadDGroupInfo(), "加载组织结构");
    alert(obj.DPSDK_GetDGroupStr());
    //	document.getElementById("DGroupInfo").innerText = obj.DPSDK_GetDGroupStr();
}

function ButtonAsyncLoadDGroupInfo_onclick() {
    var obj = document.getElementById("DPSDK_OCX");

    ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");

}
function ButtonPtzDirection_onclick(nDirects) {

    var obj = document.getElementById("DPSDK_OCX");
    // ShowCallRetInfo(obj.DPSDK_LoadDGroupInfo(), "加载组织结构");
    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var szCameraId = 'a';
    switch (nWndNo) {

        case 0:
            szCameraId = $.getUrlParam('modID1');
            break;
        case 1:
            szCameraId = $.getUrlParam('modID2');

            break;
        case 2:
            szCameraId = $.getUrlParam('modID3');

            break;
        default:
            szCameraId = $.getUrlParam('modID4');

            break;

    };
    if (szCameraId != "a") {
        nDirect = nDirects;
        var nStep = 4;
        ShowCallRetInfo(obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, 0), "方向控制开始");
        ShowCallRetInfo(obj.DPSDK_PtzDirection(szCameraId, nDirect, nStep, 1), "方向控制停止");
    }


}



function ButtonPtzCameraOperation_onclick(nOpers) {


    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    var szCameraId = 'a';
    switch (nWndNo) {

        case 0:
            szCameraId = $.getUrlParam('modID1');
            break;
        case 1:
            szCameraId = $.getUrlParam('modID2');

            break;
        case 2:
            szCameraId = $.getUrlParam('modID3');

            break;
        default:
            szCameraId = $.getUrlParam('modID4');

            break;

    };

    nOper = nOpers;
    var nStep = 2;
    ShowCallRetInfo(obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, 0), "镜头控制开始");
    ShowCallRetInfo(obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, 1), "镜头控制停止");
}




