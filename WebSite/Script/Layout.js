var WebSite = WebSite || {};
WebSite.Script = WebSite.Script || {};
WebSite.Script.Layout = function () {
	this._data = null;		//
	this._svgPanl = null;	//dom:svg,圆盘主操作区
	this._circle = null;	//dom:circle,圆盘底
};
WebSite.Script.Layout.Instance = function () {
	var o = new WebSite.Script.Layout();
	o.into();
	return o;
};
WebSite.Script.Layout.prototype = {
	//初始化方法
	into: function () {
		//var div = document.createElement("div");
		//div.className = "disk";
		
		//this._svgPanl = document.createElement("svg");
		//this._svgPanl.className = "disk";
		//this._svgPanl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		//this._svgPanl.setAttribute("version", "1.1");
		
		//this._circle = document.createElement("circle");
		//this._circle.setAttribute("cx", "120");
		//this._circle.setAttribute("cy", "120");
		//this._circle.setAttribute("r", "100");
		//this._circle.setAttribute("fill", "#2e302f");
		//this._svgPanl.appendChild(this._circle);
		//div.appendChild(this._svgPanl);
		this._svgPanl = $get("disk");
		$get("map_container").appendChild(this._svgPanl);
	}
	//成功得到数据
	, access_succeed: function (result) {
		var json = JSON.parse(result);
		//this._svgPanl.innerHTML += json.data;
	}
	//失败
	, access_error: function (error) {
		alert("未捕获的异常:" + error.get_message());
	}
	//获取AJAX WCF方法数据
	, getData: function () {
		Service.DoWork("测试"
					, Function.createDelegate(this, this.access_succeed)
					, Function.createDelegate(this, this.access_error)
		);
	}
};