using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Runtime.InteropServices;

namespace JNJC.Utility.DataClass
{
    public class DataBaseHelper
    {
        public static Database CreateDataBase(typedb typedb)
        {
            Database db = DatabaseFactory.CreateDatabase("" + typedb + "");

            return db;
        }

        //     指定数据库连接。
        [ComVisible(true)]
        public enum typedb
        {
            /// <summary>
            /// 总量预警GISDB业务数据库连接 。
            /// </summary>
            zlyjgisdb = 0,
            /// <summary>
            /// 连接基础软件研发中心的数据
            /// </summary>
            mirs = 1,
        }
    }
}
