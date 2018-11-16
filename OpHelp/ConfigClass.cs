using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace OpHelp
{
    public class ConfigClass
    {
        public string strFileName;
        public string configName;
        public string configValue;


        public ConfigClass()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
            //            读取：
            //ConfigClass config = new ConfigClass();
            //string coal = config.ReadConfig("coal");
            //this.tbOpenFile.Text = config.ReadConfig("inWellTime");

            //写：
            //ConfigClass config = new ConfigClass();
            ////得到程序的config名：DataOperate.exe.config；
            //config.SetConfigName("DataOperate.exe.config");
            //config.SaveConfig("coal","三二一"); 
            //config.SaveConfig("inWellTime","10");

        }
        public string xx()
        {
            return ReadConfig("dserR1C1");
        }
        public string ReadConfig(string configKey)
        {
            try
            {
                configValue = "";
                //configValue = ConfigurationSettings.AppSettings["" + configKey + ""];
                configValue = ConfigurationManager.ConnectionStrings[configKey].ConnectionString;
                return configValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //得到程序的config文件的名称以及其所在的全路径
        public void SetConfigName(string strConfigName)
        {
            configName = strConfigName;
            //获得配置文件的全路径
            GetFullPath();
        }

        public void GetFullPath()
        {
            //获得配置文件的全路径
            strFileName = AppDomain.CurrentDomain.BaseDirectory.ToString() + configName;
        }

        public void SaveDept(string DeptID)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(strFileName);
            //找出名称为“add”的所有元素
            XmlNodeList nodes = doc.GetElementsByTagName("add");
            for (int i = 0; i < nodes.Count; i++)
            {
                //获得将当前元素的key属性
                XmlAttribute att = nodes[i].Attributes["providerName"];
                //根据元素的第一个属性来判断当前的元素是不是目标元素
                if (att.Value == "DeptID")
                {
                    //对目标元素中的第二个属性赋值
                    att = nodes[i].Attributes["connectionString"];

                    att.Value = DeptID;
                    break;
                }
            }
            //保存上面的修改
            doc.Save(strFileName);
        }
        public void SaveConfig(string configValue)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(strFileName);
            //找出名称为“add”的所有元素
            XmlNodeList nodes = doc.GetElementsByTagName("add");
            for (int i = 0; i < nodes.Count; i++)
            {
                //获得将当前元素的key属性
                XmlAttribute att = nodes[i].Attributes["providerName"];
                //根据元素的第一个属性来判断当前的元素是不是目标元素
                if (att.Value == "System.Data.SqlClient")
                {
                    //对目标元素中的第二个属性赋值
                    att = nodes[i].Attributes["connectionString"];
                    string str = att.Value;
                    att.Value = configValue;
                    break;
                }
            }
            //保存上面的修改
            doc.Save(strFileName);
        }
    }
}
