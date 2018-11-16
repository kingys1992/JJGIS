
WebSite.Script.DiskTool = function () {
    this._diskPanl = null;
    this._hideTool = null;
    this._legendPanl = null;
    this._diqiu = null;

    this._co1 = null;
    this._co2 = null;
    this._co3 = null;
    this._co4 = null;
    this._co5 = null;
    this._co6 = null;
    this._co7 = null;
    this._co8 = null;
    this._co9 = null;
    this._co10 = null;
    this._co11 = null;
    this._co12 = null;
    this._co13 = null;
    this._co14 = null;

    this._printMap = null;
    this._exit = null;
    this._about = null;
    this._editPwd = null;

    this._TitleWin = null;
    this._ServiceList = null;
    this._CardList = null;
    this._navToolbar = navToolbar;

    this._serviceListTop = null;
    this._serviceListHeight = null;

    this._featureSet = null;
    this.__JsonCoObj = null;

    this._sgworld = null;

    this._timeOut1 = null;
    this._timeOut2 = null;

    this.__domCompanyList = null;
    this._map = null;
    this._scaleBar = null;

    this.handlerMapExtent = null;
    this.handlerMapRoller = null;
    this._locationBox = null;
    this._pointLocationBox = null;

    this._graphic = null;
    this._listNumber = null;
    this._cityFeatureSet = null;
    this._riverFeatureSet = null;
    this._riverFeatureSet1 = null;
}

WebSite.Script.DiskTool.Instance = function () {
    var o = new WebSite.Script.DiskTool();
    o.init();
    return o;
}

WebSite.Script.DiskTool.prototype = {
    //圆盘初始化
    init: function () {
        this._diskPanl = $get("diskPanl");
        this._hideTool = $get("divHideAllTool");
        this._TitleWin = $get("divTitleWin");
        this._ServiceList = $get("divServiceList");
        this._CardList = $get("divCardList");
        this._diqiu = $get("divDiQiu");

        this._co1 = $get("divCo_1");
        this._co2 = $get("divCo_2");
        this._co3 = $get("divCo_3");
        this._co4 = $get("divCo_4");
        this._co5 = $get("divCo_5");
        this._co6 = $get("divCo_6");
        this._co7 = $get("divCo_7");
        this._co8 = $get("divCo_8");
        this._co9 = $get("divCo_9");
        this._co10 = $get("divCo_10");
        this._co11 = $get("divCo_11");
        this._co12 = $get("divCo_12");
        this._co13 = $get("divCo_13");
        this._co14 = $get("divCo_14");
        this._printMap = $get("divPrintMap");
        this._exit = $get("divExit");
        this._about = $get("divAbout");
        this._editPwd = $get("divEditPwd");

        $addHandler(this._hideTool, "click", Function.createDelegate(this, this.HideAllToolClick));
        $addHandler(this._diqiu, "click", Function.createDelegate(this, this.DivDiqiuClick));
        $addHandler($get("divTowDimension"), "click", Function.createDelegate(this, this.Hide3DBoxClick));
        $addHandler($get("divTwoThreeDimension"), "click", Function.createDelegate(this, this.TwoThreeDimensionClick));
        $addHandler(this._printMap, "click", Function.createDelegate(this, this.PrintMapButtonClick));
        $addHandler(this._exit, "click", Function.createDelegate(this, this.ExitButtonClick));
        $addHandler(this._about, "click", Function.createDelegate(this, this.AboutButtonClick));
        $addHandler(this._editPwd, "click", Function.createDelegate(this, this.EditPwdButtonClick));

        $addHandler(this._co1, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co2, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co3, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co4, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co5, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co6, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co7, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co8, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co9, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co10, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co11, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co12, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co13, "click", Function.createDelegate(this, this.coClick));
        $addHandler(this._co14, "click", Function.createDelegate(this, this.coClick));
        $addHandler($get("divXXFB"), "click", Function.createDelegate(this, this.SetToolList));
        $addHandler($get("divSLZDWYY"), "click", Function.createDelegate(this, this.SetObjListContent));
        $addHandler($get("divSLCSKQ"), "click", Function.createDelegate(this, this.SetObjListContent));
        $addHandler($get("divSLDBSDM"), "click", Function.createDelegate(this, this.SetObjListContent));
        $addHandler($get("divSLYYSYD"), "click", Function.createDelegate(this, this.SetObjListContent));
        $addHandler($get("divRiverFly"), "click", Function.createDelegate(this, this.SetAllRiverName));
        $addHandler($get("divJLH"), "click", Function.createDelegate(this, this.SetRiverAmination));
        $addHandler($get("divHJH"), "click", Function.createDelegate(this, this.SetRiverAmination));
        $addHandler($get("divWH"), "click", Function.createDelegate(this, this.SetRiverAmination));
        $addHandler($get("divRiverExit"), "click", Function.createDelegate(this, this.SetSkylineBack));
        $addHandler($get("divXXFBExit"), "click", Function.createDelegate(this, this.SetSkylineBack));
        var _ins = this;
        this._timeOut1 = window.setTimeout(function () {
            _ins._TitleWin.style.display = "block";
            _ins._ServiceList.style.display = "block";
            _ins._CardList.style.display = "block";
            
            window.clearTimeout(_ins._timeOut1);
            _ins._timeOut1 = null;
        }, 900);
        this._timeOut2 = window.setTimeout(function () {
            var dim = window.location.href.split("=")[1];
            if (dim == "2") {
                _ins.DivDiqiuClick();
            }
            window.clearTimeout(_ins._timeOut2);
            _ins._timeOut2 = null;
        }, 1200)
    },
    PrintMapButtonClick:function(e){
        if ($get("divMainPrintMapBox")) {
            $get("divMainPrintMapBox").style.display = "block";
            document.getElementById("txtPrintMaker").value = "河南省环保厅";
            document.getElementById("txtPrintTitle").value = "河南省地图";
        } else {
            var printBox = document.createElement("div");
            printBox.className = "printBox";
            printBox.id = "divMainPrintMapBox";
            document.body.appendChild(printBox);

            var printTitle = document.createElement("div");
            printTitle.className = "printBoxTitle";
            printBox.appendChild(printTitle);

            var exitDiv = document.createElement("div");
            exitDiv.className = "printBoxHide";
            exitDiv.innerHTML = "<img src='Images/menu_card_close.png' style='width:24px;height:24px;' />";
            exitDiv.title = "关闭";
            printTitle.appendChild(exitDiv);
            $addHandler(exitDiv, "click", Function.createDelegate(this, this.closePrintBoxClick));

            var printTitleText = document.createElement("div");
            printTitleText.className = "printTitleText";
            printTitleText.innerHTML = "打印";
            printTitle.appendChild(printTitleText);

            var printMainBox = document.createElement("div");
            printMainBox.className = "printMainBox";
            printBox.appendChild(printMainBox)

            var printMaker = document.createElement("div");
            printMaker.className = "printBar";
            printMainBox.appendChild(printMaker);

            var printMakerTitle = document.createElement("div");
            printMakerTitle.className = "printBarLeft";
            printMakerTitle.innerHTML = "制作：";
            printMaker.appendChild(printMakerTitle);

            var printMust1 = document.createElement("div");
            printMust1.className = "printBarRight";
            printMust1.innerHTML = "*";
            printMaker.appendChild(printMust1);

            var printMakerText = document.createElement("div");
            printMakerText.className = "printBarCenter";
            printMaker.appendChild(printMakerText);

            var txtMaker = document.createElement("input");
            txtMaker.type = "text";
            txtMaker.className = "printTextBar";
            txtMaker.id = "txtPrintMaker";
            txtMaker.value = "河南省环保厅";
            $addHandler(txtMaker, "change", Function.createDelegate(this, this.PrintMakerChanged));
            $addHandler(txtMaker, "keydown", Function.createDelegate(this, this.SearchTxtKeyDown));
            $addHandler(txtMaker, "keyup", Function.createDelegate(this, this.SearchTxtKeyUp));
            $addHandler(txtMaker, "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));

            printMakerText.appendChild(txtMaker);

            var printTitle = document.createElement("div");
            printTitle.className = "printBar";
            printMainBox.appendChild(printTitle);

            var printTitleTitle = document.createElement("div");
            printTitleTitle.className = "printBarLeft";
            printTitleTitle.innerHTML = "名称：";
            printTitle.appendChild(printTitleTitle);

            var printMust2 = document.createElement("div");
            printMust2.className = "printBarRight";
            printMust2.innerHTML = "*";
            printTitle.appendChild(printMust2);

            var printTitleText = document.createElement("div");
            printTitleText.className = "printBarCenter";
            printTitle.appendChild(printTitleText);

            var txtTitle = document.createElement("input");
            txtTitle.type = "text";
            txtTitle.className = "printTextBar";
            txtTitle.id = "txtPrintTitle";
            txtTitle.value = "河南省地图";
            $addHandler(txtTitle, "change", Function.createDelegate(this, this.PrintMakerChanged));
            $addHandler(txtTitle, "keydown", Function.createDelegate(this, this.SearchTxtKeyDown));
            $addHandler(txtTitle, "keyup", Function.createDelegate(this, this.SearchTxtKeyUp));
            $addHandler(txtTitle, "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
            printTitleText.appendChild(txtTitle);

            var printPaper = document.createElement("div");
            printPaper.className = "printBar";
            printMainBox.appendChild(printPaper);

            var printTitlePaper = document.createElement("div");
            printTitlePaper.className = "printBarLeft";
            printTitlePaper.innerHTML = "纸型：";
            printPaper.appendChild(printTitlePaper);

            var printMust3 = document.createElement("div");
            printMust3.className = "printBarRight";
            printMust3.innerHTML = "*";
            printPaper.appendChild(printMust3);

            var selectDiv = document.createElement("div");
            selectDiv.className = "printBarCenter";
            selectDiv.innerHTML = "<input id='PaperSelect' class='easyui-combobox' panelHeight='125px' editable='false' name='dept'style='width:147px;height:24px;'>";
            printPaper.appendChild(selectDiv);

            var paperOptions = [{ id: 0, text: "请选择", value: "nonePaper" }, { id: 1, text: "A3 横向", value: "A3 Landscape" }, { id: 2, text: "A3 纵向", value: "A3 Portrait" },
            { id: 3, text: "A4 横向", value: "A4 Landscape" }, { id: 4, text: "A4 纵向", value: "A3 Portrait" }, { id: 1, text: "只打印地图", value: "MAP_ONLY" }];
            var _ins = this;
            $('#PaperSelect').combobox({
                data: paperOptions,
                valueField: 'value',
                textField: 'text',
                onSelect: function () {
                    var selValue = $('#PaperSelect').combobox("getValue");
                    if (selValue != "nonePaper") {
                        _ins.createPrintSelect();
                    }
                }
            });
            $('#PaperSelect').combobox('setValue', 'nonePaper');

            var confirmDiv = document.createElement("div");
            confirmDiv.className = "printComfirm";
            confirmDiv.innerHTML = "确定";
            printMainBox.appendChild(confirmDiv);
            $addHandler(confirmDiv, "click", Function.createDelegate(this, this.confirmPrintClick));

            var print = document.createElement("div");
            print.id = "mainPrint_button";
            print.style.display = "none";
            printMainBox.appendChild(print);

            //this.createPrintSelect();
        }
    },
    closePrintBoxClick: function (e) {
        document.body.removeChild(document.getElementById("divMainPrintMapBox"));
    },
    PrintMakerChanged:function(e){
        this.createPrintSelect();
    },
    confirmPrintClick:function(e){
        var maker = document.getElementById("txtPrintMaker").value.trim();
        var title = document.getElementById("txtPrintTitle").value.trim();
        var paper = $('#PaperSelect').combobox('getValue');
        if (maker == "" || maker == null) {
            $.messager.alert('提示消息', "请输入制图人或制图单位", 'error');
            return;
        }
        if (title == "" || title == null) {
            $.messager.alert('提示消息', "请输入地图名称", 'error');
            return;
        }
        if (paper == "nonePaper") {
            $.messager.alert('提示消息', "请选择纸型", 'error');
            return;
        }
        document.getElementById("mainPrint_button").children[0].children[0].children[0].children[0].children[0].click();
    },
    //注销
    ExitButtonClick: function () {

        sessionStorage.clear();
        //localStorage.clear();
        //  alert('a');
        location.href = 'ashx/loginout.ashx';
    },
    //关于
    AboutButtonClick: function () {
        if ($get("divMainPrintMapBox")) {
            $get("divMainPrintMapBox").style.display = "block";
            document.getElementById("txtPrintMaker").value = "河南省环保厅";
            document.getElementById("txtPrintTitle").value = "河南省地图";
        } else {
            var printBox = document.createElement("div");
            printBox.className = "printBox";
            printBox.id = "divMainPrintMapBox";
            document.body.appendChild(printBox);

            var printTitle = document.createElement("div");
            printTitle.className = "printBoxTitle";
            printBox.appendChild(printTitle);

            var exitDiv = document.createElement("div");
            exitDiv.className = "printBoxHide";
            exitDiv.innerHTML = "<img src='Images/menu_card_close.png' style='width:24px;height:24px;' />";
            exitDiv.title = "关闭";
            printTitle.appendChild(exitDiv);
            $addHandler(exitDiv, "click", Function.createDelegate(this, this.closePrintBoxClick));

            var printTitleText = document.createElement("div");
            printTitleText.className = "printTitleText";
            printTitleText.innerHTML = "插件";
            printTitle.appendChild(printTitleText);

            var printMainBox = document.createElement("div");
            printMainBox.className = "printMainBox";
            printBox.appendChild(printMainBox)

            var divwork = document.createElement("div");
            divwork.className = "printBar";
            printMainBox.appendChild(divwork);

            var a = document.createElement("a");
            a.id = "a";
            a.href = "http://10.41.100.96/WebSite/Chajian/work.rar";
            a.innerText = "工况插件(查看机组工作状态)";
            a.title = "查看重点污染源企业电厂的机组工作状态";
            divwork.appendChild(a);

            var divvedio = document.createElement("div");
            divvedio.className = "printBar";
            printMainBox.appendChild(divvedio);


            var b = document.createElement("a");
            b.id = "b";
            b.href = "http://10.41.100.96/WebSite/Chajian/video.rar";
            b.innerText = "视频插件(查看站外前端监控)";
            b.title = "查看监控基站的站外视频";
            divvedio.appendChild(b);
            
            var dic3d = document.createElement("div");
            dic3d.className = "printBar";
            printMainBox.appendChild(dic3d);


            var c = document.createElement("a");
            c.id = "c";
            c.href = "http://10.41.100.96/WebSite/Chajian/3d.rar";
            c.innerText = "三维插件(查看企业/自动站)";
            c.title = "查看重点污染源企业、城市空气自动站、地表水自动站、饮用水自动站三维模型";
            dic3d.appendChild(c);
            

            var divshuoming = document.createElement("div");
            divshuoming.className = "printBarLeft";
            divshuoming.innerHTML = "*请先阅读压缩包内文档说明";
            printMainBox.appendChild(divshuoming);
        }
    },
    //修改密码
    EditPwdButtonClick: function () {
        var str_editpass = '<form id="xiuCai_Form"><table class="grid">';
        str_editpass += '';
        str_editpass += '<tr><td>输入旧密码：</td><td><input required="true" id="txtOldPassword" name="password" type="password" class="txt03 easyui-validatebox" /></td></tr>';
        str_editpass += '<tr><td>输入新密码：</td><td><input validType="safepass"  required="true" id="txtNewPassword" name="password" type="password" class="txt03 easyui-validatebox" /></td></tr>';
        str_editpass += '<tr><td>确认密码：</td><td><input data-options="required:true" validType="equals[\'#txtNewPassword\']" id="txtReNewPassword" type="password" class="txt03 easyui-validatebox" /></td></tr>';
        str_editpass += '</table></form>';
        top.$.hDialog({
            width: 250, height: 180, title: '修改密码', iconCls: 'icon-key', content: str_editpass, submit: function () {
                if ($('#xiuCai_Form').form('validate')) {

                    if ($('#txtNewPassword').val() != $('#txtReNewPassword').val())
                    {
                        $.messager.alert('提示消息', '两次密码不一致！请重新输入', 'info');
                    } else {
                        $.ajax({
                            type: "post",  //默认是GET
                            url: "ashx/userhandler.ashx?old=" + $('#txtOldPassword').val() + "&new=" + $('#txtNewPassword').val(),
                            dataType: "json",
                            contentType: "application/json",
                            async: false,  //是否异步
                            cache: false, //不加载缓存
                            complete: function (data) {
                                var k = eval('(' + data.responseText + ')');
                                if (k.success != false) {
                                    alert('密码修改成功！返回登录界面请重新登录。');
                                    //$.messager.alert('提示消息', '密码修改成功！请重新登录', 'info');
                                    setTimeout(location.href = 'ashx/loginout.ashx',500);
                                } else
                                    // alert(d.Message);
                                    $.messager.alert('提示消息', k.msg, 'info');
                            },
                            error: function () {
                                $.messager.alert('提示消息', '请求失败！', 'warning');
                            }
                        });

                    }
                }
            }
        });

      

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
        if (e.keyCode == 13 && $get("txtPrintMaker")==document.activeElement) {
            $get("txtPrintMaker").blur();
        }
        if (e.keyCode == 13 && $get("txtPrintTitle") == document.activeElement) {
            $get("txtPrintTitle").blur();
        }
    },
    //取消事件处理
    SearchTxtSelectstart: function (event) {
        event.rawEvent.cancelBubble = true;
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
                    legendLayer.layerId = map.layerIds[map.layerIds.length-1];
                    arr.push(legendLayer)
                    
                    var authorText = document.getElementById("txtPrintMaker").value;
                    var titleText = document.getElementById("txtPrintTitle").value;
                    plate.label = $('#PaperSelect').combobox('getValue');
                    plate.layout = $('#PaperSelect').combobox('getValue');
                    plate.format = "png32";
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
                    console.log('The url to the print image is : ' + evt.result.url);
                    window.open(evt.result.url);
                    _ins.createPrintSelect();
                });
            }

            function handleError(err) {
                _ins.createPrintSelect();
            }
        });
    },
    HideAllToolClick: function (e) {
        if (this._hideTool.getAttribute("name") == "show") {
            this._hideTool.setAttribute("name", "hide");
            $get("divTitleWin").style.display = "none";
            $get("divServiceList").style.display = "none";
            $get("divCardList").style.display = "none";
        }
        else {
            this._hideTool.setAttribute("name", "show");
            $get("divTitleWin").style.display = "block";
            $get("divServiceList").style.display = "block";
            $get("divCardList").style.display = "block";
        }
    },
    DivDiqiuClick:function(evt){
        var classTool = new HandleClass();
        $get("divCheckBoxex").style.display = "block";
        $get("companyListDiv").parentNode.style.top = "112px";
        classTool.removeClass($get("disk"), "diskPanlShow");
        classTool.addClass($get("disk"), "diskPanlHide");
        classTool.removeClass(this._diskPanl, "diskPanlShow");
        classTool.addClass(this._diskPanl, "diskPanlHide");
        classTool.removeClass($get("divCardList"), "CardShow");
        classTool.removeClass($get("divCardList"), "CardShowDelay");
        classTool.addClass($get("divCardList"), "CardHide");
        classTool.removeClass($get("divTitleWin"), "titleWinFromLeft");
        classTool.addClass($get("divTitleWin"), "titleWinToLeft");
        classTool.removeClass($get("divLogoBox"), "logoBoxFromLeft");
        classTool.addClass($get("divLogoBox"), "logoBoxToLeft");
        $get("divTitleOnWin").style.display = "block";
        this.ObjectListShow();
        var _ins = this;
        this._timeOut1 = window.setTimeout(function () {
            _ins.create3DBox();
            document.getElementById("divMain3DBox").style.right = "352px";
            _ins._diskPanl.style.display = "none";
            _ins.ObjCheckBoxHandler();
            _ins.queryObjList();
            
            window.clearTimeout(_ins._timeOut1);
            _ins._timeOut1 = null;
        }, 1000);
        var divs = document.getElementsByClassName("SkylineToolBar");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.background = "#2c2c2c";
        }
        $get("divSkylineToolList").style.display = "block";
        $get("divSLZDWYY").style.background = "#696969";

    },
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
    SetObjListContent: function (e) {
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        $get("companyListDiv").appendChild(loadingDiv);
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.className == "SkylineToolBar") {
                var divs = elem.parentNode.children;
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.background = "#2c2c2c";
                }
                elem.style.background = "#696969";
                break;
            }
            elem = elem.parentNode;
        }
        switch (elem.id) {
            case "divSLZDWYY":
                $get("companyListDiv").parentNode.style.top = "112px";
                $get("divCheckBoxex").style.display = "block";
                this.queryObjList();
                break;
            case "divSLCSKQ":
                $get("companyListDiv").parentNode.style.top = "52px";
                $get("divCheckBoxex").style.display = "none";
                this.queryObjList_CSKQ();
                break;
            case "divSLYYSYD":
                $get("companyListDiv").parentNode.style.top = "52px";
                $get("divCheckBoxex").style.display = "none";
                this.queryObjList_YYSYD();
                break;
            case "divSLDBSDM":
                $get("companyListDiv").parentNode.style.top = "52px";
                $get("divCheckBoxex").style.display = "none";
                this.queryObjList_DBSDM();
                break;
        }
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {
            this.mapOneReplaceLayer(elem.id)
        }
    },
    create3DBox: function () {
        if (!document.getElementById("divMain3DBox")) {
            var mainDiv = document.createElement("div");
            mainDiv.className = "main3DBox";
            mainDiv.id = "divMain3DBox";
            document.body.appendChild(mainDiv);

            var video = document.createElement("video");
            video.className = "videoBox";
            //video.width = "400px";
            video.id = "video1";
            video.innerHTML = "<source src='Videos/earth.mp4' type='video/mp4' />";
            mainDiv.appendChild(video);

            video.play();

            //var loading = new LoadingAnimation();
            //loading.hideText();
            //var loadingDiv = loading.createText();
            //mainDiv.appendChild(loadingDiv);
            var _ins = this;
            this._timeOut2 = window.setTimeout(function () {
                try {
                    _ins.CreateTE();
                    var sgworld = _ins.CreateSGObj();
                    _ins._sgworld = sgworld;
                    sgworld.AttachEvent("OnLoadFinished", Function.createDelegate(_ins, _ins.OnProjectLoadFinished));
                    //sgworld.AttachEvent("OnLButtonDown", Function.createDelegate(_ins, _ins.select_OnLButtonDown));
                    sgworld.AttachEvent("OnLButtonUp", Function.createDelegate(_ins, _ins.OnLUp));
                    sgworld.AttachEvent("OnMouseWheel", Function.createDelegate(_ins, _ins.OnMWheel));
                    //三维路径
                    //sgworld.Project.Open("http://10.41.100.96/3DRes/HNHB.fly");
                    //2016年12月6日14:51:26  王岩松  修改为本地的绝对路径显示三维。
                    sgworld.Project.Open("C:\\final_sence\\HNHB.fly");
                    
                }
                catch (e) {
                    alert(e);
                }
                finally {
                    window.clearTimeout(_ins._timeOut2);
                    _ins._timeOut2 = null;
                }
            }, 1000);
            
            
        }
        else {
            if (document.getElementById("divMain3DBox").style.display == "none") {
                document.getElementById("divMain3DBox").style.display = "block";
            }
        }
    },
    OnLUp: function () {
        if (this.handlerMapExtent != null) {
            dojo.disconnect(this.handlerMapExtent);
            this.handlerMapExtent = null;
        }
        this.Move2DMapTo();
    },
    OnMWheel: function () {
        if (this.handlerMapExtent != null) {
            dojo.disconnect(this.handlerMapExtent);
            this.handlerMapExtent = null;
        }
        this.Move2DMapTo();
    },
    OnProjectLoadFinished: function () {
        var _ins = this;
        
        if ($get("video1").ended) {
            document.getElementById("TE").style.display = "block";
            document.getElementById("sgworld").style.display = "block";
            $get("divMain3DBox").removeChild($get("video1"));
        }
        else {
            this._timeOut1 = window.setTimeout(function () {
                document.getElementById("TE").style.display = "block";
                document.getElementById("sgworld").style.display = "block";
                $get("divMain3DBox").removeChild($get("video1"));
                window.clearTimeout(_ins._timeOut1);
                _ins._timeOut1 = null;
            }, 8000);
        }
        //var loading = new LoadingAnimation();
        //loading.hideText();
    },

    Hide3DBoxClick: function (e) {
        document.getElementById("divSkylineToolList").style.display = "none";
        this.hidePopupByCaption();
        var classTool = new HandleClass();
        this._diskPanl.style.display = "block";
        classTool.removeClass($get("disk"), "diskPanlHide");
        classTool.addClass($get("disk"), "diskPanlShow");
        classTool.removeClass(this._diskPanl, "diskPanlHide");
        classTool.addClass(this._diskPanl, "diskPanlShow");
        classTool.removeClass($get("divCardList"), "CardHide");
        classTool.addClass($get("divCardList"), "CardShowDelay");
        classTool.removeClass($get("divTitleWin"), "titleWinToLeft");
        classTool.addClass($get("divTitleWin"), "titleWinFromLeft");
        classTool.removeClass($get("divLogoBox"), "logoBoxToLeft");
        classTool.addClass($get("divLogoBox"), "logoBoxFromLeft");
        if (classTool.hasClass($get("divServiceList"), "serviceListHide")) {
            classTool.removeClass($get("divServiceList"), "serviceListHide");
            classTool.addClass($get("divServiceList"), "serviceListShow");
        }
        document.getElementById("divMain3DBox").style.display = "none";
        if (document.getElementById("TwoDimensionMap")) {
            document.getElementById("TwoDimensionMap").style.display = "none";
        }
        var _ins = this;
        this._timeOut1 = window.setTimeout(function () {
            $get("companyListDiv").innerHTML = "";
            var domCompanyList = document.getElementById("divHiddenService").children;
            if (domCompanyList.length > 0) {
                while (domCompanyList.length > 0) {
                    $get("companyListDiv").appendChild(domCompanyList[0]);
                }
                $get("divHiddenService").innerHTML = "";
            }
            else {
                $get("divServiceList").style.top = (document.documentElement.clientHeight - 220 - 84) + "px";
                $get("divServiceList").style.height = "220px";
            }
            var skylineExtent = esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
            _ins.mapOneExtentChange(skylineExtent,0);
            window.clearTimeout(_ins._timeOut1);
            _ins._timeOut1 = null;
        }, 500);
        $get("divTitleOnWin").style.display = "none";
        $get("divCheckBoxex").style.display = "none";
        $get("companyListDiv").parentNode.style.top = "52px";
        document.getElementById("divSkylineTool").style.display = "block";
        document.getElementById("divSkylineRiver").style.display = "none";
        //$clearHandlers($get("divCtBottomLeft"));
    },
    CreateTE:function() {
        var obj = document.createElement('object');
        document.getElementById("divMain3DBox").appendChild(obj);
        obj.className = "objTECenter";
        obj.name = "TE";
        obj.id = "TE";
        obj.classid = "CLSID:3a4f9192-65a8-11d5-85c1-0001023952c1";
    },
    CreateSGObj:function () {
        var obj = document.createElement('object');
        document.getElementById("divMain3DBox").appendChild(obj);
        obj.className = "objSGCenter";
        obj.name = "sgworld";
        obj.id = "sgworld";
        obj.classid = "CLSID:3a4f91b1-65a8-11d5-85c1-0001023952c1";
        return obj;
    },
    SetAllRiverName:function(e){
        document.getElementById("divSkylineTool").style.display = "none";
        document.getElementById("divSkylineRiver").style.display = "block";
    },
    SetToolList:function(e){
        document.getElementById("divSkylineTool").style.display = "none";
        document.getElementById("divSkylineList").style.display = "block";
    },
    SetSkylineBack:function(e){
        document.getElementById("divSkylineTool").style.display = "block";
        document.getElementById("divSkylineRiver").style.display = "none";
        document.getElementById("divSkylineList").style.display = "none";
    },
    SetRiverAmination:function(e){
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.className == "SkylineToolBar") {
                switch (elem.id) {
                    case "divJLH":
                        var pos = sgworld.ProjectTree.FindItem("finalsence\\贾鲁河");
                        this._sgworld.ProjectTree.GetObject(pos).Play(0);
                        break;
                    case "divHJH":
                        var pos = sgworld.ProjectTree.FindItem("finalsence\\惠济河");
                        this._sgworld.ProjectTree.GetObject(pos).Play(0);
                        break;
                    case "divWH":
                        var pos = sgworld.ProjectTree.FindItem("finalsence\\卫河1");
                        this._sgworld.ProjectTree.GetObject(pos).Play(0);
                        break;
                    
                }
                break;
            }
            elem = elem.parentNode;
        }
       
    },
    //重点污染源查询
    queryObjList: function () {
        this._listNumber = 1;
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/0/");
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = false;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";//2016年9月3日19:15:19  王岩松 去掉 没有编码的企业 和非重点污染源企业。
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.addCompanyFeatureSetToMap));
    },
    //重点污染源企业
    addCompanyFeatureSetToMap: function (featureSet) {
        //Create graphics layer for citie
        if ($get("companyListDiv").innerHTML.trim() != "") {
            var domCompanyList = document.getElementById("companyListDiv").children;
            while (domCompanyList.length > 0) {
                $get("divHiddenService").appendChild(domCompanyList[0]);
            }
            $get("companyListDiv").innerHTML = "";
        }
        
        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        var n = -1;
        var oJson = [
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
        var text = $get("inputSearch").value.trim();
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
            if (!$get("checkBox_sewage").checked && feature.attributes.PSTYPE == "W") {
                return;
            }
            if (!$get("checkBox_gas").checked && feature.attributes.PSTYPE == "Q") {
                return;
            }
            var companyObj = new Object();
            companyObj.id = feature.attributes.OBJECTID;
            companyObj.name = feature.attributes.NAME;
            companyObj.type = feature.attributes.PSTYPE;
            companyObj.pscode = feature.attributes.PSCODE;
            companyObj.property = feature.attributes.PROPERTY;
            companyObj.x = feature.attributes.X;
            companyObj.y = feature.attributes.Y;
            for (var i = 0; i < oJson.length; i++) {
                if (oJson[i].name == feature.attributes.CITY) {
                    n = i;
                    break;
                }
            }
            oJson[n].children.push(companyObj);
        });
        this.__JsonCoObj = oJson;
        this.ObjectListShow();
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        $get("companyListDiv").appendChild(loadingDiv);
        this.CreateCompanyList(oJson, $get("companyListDiv"));
    },
    //创建各市公司名称列表_重点污染源
    CreateCompanyList: function (json, oParent) {
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
            objTopLeftCoCount.innerHTML = "（" + json[o].children.length + "家）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("type", json[o].children[i].type);
                li.setAttribute("pscode", json[o].children[i].pscode);
                li.setAttribute("x", json[o].children[i].x);
                li.setAttribute("y", json[o].children[i].y);
                li.setAttribute("city", json[o].name);
                li.setAttribute("property", json[o].children[i].property);
                li.setAttribute("company", json[o].children[i].name);
                $addHandler(li, "click", Function.createDelegate(this, this.CompanyBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                //coTextDiv.innerHTML = json[o].children[i].name;
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
        }
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //定位城市所有公司按钮【click】事件
    ObjLocationBtnClick: function (evt) {
        //var pos = this._sgworld.Navigate.GetPosition();
        //alert("Current Position:\n\nX: " + pos.X + "\nY: " + pos.Y + "\nHeight: " + pos.Altitude + "\nYaw: " + pos.Yaw + "\nPitch: " + pos.Pitch);

    },
    
    //显示、隐藏城市下公司按钮【click】事件
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
    //点击公司定位【click】事件_重点污染源
    CompanyBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var psType = "";
        var companyName = "";
        var city = "";
        var property = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                psType = elem.attributes["type"].value;
                companyName = elem.attributes["company"].value;
                city = elem.attributes["city"].value;
                property = elem.attributes["property"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {

            var graphicsLayer = mapOne.getLayer(mapOne.graphicsLayerIds[0]);
            if (this.handlerMapExtent == null) {
                this.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(this, this.mapOneExtentChange));
            }
            var _ins = this;
            dojo.forEach(graphicsLayer.graphics, function (graphic) {
                if (graphic.attributes["NAME"] == companyName) {
                    var zoomNum = mapOne.getMaxZoom();
                    
                    mapOne.infoWindow.setTitle("重点污染源企业基本信息");
                    mapOne.infoWindow.setContent("公司名称：" + graphic.attributes["NAME"] + "</br>所在城市：" + graphic.attributes["CITY"] + "</br>关注程度：" + graphic.attributes["PROPERTY"] + "</br>企业类型：" + graphic.attributes["TYPE"] + "</br>当前位置：" + graphic.attributes["POINT"]);
                    mapOne.infoWindow.show(graphic.geometry, infoWindowEsri.ANCHOR_UPPERRIGHT);
                    mapOne.centerAndZoom(graphic.geometry, zoomNum);
                }
            });
            this.hideServiceList();
        }
        else {
            try {
                this.query3DLocationCompany(psCode,psType);
                //var pos = this._sgworld.ProjectTree.FindItem("location\\" + companyName);
                //this._sgworld.Navigate.FlyTo(pos);
                this.hidePopupByCaption();
                var popup = this._sgworld.Creator.CreatePopupMessage("导航", document.location.hostname + "/WebSite/ZDWYY/SkuLineNav.aspx", 0, 0);
                if (psType == "W" || psType=="D"){
                    popup.Height = 240;
                }
                else {
                    popup.Height = 57;
                }
                popup.Width = 200;
                this._sgworld.Window.ShowPopup(popup);
            }
            catch (e) {
                alert(e);
            };
        }
        
        var obj = new Object()
        obj.psname = companyName;
        obj.cityname = city;
        obj.property = property;
        localStorage.companyInfo = JSON.stringify(obj);
        var psct = new Object();
        psct.PSCODE = psCode;
        psct.PSTYPE = psType;
        localStorage.psCodeAndType = JSON.stringify(psct);
    },
    query3DLocationCompany:function(code,type){;
        var xmlDoc = this.checkXMLDocObj('XML/D3.xml');//读取到xml文件中的数据
        var codes = xmlDoc.getElementsByTagName("code");
        for (var i = 0; i < codes.length; i++) {
            var text = codes[i].parentNode.childNodes[1].text.split("-")[1];
            if (type == "D" || type == "W") {
                if (codes[i].text == code && text == "厂区大门") {
                    var lgtd = parseFloat(codes[i].parentNode.childNodes[2].childNodes[0].text);
                    var lttd = parseFloat(codes[i].parentNode.childNodes[2].childNodes[1].text);
                    var altitude = parseFloat(codes[i].parentNode.childNodes[2].childNodes[2].text);
                    var altitudeTypeCode = 0;
                    var yaw = parseFloat(codes[i].parentNode.childNodes[2].childNodes[3].text);
                    var pitch = parseFloat(codes[i].parentNode.childNodes[2].childNodes[4].text) - 90;
                    var roll = 0.0;
                    var distance = parseFloat(codes[i].parentNode.childNodes[2].childNodes[5].text);
                    var pPosition = this._sgworld.Creator.CreatePosition(lgtd, lttd, altitude, altitudeTypeCode, yaw, pitch, roll, distance);

                    this._sgworld.Navigate.FlyTo(pPosition);
                    break;
                }
            }
            else {
                if (codes[i].text == code) {
                    var lgtd = parseFloat(codes[i].parentNode.childNodes[2].childNodes[0].text);
                    var lttd = parseFloat(codes[i].parentNode.childNodes[2].childNodes[1].text);
                    var altitude = parseFloat(codes[i].parentNode.childNodes[2].childNodes[2].text);
                    var altitudeTypeCode = 0;
                    var yaw = parseFloat(codes[i].parentNode.childNodes[2].childNodes[3].text);
                    var pitch = parseFloat(codes[i].parentNode.childNodes[2].childNodes[4].text) - 90;
                    var roll = 0.0;
                    var distance = parseFloat(codes[i].parentNode.childNodes[2].childNodes[5].text);
                    var pPosition = this._sgworld.Creator.CreatePosition(lgtd, lttd, altitude, altitudeTypeCode, yaw, pitch, roll, distance);

                    this._sgworld.Navigate.FlyTo(pPosition);
                    break;
                }
            }
        }
    },
    query3DLocationOthers: function (name) {;
        var xmlDoc = this.checkXMLDocObj('XML/D3.xml');//读取到xml文件中的数据
        var names = xmlDoc.getElementsByTagName("name");
        for (var i = 0; i < names.length; i++) {
            if (names[i].text == name) {
                var lgtd = parseFloat(names[i].nextSibling.childNodes[0].text);
                var lttd = parseFloat(names[i].nextSibling.childNodes[1].text);
                var altitude = parseFloat(names[i].nextSibling.childNodes[2].text);
                var altitudeTypeCode = 0;
                var yaw = parseFloat(names[i].nextSibling.childNodes[3].text);
                var pitch = parseFloat(names[i].nextSibling.childNodes[4].text) - 90;
                var roll = 0.0;
                var distance = parseFloat(names[i].nextSibling.childNodes[5].text);
                var pPosition = this._sgworld.Creator.CreatePosition(lgtd, lttd, altitude, altitudeTypeCode, yaw, pitch, roll, distance);

                this._sgworld.Navigate.FlyTo(pPosition);
                break;
            }
        }
    },
    loadXML:function (xmlFile) {
        var xmlDoc;
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        }
        else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
            //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.load(xmlFile);
        }
        else { //谷歌浏览器
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", xmlFile, false);
            xmlhttp.send(null);
            if (xmlhttp.readyState == 4) {
                xmlDoc = xmlhttp.responseXML.documentElement;
            }
        }

        return xmlDoc;
    },

    // 首先对xml对象进行判断
    checkXMLDocObj:function (xmlFile) {
        var xmlDoc = this.loadXML(xmlFile);
        if (xmlDoc == null) {
            alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
            window.location.href = '../err.html';
        }
        return xmlDoc;
    },
    //城市空气查询
    queryObjList_CSKQ: function () {
        //this._listNumber = 1;
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirSite/MapServer/0/");
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = false;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = " ISON = 0 ";
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.addCityAirFeatureSetToMap));
    },
    
    //城市空气企业
    addCityAirFeatureSetToMap: function (featureSet) {
        //Create graphics layer for citie
        if ($get("companyListDiv").innerHTML.trim() != "") {
            var domCompanyList = document.getElementById("companyListDiv").children;
            while (domCompanyList.length > 0) {
                $get("divHiddenService").appendChild(domCompanyList[0]);
            }
            $get("companyListDiv").innerHTML = "";
        }

        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        var n = -1;
        var oJson = [
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
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
                    return;
                }
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
        });
        this.__JsonCoObj = oJson;
        this.ObjectListShow();
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        $get("companyListDiv").appendChild(loadingDiv);
        this.CreateAirCityList(oJson, $get("companyListDiv"));
    },
    //创建各市站点名称列表_城市空气
    CreateAirCityList: function (json, oParent) {
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
            objTopLeftCoCount.innerHTML = "（" + json[o].children.length + "个）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("pscode", json[o].children[i].stationcode);
                li.setAttribute("city", json[o].name);
                li.setAttribute("company", json[o].children[i].name);
                $addHandler(li, "click", Function.createDelegate(this, this.AirCityBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                //coTextDiv.innerHTML = json[o].children[i].name;
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv);
            }
        }
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //站点点击事件——城市空气
    AirCityBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var companyName = "";
        var city = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                companyName = elem.attributes["company"].value;
                city = elem.attributes["city"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {

            var graphicsLayer = this._mapOne.getLayer(this._mapOne.graphicsLayerIds[0]);
            if (this.handlerMapExtent == null) {
                this.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(this, this.mapOneExtentChange));
            }
            var _ins = this;
            dojo.forEach(graphicsLayer.graphics, function (graphic) {
                if (graphic.attributes["STATIONCOD"] == psCode) {
                    var zoomNum = _ins._mapOne.getMaxZoom();
                    _ins._mapOne.centerAndZoom(graphic.geometry, zoomNum);
                    _ins._mapOne.infoWindow.setTitle("城市空气站点基本信息");
                    _ins._mapOne.infoWindow.setContent("站点名称：" + graphic.attributes["STATIONNAM"] + "</br>所在城市：" + graphic.attributes["CITYNAME"]);
                    _ins._mapOne.infoWindow.show(graphic.geometry, infoWindowEsri.ANCHOR_UPPERRIGHT);
                }
            });
            this.hideServiceList();
        }
        else {
            try {
                var name = city + companyName + "自动站";
                this.query3DLocationOthers(name);
                //var pos = this._sgworld.ProjectTree.FindItem("location\\" + city+companyName+"自动站");
                //this._sgworld.Navigate.FlyTo(pos);
                this.hidePopupByCaption();
                var popup = this._sgworld.Creator.CreatePopupMessage("导航", document.location.hostname + "/WebSite/CSKQ/SkuLineNavCCKQ.aspx", 0, 0);
                popup.Height = 171;
                popup.Width = 130;
                this._sgworld.Window.ShowPopup(popup);

            }
            catch (e) {
                alert(e);
            };
        }

        var obj = new Object();
        obj.psname = companyName;
        obj.cityname = city;
        localStorage.companyInfo = JSON.stringify(obj);
        localStorage.airCityStationCode = psCode;
    },
    //饮用水源地查询
    queryObjList_YYSYD: function () {
        //this._listNumber = 1;
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/DrinkWaterSite/MapServer/0/");
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = false;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "1=1";
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.addDrinkWaterFeatureSetToMap));
    },
    //饮用水源地站点
    addDrinkWaterFeatureSetToMap: function (featureSet) {
        //Create graphics layer for citie
        if ($get("companyListDiv").innerHTML.trim() != "") {
            var domCompanyList = document.getElementById("companyListDiv").children;
            while (domCompanyList.length > 0) {
                $get("divHiddenService").appendChild(domCompanyList[0]);
            }
            $get("companyListDiv").innerHTML = "";
        }

        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        var n = -1;
        var oJson = [
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
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
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
        });
        this.__JsonCoObj = oJson;
        this.ObjectListShow();
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        $get("companyListDiv").appendChild(loadingDiv);
        this.CreateDrinkWaterList(oJson, $get("companyListDiv"));
    },
    //创建各市站点名称列表_饮用水源地
    CreateDrinkWaterList: function (json, oParent) {
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
            objTopLeftCoCount.innerHTML = "（" + json[o].children.length + "个）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("pscode", json[o].children[i].sitecode);
                li.setAttribute("city", json[o].name);
                li.setAttribute("company", json[o].children[i].name);
                $addHandler(li, "click", Function.createDelegate(this, this.DrinkWaterBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                //coTextDiv.innerHTML = json[o].children[i].name;
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
        }
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //站点点击事件——饮用水源地
    DrinkWaterBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var companyName = "";
        var city = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                companyName = elem.attributes["company"].value;
                city = elem.attributes["city"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {

            var graphicsLayer = this._mapOne.getLayer(this._mapOne.graphicsLayerIds[0]);
            if (this.handlerMapExtent == null) {
                this.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(this, this.mapOneExtentChange));
            }
            var _ins = this;
            dojo.forEach(graphicsLayer.graphics, function (graphic) {
                if (graphic.attributes["SITENO"] == psCode) {
                    var zoomNum = _ins._mapOne.getMaxZoom();
                    _ins._mapOne.centerAndZoom(graphic.geometry, zoomNum);
                    _ins._mapOne.infoWindow.setTitle("饮用水源地站点基本信息");
                    _ins._mapOne.infoWindow.setContent("站点名称：" + graphic.attributes["SITENAME"] + "</br>所在城市：" + graphic.attributes["CITY"]);
                    _ins._mapOne.infoWindow.show(graphic.geometry, infoWindowEsri.ANCHOR_UPPERRIGHT);
                }
            });
            this.hideServiceList();
        }
        else {
            try {
                var name = companyName;
                this.query3DLocationOthers(name);
                //var pos = this._sgworld.ProjectTree.FindItem("location\\" + companyName);
                //this._sgworld.Navigate.FlyTo(pos);
                this.hidePopupByCaption();
                var popup = this._sgworld.Creator.CreatePopupMessage("导航", document.location.hostname + "/WebSite/YYSYD/SkuLineNavYYSYD.aspx", 0, 0);
                popup.Height = 132;
                popup.Width = 130;
                this._sgworld.Window.ShowPopup(popup);

            }
            catch (e) {
                alert(e);
            };
        }

        var obj = new Object();
        obj.psname = companyName;
        obj.cityname = city;
        localStorage.companyInfo = JSON.stringify(obj);
        
        localStorage.drinkWaterSiteCode = psCode; 
    },
    //地表水断面查询
    queryObjList_DBSDM: function () {
        //this._listNumber = 1;
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer/0/");
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = false;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "SITETYPE='自动' and  SITENO is not  null";
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.addSurfaceWaterFeatureSetToMap));
    },
    //地表水断面站点
    addSurfaceWaterFeatureSetToMap: function (featureSet) {
        //Create graphics layer for citie
        if ($get("companyListDiv").innerHTML.trim() != "") {
            var domCompanyList = document.getElementById("companyListDiv").children;
            while (domCompanyList.length > 0) {
                $get("divHiddenService").appendChild(domCompanyList[0]);
            }
            $get("companyListDiv").innerHTML = "";
        }

        if (this._featureSet == null) {
            this._featureSet = featureSet;
        }
        var n = -1;
        var oJson = [
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
        var text = $get("inputSearch").value.trim();
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.NAME.indexOf(text) < 0) {
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
        });
        this.__JsonCoObj = oJson;
        this.ObjectListShow();
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        $get("companyListDiv").appendChild(loadingDiv);
        this.CreateSurfaceWaterCityList(oJson, $get("companyListDiv"));
    },
    //创建各市站点名称列表_地表水断面
    CreateSurfaceWaterCityList: function (json, oParent) {
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
            objTopLeftCoCount.innerHTML = "（" + json[o].children.length + "个）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("ul");
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("pscode", json[o].children[i].sitecode);
                li.setAttribute("city", json[o].name);
                li.setAttribute("company", json[o].children[i].name);
                $addHandler(li, "click", Function.createDelegate(this, this.SurfaceWaterBarClick))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                coImgDiv.innerHTML = "<img src='Images/building.png' class='coImg' />";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                //coTextDiv.innerHTML = json[o].children[i].name;
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
        }
        var loading = new LoadingAnimation();
        loading.hide();
    },
    //站点点击事件——地表水断面
    SurfaceWaterBarClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var companyName = "";
        var city = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.background = "#333333";
        }
        while (elem) {
            if (elem.localName == "li") {
                psCode = elem.attributes["pscode"].value;
                companyName = elem.attributes["company"].value;
                city = elem.attributes["city"].value;
                elem.style.background = "#666666";
                break;
            }
            elem = elem.parentNode;
        }
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {

            var graphicsLayer = this._mapOne.getLayer(this._mapOne.graphicsLayerIds[0]);
            if (this.handlerMapExtent == null) {
                this.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(this, this.mapOneExtentChange));
            }
            var _ins = this;
            dojo.forEach(graphicsLayer.graphics, function (graphic) {
                if (graphic.attributes["SITENO"] == psCode) {
                    var zoomNum = _ins._mapOne.getMaxZoom();
                    _ins._mapOne.centerAndZoom(graphic.geometry, zoomNum);
                    _ins._mapOne.infoWindow.setTitle("地表水断面站点基本信息");
                    _ins._mapOne.infoWindow.setContent("站点名称：" + graphic.attributes["SITENAME"] + "</br>所在城市：" + graphic.attributes["PROVINCE"]);
                    _ins._mapOne.infoWindow.show(graphic.geometry, infoWindowEsri.ANCHOR_UPPERRIGHT);
                }
            });
            this.hideServiceList();
        }
        else {
            try {
                var name = companyName + "自动站";
                this.query3DLocationOthers(name);
                //var pos = this._sgworld.ProjectTree.FindItem("location\\" + companyName+"自动站");
                //this._sgworld.Navigate.FlyTo(pos);
                this.hidePopupByCaption();
                var popup = this._sgworld.Creator.CreatePopupMessage("导航", document.location.hostname + "/WebSite/DBS/SkuLineNavDBS.aspx", 0, 0);
                popup.Height = 132;
                popup.Width = 130;
                this._sgworld.Window.ShowPopup(popup);
            }
            catch (e) {
                alert(e);
            };
        }

        var obj = new Object();
        obj.psname = companyName;
        obj.cityname = city;
        localStorage.companyInfo = JSON.stringify(obj);
       
        localStorage.serfaceWaterSiteCode = psCode;
    },
    //隐藏服务列表
    hideServiceList:function(){
        
        $get("divStTopLeft").setAttribute("name", "up");
        $get("divStTopLeft").innerHTML = "<img src='Images/btn_menu_up.png' />";
        $get("divServiceList").style.display = "none";
        $get("divCardList").style.right = "10px";
    },
    //显示服务列表
    ShowServiceList: function () {
        
        $get("divStTopLeft").setAttribute("name", "down");
        $get("divStTopLeft").innerHTML = "<img src='Images/btn_menu_down.png' />";
        $get("divCardList").style.right = "354px";
        $get("divServiceList").style.display = "block";
    },
    //省管电厂、污水处理厂、一般废水、一般废气复选框【click】事件
    ObjCheckBoxClick: function (e) {
        this.addCompanyFeatureSetToMap(this._featureSet);
    },
    //搜索框内容改变事件【change】事件
    SearchTxtChange: function (e) {
        switch (this._listNumber) {
            case 1:
                this.addCompanyFeatureSetToMap(this._featureSet);
                break;
            case 2:
                this.ShowCityQueryResult(this._featureSet)
                break;
        }
        
        
    },
    SearchTxtKeyDown: function (evt) {
        if (evt.keyCode == 13) {
            if (evt && evt.preventDefault) {//如果是FF下执行这个
                evt.preventDefault();
            } else {
                window.event.returnValue = false;//如果是IE下执行这个
            }
        }
    },
    SearchTxtKeyUp:function(e){
        if (e.keyCode == 13) {
            $get("inputSearch").blur();
        }
    },
    SearchTxtSelectstart:function(event){
        event.rawEvent.cancelBubble = true;
    },
    //二三维联动
    TwoThreeDimensionClick:function(e){
        var classTool = new HandleClass();
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var b = false;
        while (elem) {
            if (elem.id == "divTwoThreeDimension") {
                var name = elem.attributes["name"].value;
                if (name == "0") {
                    b = true;
                }
                break;
            }
            elem = elem.parentNode;
        }
        if (b) {
            //classTool.removeClass($get("divServiceList"), "serviceListShow");
            //classTool.addClass($get("divServiceList"), "serviceListHide");
            this.hidePopupByCaption();
            elem.setAttribute("name", "1");
            $get("divMain3DBox").style.right = (document.body.clientWidth * 0.5 + 4) + "px";
            this.showTwoDimension();
            elem.children[0].setAttribute("src", "Images/ic_menu_backto.png");
            this.hideServiceList();
        }
        else {
            this.showTwoDimension();
            $get("divMain3DBox").style.right = "352px";
            elem.setAttribute("name", "0");
            elem.children[0].setAttribute("src", "Images/ic_menu_goto.png");
            //classTool.removeClass($get("divServiceList"), "serviceListHide");
            //classTool.addClass($get("divServiceList"), "serviceListShow");
            this.ShowServiceList();
        }
        
    },
    hidePopupByCaption:function(){
        this._sgworld.Window.RemovePopupByCaption("导航");
        this._sgworld.Window.RemovePopupByCaption("企业视频");
        this._sgworld.Window.RemovePopupByCaption("企业工况");
        this._sgworld.Window.RemovePopupByCaption("企业基本信息");
    },
    showTwoDimension: function () {
        var _ins = this;
        if ($get("TwoDimensionMap")) {
            if ($get("TwoDimensionMap").style.display == "none") {
                $get("TwoDimensionMap").style.display = "block";
            }
            else {
                $get("TwoDimensionMap").style.display = "none";
            }
        }
        else {
            var TwoDBox = document.createElement("div");
            TwoDBox.className = "TwoDimensionBox";
            TwoDBox.id = "TwoDimensionMap";
            TwoDBox.style.display = "block";
            document.body.appendChild(TwoDBox);

            require([
				"esri/map",
				"esri/layers/ArcGISTiledMapServiceLayer",
				"esri/layers/ArcGISDynamicMapServiceLayer",
				"esri/geometry/Extent",
				"esri/SpatialReference",
				"esri/dijit/OverviewMap",
				"esri/layers/FeatureLayer",
				"esri/tasks/query",
				"esri/graphic",
				"esri/InfoTemplate",
				"esri/symbols/SimpleMarkerSymbol",
				"esri/Color",
                "esri/toolbars/navigation",
				"dojo",
				"dojo/domReady!"],
		function (Map, Tiled, Dynamic, Extent, SpatialReference, OverviewMap, FeatureLayer,
        Query, Graphic, InfoTemplate, SimpleMarkerSymbol, Color,Navigation, dojo) {
		    var oExtent = new Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
		    mapOne = new Map("TwoDimensionMap", {
		        extent: oExtent,
                logo:false
		    });
		    var layer1 = new Tiled("http://192.168.12.197:6080/arcgis/rest/services/Vector_New/MapServer");
		    mapOne.addLayers([layer1]);
		    dojo.connect(layer1, "onLoad", Function.createDelegate(_ins, _ins.LayerLoaded))
		    
		    ////var symbol = _ins.MarkerSymbol("blue");
		    ////layer2.setSelectionSymbol(symbol);
		    //navToolbarOne = Navigation(mapOne);
		    
		    //var query = new Query();
		    //layer2.queryFeatures(query);
		    dojo.connect(mapOne, "onMouseOver", Function.createDelegate(_ins, _ins.mapOneMouseOver));
		    //dojo.connect(mapOne, "onMouseOut", Function.createDelegate(_ins, _ins.mapOneMouseOut));
		    _ins.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(_ins, _ins.mapOneExtentChange));
		    mapOne.on("click", function (evt) {
		        //map.graphics.clear();
		        //map.infoWindow.hide();
		        var zoomNum = mapOne.getMaxZoom();
		        mapOne.centerAndZoom(evt.mapPoint, zoomNum);
		    });
		    _ins._mapOne = mapOne;

		});
            
        }
    },
    LayerLoaded:function(evt){
        if (document.getElementById("divSLZDWYY").style.background == "rgb(105, 105, 105)") {
            this.mapOneReplaceLayer("divSLZDWYY");
        }
        else if (document.getElementById("divSLCSKQ").style.background == "rgb(105, 105, 105)") {
            this.mapOneReplaceLayer("divSLCSKQ");
        }
        else if (document.getElementById("divSLYYSYD").style.background == "rgb(105, 105, 105)") {
            this.mapOneReplaceLayer("divSLYYSYD");
        }
        else if (document.getElementById("divSLDBSDM").style.background == "rgb(105, 105, 105)") {
            this.mapOneReplaceLayer("divSLDBSDM");
        }
    },
    mapOneReplaceLayer: function (id) {
        //var featureLayer;
        if (mapOne && mapOne.getLayer("featureLayer")) {
            mapOne.removeLayer(mapOne.getLayer("featureLayer"));
        }
        var whereStr = "";
        var url = "";
        switch (id) {
            case "divSLZDWYY":
                //featureLayer = new esri.layers.FeatureLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/1", {
                //    infoTemplate: new esri.InfoTemplate("重点污染源企业基本信息", "公司名称：${NAME}</br>所在城市：${CITY}</br>关注程度：${PROPERTY}</br>企业类型：${TYPE}</br>当前位置：${POINT}"),
                //    outFields: ["NAME", "CITY", "PROPERTY", "TYPE", "POINT"],
                //    id: "featureLayer"
                //});
                url = "http://192.168.12.197:6080/arcgis/rest/services/Special/PollutionEnterprises/MapServer/1";
                whereStr = "POINT like '%门%' and pscode <>'0' and PROPERTY in('国控' , '省控' )";
                break;
            case "divSLCSKQ":
                //featureLayer = new esri.layers.FeatureLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirSite/MapServer/0/", {
                //    infoTemplate: new esri.InfoTemplate("城市空气站点基本信息", "站点名称：${STATIONNAM}</br>所在城市：${CITYNAME}"),
                //    outFields: ["*"],
                //    id: "featureLayer"
                //});
                url = "http://192.168.12.197:6080/arcgis/rest/services/Special/CityAirSite/MapServer/0/";
                whereStr = "1=1";
                break;
            case "divSLYYSYD":
                //featureLayer = new esri.layers.FeatureLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/DrinkWaterSite/MapServer/0/", {
                //    infoTemplate: new esri.InfoTemplate("饮用水源地站点基本信息", "站点名称：${SITENAME}</br>所在城市：${CITY}"),
                //    outFields: ["*"],
                //    id: "featureLayer"
                //});
                url = "http://192.168.12.197:6080/arcgis/rest/services/Special/DrinkWaterSite/MapServer/0/";
                whereStr = "1=1";
                break;
            case "divSLDBSDM":
                //featureLayer = new esri.layers.FeatureLayer("http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer/0/", {
                //    infoTemplate: new esri.InfoTemplate("地表水断面站点基本信息", "站点名称：${SITENAME}</br>所在城市：${PROVINCE}"),
                //    outFields: ["*"],
                //    id: "featureLayer"
                //});
                url = "http://192.168.12.197:6080/arcgis/rest/services/Special/WaterSection/MapServer/0/";
                whereStr = " ISON <> 0 ";
                break;
        }
        //mapOne.addLayers([featureLayer]);
        //var query = new esri.tasks.Query();
        //featureLayer.queryFeatures(query);
        var coQueryTask = new esri.tasks.QueryTask(url);
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = true;
        coQuery.outSpatialReference = mapOne.spatialReference;
        coQuery.where = whereStr;
        switch (id) {
            case "divSLZDWYY":
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addTowDCoFeatureSetToMap));
                break;
            case "divSLCSKQ":
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addTowDAirFeatureSetToMap))
                break;
            case "divSLYYSYD":
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addTowDDrinkFeatureSetToMap))
                break;
            case "divSLDBSDM":
                coQueryTask.execute(coQuery, Function.createDelegate(this, this.addTowDWaterFeatureSetToMap))
                break;
        }

    },
    addTowDCoFeatureSetToMap:function(featureSet){
        var graphicLayer = new esri.layers.GraphicsLayer({ id: "featureLayer" });
        var infoTemplate = new esri.InfoTemplate("重点污染源企业基本信息", "公司名称：${NAME}</br>所在城市：${CITY}</br>关注程度：${PROPERTY}</br>企业类型：${TYPE}</br>当前位置：${POINT}");
        graphicLayer.setInfoTemplate(infoTemplate);
        mapOne.addLayer(graphicLayer);
        var text = $get("inputSearch").value.trim();
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
            if (!$get("checkBox_sewage").checked && feature.attributes.PSTYPE == "W") {
                return;
            }
            if (!$get("checkBox_gas").checked && feature.attributes.PSTYPE == "Q") {
                return;
            }
            var symbol;
            switch (feature.attributes.PSTYPE) {
                case "W":
                    symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/5.png", 25, 25);
                    break;
                case "S":
                    symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/6.png", 25, 25);
                    break;
                default:
                    symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/7.png", 25, 25);
                    break;
            }
            graphicLayer.add(feature.setSymbol(symbol));
        });
    },
    addTowDAirFeatureSetToMap: function (featureSet) {
        var graphicLayer = new esri.layers.GraphicsLayer({ id: "featureLayer" });
        var infoTemplate = new esri.InfoTemplate("城市空气站点基本信息", "站点名称：${STATIONNAM}</br>所在城市：${CITYNAME}");
        graphicLayer.setInfoTemplate(infoTemplate);
        mapOne.addLayer(graphicLayer);
        var text = $get("inputSearch").value.trim();
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.STATIONNAM.indexOf(text) < 0) {
                    return;
                }
            }
            var symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/8.png", 25, 25);
            graphicLayer.add(feature.setSymbol(symbol));
        });
    },
    addTowDDrinkFeatureSetToMap: function (featureSet) {
        var graphicLayer = new esri.layers.GraphicsLayer({ id: "featureLayer" });
        var infoTemplate = new esri.InfoTemplate("饮用水源地站点基本信息", "站点名称：${SITENAME}</br>所在城市：${CITY}");
        graphicLayer.setInfoTemplate(infoTemplate);
        mapOne.addLayer(graphicLayer);
        var text = $get("inputSearch").value.trim();
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.SITENAME.indexOf(text) < 0) {
                    return;
                }
            }
            var symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/10.png", 25, 25);
            graphicLayer.add(feature.setSymbol(symbol));
        });
    },
    addTowDWaterFeatureSetToMap: function (featureSet) {
        var graphicLayer = new esri.layers.GraphicsLayer({ id: "featureLayer" });
        var infoTemplate = new esri.InfoTemplate("地表水断面站点基本信息", "站点名称：${SITENAME}</br>所在城市：${PROVINCE}");
        graphicLayer.setInfoTemplate(infoTemplate);
        mapOne.addLayer(graphicLayer);
        var text = $get("inputSearch").value.trim();
        dojo.forEach(featureSet.features, function (feature) {
            if (text != "" && text != null) {
                if (feature.attributes.SITENAME.indexOf(text) < 0) {
                    return;
                }
            }
            var symbol = new esri.symbol.PictureMarkerSymbol("Images/mapImages/2.png", 25, 25);
            graphicLayer.add(feature.setSymbol(symbol));
        });
    },
    mapOneMouseOver: function (evt) {
        if (this.handlerMapExtent == null) {
            this.handlerMapExtent = dojo.connect(mapOne, "onExtentChange", Function.createDelegate(this, this.mapOneExtentChange));
        }
    },
    mapOneMouseOut:function(evt){
        dojo.disconnect(this.handlerMapExtent);
    },
    mapOneExtentChange:function(evt,x){
        var xMax = this.mercatorToLon(evt.xmax);
        var yMax = this.mercatorToLat(evt.ymax);
        var xMin = this.mercatorToLon(evt.xmin);
        var yMin = this.mercatorToLat(evt.ymin);
        this.Move3DMapTo(xMax, yMax, xMin, yMin);
    },
    mercatorToLon:function(x){
        var toX = x / 20037508.34 * 180;
        return toX;
    },
    mercatorToLat:function(y) {
        var toY = y / 20037508.34 * 180;
        toY = 180 / Math.PI * (2 * Math.atan(Math.exp(toY * Math.PI / 180)) - Math.PI / 2);
        return toY;
    },
    lonToMercator:function(x){
        var toX = x * 20037508.34 / 180;
        return toX;
    },
    LatToMercator:function(y){
        var toY = Math.log(Math.tan((90 + y) * Math.PI / 360)) / (Math.PI / 180);
        toY = toY * 20037508.34 / 180;
        return toY;
    },
    Move3DMapTo: function (xMax, yMax, xMin, yMin) {
        var lgtd = (xMax + xMin) / 2;
        var lttd = (yMax + yMin) / 2;
        var altitude = this._sgworld.CoordServices.GetDistance(xMax, yMax, xMin, yMin);
        var altitudeTypeCode = 0;
        var yaw = 0.0;
        var pitch = -89;
        var roll = 0.0;
        var distance = this._sgworld.CoordServices.GetDistance(xMax, yMax, xMin, yMin);
        var pPosition = this._sgworld.Creator.CreatePosition(lgtd, lttd, altitude, altitudeTypeCode, yaw, pitch, roll, distance);
        this._sgworld.Navigate.SetPosition(pPosition);
    },
    Move2DMapTo: function () {
        if ($get("TwoDimensionMap") && $get("TwoDimensionMap").style.display == "block") {
            var rect = this._sgworld.Window.Rect;
            var positionMax = this._sgworld.Window.PixelToWorld(0, rect.Height - 1, -1).Position;
            var positionMin = this._sgworld.Window.PixelToWorld(rect.Height - 1, 0, -1).Position;
            var xmax = this.lonToMercator(positionMin.X);
            var ymax = this.LatToMercator(positionMin.Y);
            var xmin = this.lonToMercator(positionMax.X);
            var ymin = this.LatToMercator(positionMax.Y);
            var xExtent = new esri.geometry.Extent({ "xmax": xmax, "ymax": ymax, "xmin": xmin, "ymin": ymin, "spatialReference": { wkid: 3857 } });
            mapOne.setExtent(xExtent);
        }
    },
    ObjCheckBoxHandler: function () {
        $addHandler($get("checkBox_power"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_sewage"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_water"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("checkBox_gas"), "click", Function.createDelegate(this, this.ObjCheckBoxClick));
        $addHandler($get("inputSearch"), "change", Function.createDelegate(this, this.SearchTxtChange));
        $addHandler($get("inputSearch"), "keyup", Function.createDelegate(this, this.SearchTxtKeyUp));
    },
    ObjCheckBoxRemoveHandler: function () {
        $clearHandlers($get("checkBox_power"));
        $clearHandlers($get("checkBox_sewage"));
        $clearHandlers($get("checkBox_water"));
        $clearHandlers($get("checkBox_gas"));
        $clearHandlers($get("inputSearch"));
        $addHandler($get("inputSearch"), "keydown", Function.createDelegate(this, this.SearchTxtKeyDown));
        $addHandler($get("inputSearch"), "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
    },
    coClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var num = 0;
        while (elem) {
            if (elem.localName == "div") {
                var classArr = elem.className.split(' ');
                if (classArr[0] == "coAll") {
                    num = parseInt(elem.id.split('_')[1]);
                    break;
                }
            }
            elem = elem.parentNode;
        }
        var _ins = this;
        require([
       "esri/map",
       "esri/toolbars/navigation",
       "dojo/on",
       "dojo/parser",
       "dijit/registry",
       "dijit/Toolbar",
       "dijit/form/Button",
       "dojo/domReady!"
        ],
       function (Map, Navigation, on, parser, registry) {

           parser.parse();

           //var navToolbar = new Navigation(map);
           on(_ins._navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
           switch (num) {
               case 1:
                   _ins._navToolbar.activate(Navigation.ZOOM_IN);
                   break;
               case 2:
                   _ins._navToolbar.activate(Navigation.ZOOM_OUT);
                   break;
               case 3:
                   var maxZoom = map.getMaxZoom();
                   map.setZoom(maxZoom);
                   break;
               case 4:
                   map.setZoom(0);
                   break;
               case 5:
                   //_ins._navToolbar.zoomToFullExtent();
                   var oExtent = new esri.geometry.Extent({ "xmin": 12257465, "ymin": 3676058, "xmax": 13027952, "ymax": 4358737, "spatialReference": { wkid: 3857 } });
                   map.setExtent(oExtent);
                   break;
               case 6:
                   _ins._navToolbar.deactivate();
                   break;
               case 7:
                   _ins._navToolbar.zoomToPrevExtent();
                   break;
               case 8:
                   _ins._navToolbar.zoomToNextExtent();
                   break;
               case 9:
                   _ins._navToolbar.activate(Navigation.PAN);
                   break;
               case 10:
                   if (this._scaleBar == null) {
                       this._scaleBar = new esriScalebar({
                           map: map,
                           attachTo: "top-left",
                           scalebarStyle: "line",
                           scalebarUnit: "metric"
                       });
                   }
                   else {
                       this._scaleBar.destroy();
                       this._scaleBar = null;
                   }
                   break;
               case 11:
                   if (this._legendPanl != null) {
                       if (this._legendPanl.style.display == "none") {
                           this._legendPanl.style.display = "block";
                       }
                       else {
                           this._legendPanl.style.display = "none";
                       }
                   }
                   else {
                       this._legendPanl = document.createElement("div");
                       this._legendPanl.className = "legendBox";
                       this._legendPanl.style.display = "block";
                       document.body.appendChild(this._legendPanl);
                       
                       var divTitle = document.createElement("div");
                       divTitle.className = "legendTitle";
                       divTitle.innerHTML = "图例";
                       this._legendPanl.appendChild(divTitle);

                       var divContent = document.createElement("div");
                       divContent.className = "legendContent";
                       //divContent.innerHTML = "<img src='Images/legend.jpg' style='width:168px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;' />";
                       this._legendPanl.appendChild(divContent);

                       var jsonLegend = [{ id: 1, name: "污水厂", img: "5.png" }, { id: 2, name: "一般废水企业", img: "6.png" }, { id: 3, name: "电厂及一般废气企业", img: "7.png" },
                            { id: 4, name: "地表水断面监控自动站", img: "2.png" }, { id: 5, name: "城市空气环境监控自动站", img: "8.png" }, { id: 6, name: "饮用水源地监控自动站", img: "10.png" },
                            { id: 7, name: "医疗固废", img: "11.png" }, { id: 8, name: "饮用水源保护区", img: "3.png" }];

                       for (var i = 0; i < jsonLegend.length; i++) {
                           var divImg = document.createElement("div");
                           divImg.className = "legendContentImg";
                           divImg.innerHTML = "<img src='Images/mapImages/" + jsonLegend[i].img + "' style='width:100%;height:100%' />";
                           divContent.appendChild(divImg);

                           var divLName = document.createElement("div");
                           divLName.className = "legendContentName";
                           divLName.innerHTML = jsonLegend[i].name;
                           divContent.appendChild(divLName);
                       }
                   }
                   break;
               case 12:
                   if (map.layerIds.length >= 2) {
                       isverticalswipe = !isverticalswipe;
                   }
                   else {
                       isverticalswipe = false;
                   }
                   if (isverticalswipe) {
                       _ins.handlerMapRoller = dojo.connect(map, 'onMouseMove', Function.createDelegate(_ins, _ins.RollerShadesMapFn));
                   }
                   else {
                       for (var i = 0; i < map.layerIds.length; i++) {
                           document.getElementById(map.id + '_' + map.layerIds[i]).style.clip = "auto";
                       }
                       dojo.disconnect(_ins.handlerMapRoller);
                       this.handlerMapRoller = null;
                       
                   }
                   break;
               case 13:
                   if (overviewMapDijit.visible) {
                       overviewMapDijit.hide();
                   }
                   else {
                       overviewMapDijit.show();
                   }
                   break;
               case 14:
                   if (_ins._locationBox != null) {
                       _ins._locationBox.style.display = "block";
                   }
                   else {
                       _ins._locationBox = document.createElement("div");
                       _ins._locationBox.className = "LocationBox";
                       _ins._locationBox.id = "LocationBoxDiv";
                       document.body.appendChild(_ins._locationBox);

                       var topDiv = document.createElement("div");
                       topDiv.className = "LocationBoxTop";
                       _ins._locationBox.appendChild(topDiv);

                       var exitDiv = document.createElement("div");
                       exitDiv.className = "LocationBoxHide";
                       exitDiv.innerHTML = "<img src='Images/menu_card_close.png' style='width:24px;height:24px;' />";
                       exitDiv.title = "关闭";
                       topDiv.appendChild(exitDiv);
                       $addHandler(exitDiv, "click", Function.createDelegate(_ins, _ins.closeLocationBoxClick));

                       var titleDiv = document.createElement("div");
                       titleDiv.className = "LocationTitleDiv";
                       titleDiv.innerHTML = "基础定位";
                       topDiv.appendChild(titleDiv);

                       var hideDiv = document.createElement("div");
                       hideDiv.className = "LocationBoxToLeft";
                       hideDiv.innerHTML = "<img src='Images/roll_menu_7.png' style='width:20px;height:20px;' />";
                       hideDiv.title = "隐藏";
                       topDiv.appendChild(hideDiv);
                       $addHandler(hideDiv, "click", Function.createDelegate(_ins, _ins.hideLocationBoxClick));

                       var mainBoxDiv = document.createElement("div");
                       mainBoxDiv.className = "LocationMainBox";
                       mainBoxDiv.id = "con";
                       _ins._locationBox.appendChild(mainBoxDiv);

                       var ul = document.createElement("ul");
                       ul.id = "tags";
                       mainBoxDiv.appendChild(ul);

                       var liPoint = document.createElement("li");
                       liPoint.className = "selectTag";
                       liPoint.setAttribute("name", "tagContent0");
                       ul.appendChild(liPoint);

                       var aPoint = document.createElement("a");
                       aPoint.href = "javascript:void(0)";
                       aPoint.innerHTML = "经纬度定位";
                       liPoint.appendChild(aPoint);

                       var liCity = document.createElement("li");
                       liCity.setAttribute("name", "tagContent1");
                       ul.appendChild(liCity);

                       var aCity = document.createElement("a");
                       aCity.href = "javascript:void(0)";
                       aCity.innerHTML = "行政区定位";
                       liCity.appendChild(aCity);

                       var liRiver = document.createElement("li");
                       liRiver.setAttribute("name", "tagContent2");
                       ul.appendChild(liRiver);

                       var aRiver = document.createElement("a");
                       aRiver.href = "javascript:void(0)";
                       aRiver.innerHTML = "河流定位";
                       liRiver.appendChild(aRiver);
                       $addHandler(aPoint, "click", Function.createDelegate(_ins, _ins.selectLocationTag));
                       $addHandler(aCity, "click", Function.createDelegate(_ins, _ins.selectLocationTag));
                       $addHandler(aRiver, "click", Function.createDelegate(_ins, _ins.selectLocationTag));

                       var tagContentDiv = document.createElement("div");
                       tagContentDiv.id = "tagContent";
                       mainBoxDiv.appendChild(tagContentDiv);

                       var tagContentOne = document.createElement("div");
                       tagContentOne.className = "tagContent selectTag";
                       tagContentOne.id = "tagContent0";
                       //tagContentOne.innerHTML = "00000";
                       tagContentDiv.appendChild(tagContentOne);

                       var tagContentTow = document.createElement("div");
                       tagContentTow.id = "tagContent1";
                       tagContentTow.className = "tagContent";
                       tagContentTow.style.display = "none";
                       tagContentTow.style.padding = "5px";
                       //tagContentTow.innerHTML = "11111";
                       tagContentDiv.appendChild(tagContentTow);

                       var tagContentThree = document.createElement("div");
                       tagContentThree.className = "tagContent";
                       tagContentThree.id = "tagContent2";
                       tagContentThree.style.padding = "5px";
                       //tagContentThree.innerHTML = "22222";
                       tagContentDiv.appendChild(tagContentThree);

                       _ins.mainBoxBarThreeClick();
                       _ins.queryCityTask();
                       _ins.queryRiverTask();
                   }
                   break;
           }
           function extentHistoryChangeHandler() {
               registry.byId("divCo_7").disabled = _ins._navToolbar.isFirstExtent();
               registry.byId("divCo_8").disabled = _ins._navToolbar.isLastExtent();
           }
       });
    },
    selectLocationTag:function(e){
        // 操作标签
        var tag = document.getElementById("tags").getElementsByTagName("li");
        var taglength = tag.length;
        for (i = 0; i < taglength; i++) {
            tag[i].className = "";
        }
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var showContent = "";
        while (elem) {
            if (elem.localName=="li") {
                elem.className = "selectTag";
                showContent = elem.getAttribute("name");
                break;
            }
            elem = elem.parentNode;
        }
        // 操作内容
        for (i = 0; j = document.getElementById("tagContent" + i) ; i++) {
            j.style.display = "none";
        }
        document.getElementById(showContent).style.display = "block";
    },
    hideLocationBoxClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var CSSHandler = new HandleClass();
        while (elem) {
            if (elem.className == "LocationBoxToLeft") {
                var locBox = document.getElementById("LocationBoxDiv");
                var arr = elem.children[0].src.split('/');
                var imgName = arr[arr.length - 1];
                if (imgName == "roll_menu_7.png") {
                    CSSHandler.addClass(locBox, "LocationBoxBackToLeft");
                    if (CSSHandler.hasClass(locBox, "LocationBoxBackToRight")) {
                        CSSHandler.removeClass(locBox, "LocationBoxBackToRight");
                    }
                    elem.children[0].src = "Images/roll_menu_8.png";
                    elem.title = "显示";
                }
                else {
                    CSSHandler.addClass(locBox, "LocationBoxBackToRight");
                    if (CSSHandler.hasClass(locBox, "LocationBoxBackToLeft")) {
                        CSSHandler.removeClass(locBox, "LocationBoxBackToLeft");
                    }
                    elem.children[0].src = "Images/roll_menu_7.png";
                    elem.title = "隐藏";
                }
                break;
            }
            elem = elem.parentNode;
        }
    },
    closeLocationBoxClick: function (e) {
        this._locationBox.style.display = "none";
        this.ObjCheckBoxRemoveHandler();
        if (map.getLayer("locGraphicsLayer")) {
            var graphicLayer = map.getLayer("locGraphicsLayer");
            map.removeLayer(graphicLayer);
        }
        var CSSHandler = new HandleClass();
        var locBox = document.getElementById("LocationBoxDiv");
        CSSHandler.removeClass(locBox, "LocationBoxBackToLeft");
        CSSHandler.removeClass(locBox, "LocationBoxBackToRight");
        locBox.children[0].children[2].children[0].src = "Images/roll_menu_7.png";
    },
    mainBoxBarThreeClick:function(e){
        var divLatBox = document.createElement("div");
        divLatBox.className = "LocationPointBox";
        $get("tagContent0").appendChild(divLatBox);

        var divLat = document.createElement("div");
        divLat.className = "LocationPoint";
        divLat.innerHTML = "纬度:";
        divLatBox.appendChild(divLat);

        var divLatText = document.createElement("div");
        divLatText.className = "LocationPointText";
        divLatText.innerHTML = "<input type='text' id='txtLocationLat' class='inputPoint' />";
        divLatBox.appendChild(divLatText);

        var divLonBox = document.createElement("div");
        divLonBox.className = "LocationPointBox";
        $get("tagContent0").appendChild(divLonBox);

        var divLon = document.createElement("div");
        divLon.className = "LocationPoint";
        divLon.innerHTML = "经度:";
        divLonBox.appendChild(divLon);

        var divLonText = document.createElement("div");
        divLonText.className = "LocationPointText";
        divLonText.innerHTML = "<input type='text' id='txtLocationLon' class='inputPoint' />";
        divLonBox.appendChild(divLonText);

        var divYes = document.createElement("div");
        divYes.className = "LocationPointConfirm";
        divYes.innerHTML = "确&nbsp;&nbsp;定";
        $get("tagContent0").appendChild(divYes);
        $addHandler(divYes, "click", Function.createDelegate(this, this.confirmPiontLocationClick));
        $addHandler($get("txtLocationLat"), "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
        $addHandler($get("txtLocationLon"), "selectstart", Function.createDelegate(this, this.SearchTxtSelectstart));
    },
    confirmPiontLocationClick: function (e) {
        var latStr = document.getElementById("txtLocationLat").value;
        var lonStr = document.getElementById("txtLocationLon").value;
        if (latStr == "" || lonStr == "") {
            $.messager.alert('提示消息', "请输入经纬度", 'error');
            return;
        }
        if (isNaN(latStr) || isNaN(lonStr)) {
            $.messager.alert('提示消息', "请在经纬度输入框中输入数字", 'error');
            return;
        }
        if (map.getLayer("locGraphicsLayer")) {
            var graphicLayer = map.getLayer("locGraphicsLayer");
            map.removeLayer(graphicLayer);
        }
        var lat = parseFloat(latStr);
        var lon = parseFloat(lonStr);
        var point = new esri.geometry.Point(lon, lat);
        var gLayer = new esri.layers.GraphicsLayer({ id: "locGraphicsLayer" });
        map.addLayer(gLayer);
        map.reorderLayer(gLayer, 1);
        var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                    new esri.Color([255, 0, 0]), 1),
                    new esri.Color([0, 255, 0, 0.8]));
        var graphic = new esri.Graphic(point, symbol);
        gLayer.add(graphic);
        map.centerAt(point);
    },
    queryCityTask:function(){
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/XINSHIJIE/MapServer/0/");
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = true;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "1=1";
        coQuery.orderByFields = ["REGIONCODE"];
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.ShowCityQueryResult));
    },
    ShowCityQueryResult: function (featureSet) {
        if (this._cityFeatureSet == null) {
            this._cityFeatureSet = featureSet;
        }
        var _ins = this;
        dojo.forEach(featureSet.features, function (feature) {
            var objCityTop = document.createElement("div");
            objCityTop.className = "locationSelectBar";
            objCityTop.setAttribute("name", feature.attributes.REGIONCODE);
            objCityTop.innerHTML = feature.attributes.NAME;
            $get("tagContent1").appendChild(objCityTop);
            $addHandler(objCityTop, "click", Function.createDelegate(_ins, _ins.ShowCityLocation));
            
        });

    },
    ShowCityLocation: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        while (elem) {
            if (elem.className == "locationSelectBar") {
                psCode = elem.attributes["name"].value;
                break;
            }
            elem = elem.parentNode;
        }
        if (map.getLayer("locGraphicsLayer")) {
            var graphicLayer = map.getLayer("locGraphicsLayer");
            map.removeLayer(graphicLayer);
        }
        var coLayer = new esri.layers.GraphicsLayer({ id: "locGraphicsLayer" });
        map.addLayer(coLayer);
        map.reorderLayer(coLayer, 1);
        var _ins = this;
        var divs = document.getElementsByClassName("locationSelectBar");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.background = "#FFFFFF";
        }
        elem.style.background = "#8FBC8F";
        dojo.forEach(_ins._cityFeatureSet.features, function (graphic) {
            if (graphic.attributes["REGIONCODE"] == psCode) {
                var symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([255, 0, 0]), 2),
                        new dojo.Color([105, 105, 105, 0.2]));
                coLayer.add(graphic.setSymbol(symbol));
                var oExtent = graphic.geometry.getExtent();
                //map.setExtent(oExtent);
                map.centerAndZoom(oExtent.getCenter(), 3);
            }
        });
    },
    queryRiverTask:function(e){
        var coQueryTask = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/positionriver/MapServer/1/");
        var coQueryTask1 = new esri.tasks.QueryTask("http://192.168.12.197:6080/arcgis/rest/services/Special/positionriver/MapServer/0/")
        var coQuery = new esri.tasks.Query();
        coQuery.outFields = ["*"];
        coQuery.returnGeometry = true;
        coQuery.outSpatialReference = map.spatialReference;
        coQuery.where = "1=1";
        coQueryTask.execute(coQuery, Function.createDelegate(this, this.ShowRiverQueryResult), function (err) {
        });
        coQueryTask1.execute(coQuery, Function.createDelegate(this, this.ShowRiverQueryResult1), function (err) {
        });
    },
    ShowRiverQueryResult:function(featureSet){
        if (this._riverFeatureSet == null) {
            this._riverFeatureSet = featureSet;
        }
        var oJson = [{ id: 1, name: "淮河流域", children: [] }, { id: 2, name: "长江流域", children: [] }, { id: 3, name: "黄河流域", children: [] }, { id: 4, name: "海河流域", children: [] }, ];
        var _ins = this;
        var n = 0;
        dojo.forEach(featureSet.features, function (feature) {
            if (feature.attributes["地物名称"].trim() == "") {
                return;
            }
            //var objCityTop = document.createElement("div");
            //objCityTop.className = "locationSelectBar";
            //objCityTop.setAttribute("name", feature.attributes["地物名称"]);
            //objCityTop.innerHTML = feature.attributes["地物名称"];
            //$get("tagContent2").appendChild(objCityTop);
            //$addHandler(objCityTop, "click", Function.createDelegate(_ins, _ins.ShowRiverLocation));
            
            switch (feature.attributes.LY) {
                case "淮河流域":
                    n = 0;
                    break;
                case "长江流域":
                    n = 1;
                    break;
                case "黄河流域":
                    n = 2;
                    break;
                case "海河流域":
                    n = 3;
                    break;
            }
            var companyObj = new Object();
            companyObj.id = feature.attributes.OBJECTID;
            companyObj.name = feature.attributes["地物名称"];
            companyObj.ly = feature.attributes.LY;
            for (var q = 0; q < oJson[n].children.length; q++) {
                if (oJson[n].children[q].name == companyObj.name) {
                    return;
                }
            }
            
            oJson[n].children.push(companyObj);
        });
        this.CreateRiverList(oJson, $get("tagContent2"));
    },
    ShowRiverQueryResult1:function(featureSet){
        if (this._riverFeatureSet1 == null) {
            this._riverFeatureSet1 = featureSet;
        }
    },
    CreateRiverList:function(json,oParent){
        for (var o = 0; o < json.length; o++) {
            if (json[o].children.length == 0) {
                continue;
            }
            var cityBoxDiv = document.createElement("div");
            cityBoxDiv.className = "ObjCityBoxR";
            oParent.appendChild(cityBoxDiv);

            var objCityTop = document.createElement("div");
            objCityTop.className = "ObjCityTop";
            objCityTop.setAttribute("name", json[o].name);
            cityBoxDiv.appendChild(objCityTop);

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
            objTopLeftCoCount.innerHTML = "（" + json[o].children.length + "条）";
            objCityTopLeft.appendChild(objTopLeftCoCount);

            var ul = document.createElement("div");
            ul.className = "coUl";
            cityBoxDiv.appendChild(ul);

            for (var i = 0; i < json[o].children.length; i++) {
                var li = document.createElement("div");
                li.className = "locationSelectBar";
                li.setAttribute("name", json[o].children[i].name);
                li.setAttribute("objid", json[o].children[i].id);
                li.setAttribute("riverly", json[o].children[i].ly);
                $addHandler(li, "click", Function.createDelegate(this, this.ShowRiverLocation))
                ul.appendChild(li);

                var coImgDiv = document.createElement("div");
                coImgDiv.className = "coImgDiv";
                li.appendChild(coImgDiv);

                var coTextDiv = document.createElement("div");
                coTextDiv.className = "coTextDiv";
                //coTextDiv.innerHTML = json[o].children[i].name;
                li.appendChild(coTextDiv);

                var coTextInDiv = document.createElement("div");
                coTextInDiv.className = "coTextInDiv";
                coTextInDiv.innerHTML = json[o].children[i].name;
                coTextDiv.appendChild(coTextInDiv)
            }
        }
    },
    ShowRiverLocation:function(e){
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var psCode = "";
        var ly = "";
        while (elem) {
            if (elem.className == "locationSelectBar") {
                psCode = elem.attributes["name"].value;
                ly = elem.attributes["riverly"].value;
                break;
            }
            elem = elem.parentNode;
        }
        var divs = document.getElementsByClassName("locationSelectBar");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.background = "#ffffff";
        }
        elem.style.background = "#8FBC8F";
        if (map.getLayer("locGraphicsLayer")) {
            var graphicLayer = map.getLayer("locGraphicsLayer");
            map.removeLayer(graphicLayer);
        }
        var coLayer = new esri.layers.GraphicsLayer({ id: "locGraphicsLayer" });
        map.addLayer(coLayer);
        map.reorderLayer(coLayer, 1);
        var _ins = this;
        var extentArr = [];
        dojo.forEach(_ins._riverFeatureSet.features, function (graphic) {
            if (graphic.attributes["地物名称"] == psCode && graphic.attributes["LY"] == ly) {
                var symbol = new esri.symbol.SimpleFillSymbol(
                        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([0, 0, 205]), 2),
                        new dojo.Color([0, 0, 205, 1.0]));
                coLayer.add(graphic.setSymbol(symbol));
                var oExtent = graphic.geometry.getExtent();
                //map.setExtent(oExtent);
                extentArr.push(oExtent);
            }
        });
        dojo.forEach(_ins._riverFeatureSet1.features, function (graphic) {
            if (graphic.attributes["DWMC"] == psCode && graphic.attributes["LY"] == ly) {
                var symbol = new esri.symbol.SimpleLineSymbol(
                        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([0, 0, 205]), 2);
                coLayer.add(graphic.setSymbol(symbol));
                var oExtent = graphic.geometry.getExtent();
                //map.setExtent(oExtent);
                extentArr.push(oExtent);
            }
        });
        var xmax, ymax, xmin, ymin;
        for (var j = 0; j < extentArr.length; j++) {
            if (j == 0) {
                xmax = extentArr[j].xmax;
                ymax = extentArr[j].ymax;
                xmin = extentArr[j].xmin;
                ymin = extentArr[j].ymin;
            }
            else {
                if (xmax < extentArr[j].xmax) {
                    xmax = extentArr[j].xmax;
                }
                if (ymax < extentArr[j].ymax) {
                    ymax = extentArr[j].ymax
                }
                if (xmin > extentArr[j].xmin) {
                    xmin = extentArr[j].xmin;
                }
                if (ymin > extentArr[j].ymin) {
                    ymin = extentArr[j].ymin;
                }
            }
        }
        var newExtent = new esri.geometry.Extent({ "xmin": xmin, "ymin": ymin, "xmax": xmax, "ymax": ymax, "spatialReference": { wkid: 3857 } })
        map.setExtent(newExtent);
    },
    RollerShadesMapFn: function (e) {
        if (map.layerIds.length >= 2) {
            map1toplayerdiv = document.getElementById(map.id + '_' + map.layerIds[map.layerIds.length - 1]);
            var offsetX = e.screenPoint.x;
            var offsetY = e.screenPoint.y;
            var mapheightpx = map1toplayerdiv.style.height;
            var mapwidthpx = map1toplayerdiv.style.width;
            var mapheight = parseInt(mapheightpx.substring(0, mapheightpx.lastIndexOf('px')));//去掉单位px 取出数值
            var mapwidth = parseInt(mapwidthpx.substring(0, mapwidthpx.lastIndexOf('px')));
            var origin = this.getLayerTransform(map1toplayerdiv);
            var cliptop = -origin.y + "px";
            var clipleft = -origin.x + "px";//clip的左上起点
            var clipbottom, cliplright;
            clipbottom = ishorizontalswipe ? (offsetY - origin.y) + 'px' : (mapheight - origin.y) + 'px';
            clipright = isverticalswipe ? (offsetX - origin.x) + "px" : (mapwidth - origin.x) + "px";
            map1toplayerdiv.style.clip = 'rect(' + cliptop + ',' + clipright + ',' + clipbottom + ',' + clipleft + ')';
        }
        //console.log('rect(' + cliptop + ',' + clipright + ',' + clipbottom + ',' + clipleft + ')');
    },
    //获取图层右上角的坐标
    getLayerTransform: function (layer) {
        // var layer = document.getElementById(layerid);

        var xorigin, yorigin, layerstyle = layer.style;
        //chrome
        if (layerstyle['-webkit-transform']) {
            var s = layerstyle['-webkit-transform'];//格式为"translate(0px, 0px)"
            var xyarray = s.replace(/translate\(|px|\s|\)/, '').split(',');
            xorigin = parseInt(xyarray[0]);
            yorigin = parseInt(xyarray[1]);
        }
            //firefox
        else if (layerstyle['transform']) {
            //layer.style['transform'] 格式为"translate3d(xpx,ypx,zpx)" 这样的字符串，现在通过匹配转为[z,y,z]的数组,分别将 px,translate3d,空格
            // var xyzarray=layerstyle.replace(/px/g,'').replace(/ /g,'').replace('translate3d(','').replace(')','').split(',')
            var layertransforstring = layerstyle['transform'];
            var xyz = layertransforstring.replace(/px|\s|translate\(|px|\)/g, '').split(',');
            xorigin = parseInt(xyz[0]);
            yorigin = parseInt(xyz[1]);
        }
            //ie 8+
        else {
            xorigin = parseInt(layer.style.left.replace('px', ''));
            yorigin = parseInt(layer.style.top.replace('px', ''));
        }
        return {
            x: xorigin,
            y: yorigin
        }
    }
}