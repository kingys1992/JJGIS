using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;
using JNJC.Utility.Help;
using JNJC.Utility;
using JNJC.Utility.DataClass;

namespace JNJC.Utility.DataClass
{
    public class SqlPage
    {

        //定义变量。
        string strReturnSQL = "";
        string strOrderBy = "";
        int iStartCount = 0;
        string strInnerSql = "";

        #region   --orderby排序/
        /// <summary>
        /// 获取DataSet  带排序
        /// </summary>
        /// <param name="typedb">数据库连接对象</param>
        /// <param name="selectTarget">查询对象</param>
        /// <param name="columns">查询的列</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="orderBy">排序方式</param>
        /// <param name="page">当前页</param>
        /// <param name="rowsPerPage">页面显示记录数 小于等于0 不分页</param>
        /// <param name="tolalCount">返回记录集合</param>
        /// <returns></returns>
        public DataSet GetDataSetOrderBy(DataBaseHelper.typedb typedb, string selectTarget, string columns, string strWhere, string orderBy, int page, int rowsPerPage, out int tolalCount)
        {
            //查询条件
            if (strWhere != "" && strWhere != null && strWhere != "null")
            {
                strWhere = " where " + strWhere;
            }
            else {
                strWhere = "";
            }

            //调用查询数据的方法。
            string strSQL = GetListSQL(selectTarget, columns, rowsPerPage, page, orderBy, strWhere);

            //组织获取记录数SQL
            string strTotalSQL = "select count(1) from " + selectTarget + strWhere; ;

            //创建连接的数据库
            Database dbbase = DataBaseHelper.CreateDataBase(typedb);
            using (DbCommand cmd = dbbase.GetSqlStringCommand(strTotalSQL))
            {
                tolalCount = Convert.ToInt32(dbbase.ExecuteScalar(cmd));
            }
            //接收返回的结果数据。
            DataSet ds = null;
            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSQL))
            {
                ds = dbbase.ExecuteDataSet(cmd);
            }
            return ds;
        }

        /// <summary>
        ///     带排序
        /// </summary>
        /// <param name="selectTarget">查询对象</param>
        /// <param name="columns">查询的列</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="orderBy">排序方式</param>
        /// <param name="page">当前页</param>
        /// <param name="rowsPerPage">页面显示记录数 小于等于0 不分页</param>
        /// <param name="tolalCount">返回记录集合</param>
        /// <returns></returns>
        public string GetListSQL( string strSelectTarget, string columns, int rowsPerPage, int page, string orderBy, string strWhere)
        {


            if (orderBy.Trim() != "")
                strOrderBy = " Order by " + orderBy;

            if (rowsPerPage <= 0)
            {
                strReturnSQL = "SELECT " + columns + " FROM " + strSelectTarget + " "
                    + strWhere + " " + strOrderBy;
            }
            else
            {
                iStartCount = (page - 1) * rowsPerPage + 1;

                strInnerSql = "SELECT " + columns + " FROM " + strSelectTarget + " "
                    + strWhere + " " + strOrderBy;
                strReturnSQL = "SELECT * FROM (SELECT A.*, ROWNUM RN FROM (" + strInnerSql
                    + ") A WHERE ROWNUM<= " + page * rowsPerPage + ") WHERE RN >= " + iStartCount;
            }
            return strReturnSQL;
        }
        #endregion  

        #region   --groupby排序/
        /// <summary>
        /// 获取DataSet    groupby排序
        /// </summary>
        /// <param name="typedb">数据库连接对象</param>
        /// <param name="selectTarget">查询对象</param>
        /// <param name="columns">查询的列</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="orderBy">排序方式</param>
        /// <param name="page">当前页</param>
        /// <param name="rowsPerPage">页面显示记录数 小于等于0 不分页</param>
        /// <param name="tolalCount">返回记录集合</param>
        /// <returns></returns>
        /// <returns></returns>
        public DataSet GetDataSetGroupBy(DataBaseHelper.typedb typedb, string selectTarget, string columns, string strWhere, string orderBy, string gruopby, int page, int rowsPerPage, out int tolalCount)
        {
            //查询条件

            //if (strWhere != "")
            //**************修改 日期：2014-1-9  修改 人 王桑

            if (strWhere != "" && strWhere != null && strWhere != "null")
            {
                strWhere = " where " + strWhere;
            }
            else
            {
                strWhere = "";
            }
            if (gruopby != "" && gruopby != null && gruopby != "null")
            {
                gruopby = " group by  " + gruopby;
            }
            else
            {
                gruopby = "";
            }

            string strSQL = GetListSQLS(selectTarget, columns, rowsPerPage, page, orderBy, strWhere, gruopby);

            //组织获取记录数SQL
            //string strTotalSQL = "select count(1) from " + selectTarget + strWhere + gruopby;
            string strTotalSQL = "SELECT count(1) FROM " + selectTarget + " "
                    + strWhere + " " + gruopby + " " + strOrderBy;
            Database dbbase = DataBaseHelper.CreateDataBase(typedb);
            using (DbCommand cmd = dbbase.GetSqlStringCommand(strTotalSQL))
            {

                DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                //添加判断如果查询不到的时候进行验证 2016年4月1日20:52:45 王岩松
                if (dt.Rows.Count >0)
                {
                   
                    if (dt.Rows.Count == 1)
                    {
                        tolalCount = int.Parse(dt.Rows[0][0].ToString());
                    }
                    else
                    {
                        tolalCount = dt.Rows.Count;
                    }
                    //tolalCount = int.Parse(Convert.ToString(dbbase.ExecuteScalar(cmd)));
                }
                else {
                    tolalCount = 0;
                }
            }
            DataSet ds = null;
            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSQL))
            {
                ds = dbbase.ExecuteDataSet(cmd);
            }
            return ds;
        }

        /// <summary>
        ///   groupby排序
        /// </summary>
        /// <param name="selectTarget">查询对象</param>
        /// <param name="columns">查询的列</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="orderBy">排序方式</param>
        /// <param name="page">当前页</param>
        /// <param name="rowsPerPage">页面显示记录数 小于等于0 不分页</param>
        /// <param name="tolalCount">返回记录集合</param>
        /// <returns></returns>
        string GetListSQLS(string strSelectTarget, string columns, int rowsPerPage, int page, string orderBy, string strWhere, string gruopby)
        {

            if (orderBy.Trim() != "")
                strOrderBy = " Order by " + orderBy;

            if (rowsPerPage <= 0)
            {
                strReturnSQL = "SELECT " + columns + " FROM " + strSelectTarget + " "
                    + strWhere + " " + gruopby + " " + strOrderBy;
            }
            else
            {
                iStartCount = (page - 1) * rowsPerPage + 1;

                strInnerSql = "SELECT " + columns + " FROM " + strSelectTarget + " "
                    + strWhere + " " + gruopby + " " + strOrderBy;
                strReturnSQL = "SELECT * FROM (SELECT A.*, ROWNUM RN FROM (" + strInnerSql
                    + ") A WHERE ROWNUM<= " + page * rowsPerPage + ") WHERE RN >= " + iStartCount;
            }
            return strReturnSQL;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strSelectTarget"></param>
        /// <param name="columns"></param>
        /// <param name="rowsPerPage"></param>
        /// <param name="page"></param>
        /// <param name="orderBy"></param>
        /// <param name="strWhere"></param>
        /// <param name="gruopby"></param>
        /// <param name="strInnerSql"></param>
        /// <returns></returns>
        public string GetListSQLS(string strSelectTarget, string columns, int rowsPerPage, int page, string orderBy, string strWhere, 
            string gruopby,out string  strInnerSql)
        {

            //if (orderBy.Trim() != "")
            //    strOrderBy = " Order by " + orderBy;

            //if (rowsPerPage <= 0)
            //{
            //    strReturnSQL = "SELECT " + columns + " FROM " + strSelectTarget + " where "
            //        + strWhere + " group by " + gruopby + " " + strOrderBy;
            //    strInnerSql = strReturnSQL;

            //    strReturnSQL = " FROM " + strSelectTarget + " where "  + strWhere + " group by " + gruopby + " " + strOrderBy;
            //}
            //else
            //{
            //    iStartCount = (page - 1) * rowsPerPage + 1;

            //    strReturnSQL = "SELECT " + columns + " FROM " + strSelectTarget + " where "   + strWhere + " group by " + gruopby + " " + strOrderBy;

            //    strInnerSql = strReturnSQL;

            //    strReturnSQL = " FROM " + strSelectTarget + " where "  + strWhere + " group by " + gruopby + " " + strOrderBy;

            //}
            if (strWhere != "" && strWhere != null && strWhere != "null")
            {
                strWhere = " where " + strWhere;
            }
            else
            {
                strWhere = "";
            }
            if (gruopby != "" && gruopby != null && gruopby != "null")
            {
                gruopby = " group by  " + gruopby;
            }
            else
            {
                gruopby = "";
            }

            strInnerSql = GetListSQLS(strSelectTarget, columns,0, 0, orderBy, strWhere, gruopby);
            return strInnerSql;
        }
        #endregion
    }
}
