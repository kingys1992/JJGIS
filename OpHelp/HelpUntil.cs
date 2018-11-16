using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpHelp
{
    public class HelpUntil
    {
        /// <summary>
        /// 返回格式化后的结果
        /// </summary>
        /// <param name="strVal">内容</param>
        /// <param name="strRC">行列位置</param>
        /// <returns></returns>
        public static string dserResult(string strVal, string strRC)
        {
            ConfigClass config = new ConfigClass();
            string str = config.ReadConfig(strRC);
            int iR = 0;
            if (str == "")
            { }
            else
            {
                iR = int.Parse(config.ReadConfig(strRC));
            }

            return strVal.PadLeft(iR);
        }

        /// <summary>
        /// 执行消息
        /// </summary>
        /// <param name="strSTATE">状态</param>
        /// <param name="msg">消息</param>
        /// <param name="IID">主键</param>
        public void EXEMsg(string strSTATE, string msg, int IID)
        {
            try
            {
                // HNHB.Utility.DataClass
                string strSql = " update B_JCFXSET set STATE=" + strSTATE + ",msg='" + msg + "',ddate=sysdate where IID= " + IID.ToString();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection conn = dbbase.CreateConnection())
                {
                    if (conn.State == ConnectionState.Closed)
                    {
                        conn.Open();
                    }

                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {


                        dbbase.ExecuteNonQuery(cmd);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
           
            

            
        }
    }
}
