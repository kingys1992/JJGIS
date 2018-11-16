using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using JNJC.Utility;
using System.Data.Common;
using System.IO;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using JNJC.Utility.Help;
using JNJC.Utility.DataClass;

namespace JNJC.Utility
{
    public class insertTableMaxId
    {
        //insert 表的时候，避免表主键重复

        /// <summary>
        /// insert 表的时候，避免表主键重复
        /// </summary>
        /// <param name="strTable" >   表名 </param>
        /// <param name="strCol" >   主键ID名 </param>
        /// <returns></returns>
        public string getTableMaxId(string strTable, string strCol)
        {
            //定义参数
            string strMaxID = string.Empty;
            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection conn = dbbase.CreateConnection())
            {
                if (conn.State != ConnectionState.Open)
                    conn.Open();
                try
                {
                    //*********根据ID编码查询指标数据信息 -----****************//
                    string strSql = @"select(decode(max(" + strCol + "), null, 1000000000, max(" + strCol + "))) + 1  from " + strTable;
                    strMaxID = Convert.ToString(dbbase.ExecuteScalar(dbbase.GetSqlStringCommand(strSql)));
                }
                catch (Exception ex)
                {
                    JNJC.Utility.Help.HelpUtils.ErrorLog("查询表主键ID -查询表主键ID！ ||" + ex.ToString());
                }
                return strMaxID;
            }
        }

    }
}
