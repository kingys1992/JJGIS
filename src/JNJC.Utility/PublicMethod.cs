﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI.WebControls;

namespace JNJC.Utility
{
    public class PublicMethod
    {

    

        #region 由Object取值
        /// <summary>
        /// 取得Int值,如果为Null 则返回０
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static int GetInt(object obj)
        {
            if (obj != null)
            {
                int i;
                int.TryParse(obj.ToString(), out i);
                return i;
            }
            else
                return 0;
        }

        public static double GetDouble(object obj)
        {
            if (obj != null)
            {
                double d;
                double.TryParse(obj.ToString(), out d);
                return d;
            }
            else
                return 0;
        }

        public static float GetFloat(object obj)
        {
            if (obj != null)
            {
                float f;
                float.TryParse(obj.ToString(), out f);
                return f;
            }
            else
                return 0;
        }


        /// <summary>
        /// 取得Int值,如果不成功则返回指定exceptionvalue值
        /// </summary>
        /// <param name="obj">要计算的值</param>
        /// <param name="exceptionvalue">异常时的返回值</param>
        /// <returns></returns>
        public static int GetInt(object obj, int exceptionvalue)
        {
            if (obj == null)
                return exceptionvalue;
            if (string.IsNullOrEmpty(obj.ToString()))
                return exceptionvalue;
            int i = exceptionvalue;
            try { i = Convert.ToInt32(obj); }
            catch { i = exceptionvalue; }
            return i;
        }

        /// <summary>
        /// 取得Decima值,如果不成功则返回指定exceptionvalue值
        /// </summary>
        /// <param name="obj">要计算的值</param>
        /// <param name="exceptionvalue">异常时的返回值</param>
        /// <returns></returns>
        public static decimal GetDecimal(object obj, int exceptionvalue)
        {
            if (obj == null)
                return exceptionvalue;
            if (string.IsNullOrEmpty(obj.ToString()))
                return exceptionvalue;
            decimal i = exceptionvalue;
            try { i = Convert.ToDecimal(obj); }
            catch { i = exceptionvalue; }
            return i;
        }

        /// <summary>
        /// 取得byte值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static byte Getbyte(object obj)
        {
            if (obj.ToString() != "")
                return byte.Parse(obj.ToString());
            else
                return 0;
        }

        /// <summary>
        /// 获得Long值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static long GetLong(object obj)
        {
            if (obj != null && obj.ToString() != "")
                return long.Parse(obj.ToString());
            else
                return 0;
        }

        /// <summary>
        /// 取得Long值,如果不成功则返回指定exceptionvalue值
        /// </summary>
        /// <param name="obj">要计算的值</param>
        /// <param name="exceptionvalue">异常时的返回值</param>
        /// <returns></returns>
        public static long GetLong(object obj, long exceptionvalue)
        {
            if (obj == null)
                return exceptionvalue;
            if (string.IsNullOrEmpty(obj.ToString()))
                return exceptionvalue;
            long i = exceptionvalue;
            try { i = Convert.ToInt64(obj); }
            catch { i = exceptionvalue; }
            return i;
        }

        /// <summary>
        /// 取得Decimal值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static decimal GetDecimal(object obj)
        {
            if (obj != null && obj.ToString() != "")
                return decimal.Parse(obj.ToString());
            else
                return 0;
        }

        /// <summary>
        /// 取得Guid值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static Guid GetGuid(object obj)
        {
            if (obj != null && obj.ToString() != "")
                return new Guid(obj.ToString());
            else
                return Guid.Empty;
        }

        /// <summary>
        /// 取得DateTime值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static DateTime GetDateTime(object obj)
        {

            if (obj != null && obj.ToString() != "")
                return DateTime.Parse(obj.ToString());
            else
                return new DateTime(2011, 1, 1);
        }

        /// <summary>
        /// 取得bool值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool GetBool(object obj)
        {
            if (obj != null)
            {
                bool flag;
                bool.TryParse(obj.ToString(), out flag);
                return flag;
            }
            else
                return false;
        }

        /// <summary>
        /// 取得byte[]
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static Byte[] GetByte(object obj)
        {
            if (obj.ToString() != "")
            {
                return (Byte[])obj;
            }
            else
                return null;
        }

        /// <summary>
        /// 取得string值
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string GetString(object obj)
        {
            if (obj != null && obj != DBNull.Value)
                return obj.ToString();
            else
                return "";
        }
        #endregion

    
   


   
        #region 获取客户端IP地址

        /// <summary>
        /// 获取客户端IP地址
        /// </summary>
        /// <returns></returns>
        public static string GetClientIP()
        {
            string result = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (null == result || result == String.Empty)
            {
                result = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }


            if (null == result || result == String.Empty)
            {
                result = HttpContext.Current.Request.UserHostAddress;
            }
            return result;
        }

        #endregion

        #region 获取页中 列表选中的项
        /// <summary>
        /// 获取页中 列表选中的项
        /// </summary>
        /// <param name="chklist">CheckBoxList ID</param>
        /// <returns></returns>
        public static List<string> GetCheckedItemList(CheckBoxList chklist)
        {
            List<string> list = new List<string>();
            foreach (ListItem li in chklist.Items)
            {
                if (li.Selected)
                    list.Add(li.Value);
            }
            return list;
        }


        #endregion




        #region DataTable To List


        /// <summary>
        /// DataTable To List
        /// </summary>
        /// <typeparam name="TType">object type</typeparam>
        /// <param name="dt">DataTable</param>
        /// <returns></returns>
        public static List<T> DataTableToObjectList<T>(DataTable dt) where T : new()
        {
            DataColumnCollection columns = dt.Columns;
            int columncount = columns.Count;
            List<T> result = new List<T>();    //声明一个要返回的对象泛型
            Type type = typeof(T);

            PropertyInfo[] propertys = type.GetProperties(BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public | BindingFlags.SetProperty);   //获取参数对象属性集合
            foreach (DataRow r in dt.Rows)
            {
                T t = new T();
                for (int i = 0; i < propertys.Length; i++)
                {
                    DataColumn column = columns[propertys[i].Name];
                    if (column != null && r[column] != null)
                    {
                        if (propertys[i].PropertyType == typeof(int))
                            propertys[i].SetValue(t, PublicMethod.GetInt(r[column]), null);
                        if (propertys[i].PropertyType == typeof(string))
                            propertys[i].SetValue(t, r[column].ToString(), null);
                        if (propertys[i].PropertyType == typeof(DateTime))
                            propertys[i].SetValue(t, PublicMethod.GetDateTime(r[column]), null);
                    }
                }
                result.Add(t);
            }
            return result;
        }

        /// <summary>
        /// 泛型集合转换成DATATABLE
        /// </summary>
        /// <param name="list">集合</param>
        /// <returns></returns>
        public static DataTable ToDataTable(IList list)
        {
            DataTable result = new DataTable();
            if (list.Count > 0)
            {
                PropertyInfo[] propertys = list[0].GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    result.Columns.Add(pi.Name, pi.PropertyType);
                }

                for (int i = 0; i < list.Count; i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in propertys)
                    {
                        object obj = pi.GetValue(list[i], null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    result.LoadDataRow(array, true);
                }
            }
            return result;
        }


        #endregion

        /// <summary>
        /// 获取指定字符串中的指定字符的个数
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="value">要查找的字符串</param>
        /// <returns></returns>
        public static int GetCharLength(string source, string value)
        {
            Regex reg = new Regex(value);
            return reg.Matches(source).Count;
        }

        /// <summary>
        /// 给指定字符串前面增加指定值
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="value">要增加的字符串</param>
        /// <returns></returns>
        public static string CharBeforeAppend(string source, string value)
        {
            return source.Insert(0, value);
        }

        /// <summary>
        /// 给指定字符串前面增加指定个数的指定值
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="value">要增加的字符串</param>
        /// <param name="length">要增加的个数</param>
        /// <returns></returns>
        public static string CharBeforeAppend(string source, string value, int length)
        {
            for (int i = 0; i < length; i++)
            {
                source = source.Insert(0, value);
            }
            return source;
        }

        /// <summary>
        /// 合并指定表并返回
        /// </summary>
        /// <param name="dt">原始表</param>
        /// <param name="DataTables">可变表参</param>
        /// <returns></returns>
        public static DataTable MergeDataTable(DataTable dt, params DataTable[] DataTables)
        {
            if (DataTables.Length == 0)
                return dt;
            foreach (DataTable table in DataTables)
                dt.Merge(table);
            return dt;
        }
    }
}
