var map;
var navToolbar;
var overviewMapDijit;
var isverticalswipe = false;
var map1toplayerdiv = null;
var ishorizontalswipe = false;
var navToolbarOne;
var mapOne;
var esriScalebar;
var infoWindowEsri;
var customInfoWindow
var appMain = {};
require([
		"esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/geometry/Extent",
        "esri/SpatialReference",
		"esri/dijit/OverviewMap",
        "esri/toolbars/navigation",
        "myModules/InfoWindow",
        "esri/dijit/InfoWindow",
        "esri/dijit/Scalebar",
        "dojo/dom-construct",
        "dojo",
        "dojo/on",
        "dojo/dom",
		"dojo/domReady!"],
function (Map, Tiled, Dynamiced, Extent, SpatialReference, OverviewMap, Navigation, InfoWindow, esriInfoWindow,Scalebar, domConstruct, dojo, on, dom) {
    var infoWindow = new InfoWindow({
        domNode: domConstruct.create("div", null, dom.byId("map"))
    });
    infoWindowEsri = esriInfoWindow;
    customInfoWindow = infoWindow;
    esriScalebar = Scalebar;
    map = new Map("map", {
        infoWindow: infoWindow,
        logo:false
    });
    var oExtent = new Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
    //2016.12.06.10时whl修改注：上面的是在分辨率1600*900显示地图理想状态
    //var oExtent = new Extent({ "xmin": 12067465, "ymin": 3426058, "xmax": 13237952, "ymax": 4508737, "spatialReference": { wkid: 3857 } });
    //2016.12.06.10时whl修改注：上面的是在分辨率1920*1080显示地图理想状态
    map.infoWindow.resize(370, 480);
    //var agoServiceURL = "http://192.168.12.197:6080/arcgis/rest/services/Vector_New/MapServer";
    //var agoServiceURL = "http://192.168.12.197:6080/arcgis/rest/services/VectorPro/MapServer";
    var tiled = new Tiled(agoServiceURL, {id:"baseMapLayer"});
    tiled.setOpacity(1.0);
    map.setExtent(oExtent);
    map.addLayer(tiled);
    document.getElementById("map").setAttribute("name", "tiled");
    navToolbar = new Navigation(map);
    overviewMapDijit = new OverviewMap({
        map: map,
        maximizeButton: true,
        visible: false
    });
    overviewMapDijit.startup();
    //var o = WebSite.Script.Layout.Instance();//初始化框架脚本类
    //o.getData();
    var objDisk = WebSite.Script.DiskTool.Instance();
    var objCard = WebSite.Script.CardListTool.Instance();
    var objService = WebSite.Script.ServiceTool.Instance();
    //标准AJAX方式调用
    //var xmlhttp = window.Mirs.Gis.Global.creq();//获取HttpRequest
    //xmlhttp.open("GET", "http://localhost/WebSite/Service.svc/DoWork", true);
    //xmlhttp.send();
    //xmlhttp.onreadystatechange = function () {
    //	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //		dojo.byId("content").innerHTML = JSON.parse(xmlhttp.responseText).d;
    //	}
    //}

    //dojo.xhrGet({	//获取页面内数据
    //	url: "GetData.aspx", //请求的服务器资源url  
    //	handleAs: "json", //返回的数据类型  
    //	handle: PrintResult//回调函数  
    //});

    //function PrintResult(data) {
    //	var table = "<table border=\"1\">";
    //	table += "<tr><th>ProvinceId</th><th>CityName</th></tr>";
    //	dojo.forEach(data, function (city) {
    //		table += "<tr><td>";
    //		table += city.ProvinceId;
    //		table += "</td><td>";
    //		table += city.CityName;
    //		table += "</td></tr>";
    //	});
    //	table += "</table>";
    //	dojo.place(table, dojo.byId("content"));
    //};
});
