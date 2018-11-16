using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Runtime.Serialization;
using System.Reflection;

namespace JNJC.Utility.Help
{


    /// <summary>
    /// DataTable与实体类互相转换
    /// </summary>
    /// <typeparam name="T">实体类</typeparam>
    public class ModelHandler<T> where T : new()
    {
        #region DataTable转换成实体类

        /// <summary>
        /// 填充对象列表：用DataSet的第一个表填充实体类
        /// </summary>
        /// <param name="ds">DataSet</param>
        /// <returns></returns>
        public List<T> FillModel(DataSet ds)
        {
            if (ds == null || ds.Tables[0] == null || ds.Tables[0].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                return FillModel(ds.Tables[0]);
            }
        }

        /// <summary>  
        /// 填充对象列表：用DataSet的第index个表填充实体类
        /// </summary>  
        public List<T> FillModel(DataSet ds, int index)
        {
            if (ds == null || ds.Tables.Count <= index || ds.Tables[index].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                return FillModel(ds.Tables[index]);
            }
        }
        public List<T> FillModel(IDataReader dr)
        {

            List<T> modelList = new List<T>();

            while (dr.Read())
            {
                int colcount = dr.FieldCount;
                T model = new T();
                Type mt = typeof(T);
                for (int i = 0; i < colcount; i++)
                {

                    string cname = dr.GetName(i);
                    PropertyInfo pi = mt.GetProperty(cname, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public);
                    if (null != pi && !dr.IsDBNull(i))
                    {

                        pi.SetValue(model, dr.GetValue(i), null);
                    }



                }
                modelList.Add(model);

            }

            return modelList;
        }
        /// <summary>  
        /// 填充对象列表：用DataTable填充实体类
        /// </summary>  
        public List<T> FillModel(DataTable dt)
        {
            //if (dt == null || dt.Rows.Count == 0)
            //{
            //    return null;
            //}
            //List<T> modelList = new List<T>();
            //foreach (DataRow dr in dt.Rows)
            //{

            //    T model = new T();
            //    foreach (PropertyInfo propertyInfo in typeof(T).GetProperties())
            //    {
            //        if (dr[propertyInfo.Name].ToString() != "")
            //        {
            //            propertyInfo.SetValue(model, dr[propertyInfo.Name], null);
            //        }
            //    }
            //    modelList.Add(model);
            //}
            //return modelList;

            List<T> modelList = new List<T>();
            if (dt == null || dt.Rows.Count == 0)
            {
                return modelList;
            }

            foreach (DataRow dr in dt.Rows)
            {

                int colcount = dt.Columns.Count;
                T model = new T();
                Type mt = typeof(T);
                for (int i = 0; i < colcount; i++)
                {
                    try
                    {

                        string cname = dt.Columns[i].ColumnName;

                        PropertyInfo pi = mt.GetProperty(cname, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public);

                        if (null != pi && dr[i] != null && Convert.ToString(dr[i]) != "")
                        {


                            pi.SetValue(model, dr[i], null);

                            //if (cname.Trim().ToUpper() == "DATEPRTEND")
                            //{
                            //    string strtr = cname;
                            //}


                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }

                }
                modelList.Add(model);
            }
            return modelList;
        }

        /// <summary>  
        /// 填充对象：用DataRow填充实体类
        /// </summary>  
        public T FillModel(DataRow dr)
        {
            if (dr == null)
            {
                return default(T);
            }

            //T model = (T)Activator.CreateInstance(typeof(T));  
            T model = new T();
            foreach (PropertyInfo propertyInfo in typeof(T).GetProperties())
            {
                model.GetType().GetProperty(propertyInfo.Name).SetValue(model, dr[propertyInfo.Name], null);
            }
            return model;
        }

        #endregion

        #region 实体类转换成DataTable

        /// <summary>
        /// 实体类转换成DataSet
        /// </summary>
        /// <param name="modelList">实体类列表</param>
        /// <returns></returns>
        public DataSet FillDataSet(List<T> modelList)
        {
            if (modelList == null || modelList.Count == 0)
            {
                return null;
            }
            else
            {
                DataSet ds = new DataSet();
                ds.Tables.Add(FillDataTable(modelList));
                return ds;
            }
        }

        /// <summary>
        /// 实体类转换成DataTable
        /// </summary>
        /// <param name="modelList">实体类列表</param>
        /// <returns></returns>
        public DataTable FillDataTable(List<T> modelList)
        {
            if (modelList == null || modelList.Count == 0)
            {
                return null;
            }
            DataTable dt = CreateData(modelList[0]);

            foreach (T model in modelList)
            {
                DataRow dataRow = dt.NewRow();
                foreach (PropertyInfo propertyInfo in typeof(T).GetProperties())
                {
                    dataRow[propertyInfo.Name] = propertyInfo.GetValue(model, null);
                }
                dt.Rows.Add(dataRow);
            }
            return dt;
        }

        /// <summary>
        /// 根据实体类得到表结构
        /// </summary>
        /// <param name="model">实体类</param>
        /// <returns></returns>
        private DataTable CreateData(T model)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            foreach (PropertyInfo propertyInfo in typeof(T).GetProperties())
            {
                dataTable.Columns.Add(new DataColumn(propertyInfo.Name, propertyInfo.PropertyType));
            }
            return dataTable;
        }

        #endregion
    }

}

