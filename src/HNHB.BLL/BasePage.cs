using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HNHB.BLL
{
    /// <summary>
    /// 系统中所有WebForm都要继承的基类
    /// DataTable dt = ICISReportManager.GetInpatientChargeDetail(
    // AsString(ViewState["inpatientMainId"]),
    // TryParseDateTime(AsString(ViewState["startTime"])).Value,
    //TryParseDateTime(AsString(ViewState["endTime"])).Value,
    //TryParseEnum<InpatientChargeItemType>(AsString(ViewState["itemType"])),
    //AsString(ViewState["drugRootCateId"]),
    //AsString(ViewState["implDeptId"]),
    //AsString(ViewState["QueryText"]));
    /// </summary>D:\code1\HNHBCode\HNHB_Solution\src\HNHB.BLL\Dbs\DbsHeliushuizhibjBll.cs
    public class BasePage : System.Web.UI.Page
    {
        #region  数据类型

        /// <summary>
        /// 解析枚举值。解析失败时返回null.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        protected T? TryParseEnum<T>(string value) where T : struct
        {
            T result;
            bool suc = Enum.TryParse<T>(value, out result);
            if (suc)
                return result;
            else
                return null;
        }

        /// <summary>
        /// 解析DateTime值。解析失败时返回null.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        protected DateTime? TryParseDateTime(string value)
        {
            DateTime result;
            if (DateTime.TryParse(value, out result))
                return result;
            else
                return null;
        }

        protected int? TryParseInt(string value)
        {
            int result;
            if (int.TryParse(value, out result))
                return result;
            else
                return null;
        }

        protected bool? TryParseBool(string value)
        {
            bool result;
            if (bool.TryParse(value, out result))
                return result;
            else
                return null;
        }

        /// <summary>
        /// 把obj转换为string， 如果obj为null，返回string.Emputy
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        protected string AsString(object obj)
        {
            if (obj == null)
                return string.Empty;
            else
                return obj.ToString();
        }

        protected decimal? TryParseDecimal(string value)
        {
            decimal result;
            if (decimal.TryParse(value, out result))
                return result;
            else
                return null;
        }

        #endregion

        /// <summary>
        /// User Id
        /// </summary>
        public int UserId { get; private set; }
        /// <summary>
        /// User Name
        /// </summary>
        public string UserName { get; private set; }


        public string GetTime
        {
            get
            {
                return System.DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
            }
        }
        public string GetYear
        {
            get
            {
                return System.DateTime.Now.Year.ToString();
            }
        }

        public string GetMonth
        {
            get
            {
                return System.DateTime.Now.Month.ToString();
            }
        }
        private const string LoginUrl = "/login.html";
        private const string MainPage = "/default.aspx";
        private const string VirtualDirectoryName = "/";

        protected override void OnPreInit(EventArgs e)
        {
            //string absolutePath = Request.Url.AbsolutePath.ToLower();
            //string dir = absolutePath.Substring(0, absolutePath.LastIndexOf('/'));

            //if (SysVisitor.Instance.IsGuest)
            //{
            //    if (absolutePath == dir + MainPage)
            //        Response.Redirect(LoginUrl, true);

            //    var loginUrlWithVirturalDir = LoginUrl;
            //    if (dir.IndexOf(VirtualDirectoryName, System.StringComparison.Ordinal) > -1)
            //        loginUrlWithVirturalDir = VirtualDirectoryName + LoginUrl;

            //    Response.Write("<script>alert('亲，登录已过期！请重新登录哦。');window.top.location='" + loginUrlWithVirturalDir + "';</script>");
            //    Response.End();
            //}

            //UserId = SysVisitor.Instance.UserId;
            //UserName = SysVisitor.Instance.UserName;          

            
            //if (!SysVisitor.Instance.IsAdmin)
            //{
            //    if (!UserBll.Instance.HasMenu(UserId, NavId))
            //    {
            //        Response.Write(AlertMessage("亲，您没有权限哦！", true));
            //        Response.End();
            //    }
            //}

           
        }

        private string AlertMessage(string msg, bool hasjsfile)
        {
            string jsfile = "<script src=\"/Scripts/jquery-1.7.2.min.js\" type=\"text/javascript\"></script><script src=\"/Scripts/easyui/jquery.easyui.min.js\" type=\"text/javascript\"></script><link href=\"/Scripts/easyui/themes/default/easyui.css\" rel=\"stylesheet\" type=\"text/css\" />";
            string resoult = "<script type=\"text/javascript\">$(function () {$.messager.alert('系统提示！', '<span style=\"color:red;font-weight:bold;\">" + msg + "</span>', 'error');     }) </script>";
            if (hasjsfile)
                return jsfile + resoult;
            return resoult;
        }

       

    }
}
