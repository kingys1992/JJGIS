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
using JNJC.Model.YNQGL;
using JNJC.Model;


/// <summary>
/// 查询能耗消耗 whl 2017年11月14日13:28:28
/// </summary>
namespace JNJC.BLL.YNQGL
{

    public  class EnergyConsumptionBll
    {
        private static readonly log4net.ILog logs = log4net.LogManager.GetLogger("writLogger");
        private static log4net.ILog logHelper = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// 查询全省行政区域的初始用能权
        /// </summary>
        /// <param name="CATEGORY">查询类别</param>
        /// <param name="REGIONCODE">行政区域code</param>
        /// <param name="EXECUTEDATE">执行时间</param>
        /// <param name="page">页数</param>
        /// <param name="rowpage">行数</param>
        /// <returns>返回2种情况（行政区，数量；企业，数量）</returns>
        public static Dictionary<String, Object> SearchCS(string CATEGORY)
        {
            List<EnergyConsumptionModel> oList = new List<EnergyConsumptionModel>();
            //创建对象和变量。
            int toalCount;
            string col = string.Empty;
            SqlPage oPage = new SqlPage(); //new 分页查询对象
            string strWhere = string.Empty; //where条件
            string strSql = string.Empty;//sql语句
            string strCol = string.Empty; //查询的字段
            string strGb = string.Empty;//group  by  分组
            string strOb = string.Empty; //order by  排序
            ModelHandler<EnergyConsumptionModel> opp = new ModelHandler<EnergyConsumptionModel>();
            Dictionary<String, Object> result = new Dictionary<string, object>();
            DataTable dt = new DataTable(); //new DataTable对象
            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection dbconn = dbbase.CreateConnection())
            using (DbCommand cmd = dbconn.CreateCommand())
            {
                if (dbconn.State != ConnectionState.Open)
                    dbconn.Open();
                try
                {
                    logs.Info("555555");
                    return result;
                }
                catch (Exception ex)
                {
                    JNJC.Utility.Help.HelpUtils.ErrorLog("初始用能权-加载GRID数据错误！ ||" + ex.ToString());
                    return result;
                }
            }
        }
        /// <summary>
        /// 查询全省行政区域的用能权统计
        /// </summary>
        /// <param name="STRATTIME">开始时间</param>
        /// <param name="ENDTIME">结束时间</param>
        /// <param name="CATEGORY">查询类别</param>
        /// <param name="REGIONCODE">行政区CODE</param>
        /// <param name="page">页数</param>
        /// <param name="rowpage">行数</param>
        /// <returns>返回2种情况（行政区，数量；企业，数量）</returns>
        public static Dictionary<String, Object> SearchTJ(string STRATTIME, string ENDTIME, string CATEGORY, string REGIONCODE,int page, int rowpage)
        {
            List<EnergyConsumptionModel> oList = new List<EnergyConsumptionModel>();
            //创建对象和变量。
            int toalCount;
            string col = string.Empty;
            SqlPage oPage = new SqlPage(); //new 分页查询对象
            string strWhere = string.Empty; //where条件
            string strSql = string.Empty;//sql语句
            string strCol = string.Empty; //查询的字段
            string strGb = string.Empty;//group  by  分组
            string strOb = string.Empty; //order by  排序
            ModelHandler<EnergyConsumptionModel> opp = new ModelHandler<EnergyConsumptionModel>();
            Dictionary<String, Object> result = new Dictionary<string, object>();
            DataTable dt = new DataTable(); //new DataTable对象
            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection dbconn = dbbase.CreateConnection())
            using (DbCommand cmd = dbconn.CreateCommand())
            {
                if (dbconn.State != ConnectionState.Open)
                    dbconn.Open();
                try
                {
                    List<ColumnModel> cm = new List<ColumnModel>();

                    if (CATEGORY == "CATEGORY")
                    {
                        strWhere = " XZQ.PYJC is not null";
                        strSql = @" T_NYXFZLKZ_DQJBXXB XZQ
                                  left join (select XZQHBM, sum(nvl(RTOTAL, 0)) as RTOTAL
                                               from M_QYJCXXB QY
                                               left join T_ENERGY_RECORD JL
                                                 on QY.FRDWDM = JL.RENTERPRISECODE
                                             --where 界面查询条件
                                              where RDATE >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd')
                                                and RDATE <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')
                                                and RTYPE in (0, 1, 2)
                                              group by XZQHBM) C --CUN 存有 
                                    on XZQ.XZQHBM = C.XZQHBM
                                  left join (select XZQHBM, sum(nvl(RTOTAL, 0)) as RTOTAL
                                               from M_QYJCXXB QY
                                               left join T_ENERGY_RECORD JL
                                                 on QY.FRDWDM = JL.RENTERPRISECODE
                                             --where 界面查询条件
                                              where RDATE >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd')
                                                and RDATE <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')
                                                and RTYPE in (3)
                                              group by XZQHBM) M --MAI 出售 
                                    on XZQ.XZQHBM = C.XZQHBM ";
                        strCol = @"  XZQ.XZQHBM as REGIONCODE ,
                                    XZQ.XZQHM as REGIONNAME ,
                                    nvl(C.RTOTAL, 0) c --全部用能权
                                    ,
                                    NVL(M.RTOTAL, 0) M --卖出用能权 
                                    ,
                                    nvl(C.RTOTAL, 0) - NVL(M.RTOTAL, 0) as ENERGYNUMBER ";
                        strOb = " XZQ.XZQHBM ";
                        strGb = "";
                        cm = new List<ColumnModel>();
                        //用能权统计--行政区 
                        cm.Add(new ColumnModel { title = "行政区编码", field = "REGIONCODE", align = "center", hidden = "hidden" });
                        cm.Add(new ColumnModel { title = "行政区名称", field = "REGIONNAME", align = "center", width = "40%" });
                        cm.Add(new ColumnModel { title = "用能权统计(t)", field = "ENERGYNUMBER", sortable = "true", align = "right", width = "60%" });

                        if (cm.Count == 1)
                        {
                            cm.Clear();
                        }
                    }
                    else
                    {
                        strWhere = "1=1";
                        strSql = @" (select qy.dwxxmc, sum(nvl(rtotal, 0)) as  rtotal
                                        from m_qyjcxxb qy
                                        left join t_energy_record jl
                                            on qy.frdwdm = jl.renterprisecode
                                        --where 界面查询条件
                                              where RDATE >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd')
                                                and RDATE <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')
                                        and rtype in (0, 1, 2)
                                        and  qy.xzqhbm='" + REGIONCODE + @"'
                                        group by qy.dwxxmc) c --cun 存有 
                            left join (select qy.dwxxmc, sum(nvl(rtotal, 0)) as  rtotal
                                        from m_qyjcxxb qy
                                        left join t_energy_record jl
                                            on qy.frdwdm = jl.renterprisecode
                                        --where 界面查询条件
                                              where RDATE >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd')
                                                and RDATE <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')
                                        and rtype in (3)
                                        and  qy.xzqhbm='" + REGIONCODE + @"'
                                        group by qy.dwxxmc) m --mai 出售 
                            on c.dwxxmc=m.dwxxmc";
                        strCol = @" c.dwxxmc as COMPANYNAME ,
                                   nvl(c.rtotal, 0) c --全部用能权
                                  ,
                                   nvl(m.rtotal, 0) m --卖出用能权 
                                  ,
                                   nvl(c.rtotal, 0) - nvl(m.rtotal, 0) as ENERGYNUMBER";
                        strOb = "";
                        strGb = "";
                        cm = new List<ColumnModel>();
                        cm.Add(new ColumnModel { title = "企业名称", field = "COMPANYNAME", align = "left", width = "40%" });
                        //判断查询的监测因子项目，，动态生成grid的列头。
                        //初始用能
                        cm.Add(new ColumnModel { title = "初始用能(t)", field = "ENERGYNUMBER", sortable = "true", align = "right", width = "60%" });
                        if (cm.Count == 1)
                        {
                            cm.Clear();
                        }
                    }
                    //返回dt数据。
                    dt = oPage.GetDataSetGroupBy(DataBaseHelper.typedb.zlyjgisdb, strSql, strCol
                       , strWhere, strOb, strGb, page, rowpage, out toalCount).Tables[0];
                    // 返回Sql语句，目的是绑定excel。
                    string strSqlT = "";
                    string strSqlP = "";
                    strSqlP = oPage.GetListSQLS(strSql, strCol, 0, 0, strOb, strWhere, strOb, out strSqlT);
                    //绑定数据到list。
                    oList = opp.FillModel(dt);
                    //  GP  服务 废气 王岩松 2016年6月23日17:44:43
                    string stringGp = " SELECT g.city,gscode, g.name, G.x, g.y ORDER BY g.city ";
                    if (dt != null && dt.Rows.Count > 0)
                    {

                        oList = opp.FillModel(dt);
                        var oLists = from tGride in oList
                                     select new
                                     {
                                         tGride.REGIONCODE,
                                         tGride.REGIONNAME,
                                         tGride.COMPANYNAME,
                                         tGride.ENERGYNUMBER,
                                     };

                        result.Add("rows", oLists);
                        result.Add("total", toalCount);
                        result.Add("cols", cm);
                        result.Add("sql", strSqlT);
                        result.Add("GP", stringGp);
                    }
                    else
                    {
                        result.Add("total", 0);
                        result.Add("rows", oList);
                        result.Add("cols", cm);
                        result.Add("sql", strSqlT);
                        result.Add("GP", stringGp);
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    JNJC.Utility.Help.HelpUtils.ErrorLog("初始用能权-加载GRID数据错误！ ||" + ex.ToString());
                    return result;
                }
            }
        }
        /// <summary>
        /// 查询全省行政区域的交易统计
        /// </summary>
        /// <param name="STRATTIME">开始时间</param>
        /// <param name="ENDTIME">结束时间</param>
        /// <param name="CATEGORY">查询类别</param>
        /// <param name="REGIONCODE">行政区CODE</param>
        /// <param name="page">页数</param>
        /// <param name="rowpage">行数</param>
        /// <returns>返回2种情况（行政区，数量；企业，数量）</returns>
        public static Dictionary<String, Object> SearchJY(string STRATTIME, string ENDTIME, string CATEGORY, string REGIONCODE, int page, int rowpage)
        {
            List<EnergyConsumptionModel> oList = new List<EnergyConsumptionModel>();
            //创建对象和变量。
            int toalCount;
            string col = string.Empty;
            SqlPage oPage = new SqlPage(); //new 分页查询对象
            string strWhere = string.Empty; //where条件
            string strSql = string.Empty;//sql语句
            string strCol = string.Empty; //查询的字段
            string strGb = string.Empty;//group  by  分组
            string strOb = string.Empty; //order by  排序
            ModelHandler<EnergyConsumptionModel> opp = new ModelHandler<EnergyConsumptionModel>();
            Dictionary<String, Object> result = new Dictionary<string, object>();
            DataTable dt = new DataTable(); //new DataTable对象
            Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
            using (DbConnection dbconn = dbbase.CreateConnection())
            using (DbCommand cmd = dbconn.CreateCommand())
            {
                if (dbconn.State != ConnectionState.Open)
                    dbconn.Open();
                try
                {
                    List<ColumnModel> cm = new List<ColumnModel>();

                    if (CATEGORY == "CATEGORY")
                    {
                        strWhere = " XZQ.PYJC is not null";
                        strSql = @" T_NYXFZLKZ_DQJBXXB XZQ
                                       left join (select XZQHBM, sum(nvl(tmnumber, 0)) as RTOTAL
                                                    from M_QYJCXXB QY
                                                    left join T_TRANSACTION_MANAGEMENT JY
                                                      on QY.FRDWDM = JY.Tmenterrisecode
                                                  --where 界面查询条件
                                              where tmtime >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd')
                                                and tmtime <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')
                                                   group by XZQHBM) C --CUN 存有 
                                         on XZQ.XZQHBM = C.XZQHBM";
                        strCol = @"          XZQ.XZQHBM as REGIONCODE,
                                            XZQ.XZQHM as REGIONNAME,
                                            nvl(C.RTOTAL, 0) as  ENERGYNUMBER";
                        strOb = "XZQ.XZQHBM";
                        strGb = "";
                        cm = new List<ColumnModel>();
                        //用能权统计--行政区 
                        cm.Add(new ColumnModel { title = "行政区编码", field = "REGIONCODE", align = "center", hidden = "hidden" });
                        cm.Add(new ColumnModel { title = "行政区名称", field = "REGIONNAME", align = "center", width = "40%" });
                        cm.Add(new ColumnModel { title = "用能权统计(t)", field = "ENERGYNUMBER", sortable = "true", align = "right", width = "60%" });

                        if (cm.Count == 1)
                        {
                            cm.Clear();
                        }
                    }
                    else
                    {
                        //   add  行政区划编码
                        strWhere = @"QY.XZQHBM ='"+ REGIONCODE + "'  and tmtime >= to_date('" + STRATTIME + @"', 'yyyy-MM-dd') and tmtime <= to_date('" + ENDTIME + @"', 'yyyy-MM-dd')";
                        strSql = @"M_QYJCXXB QY left join T_TRANSACTION_MANAGEMENT JY on QY.FRDWDM = JY.Tmenterrisecode";
                        strCol = @"  qy.dwxxmc as  COMPANYNAME, sum(nvl(tmnumber, 0))  as ENERGYNUMBER";
                        strOb = "";
                        strGb = "qy.dwxxmc";
                        cm = new List<ColumnModel>();
                        cm.Add(new ColumnModel { title = "企业名称", field = "COMPANYNAME", align = "left", width = "40%" });
                        //初始用能 动态生成grid的列头。
                        cm.Add(new ColumnModel { title = "初始用能(t)", field = "ENERGYNUMBER", sortable = "true", align = "right", width = "60%" });
                        if (cm.Count == 1)
                        {
                            cm.Clear();
                        }
                    }
                    //返回dt数据。
                    dt = oPage.GetDataSetGroupBy(DataBaseHelper.typedb.zlyjgisdb, strSql, strCol
                       , strWhere, strOb, strGb, page, rowpage, out toalCount).Tables[0];
                    // 返回Sql语句，目的是绑定excel。
                    string strSqlT = "";
                    string strSqlP = "";
                    strSqlP = oPage.GetListSQLS(strSql, strCol, 0, 0, strOb, strWhere, strOb, out strSqlT);
                    //绑定数据到list。
                    oList = opp.FillModel(dt);
                    //  GP  服务 废气 王岩松 2016年6月23日17:44:43
                    string stringGp = " SELECT g.city,gscode, g.name, G.x, g.y ORDER BY g.city ";
                    if (dt != null && dt.Rows.Count > 0)
                    {

                        oList = opp.FillModel(dt);
                        var oLists = from tGride in oList
                                     select new
                                     {
                                         tGride.REGIONCODE,
                                         tGride.REGIONNAME,
                                         tGride.COMPANYNAME,
                                         tGride.ENERGYNUMBER,
                                     };

                        result.Add("rows", oLists);
                        result.Add("total", toalCount);
                        result.Add("cols", cm);
                        result.Add("sql", strSqlT);
                        result.Add("GP", stringGp);
                    }
                    else
                    {
                        result.Add("total", 0);
                        result.Add("rows", oList);
                        result.Add("cols", cm);
                        result.Add("sql", strSqlT);
                        result.Add("GP", stringGp);
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    JNJC.Utility.Help.HelpUtils.ErrorLog("初始用能权-加载GRID数据错误！ ||" + ex.ToString());
                    return result;
                }
            }
        }

    }
}
