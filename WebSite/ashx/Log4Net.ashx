<%@ WebHandler Language="C#" Class="Log4Net" %>

using System;
using System.Web;
using JNJC.Model.YNQGL;
using JNJC.Utility;
using System.Collections.Generic;
using System.Web.SessionState;
using System.Data.Common;
using System.IO;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using JNJC.Utility.Help;
using JNJC.Utility.DataClass;
using log4net;
using Oracle.ManagedDataAccess.Client;
using JNJC.BLL.YNQGL;

public class Log4Net: IHttpHandler, IRequiresSessionState {

    //private static string connStr = "User Id=admin;Password=123;Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.0.1)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=test)))";
    private static string connStr = "Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=172.16.1.52)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl.microsoft.com)));User ID=jnjc;Password=jnjc;Persist Security Info=True;Max Pool Size = 1000;";
    private  static readonly log4net.ILog logs = log4net.LogManager.GetLogger("writLogger");
    private static log4net.ILog logHelper = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

    public void ProcessRequest (HttpContext context) {
        EnergyConsumptionBll.SearchCS("11");
        //ExecuteNonQuery();
        // Logs("111");
    }



    #region 修改交易规则信息
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <returns></returns>
    public string Logs(string BH )
    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.mirs);

        using (DbConnection conn = dbbase.CreateConnection())
        {
            //EnergyConsumptionBll.SearchCS("11");

            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {
                    logs.Info("wwwww");
                    //*********添加信息 -----****************//
                    string strSql = @"update   T_ENERGY_DEALRULE    set DRDATE=:DRDATE, DRREMARK=:DRREMARK, DRFILE=:DRFILE,DRFILEPATH=:DRFILEPATH,DRPRICE=:DRPRICE,DRTHRESHOLD=:DRTHRESHOLD
                            where DRNO=:DRNO ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "DRDATE", DbType.DateTime, "");
                        dbbase.AddInParameter(cmd, "DRREMARK", DbType.String, "");
                        dbbase.AddInParameter(cmd, "DRFILE", DbType.String, "");
                        dbbase.AddInParameter(cmd, "DRFILEPATH", DbType.String, "");
                        dbbase.AddInParameter(cmd, "DRPRICE", DbType.Decimal, "");
                        dbbase.AddInParameter(cmd, "DRTHRESHOLD", DbType.Decimal, "");
                        dbbase.AddInParameter(cmd, "DRNO", DbType.Decimal, BH);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    logs.Info("11111111111");
                    return "设置成功!";

                }
                catch (Exception ex)
                {
                    logs.Error("用能权交易规则-增加信息！ ||" + ex);
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权交易规则-增加信息！ ||" + ex.ToString());
                    return "设置失败!";
                }
            }
        }
    }
    #endregion

    #region 执行SQL语句,返回受影响行数
    public static int ExecuteNonQuery()
    {
        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.mirs);

        using (OracleConnection conn = new OracleConnection(connStr))
        {
            conn.Open();
            using (OracleCommand cmd = conn.CreateCommand())
            {
                try
                {
                    logs.Info("wwwww");
                    cmd.CommandText = "";
                    //cmd.Parameters.AddRange("");
                    return cmd.ExecuteNonQuery();
                }
                catch (Exception ex){
                    logs.Error("用能权交易规则-增加信息！ ||" + ex);
                }
                finally
                {

                }
                return 1;
            }
        }
    }
    #endregion
    #region 执行SQL语句,返回DataTable;只用来执行查询结果比较少的情况
    public static DataTable ExecuteDataTable(string sql, params OracleParameter[] parameters)
    {
        using (OracleConnection conn = new OracleConnection(connStr))
        {
            conn.Open();
            using (OracleCommand cmd = conn.CreateCommand())
            {
                cmd.CommandText = sql;
                cmd.Parameters.AddRange(parameters);
                OracleDataAdapter adapter = new OracleDataAdapter(cmd);
                DataTable datatable = new DataTable();
                adapter.Fill(datatable);
                return datatable;
            }
        }
    }
    #endregion

    public bool IsReusable {
        get {
            return false;
        }
    }

}