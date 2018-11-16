using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Collections;
using System.Data;

namespace JNJC.Utility.Help
{
    /// <summary>
    /// xml帮助类
    /// 调用代码示例：
    ///  string file = System.Web.HttpContext.Current.Server.MapPath("~/Config/Count.config");
    ///  xmlHepler<string> xml = new xmlHepler<string>(file);
    ///  xml.xmlRoot = "rights"; // 调用RunTime节点下数据
    ///  xml.xmlRootAttName = "name";
    ///  xml.xmlRootAttValue = "log";
    ///  xml.xmlSplitField = "IP地址,日志内容,日志时间,用户名";
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class xmlHepler<T>
    {
        Hashtable table = new Hashtable();
        T FileName;
        T Root;    //根节点
        T RootAttName; //节点属性名称
        T RootAttValue; //根节点属性值
        T Field;       //Xml字段
        T FieldValue;//Xml数值


        /// <summary>
        /// XML文件路径
        /// </summary>
        /// <param name="val"></param>
        public xmlHepler(T val)
        {
            FileName = val;
            this.LoadXml(val.ToString());
        }

        /// <summary>
        /// XML文件路径
        /// </summary>
        /// <param name="file"></param>
        private void LoadXml(string file)
        {
            XmlDocument xdoc = new XmlDocument();
            xdoc.Load(file);
            table.Add("xml", xdoc);
        }
        /// <summary>
        /// 增加节点
        /// </summary>
        public void InsertNode()
        {
            string[] SplitField = Field.ToString().Split(',');
            string[] SplitFieldValue = FieldValue.ToString().Split(',');
            XmlDocument xdoc = (XmlDocument)table["xml"];
            XmlNodeList xTable = xdoc.DocumentElement.SelectNodes(Root.ToString());
            foreach (XmlNode xnode in xTable)
            {
                if (xnode.Attributes[RootAttName.ToString()].InnerText == RootAttValue.ToString()) //某一节点
                {
                    XmlNodeList xnlist = xnode.ChildNodes;
                    long iID = 1;
                    string str = "";
                    if (xnlist.Count != 0)
                    {
                        str = xnode.ChildNodes[xnlist.Count - 1].Attributes["ID"].Value;
                    }
                    if (str != "")
                    {
                        iID = iID + long.Parse(str);
                    }
                    XmlElement xe1 = xdoc.CreateElement("xml");
                    xe1.SetAttribute("ID", iID.ToString());//设置该节点genre属性 
                    for (int j = 0; j < SplitField.Length; j++)
                    {

                        xe1.SetAttribute(SplitField[j], SplitFieldValue[j]);
                    }

                    xnode.AppendChild(xe1);//添加到<Employees>节点中 
                }
            }

            xdoc.Save(FileName.ToString());
        }
        /// <summary>
        /// 修改节点
        /// </summary>
        public void UpdateNode()//修改结点的值（属性和子结点）
        {
            string[] SplitField = Field.ToString().Split(',');
            string[] SplitFieldValue = FieldValue.ToString().Split(',');
            XmlDocument xdoc = (XmlDocument)table["xml"];
            XmlNodeList xTable = xdoc.DocumentElement.SelectNodes(Root.ToString());

            foreach (XmlNode xnode in xTable)//遍历所有子节点 
            {

                if (xnode.Attributes[RootAttName.ToString()].InnerText == RootAttValue.ToString()) //某一节点
                {
                    XmlNodeList xnlist = xnode.ChildNodes;
                    for (int i = 0; i < xnlist.Count; i++)  //for (int i = 0; i < xnode.ChildNodes.Count; i  ) 这句是所有xml子节点数据
                    {

                        XmlElement xe1 = (XmlElement)xnode.ChildNodes[i];//将子节点类型转换为XmlElement类型 
                        if (xnode.ChildNodes[i].Attributes["ID"].InnerText == SplitFieldValue[0])//如果genre属性值为“张三” 
                        {
                            for (int j = 0; j < SplitField.Length; j++)
                            {

                                xe1.SetAttribute(SplitField[j], SplitFieldValue[j]);
                            }


                        }
                    }
                }
            }
            xdoc.Save(FileName.ToString());

        }
        /// <summary>
        /// 删除节点
        /// </summary>
        public void DeleteNode()//删除结点
        {
            string[] SplitField = Field.ToString().Split(',');
            string[] SplitFieldValue = FieldValue.ToString().Split(',');
            XmlDocument xdoc = (XmlDocument)table["xml"];
            XmlNodeList xTable = xdoc.DocumentElement.SelectNodes(Root.ToString());

            foreach (XmlNode xnode in xTable)//遍历所有子节点 
            {

                if (xnode.Attributes[RootAttName.ToString()].InnerText == RootAttValue.ToString()) //某一节点
                {

                    XmlNodeList xnlist = xnode.ChildNodes;
                    for (int i = 0; i < xnlist.Count; i++)  //for (int i = 0; i < xnode.ChildNodes.Count; i  ) 这句是所有xml子节点数据
                    {


                        if (xnode.ChildNodes[i].Attributes["ID"].InnerText == SplitFieldValue[0])//如果genre属性值为“张三” 
                        {
                            XmlElement xe1 = (XmlElement)xnode.ChildNodes[i];//将子节点类型转换为XmlElement类型 
                            xnlist[i].ParentNode.RemoveChild(xe1);

                        }
                    }


                }
            }
            xdoc.Save(FileName.ToString());
        }
        /// <summary>
        /// 返回XML to DataTable
        /// </summary>
        /// <returns></returns>
        public DataTable GetXmlToDataTable()
        {
            string[] SplitField = Field.ToString().Split(',');
            //构造DataTable
            DataTable dt = new DataTable();
            DataColumn dc = null;
            for (int i = 0; i < SplitField.Length; i++)
            {
                dc = new DataColumn(SplitField[i]);
                dt.Columns.Add(dc);
            }
            XmlDocument xdoc = (XmlDocument)table["xml"];
            XmlNodeList xTable = xdoc.DocumentElement.SelectNodes(Root.ToString());

            foreach (XmlNode xnode in xTable)
            {
                if (xnode.Attributes[RootAttName.ToString()].InnerText == RootAttValue.ToString()) //某一节点
                {
                    //该节点下所有子节点
                    XmlNodeList xnlist = xnode.ChildNodes;
                    //子节点所有数据
                    for (int i = 0; i < xnlist.Count; i++)  //for (int i = 0; i < xnode.ChildNodes.Count; i  ) 这句是所有xml子节点数据
                    {
                        DataRow dr = dt.NewRow();
                        //绑定所需字段
                        for (int j = 0; j < SplitField.Length; j++)
                        {
                            dr[SplitField[j]] = xnode.ChildNodes[i].Attributes[SplitField[j]].Value;
                        }
                        dt.Rows.Add(dr);
                    }
                }
            }
            return dt;
        }

        #region 设置值
        /// <summary>
        /// 根节点 
        /// </summary> 
        public T xmlRoot
        {
            get { return Root; }
            set { Root = value; }
        }
        /// <summary> 
        /// 节点属性字段名称  
        /// </summary>
        public T xmlRootAttName
        {
            get { return RootAttName; }
            set { RootAttName = value; }
        }
        /// <summary>
        /// 节点属性字段值 
        /// </summary>  
        public T xmlRootAttValue
        {
            get { return RootAttValue; }
            set { RootAttValue = value; }
        }
        /// <summary> 
        /// 子节点属性字段  </summary>
        public T xmlSplitField
        {
            set { Field = value; }
        }

        /// <summary>
        /// 子节点属性数值（增加，修改，删除）
        /// </summary>
        public T xmlSplitFieldValue
        {
            set { FieldValue = value; }
        }
        #endregion


    }
}
