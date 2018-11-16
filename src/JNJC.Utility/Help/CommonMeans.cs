using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using System.IO;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using JNJC.Utility.Help;
using JNJC.Utility;
using JNJC.Utility.DataClass;

namespace JNJC.Utility.Help
{
    public class CommonMeans
    {
        /// <summary>
        /// 更新排放量数据
        /// strtype   排放量  ，，达标率 
        /// </summary>
        /// <returns></returns>
        public bool setCSTotal(string strtype)
        {

            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection conn = dbbase.CreateConnection())
            using (DbCommand cmd = conn.CreateCommand())
            {
                conn.Open();
                try
                {
                    #region

                    /*******************************************
                    * 功能：更新企业的排放量信息
                    * 作者：wys
                    * 日期：2016年8月29日16:31:42
                    ********************************************/
                    using (DbTransaction trans = conn.BeginTransaction())
                    {
                        string sqlupdate = "";
                        if (strtype == "P")
                        {
                            sqlupdate = " update G_XINSHIJIE g set g.total='' ";
                        }
                        else
                        {
                            sqlupdate = " update G_XINSHIJIE g set g.dbl='' ";
                        }

                        using (DbCommand cmdss = dbbase.GetSqlStringCommand(sqlupdate))
                        {
                            dbbase.ExecuteNonQuery(cmdss, trans);
                        }
                        trans.Commit();
                    }
                    #endregion
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        public bool setQYTotal(string strtype)
        {

            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection conn = dbbase.CreateConnection())
            using (DbCommand cmd = conn.CreateCommand())
            {
                conn.Open();
                try
                {
                    #region

                    /*******************************************
                    * 功能：更新企业的排放量信息
                    * 作者：wys
                    * 日期：2016年8月29日16:31:42
                    ********************************************/
                    using (DbTransaction trans = conn.BeginTransaction())
                    {
                        string sqlupdate = "";
                        if (strtype == "P")
                        {
                            sqlupdate = " update G_POLLUTANTSITE g set g.total='' ";
                        }
                        else
                        {
                            sqlupdate = " update G_POLLUTANTSITE g set g.dbl='' ";
                        }

                        using (DbCommand cmdss = dbbase.GetSqlStringCommand(sqlupdate))
                        {
                            dbbase.ExecuteNonQuery(cmdss, trans);
                        }
                        trans.Commit();
                    }
                    #endregion
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 跟新空间表 行政区的值。
        /// </summary>
        /// <param name="strtype"></param>
        /// <returns></returns>
        public bool setG_XINSHIJIE(string strtype)
        {

            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection conn = dbbase.CreateConnection())
            using (DbCommand cmd = conn.CreateCommand())
            {
                conn.Open();
                try
                {
                    #region

                    /*******************************************
                    * 功能：更新企业的排放量信息
                    * 作者：wys
                    * 日期：2016年8月29日16:31:42
                    ********************************************/
                    using (DbTransaction trans = conn.BeginTransaction())
                    {
                        string sqlupdate = "";
                        //if (strtype == "U")
                        //{
                            sqlupdate = " update G_XINSHIJIE g set g.ZL='' ";
                        //}
                        //else
                        //{
                        //    sqlupdate = " update G_POLLUTANTSITE g set g.dbl='' ";
                        //}

                        using (DbCommand cmdss = dbbase.GetSqlStringCommand(sqlupdate))
                        {
                            dbbase.ExecuteNonQuery(cmdss, trans);
                        }
                        trans.Commit();
                    }
                    #endregion
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
