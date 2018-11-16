using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace InOutModel
{
    public class DataBaseHelper
    {

        public static Database CreateDataBase()
        {
            Database db = DatabaseFactory.CreateDatabase("DEFAULT_CONNECTION_STRING");
            return db;
        }

    }

    class Global
    {
        /// <summary>
        /// sql数据库连接串
        /// </summary>
        /// <returns></returns>
        public static string strSqlCon()
        {
            ConfigClass config = new ConfigClass();


            return config.ReadConfig("ConnectionString");
        }

        public static string PostIp = "";

        /// <summary>
        /// oracle数据库连接串
        /// </summary>
        /// <returns></returns>
        public static string strOracleCon()
        {
            ConfigClass config = new ConfigClass();


            return config.ReadConfig("OracleConnectionString");
        }

      




        /// <summary>
        /// 应用程序路劲
        /// </summary>
        public static string strPath = Application.StartupPath;

        /// <summary>
        /// 显示窗体
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="oMainForm">父窗体</param>
        public static void testshowForm(string typeName, System.Windows.Forms.Form oMainForm)
        {
            foreach (Form frm1 in oMainForm.MdiChildren)
            {
                if (frm1.GetType().Namespace.ToLower() + "." + frm1.GetType().Name.ToLower() == typeName.ToLower())
                {
                    frm1.Activate();
                    return;
                }
            }

            Form frm = (Form)Activator.CreateInstance(Type.GetType(typeName));

            if (typeName == "cw.YYlog" || typeName == "HospitalCard.tran")
            {
                frm.WindowState = FormWindowState.Normal;
            }
            else
            {
                frm.WindowState = FormWindowState.Maximized;
            }
            frm.StartPosition = FormStartPosition.CenterParent;
            frm.MdiParent = oMainForm;
            frm.Show();

        }
    }
}
