
//页面加载等待
window.onload = function () {
    $('#loading-mask').fadeOut();
}

//function _36(_ab, _ac) {
//    var _ad = $.extend({}, $.data(_ac, "tree-node"), { target: _ac, checked: $(_ac).find(".tree-checkbox").hasClass("tree-checkbox1") });

//    return _ad;
//};

//得到tree选中节点以及父节点
function getChecked1(treeID) {
    //var nodes = $('#' + treeID).tree('getChecked');
    var nodes = $('#' + treeID).tree('getChecked', ['checked', 'indeterminate']);;
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (s != '') s += ',';
        s += nodes[i].id;
    }


    //    nodes = _ll(treeID);
    //    for (var i = 0; i < nodes.length; i++) {
    //        if (s != '') s += ',';
    //        s += nodes[i].id;
    //    }
    return s;
}


//移除验证图片
function RemoveInvalid(Form) {
    $('#' + Form + ' input').each(function () {
        $(this).removeClass('validatebox-invalid');
        $(this).removeClass('validatebox-tip');

    })
}
//回车提交



//得到tree选中节点
function getChecked(treeID) {

    var nodes = $('#' + treeID).tree('getChecked');
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (s != '') s += ',';
        s += nodes[i].id;
    }
    return s;
}
/**
*清空指定表单中的内容,参数为目标form的id
*注：在使用Jquery EasyUI的弹出窗口录入新增内容时，每次打开必须清空上次输入的历史
*数据，此时通常采用的方法是对每个输入组件进行置空操作:$("#name").val(""),这样做，
*当输入组件比较多时会很繁琐，产生的js代码很长，这时可以将所有的输入组件放入个form表单
*中，然后调用以下方法即可。
*
*@param formId将要清空内容的form表单的id
*/
function resetContent(formId) {
    var clearForm = document.getElementById(formId);
    if (null != clearForm && typeof (clearForm) != "undefined") {
        clearForm.reset();
    }
}

/**
*刷新DataGrid列表(适用于Jquery Easy Ui中的dataGrid)
*注：建议采用此方法来刷新DataGrid列表数据(也即重新加载数据)，不建议直接使用语句
*$('#dataTableId').datagrid('reload');来刷新列表数据，因为采用后者，如果日后
*在修改项目时，要在系统中的所有刷新处进行其他一些操作，那么你将要修改系统中所有涉及刷新
*的代码，这个工作量非常大，而且容易遗漏；但是如果使用本方法来刷新列表，那么对于这种修
*该需求将很容易做到，而去不会出错，不遗漏。
*
*@paramdataTableId将要刷新数据的DataGrid依赖的table列表id
*/
function flashTable(dataTableId) {
    //   $('#' + dataTableId).datagrid('reload');

    //    var opts = $('#' + dataTableId, "datagrid");
    //    alert(opts);
    //    if (opts.options != undefined) {
    //        
    //        $('#' + dataTableId).datagrid('reload');
    //    }

    try { $('#' + dataTableId).datagrid('reload'); } catch (e) { }

}
function flashTreeTable(dataTableId) {

    try { $('#' + dataTableId).treegrid('reload'); } catch (e) { }
}

/**
*取消DataGrid中的行选择(适用于Jquery Easy Ui中的dataGrid)
*注意：解决了无法取消"全选checkbox"的选择,不过，前提是必须将列表展示
*数据的DataGrid所依赖的Table放入html文档的最全面，至少该table前没有
*其他checkbox组件。
*
*@paramdataTableId将要取消所选数据记录的目标table列表id
*/
function clearSelect(dataTableId) {

    //    var opts = $('#' + dataTableId, "datagrid");
    //    //alert(opts.length);
    //    if (opts.length != 0) {
    //        $('#' + dataTableId).datagrid('clearSelections');
    //        //取消选择DataGrid中的全选
    //        $("input[type='checkbox']").eq(0).attr("checked", false);
    //    }

    try {
        $('#' + dataTableId).datagrid('clearSelections');
        $("input[type='checkbox']").eq(0).attr("checked", false);
    } catch (e) { }


}

function clearTreeSelect(dataTableId) {

    $('#' + dataTableId).treegrid('clearSelections');
    //取消选择DataGrid中的全选
    $("input[type='checkbox']").eq(0).attr("checked", false);


}

/**
*关闭Jquery EasyUi的弹出窗口(适用于Jquery Easy Ui)
*
*@paramdialogId将要关闭窗口的id
*/
function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

/**
*自适应表格的宽度处理(适用于Jquery Easy Ui中的dataGrid的列宽),
*注：可以实现列表的各列宽度跟着浏览宽度的变化而变化，即采用该方法来设置DataGrid
*的列宽可以在不同分辨率的浏览器下自动伸缩从而满足不同分辨率浏览器的要求
*使用方法：(如:{field:'ymName',title:'编号',width:fillsize(0.08),align:'center'},)
*
*@parampercent当前列的列宽所占整个窗口宽度的百分比(以小数形式出现，如0.3代表30%)
*
*@return通过当前窗口和对应的百分比计算出来的具体宽度
*/
function fillsize(percent) {
    var bodyWidth = document.body.clientWidth;
    return (bodyWidth - 90) * percent;
}

/**
* 获取所选记录行(单选)
*
* @paramdataTableId目标记录所在的DataGrid列表的table的id
* @paramerrorMessage 如果没有选择一行(即没有选择或选择了多行)的提示信息
*
* @return 所选记录行对象，如果返回值为null,或者"null"(有时浏览器将null转换成了字符串"null")说明没有
*选择一行记录。
*/
function getSingleSelectRow(dataTableId, errorMessage) {
    var rows = $('#' + dataTableId).datagrid('getSelections');
    var num = rows.length;
    if (num == 1) {
        return rows[0];
    } else {
        $.messager.alert('提示消息', errorMessage, 'info');
        return null;
    }
}

/**
* 在DataGrid中获取所选记录的id,多个id用逗号分隔
* 注：该方法使用的前提是：DataGrid的idField属性对应到列表Json数据中的字段名必须为id
* @paramdataTableId目标记录所在的DataGrid列表table的id
*
* @return 所选记录的id字符串(多个id用逗号隔开)
*/
function getSelectIds(dataTableId, noOneSelectMessage) {
    var rows = $('#' + dataTableId).datagrid('getSelections');
    var keyFild = $('#' + dataTableId).datagrid('options').idField;
    var num = rows.length;
    var ids = null;
    if (num < 1) {
        if (null != noOneSelectMessage) $.messager.alert('提示消息', noOneSelectMessage, 'warning');
        return null;
    } else {
        for (var i = 0; i < num; i++) {
            if (null == ids || i == 0) {
                ids = rows[i][keyFild];
            } else {
                ids = ids + "," + rows[i][keyFild];
            }
        }
        return ids;
    }
}
function getSelectDYi(dataTableId) {
    // singleSelect
    $('#' + dataTableId).datagrid('acceptChanges');
    $('#' + dataTableId).datagrid.singleSelect = "false";
    $('#' + dataTableId).datagrid('selectAll');
    var rows = $('#' + dataTableId).datagrid('getSelections');
    var num = rows.length;
    var keyFild = $('#' + dataTableId).datagrid('options').idField;
    var ids = null;
    if (num < 1) {
        $.messager.alert('提示消息', '没有数据', 'warning');
        return null;
    } else {
        for (var i = 0; i < num; i++) {
            if (null == ids || i == 0) {
                if (rows[i].rcheck == "×") {
                    ids = rows[i][keyFild];
                }

            } else {
                if (rows[i].rcheck == "×") {
                    ids = ids + "," + rows[i][keyFild];
                }

            }
        }

        $('#' + dataTableId).datagrid.singleSelect = "true";
        $('#' + dataTableId).datagrid('clearSelections');

        return ids;
    }
}

/**
*删除所选记录(适用于Jquery Easy Ui中的dataGrid)(删除的依据字段是id)
*注：该方法会自动将所选记录的id(DataGrid的idField属性对应到列表Json数据中的字段名必须为id)
*动态组装成字符串，多个id使用逗号隔开(如：1,2,3,8,10)，然后存放入变量ids中传入后台，后台
*可以使用该参数名从request对象中获取所有id值字符串，此时在组装sql或者hql语句时可以采用in
*关键字来处理，简介方便。
*另外，后台代码必须在操作完之后以ajax的形式返回Json格式的提示信息，提示的json格式信息中必须有一个
*message字段，存放本次删除操作成功与失败等一些提示操作用户的信息。
*
*@paramdataTableId将要删除记录所在的列表table的id
*@paramrequestURL与后台服务器进行交互，进行具体删除操作的请求路径
*@paramconfirmMessage 删除确认信息
*/


function deleteSingByID(dataTableId, requestURL, confirmMessage, ids) {
    if (null == confirmMessage || typeof (confirmMessage) == "undefined" || "" == confirmMessage) {
        confirmMessage = "确定删除所选记录?";
    }

    $.messager.confirm('确认', confirmMessage, function (r) {

        if (r) {
            $.ajax({
                type: "post",  //默认是GET
                url: requestURL,
                data: "ids=" + ids + "&j=" + Math.random(),

                async: false,  //异步
                cache: false, //不加载缓存
                success: function (data) {

                    if (null != data && null != data.msg && "" != data.msg) {
                        $.messager.alert('提示消息', data.msg, 'info');

                        flashTable(dataTableId);
                        clearSelect(dataTableId);

                    }

                },
                error: function () {
                    $.messager.alert('提示消息', '请求失败！', 'warning');

                }
            });
        }
    });

};


function deleteNoteById(dataTableId, requestURL, confirmMessage, otherTable) {

    if (null == confirmMessage || typeof (confirmMessage) == "undefined" || "" == confirmMessage) {
        confirmMessage = "确定删除所选记录!";
    }
    var rows = $('#' + dataTableId).datagrid('getSelections');
    var keyFild = $('#' + dataTableId).datagrid('options').idField;
    var num = rows.length;
    var ids = null;
    if (num < 1) {
        $.messager.alert('提示消息', '请选择你要删除的记录!', 'info');
    } else {
        $.messager.confirm('确认', confirmMessage, function (r) {
            if (r) {
                for (var i = 0; i < num; i++) {
                    if (null == ids || i == 0) {
                        ids = rows[i][keyFild];

                    } else {
                        ids = ids + "," + rows[i][keyFild];
                    }
                }
                $.ajax({
                    type: "post",  //默认是GET
                    url: requestURL,
                    data: "ids=" + ids + "&j=" + Math.random(),
                    async: false,  //异步
                    cache: false, //不加载缓存
                    success: function (data) {
                        if (null != data && null != data.msg && "" != data.msg) {

                            $.messager.alert('提示消息', data.msg, 'info');
                            flashTable(otherTable);
                            flashTable(dataTableId);
                            clearSelect(dataTableId);
                            return true;
                        }
                    },
                    error: function () {
                        $.messager.alert('提示消息', '请求失败！', 'warning');
                    }
                });
            }
        });
    }
}

function deletetreeById(dataTableId, requestURL, confirmMessage) {

    if (null == confirmMessage || typeof (confirmMessage) == "undefined" || "" == confirmMessage) {
        confirmMessage = "确定删除所选记录?";
    }
    var rows = $('#' + dataTableId).treegrid('getSelections');
    var num = rows.length;
    var ids = null;
    var keyFild = $('#' + dataTableId).datagrid('options').idField;
    if (num < 1) {
        $.messager.alert('提示消息', '请选择你要删除的记录!', 'info');
    } else {
        $.messager.confirm('确认', confirmMessage, function (r) {
            if (r) {
                for (var i = 0; i < num; i++) {
                    if (null == ids || i == 0) {
                        ids = rows[i][keyFild];
                    } else {
                        ids = ids + "," + rows[i][keyFild];
                    }
                }
                $.ajax({
                    type: "post",  //默认是GET
                    url: requestURL,
                    data: "ids=" + ids + "&j=" + Math.random(),
                    async: false,  //异步
                    cache: false, //不加载缓存
                    success: function (data) {
                        if (null != data && null != data.msg && "" != data.msg) {
                            $.messager.alert('提示消息', data.msg, 'info');

                            flashTreeTable(dataTableId);
                            clearTreeSelect(dataTableId);

                        }

                    },
                    error: function () {
                        $.messager.alert('提示消息', '请求失败！', 'warning');

                    }
                });

            }
        });
    }
}
/*
编辑表格
*/
function editGride(dataTableId, requestURL, ADDID) {

    $.ajax({
        type: "post",  //默认是GET
        url: requestURL,
        data: $('#' + ADDID).serialize() + "&j=" + Math.random(),

        async: false,  //异步
        cache: false, //不加载缓存
        success: function (data) {

            if (null != data && null != data.msg && "" != data.msg) {
                $.messager.alert('提示消息', data.msg, 'info');

                flashTable(dataTableId);

            }
            clearSelect(dataTableId);
        },
        error: function () {
            $.messager.alert('提示消息', '请求失败！', 'warning');

        }
    });
}
function editTreeGride(dataTableId, requestURL, ADDID) {
    $.ajax({
        type: "post",  //默认是GET
        url: requestURL,
        data: $('#' + ADDID).serialize() + "&j=" + Math.random(),

        async: false,  //异步
        cache: false, //不加载缓存
        success: function (data) {

            if (null != data && null != data.msg && "" != data.msg) {
                $.messager.alert('提示消息', data.msg, 'info');

                flashTreeTable(dataTableId);

            }
            clearTreeSelect(dataTableId);
        },
        error: function () {
            $.messager.alert('提示消息', '请求失败！', 'warning');

        }
    });
}

/*
表格增加
dataTableId 表格ID
requestURL ：actin
addID：窗体from
type: tree,gride
*/
function AddGride(dataTableId, requestURL, ADDID) {

    //serialize() : 序列表表格内容为字符串。

    //serializeArray() : 序列化表格元素 (类似 '.serialize()' 方法) 返回 JSON 数据结构数据。



    $.ajax({
        type: "post",  //默认是GET
        url: requestURL,
        data: $('#' + ADDID).serialize() + "&j=" + Math.random(),

        async: true,  //异步
        cache: false, //不加载缓存
        success: function (data) {

            if (null != data && null != data.msg && "" != data.msg) {
                $.messager.alert('提示消息', data.msg, 'info');

                flashTable(dataTableId);
                resetContent(ADDID)
            }
            clearSelect(dataTableId);
        },
        error: function () {
            $.messager.alert('提示消息', '请求失败！', 'warning');

        }
    });
};

function AddTreeGride(dataTableId, requestURL, ADDID) {

    //serialize() : 序列表表格内容为字符串。

    //serializeArray() : 序列化表格元素 (类似 '.serialize()' 方法) 返回 JSON 数据结构数据。

    //  $.messager.alert('提示消息', data.msg, 'info');

    $.ajax({
        type: "post",  //默认是GET
        url: requestURL,
        data: $('#' + ADDID).serialize() + "&j=" + Math.random(),

        async: false,  //异步
        cache: false, //不加载缓存
        success: function (data) {

            if (null != data && null != data.msg && "" != data.msg) {

                $.messager.alert('提示消息', data.msg, 'info');

                flashTreeTable(dataTableId);
                resetContent(ADDID);
            }
            clearTreeSelect(dataTableId);
        },
        error: function () {
            $.messager.alert('提示消息', '请求失败！', 'warning');

        }
    });

}
