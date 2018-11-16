using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Data;
using System.Text.RegularExpressions;

namespace JNJC.Utility
{
    /// <summary>
    ///  修改内容 增加 public 
    ///  修改人： King  
    ///  修改时间 ：2016年3月23日16:59:25
    /// </summary>
    public class FormatJsonExtension
    {
        public static DataTable ConvertJSONToDataTable(string jsonString)
        {
            DataTable dt = new DataTable();
            //strip out bad characters
            string[] jsonParts = Regex.Split(jsonString.Trim().Replace("[", "").Replace("]", ""), "},{");

            //hold column names
            List<string> dtColumns = new List<string>();

            //get columns
            foreach (string jp in jsonParts)
            {
                //only loop thru once to get column names
                string[] propData = Regex.Split(jp.Replace("{", "").Replace("}", ""), ",");
                foreach (string rowData in propData)
                {
                    try
                    {
                        int idx = rowData.IndexOf(":");
                        string n = rowData.Substring(0, idx - 1).Trim().Replace("\"", "");
                        string v = rowData.Substring(idx + 1).Trim();
                        if (!dtColumns.Contains(n))
                        {
                            dtColumns.Add(n.Replace("\"", ""));
                        }
                    }
                    catch (Exception ex)
                    {

                        throw new Exception(string.Format("Error Parsing Column Name : {0}", rowData+ex.ToString()));
                        
                    }

                }
                break; // TODO: might not be correct. Was : Exit For
            }

            //build dt
            foreach (string c in dtColumns)
            {
                dt.Columns.Add(c);
            }
            //get table data
            foreach (string jp in jsonParts)
            {
                string[] propData = Regex.Split(jp.Replace("{", "").Replace("}", ""), ",");
                int i = 0;
                DataRow nr = null;
                foreach (string rowData in propData)
                {


                    if (i == 0)
                    {
                        nr = dt.NewRow();
                    }
                    if (i % dt.Columns.Count == 0)
                    {
                        nr = dt.NewRow();
                    }
                    try
                    {
                        int idx = rowData.IndexOf(":");
                        string n = rowData.Substring(0, idx - 1).Trim().Replace("\"", "");
                        string v = rowData.Substring(idx + 1).Trim();
                        //nr[n] = v;
                        nr[n] = v.Replace("\"", "");
                    }
                    catch (Exception ex)
                    {
                        string strError = ex.ToString();
                        continue;
                    }
                    if (i % dt.Columns.Count == 0)
                    {
                        dt.Rows.Add(nr);
                    }
                    i = i + 1;
                }

            }
            return dt;
        }

        /// <summary>
        /// 属性转json
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string JsonFormat(object data)
        {
            FormatJsonResult result = new FormatJsonResult();
            result.Data = data;  
            return result.ExecuteResult();
        }
        public static T Deserialize<T>(string jsonStr)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(jsonStr);
        }
    }    
    public class FormatJsonResult
    {    
        public Object Data { get; set; }

        public string ExecuteResult()
        {  
            StringWriter sw = new StringWriter();
            //日期格式
            string strTime = "yyyy'-'MM'-'dd' 'HH':'mm':'ss";

            JsonSerializer serializer = JsonSerializer.Create(
                new JsonSerializerSettings
                {
                    Converters = new JsonConverter[] { new IsoDateTimeConverter() { DateTimeFormat = strTime } },
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    NullValueHandling = NullValueHandling.Ignore
                });

            using (JsonWriter jsonWriter = new JsonTextWriter(sw))
            {
                jsonWriter.Formatting = Formatting.Indented;

                serializer.Serialize(jsonWriter, Data);
            }
            return sw.ToString(); 
        }
    }
}