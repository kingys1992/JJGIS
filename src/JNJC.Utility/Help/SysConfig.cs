using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace JNJC.Utility.Help
{
    /// <summary>
    /// 系统配置文件操作类
    ///  HKSMMIS.Help.SysConfig.GetValue("00001");
    /// </summary>
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
            var doc = XElement.Load(System.Web.HttpRuntime.AppDomainAppPath + "Sysconfig\\Sysconfig.xml");
            //获取类别节点
            XElement category = (from c in doc.Elements("category")
                                 where c.Attribute(XName.Get("id")).Value == key.Substring(0, 2)
                                 select c).Single();
            //获取配置项节点
            var configItem = (from c in category.Elements()
                              where c.Attribute(XName.Get("id")).Value == key
                              select c).Single();
            configItem.SetAttributeValue(XName.Get("value"), value);
            doc.Save(System.Web.HttpRuntime.AppDomainAppPath + "Sysconfig\\Sysconfig.xml");
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
            var doc = XElement.Load(System.Web.HttpRuntime.AppDomainAppPath + "Sysconfig\\Sysconfig.xml");
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
            if (System.Web.HttpRuntime.AppDomainAppId == null)
            {// 非Web
             //  doc = XElement.Load(System.Windows.Forms.Application.StartupPath + "\\Sysconfig.xml");
            }
            else {
                // Web
                doc = XElement.Load(System.Web.HttpRuntime.AppDomainAppPath + "Sysconfig\\Sysconfig.xml");
            }

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

    }
}
