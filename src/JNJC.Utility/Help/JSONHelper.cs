using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Web;
using System.Web.Script.Serialization; ///添加引用  王岩松
using System.Data;
using System.Collections;
using System.ComponentModel;

namespace JNJC.Utility.Help
{
    public static class JSONHelper
    {



        /// <summary>
        /// 把json字符串转成对象
        /// </summary>
        /// <typeparam name="T">对象</typeparam>
        /// <param name="data">json字符串</param> 
        public static T Deserialize<T>(string data)
        {
            System.Web.Script.Serialization.JavaScriptSerializer json = new System.Web.Script.Serialization.JavaScriptSerializer();
            return json.Deserialize<T>(data);
        }

        /// <summary>
        /// 把对象转成json字符串
        /// </summary>
        /// <param name="o">对象</param>
        /// <returns>json字符串</returns>
        public static string Serialize(object o)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            System.Web.Script.Serialization.JavaScriptSerializer json = new System.Web.Script.Serialization.JavaScriptSerializer();
            json.Serialize(o, sb);
            return sb.ToString();
        }

        /// <summary>
        /// 把DataTable对象转成json字符串
        /// </summary> 
        //public string ToJson(DataTable dt)
        //{
        //    JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //    ArrayList arrayList = new ArrayList();
        //    foreach (DataRow dataRow in dt.Rows)
        //    {
        //        Dictionary<string, object> dictionary = new Dictionary<string, object>();
        //        foreach (DataColumn dataColumn in dt.Columns)
        //        {
        //            dictionary.Add(dataColumn.ColumnName, dataRow[dataColumn.ColumnName]);
        //        }
        //        arrayList.Add(dictionary);
        //    }
        //    return javaScriptSerializer.Serialize(arrayList);
        //}



        ///// <summary>  
        ///// Description:JSON格式数据转换助手类
        ///// 1.将List<T>类型的数据转换为JSON格式
        ///// 2.将T类型对象转换为JSON格式对象
        ///// 3.将JSON格式对象转换为T类型对象
        ///// </summary>
        ///// <summary>
        ///// 转换对象为JSON格式数据
        ///// </summary>
        ///// <typeparam name="T">类</typeparam>
        ///// <param name="obj">对象</param>
        ///// <returns>字符格式的JSON数据</returns>
        //public static string GetJSON<T>(object obj)
        //{
        //    string result = String.Empty;
        //    try
        //    {

        //        JavaScript.Serializer serializer = new JavaScript.Serializer();
        //        response.Write(serializer.Serialize(Data));

        //        System.Web.Script.Serialization.JavaScriptSerializer jss = new
        //            System.Web.Script.Serialization.JavaScriptSerializer();
        //        System.Runtime.Serialization.Json.DataContractJsonSerializer serializer =
        //        new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(T));
        //        using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
        //        {
        //            serializer.WriteObject(ms, obj);
        //            result = System.Text.Encoding.UTF8.GetString(ms.ToArray());
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    return result;
        //}
        ///// <summary>
        ///// 转换List<T>的数据为JSON格式
        ///// </summary>
        ///// <typeparam name="T">类</typeparam>
        ///// <param name="vals">列表值</param>
        ///// <returns>JSON格式数据</returns>
        //public static string JSON<T>(List<T> vals)
        //{
        //    System.Text.StringBuilder st = new System.Text.StringBuilder();
        //    try
        //    {
        //        System.Runtime.Serialization.Json.DataContractJsonSerializer s = new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(T));

        //        foreach (T city in vals)
        //        {
        //            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
        //            {
        //                s.WriteObject(ms, city);
        //                st.Append(System.Text.Encoding.UTF8.GetString(ms.ToArray()));
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return st.ToString();
        //}
        ///// <summary>
        ///// JSON格式字符转换为T类型的对象
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="jsonStr"></param>
        ///// <returns></returns>
        //public static T ParseFormByJson<T>(string jsonStr)
        //{
        //    T obj = Activator.CreateInstance<T>();
        //    using (System.IO.MemoryStream ms =
        //    new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonStr)))
        //    {
        //        System.Runtime.Serialization.Json.DataContractJsonSerializer serializer =
        //        new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(T));
        //        return (T)serializer.ReadObject(ms);
        //    }
        //}
    }
}
