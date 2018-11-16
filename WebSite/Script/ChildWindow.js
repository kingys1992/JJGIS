/// <reference path="GisHelper.js" />
function PopWindow(height, width, title,isIframe) {
    this.height = height;
    this.width = width;
    this.title = title;
    this.id = "divChildWindow";
    this.bDrag = false;
    this.disX = this.DISy = 0;
    this._oldTop = this._oldLeft = 0;
    this._isIframe = isIframe;
}
PopWindow.prototype = {
    CreateWindow: function () {
        var mirsGlobal = window.Mirs.Gis.Global;
        var loading = new LoadingAnimation();
        var loadingDiv = loading.create();
        if (!mirsGlobal.gb(this.id)) {
            var bDrag = this.bDrag;
            var disX = this.disX;
            var DISy = this.DISy;
            var windowHeight = this.height;
            var windowWidth = this.width;
            var mainWindow = mirsGlobal.ce("div");
            mainWindow.className = "mainWindow";
            mainWindow.style.height = this.height + "px";
            mainWindow.style.width = this.width + "px";
            mainWindow.style.marginTop = (this.height * (-1) / 2) + "px";
            mainWindow.style.marginLeft = (this.width * (-1) / 2) + "px";
            mainWindow.id = this.id;
            document.body.appendChild(mainWindow);
            var windowTopDiv = document.createElement("div");
            windowTopDiv.className = "windowTopDiv";
            mainWindow.appendChild(windowTopDiv);

            var topRightDiv = mirsGlobal.ce("div");
            topRightDiv.className = "topRightDiv";
            topRightDiv.id = "divHideChildWindow";
            topRightDiv.innerHTML = "<img src='Images/menu_card_close.png' style='width:20px;'/>";
            mirsGlobal.ah(topRightDiv, "click", mirsGlobal.cd(this, this.CloseBtnClick));
            mirsGlobal.ah(topRightDiv, "mousedown", mirsGlobal.cd(this, this.CloseBtnDown));
            windowTopDiv.appendChild(topRightDiv);

            var topResizeDiv = document.createElement("div");
            topResizeDiv.className = "topRightDiv";
            topResizeDiv.id = "divResizeChildWindow";
            topResizeDiv.innerHTML = "<img src='Images/menu_card_max.png' style='width:20px;' />";
            mirsGlobal.ah(topResizeDiv, "click", mirsGlobal.cd(this, this.ResizeBtnClick));
            windowTopDiv.appendChild(topResizeDiv);

            var topLeftDiv = document.createElement("div");
            topLeftDiv.className = "topLeftDiv";
            topLeftDiv.onmousedown = function (e) {
                var event = e || window.event;
                bDrag = true;
                disX = event.clientX - mainWindow.offsetLeft;
                disY = event.clientY - mainWindow.offsetTop;
                this.setCapture && this.setCapture();
                return false
            }
            windowTopDiv.appendChild(topLeftDiv);

            var topInDiv = document.createElement("div");
            topInDiv.className = "topInDiv";
            topInDiv.id = "topInDivDIV"
            topInDiv.innerHTML = this.title;
            topLeftDiv.appendChild(topInDiv);

            var windowMainDiv = document.createElement("div");
            windowMainDiv.id = "divContentBox";
            windowMainDiv.className = "windowMainDiv";
            mainWindow.appendChild(windowMainDiv);
            document.onmousemove = function (event) {
                if (!bDrag) return;
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - mainWindow.offsetWidth * 0.1;
                var maxT = document.documentElement.clientHeight - mainWindow.offsetHeight * 0.1;
                var minL = mainWindow.offsetWidth * (-0.9);
                iL = iL < minL ? minL : iL;
                iL = iL > maxL ? maxL : iL;
                iT = iT < 0 ? 0 : iT;
                iT = iT > maxT ? maxT : iT;

                mainWindow.style.marginTop = mainWindow.style.marginLeft = 0;
                mainWindow.style.left = iL + "px";
                mainWindow.style.top = iT + "px";
                return false
            };
            document.onmouseup = window.onblur = topLeftDiv.onlosecapture = function () {
                bDrag = false;
                topLeftDiv.releaseCapture && topLeftDiv.releaseCapture();
            };

            
            windowMainDiv.appendChild(loadingDiv);

            if (this._isIframe) {
                var iframe = document.createElement("iframe");
                iframe.id = "ifmContentBox";
                iframe.className = "ContentBoxIfm";
                iframe.setAttribute("src", "");
                windowMainDiv.appendChild(iframe);
                return iframe;
            }
            return windowMainDiv;
        }
        else {
            if (mirsGlobal.gb(this.id).style.display == "none") {
                document.getElementById("topInDivDIV").innerHTML = this.title;
                document.getElementById("divResizeChildWindow").setAttribute("src", "Images/menu_card_max.png");
                var mainWindow = document.getElementById("divChildWindow");
                mainWindow.style.height = this.height + "px";
                mainWindow.style.width = this.width + "px";
                mainWindow.style.marginTop = (this.height * (-1) / 2) + "px";
                mainWindow.style.marginLeft = (this.width * (-1) / 2) + "px";
                mainWindow.style.top = "50%";
                mainWindow.style.left = "50%";
                mirsGlobal.gb(this.id).style.display = "block";
                var windowMainDiv1 = mirsGlobal.gb("divContentBox");
                windowMainDiv1.appendChild(loadingDiv);
                if (this._isIframe) {
                    var iframe1 = mirsGlobal.gb("ifmContentBox");
                    return iframe1;
                }
                var windowMainDiv1 = mirsGlobal.gb("divContentBox");
                windowMainDiv1.innerHTML = "";
                return windowMainDiv1;
            }
            else {
                return null;
            }
        }
    },
    getLeft: function (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
        return offset;
    },
    getTop: function (e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    },
    CloseBtnClick: function (e) {
        var mirsGlobal = window.Mirs.Gis.Global;
       // mirsGlobal.gb("divChildWindow").remove();
        mirsGlobal.gb(this.id).style.display = "none";
        if (this._isIframe) {
            mirsGlobal.gb("ifmContentBox").src = "";
        }
        var loading = new LoadingAnimation();
        loading.hide();
    },
    CloseBtnDown: function (e) {
        //阻止冒泡
        (e || window.event).cancelBubble = true;
    },
    ResizeBtnClick: function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var mirsGlobal = window.Mirs.Gis.Global;
        var mainWindow = mirsGlobal.gb("divChildWindow");
        
        if (mainWindow.style.height != (document.documentElement.clientHeight - 2 + "px")) {
            elem.setAttribute("src", "Images/menu_card_resize.png");
            this._oldTop = this.getTop(mainWindow);
            this._oldLeft = this.getLeft(mainWindow);
            this.width = mainWindow.style.width.split("px")[0];
            this.height = mainWindow.style.height.split("px")[0];
            mainWindow.style.top = mainWindow.style.left = 0;
            mainWindow.style.marginTop = mainWindow.style.marginLeft = 0;
            mainWindow.style.width = document.documentElement.clientWidth - 2 + "px";
            mainWindow.style.height = document.documentElement.clientHeight - 2 + "px";
        }
        else {
            elem.setAttribute("src", "Images/menu_card_max.png");
            mainWindow.style.top = this._oldTop + "px";
            mainWindow.style.left = this._oldLeft + "px";
            mainWindow.style.width = this.width + "px";
            mainWindow.style.height = this.height + "px";
        }
    }
}
function HandleClass() {
    this.hasClass = function (elements, cName) {
        // ( \\s|^ )判断前面是否有空格(\\s | $ )判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    }
    this.addClass = function (elements, cName) {
        if (!this.hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    }
    this.removeClass = function (elements, cName) {
        if (this.hasClass(elements, cName)) {
            // replace方法是替换
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };
    }
}

function LoadingAnimation() {
    this.boxDiv = null;
}
LoadingAnimation.prototype = {
    create: function () {
        //this.hide();
        this.boxDiv = document.createElement("div");
        this.boxDiv.className = "LoadingBox";
        this.boxDiv.id = "divLoadingBox";

        var shadeDiv = document.createElement("div");
        shadeDiv.className = "LoadingShadeDiv";
        this.boxDiv.appendChild(shadeDiv)

        var spinner = document.createElement("div");
        spinner.className = "spinner";
        this.boxDiv.appendChild(spinner);

        for (var i = 1; i <= 5; i++) {
            var rect = document.createElement("div");
            rect.className = "rect" + i;
            spinner.appendChild(rect);
        }
        return this.boxDiv;
    },
    hide: function () {
        if (document.getElementById("divLoadingBox")) {
            document.getElementById("divLoadingBox").style.display = "none";
            document.getElementById("divLoadingBox").parentNode.removeChild(document.getElementById("divLoadingBox"));
        }
    },
    createMin: function () {
        //this.hideMin();
        this.boxDiv = document.createElement("div");
        this.boxDiv.className = "LoadingBox1";
        this.boxDiv.id = "divLoadingBox1";

        var shadeDiv = document.createElement("div");
        shadeDiv.className = "LoadingShadeDiv";
        this.boxDiv.appendChild(shadeDiv)

        var spinner = document.createElement("div");
        spinner.className = "spinner";
        this.boxDiv.appendChild(spinner);

        for (var i = 1; i <= 5; i++) {
            var rect = document.createElement("div");
            rect.className = "rect" + i;
            spinner.appendChild(rect);
        }
        return this.boxDiv;
    },
    hideMin: function () {
        if (document.getElementById("divLoadingBox1")) {
            document.getElementById("divLoadingBox1").style.display = "none";
            document.getElementById("divLoadingBox1").parentNode.removeChild(document.getElementById("divLoadingBox1"));
        }
    },
    createText: function () {
        //this.hide();
        this.boxDiv = document.createElement("div");
        this.boxDiv.className = "LoadingBox";
        this.boxDiv.id = "divLoadingBox2";

        var shadeDiv = document.createElement("div");
        shadeDiv.className = "LoadingShadeDiv";
        this.boxDiv.appendChild(shadeDiv)

        var spinner = document.createElement("div");
        spinner.className = "loadingText";
        spinner.innerHTML = "数据正在加载中...";
        this.boxDiv.appendChild(spinner);

        return this.boxDiv;
    },
    hideText: function () {
        if (document.getElementById("divLoadingBox2")) {
            document.getElementById("divLoadingBox2").style.display = "none";
            document.getElementById("divLoadingBox2").parentNode.removeChild(document.getElementById("divLoadingBox2"));
        }
    }
}