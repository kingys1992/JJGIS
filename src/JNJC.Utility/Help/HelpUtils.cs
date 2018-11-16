using System;

using System.IO;
using System.Reflection;

using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;


using System.Globalization;
using System.Data;
using System.Collections.Generic;


namespace JNJC.Utility.Help
{
    

    /// <summary>
	/// 工具类
	/// </summary>
	public static class HelpUtils
    {

        /// <summary>
        /// 科学计数法数值
        /// </summary>
        /// <param name="strData"></param>
        /// <returns></returns>
        public static Decimal ChangeDataToD(string strData)
        {
            Decimal dData = 0.0M;
            if (strData.Contains("E"))
            {
                dData = Convert.ToDecimal(Decimal.Parse(strData.ToString(), System.Globalization.NumberStyles.Float));
            }
            return dData;
        }
        /// <summary>
        /// 数值转科学计数法
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public static string KXJSF(double num)
        {
            double bef = System.Math.Abs(num);
            int aft = 0;
            while (bef >= 10 || (bef < 1 && bef != 0))
            {
                if (bef >= 10)
                {
                    bef = bef / 10;
                    aft++;
                }
                else
                {
                    bef = bef * 10;
                    aft--;
                }
            }
            return string.Concat(num >= 0 ? "" : "-", ReturnBef(bef), "E", ReturnAft(aft));
        }
        /// <summary>
        /// 有效数字的处理
        /// </summary>
        /// <param name="bef">有效数字</param>
        /// <returns>三位有效数字，不足则补零</returns>
        public static string ReturnBef(double bef)
        {
            if (bef.ToString() != null)
            {
                char[] arr = bef.ToString().ToCharArray();
                switch (arr.Length)
                {
                    case 1:
                    case 2: return string.Concat(arr[0], ".", "00");
                    case 3: return string.Concat(arr[0] + "." + arr[2] + "0");
                    default: return string.Concat(arr[0] + "." + arr[2] + arr[3]);
                }
            }
            else
            {
                return "000";
            }
        }
        /// <summary>
        /// 幂的处理
        /// </summary>
        /// <param name="aft">幂数</param>
        /// <returns>三位幂数部分，不足则补零</returns>
        public static string ReturnAft(int aft)
        {
            if (aft.ToString() != null)
            {
                string end;
                char[] arr = System.Math.Abs(aft).ToString().ToCharArray();
                switch (arr.Length)
                {
                    case 1: end = "00" + arr[0]; break;
                    case 2: end = "0" + arr[0] + arr[1]; break;
                    default: end = System.Math.Abs(aft).ToString(); break;
                }
                return string.Concat(aft >= 0 ? "+" : "-", end);
            }
            else
            {
                return "+000";
            }
        }
   
    /// <summary>
    /// 把季度的值转换为对应的月份值
    /// <param name="strVal">日期字符</param>
    /// <param name="stype">日期类型s开始日期 e结束日期</param>
    /// <returns></returns>
    /// <summary>
    public static string sDRDATE(string strVal,string stype)
        {
            //检查实体集合不能为空
            string sDRDATE = string.Empty;
            string strY = strVal.Substring(0, 4);
            string strM = strVal.Substring(5, 2);
            if (strM == "01")
            {
                if (stype == "s") {
                    strM = "01-01";
                }
                else if (stype == "e")
                {
                    strM = "03-31";
                }
            }
            else if (strM == "02")
            {
                if (stype == "s")
                {
                    strM = "04-01";
                }
                else if (stype == "e")
                {
                    strM = "06-30";
                }
            }
            else if (strM == "03")
            {
                if (stype == "s")
                {
                    strM = "07-01";
                }
                else if (stype == "e")
                {
                    strM = "09-30";
                }
            }
            else if (strM == "04")
            {
                if (stype == "s")
                {
                    strM = "10-01";
                }
                else if (stype == "e")
                {
                    strM = "12-31";
                }
            }
            sDRDATE = strY +"-"+ strM;
            return sDRDATE;
        }


        /// <summary>
        /// 将字符串分割成数组
        /// </summary>
        /// <param name="strSource"></param>
        /// <param name="strSplit"></param>
        /// <returns></returns>
        public static string[] StringSplit(string strSource, string strSplit)
        {

            string[] strtmp = new string[1];

            int index = strSource.IndexOf(strSplit, 0);

            if (index < 0)
            {

                strtmp[0] = strSource;

                return strtmp;

            }

            else
            {

                strtmp[0] = strSource.Substring(0, index);

                return StringSplit(strSource.Substring(index + strSplit.Length), strSplit, strtmp);

            }

        }


        /// <summary>
        ///  采用递归将字符串分割成数组
        /// </summary>
        /// <param name="strSource"></param>
        /// <param name="strSplit"></param>
        /// <param name="attachArray"></param>
        /// <returns></returns>
        private static string[] StringSplit(string strSource, string strSplit, string[] attachArray)
        {

            string[] strtmp = new string[attachArray.Length + 1];

            attachArray.CopyTo(strtmp, 0);

            int index = strSource.IndexOf(strSplit, 0);

            if (index < 0)
            {

                strtmp[attachArray.Length] = strSource;

                return strtmp;

            }

            else
            {

                strtmp[attachArray.Length] = strSource.Substring(0, index);

                return StringSplit(strSource.Substring(index + strSplit.Length), strSplit, strtmp);

            }

        }

        /// <summary>
        /// 将泛类型集合List类转换成DataTable
        /// </summary>
        /// <param name="list">泛类型集合</param>
        /// <returns></returns>
        public static DataTable ListToDataTable<T>(List<T> entitys)
        {
            //检查实体集合不能为空
            if (entitys == null || entitys.Count < 1)
            {
                throw new Exception("需转换的集合为空");
            }
            //取出第一个实体的所有Propertie
            Type entityType = entitys[0].GetType();
            PropertyInfo[] entityProperties = entityType.GetProperties();

            //生成DataTable的structure
            //生产代码中，应将生成的DataTable结构Cache起来，此处略
            DataTable dt = new DataTable();
            for (int i = 0; i < entityProperties.Length; i++)
            {
                //dt.Columns.Add(entityProperties[i].Name, entityProperties[i].PropertyType);
                dt.Columns.Add(entityProperties[i].Name);
            }
            //将所有entity添加到DataTable中
            foreach (object entity in entitys)
            {
                //检查所有的的实体都为同一类型
                if (entity.GetType() != entityType)
                {
                    throw new Exception("要转换的集合元素类型不一致");
                }
                object[] entityValues = new object[entityProperties.Length];
                for (int i = 0; i < entityProperties.Length; i++)
                {
                    entityValues[i] = entityProperties[i].GetValue(entity, null);
                }
                dt.Rows.Add(entityValues);
            }
            return dt;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string replaceUnicode(string str)  //str为从前台传来的数据
        {
            string r = "";
            string mark = "";
            MatchCollection mc = Regex.Matches(str, @"\\u([\w]{2})([\w]{2})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            byte[] bts = new byte[2];
            foreach (Match m in mc)
            {
                bts[0] = (byte)int.Parse(m.Groups[2].Value, NumberStyles.HexNumber);
                bts[1] = (byte)int.Parse(m.Groups[1].Value, NumberStyles.HexNumber);
                mark = "\\u" + m.Groups[1].Value + m.Groups[2].Value;   //得到字符串中的Unicode编码
                r = Encoding.Unicode.GetString(bts);  //将Unicode编码转换成对应的字符串符号
                str = str.Replace(mark, r);  //然后将str中的Unicode转化成相应的字符串
            }
            return str;
        }

        /// <summary>
        /// 弹出窗口
        /// </summary>
        /// <param name="msg">弹出消息</param>
        /// <param name="page">page</param>
        public static void Alert(string msg, Page page)
        {
            page.ClientScript.RegisterClientScriptBlock(page.GetType(), null, "alert('" + msg + "')", true);
        }

        /// <summary>
        /// 弹出警示并跳转
        /// </summary>
        /// <param name="msg">弹出消息</param>
        /// <param name="url">跳转URL</param>
        /// <param name="page">当前页可用Page或this</param>
        public static void AlertAndRedirect(string msg, string url, Page page)
        {
            string ScriptText = "alert('" + msg + "');location.href='" + url + "'";
            page.ClientScript.RegisterClientScriptBlock(page.GetType(), null, ScriptText, true);
        }
        /// <summary>
        /// 弹出警示并跳转
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="url"></param>
        /// <param name="page"></param>
        public static void AlertAndTopRedirect(string msg, string url, Page page)
        {
            string ScriptText = "alert('" + msg + "');top.location.href='" + url + "'";
            page.ClientScript.RegisterClientScriptBlock(page.GetType(), null, ScriptText, true);
        }

        /// <summary>
        /// 字符转数字
        /// </summary>
        /// <param name="str"></param>
        /// <param name="m"></param>
        /// <returns></returns>
        public static bool StringToInt(string str, out int m)
        {
            return int.TryParse(str, out m);
        }

        #region 截取字符串
        /// <summary>
        /// 截取字符串（去HTML）
        /// </summary>
        /// <param name="str">String</param>
        /// <param name="len">长度</param>
        /// <returns>返回截取后的字符串</returns>
        public static string CutString(this string str, int len)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;
            str = FormatHtml(str);
            if (str.Length > len)
                return str.Substring(0, len) + "...";
            else
                return str;
        }
        /// <summary>
        /// 截取字符串
        /// </summary>
        /// <param name="str"></param>
        /// <param name="len"></param>
        /// <returns></returns>
        public static string Cut(this string str, int len)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;
            if (str.Length > len)
                return str.Substring(0, len);
            else
                return str;
        }
        #endregion

        #region 过滤html字符
        /// <summary>
        /// 过滤html字符
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string FormatHtml(string html)
        {
            html = html.Replace("&nbsp;", "");
            Regex regex1 = new Regex("<script[sS]+</script *>", RegexOptions.IgnoreCase);
            Regex regex2 = new Regex(" href *= *[sS]*script *:", RegexOptions.IgnoreCase);
            Regex regex3 = new Regex(" no[sS]*=", RegexOptions.IgnoreCase);
            Regex regex4 = new Regex("<iframe[sS]+</iframe *>", RegexOptions.IgnoreCase);
            Regex regex5 = new Regex("<frameset[sS]+</frameset *>", RegexOptions.IgnoreCase);
            Regex regex6 = new Regex("<img[^>]+>", RegexOptions.IgnoreCase);
            Regex regex7 = new Regex("</p>", RegexOptions.IgnoreCase);
            Regex regex8 = new Regex("<p>", RegexOptions.IgnoreCase);
            Regex regex9 = new Regex("<[^>]*>", RegexOptions.IgnoreCase);
            html = regex1.Replace(html, "");
            html = regex2.Replace(html, "");
            html = regex3.Replace(html, " _disibledevent=");
            html = regex4.Replace(html, "");
            html = regex5.Replace(html, "");
            html = regex6.Replace(html, "");
            html = regex7.Replace(html, "");
            html = regex8.Replace(html, "");
            html = regex9.Replace(html, "");
            html = html.Replace(" ", "");
            html = html.Replace("</strong>", "");
            html = html.Replace("<strong>", "");
            return html;
        }
        #endregion

        #region 转换HTML
        /// <summary>
        /// Html转换
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ConvertSqlContenttoHtml(string str)
        {
            str = str.Replace(" ", "&nbsp;");
            str = str.Replace("\n", "<br />");
            return str;
        }
        /// <summary>
        /// 数据库转换成html
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ConvertHtmltoSqlContent(string str)
        {
            str = str.Replace("&nbsp;", " ");
            str = str.Replace("<br />", @"\n");
            str = str.Replace("<br/>", @"\n");
            str = str.Replace("<br>", @"\n");
            return str;
        }
        #endregion

        #region StringToInt
        /// <summary>
        /// 转换int型
        /// </summary>
        /// <param name="obj"></param>
        /// <returns>成功返回true，失败false</returns>
        public static bool IntTryParse(string obj)
        {
            if (string.IsNullOrEmpty(obj))
                return false;
            int m;
            return int.TryParse(obj, out m);
        }
        public static bool IntTryParse(string obj, int m)
        {
            if (string.IsNullOrEmpty(obj))
                return false;
            return int.TryParse(obj, out m);
        }
        /// <summary>
        /// String转Int
        /// </summary>
        /// <param name="obj">string参数</param>
        /// <returns>返回转换的Int类型</returns>
        public static int StringToInt(string obj)
        {
            return int.Parse(obj);
        }
        #endregion

        /// <summary>
        /// 转换字符串（将'转成''）
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToSQLsafeString(this string obj)
        {
            return obj.Replace("'", "''");
        }

        /// <summary>
        /// 过滤js危险字符
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToJsSafeString(this string obj)
        {
            obj.Replace("<", "&lt;");
            obj.Replace(">", " &gt;");
            return obj;
        }
        /// <summary>
        /// 操作信息保存
        /// </summary>
        /// <param name="errorMsg"></param>
        public static void OperatorLog(string errorMsg)
        {
            OperatorLog(errorMsg, "OperatorLog.xml",//+ new Random().Next(0x3e8, 0x270f)
                HttpContext.Current.Request.ApplicationPath + "/OperatorLog/");
        }
        /// <summary>
        /// 操作信息保存
        /// </summary>
        /// <param name="errorMsg"></param>
        /// <param name="fileName"></param>
        /// <param name="savePath"></param>
        public static void OperatorLog(string errorMsg, string fileName, string savePath)
        {
            string str = "未获取到来源页面";
            HttpContext current = HttpContext.Current;
            if (HttpContext.Current.Request.ServerVariables["HTTP_REFERER"] != null)
            {
                str = current.Request.ServerVariables["HTTP_REFERER"].ToString();
            }

            string path = current.Server.MapPath(savePath);


            string file = path + fileName;
            xmlHepler<string> xml = new xmlHepler<string>(file);
            xml.xmlRoot = "rights"; // 调用RunTime节点下数据
            xml.xmlRootAttName = "name";
            xml.xmlRootAttValue = "log";
            xml.xmlSplitField = "IP地址,日志内容,日志时间,请求来源,操作页面";
            xml.xmlSplitFieldValue = GetClientIP() + "," + errorMsg + "," + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm ss") + "," + str + "," + current.Request.Url.ToString();
            xml.InsertNode();




        }
        /// <summary>
        /// 得到客户IP
        /// </summary>
        /// <returns></returns>
        public static string GetClientIP()
        {
            HttpContext current = HttpContext.Current;
            string str = "";
            if (current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
            {
                return current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            }
            if ((str == "") && (current.Request.ServerVariables["REMOTE_ADDR"] != null))
            {
                return current.Request.ServerVariables["REMOTE_ADDR"].ToString();
            }
            return current.Request.UserHostAddress;
        }
        /// <summary>
        /// 增加错误日志
        /// </summary>
        /// <param name="errorMsg"></param>
        public static void ErrorLog(string errorMsg)
        {
            ErrorLog(errorMsg, DateTime.Now.ToString("yyyy-MM-dd") + ".txt",//+ new Random().Next(0x3e8, 0x270f)
                HttpContext.Current.Request.ApplicationPath + "/Log/");
        }
        /// <summary>
        /// 增加错误日志
        /// </summary>
        /// <param name="errorMsg"></param>
        /// <param name="fileName"></param>
        /// <param name="savePath"></param>
        public static void ErrorLog(string errorMsg, string fileName, string savePath)
        {
            string str = "未获取到来源页面";
            HttpContext current = HttpContext.Current;
            string strOperatorName = string.Empty;

            if (current.Session["OperatorName"] != null)
            {
                strOperatorName = current.Session["OperatorName"].ToString();
            }
            else
            {
                strOperatorName = "Session/OperatorName 失效";
            }

            int iQuery = current.Request.Params.Count;
            string strQuery = string.Empty;

            strQuery = strQuery + current.Request.Params.ToString();

            if (HttpContext.Current.Request.ServerVariables["HTTP_REFERER"] != null)
            {
                str = current.Request.ServerVariables["HTTP_REFERER"].ToString();
            }
            string path = current.Server.MapPath(savePath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            StreamWriter writer = new StreamWriter(path + fileName, true, Encoding.UTF8);

 
            StringBuilder builder = new StringBuilder();
            builder.Append("\r\n\r\n");
            builder.Append("用户名：\t\t\t" + strOperatorName);
            builder.Append("\r\n\r\n");
            builder.Append("输入参数：\t\t\t" + strQuery);
            builder.Append("\r\n\r\n");
            builder.Append("日志日期：\t\t\t" + DateTime.Now.ToString("yyyy-MM-dd HH:mm ss"));
            builder.Append("\r\n\r\n");
            builder.Append("请求来源：\t\t\t" + str);
            builder.Append("\r\n\r\n");
            builder.Append("IP地址：\t\t\t" + GetClientIP());
            builder.Append("\r\n\r\n");
            builder.Append("错误页面：\t\t\t" + current.Request.Url.ToString());
            builder.Append("\r\n\r\n");
            builder.Append("日志内容：");
            builder.Append("\r\n\r\n");
            builder.Append(errorMsg);
            builder.Append("\r\n\r\n");
            builder.Append("=========================================================");
            writer.Write(builder);
            writer.Flush();
            writer.Close();
        }


        public static int toInt(this object obj)
        {
            try
            {
                return Convert.ToInt32(obj);
            }
            catch
            {
                return 0;
            }
        }

    }
}
