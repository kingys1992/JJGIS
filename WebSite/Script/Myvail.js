
$.extend($.fn.validatebox.defaults.rules, {
  
    alpha: {//
        validator: function (value, param) {
            if (value) {
                return /^[a-zA-Z\u00A1-\uFFFF]*$/.test(value);
            } else {
                return true;
            }
        },
        message: '只能输入字母.'
    },
    alphanum: {
        validator: function (value, param) {
            if (value) {
                //                return /^([a-zA-Z\u00A1-\uFFFF0-9])*$/.test(value);
                //2014-11-26 
                return /^([0-9a-zA-Z])*$/.test(value);

            } else {
                return true;
            }
        },
        message: '只能输入字母和数字.'
    },

    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[1-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码不正确'
    },
    mobile: {
        validator: function (value, param) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(value);
        },
        message: '手机号码不正确'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    safepass: {
        validator: function (value, param) {
            return safePassword(value);
        },
        message: '密码由字母和数字组成，至少6位'
    },
    equalTo: {
        validator: function (value, param) {

            return value == $('#' + param[0]).val();

        },
        message: '两次输入的字符不一至'
    },



    idcard: {
        validator: function (value, param) {
            return idCard(value);
        },
        message: '请输入正确的身份证号码'
    },
    phone: {
        validator: function (value) {
            var regu = /(^([0][1-9]{2,3}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0][1-9]{2,3}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/;
            var re = new RegExp(regu);
            return re.test(value);
        },
        message: '请输入正确电话号码'
    },
    data: {
        validator: function (value, param) {
            return /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/.test(value); ;
        },
        message: '只能日期格式：(yyyy-MM-dd)'
    },
    number: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '只能输入非负整数'
    },
    positive_int: {
        validator: function (value, param) {
            if (value) {
                return /^[0-9]*[1-9][0-9]*$/.test(value);
            } else {
                return true;
            }
        },
        message: '只能输入正整数.'
    },
    double: {
        validator: function (value, param) {    //王桑08102014
            if (value) {
               
                return /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,4})?$/.test(value);
            } else {
                return true;
            }
        },
        message: '只能输入大于0的数，或小数点后保留4位.'
    },
    dNum: {
        validator: function (value, param) {    //王桑08102014
            if (value) {

                return /^(-?\d+)(\.\d+)?$/.test(value);
            } else {
                return true;
            }
        },
        message: '只能输入数值.'
    },
    moneys: {
        validator: function (value, param) {    //王桑08192014

            if (value >= 0) {
                if (value) {
                    //                    return /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(value);
                    return /^(([0-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(value);
                } else {
                    return true;
                }
            } else {
                return;
            }
        },
        message: '只能输入大于等于0的数，或小数点后保留两位.'
    },
    dtime: {
        validator: function (value, param) {
            var time = value.split('-');
            var time1 = parseInt(time[2]);
            return time1 >= 25 && time1 <= 28;
        },
        message: '日期只能选择25到28之间的数'
    },
    datet: {
        validator: function (value, param) {
            var time = value.split('-');
            var date = $('#txtdate').datebox('getValue').split('-');
            var time1 = parseInt(time[0], 10);
            var time2 = parseInt(time[1], 10);
            var time3 = parseInt(time[2], 10);
            var date1 = parseInt(date[0], 10);
            var date2 = parseInt(date[1], 10);
            var date3 = parseInt(date[2], 10);
            if (date2 == 12)
                return (time1 - date1 == 1 && date2 - 11 == time2) || (time1 == date1 && date2 == time2 && time3 - date3 > 23);
            else
                return (time1 == date1 && date2 == time2 - 1) || (time1 == date1 && date2 == time2 && time3 - date3 > 23);
        },
        message: '日期时间不正确'
    },
    dinput: {
        validator: function (value, param) {
            return value >= 25 && value <= 28;
        },
        message: '只能输入25到28之间的数'
    },
    zero: {
        validator: function (value, param) {
            return parseInt(value, 10) > 0;
        },
        message: '非法数字'
    },
    equalTonum: {
        validator: function (value, param) {
            return parseInt(value, 10) <= parseInt($('#' + param[0]).val(), 10) && parseInt(value, 10) > 0;

        },
        message: '输入的数量不合法'
    },
    equalW: {
        validator: function (value, param) {
            return /^-?\d+$/.test(value);

        },
        message: '输入的数量不合法'
    },
    positive_ints: {  //好0的正整数。
        validator: function (value, param) {
            if (value) {
                return /^[0-9]*[0-9][0-9]*$/.test(value);
            } else {
                return true;
            }
        },
        message: '只能输入非负整数.'
    }

});


/* 密码由字母和数字组成，至少6位 */
var safePassword = function (value) {
    return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
};

var idCard = function (value) {
    if (value.length == 18 && 18 != value.length) return false;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) return false;
    if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
};

var isDateTime = function (format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
};


function Trim(varValue) {
    return varValue.replace(/(^\s*)|(\s*$)/g, "");
}

