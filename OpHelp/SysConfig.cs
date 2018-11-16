using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace OpHelp
{
    public static class SysConfig
    {
        /// <summary>
        /// 设置节点
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void SetValue(string key, string value)
        {
            //读取配置文件
            var doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");
            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            configItem.SetAttributeValue(XName.Get("value"), value);
            doc.Save(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");
        }

        /// <summary>
        /// 获取配置中的枚举
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static IList<KeyValuePair<string, string>> GetEnum(string key)
        {
            var list = new List<KeyValuePair<string, string>>();
            //读取配置文件
            var doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");
            //获取类别节点
            XElement enumNode = (from c in doc.Elements("enum").Single().Elements()
                                 where c.Attribute(XName.Get("id")).Value == key
                                 select c).Single();
            //枚举值字符串
            string strEnum = enumNode.Attribute(XName.Get("value")).Value;
            foreach (var item in strEnum.Split(','))
            {
                var kv = item.Split(' ');
                list.Add(new KeyValuePair<string, string>(kv[0], kv[1]));
            }
            return list;
        }
        /// <summary>
        /// 获取值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetValue(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Attribute(XName.Get("value")).Value;
        }

        /// <summary>
        /// 获取Type
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetType(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Attribute(XName.Get("type")).Value;
        }

        /// <summary>
        /// 获取说明值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetDescription(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Attribute(XName.Get("description")).Value;
        }

        /// <summary>
        /// 得到所有信息
        /// </summary>
        /// <returns></returns>
        public static System.Data.DataTable dtList()
        {
            DataTable dt = new DataTable();
            string strSql = "select * from  b_jcfxset  where STATE=1";
            Database dbbase = DataBaseHelper.CreateDataBase();
            using (DbConnection conn = dbbase.CreateConnection())
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                using (DbCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = strSql;
                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];

                }
            }
            return dt;
        }


        /// <summary>
        /// 获取文本内容
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetText(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Value;
        }
        /// <summary>
        /// 得到Name节点属性
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetName(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Attribute(XName.Get("name")).Value;
        }

        /// <summary>
        /// 得到indexId节点属性
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetIndexId(string key)
        {
            string result = string.Empty;
            //读取配置文件
            XElement doc = null;

            doc = XElement.Load(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase + "\\Sysconfig.xml");

            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            //返回value值
            return configItem.Attribute(XName.Get("indexId")).Value;
        }

    }
}
