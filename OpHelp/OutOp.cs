using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OpHelp
{
    public class OutOp
    {

        #region 例子
        //public static void EE_WC_OUTDB(string RName, string Ctype, string file)
        //{
        //    Process p = new Process();
        //    using (StreamReader sr = new StreamReader(file, Encoding.Default))
        //    {
        //        try
        //        {
        //            //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")
        //            string strfs = "";
        //            if (RName == "贾鲁河" && Ctype == "COD")
        //            {
        //                strfs = SysConfig.GetDescription("04003");
        //            }
        //            if (RName == "贾鲁河" && Ctype == "氨氮")
        //            {
        //                strfs = SysConfig.GetDescription("04004");
        //            }

        //            if (RName == "惠济河" && Ctype == "COD")
        //            {
        //                strfs = SysConfig.GetDescription("04001");
        //            }
        //            if (RName == "惠济河" && Ctype == "氨氮")
        //            {
        //                strfs = SysConfig.GetDescription("04002");
        //            }

        //            if (RName == "卫河" && Ctype == "COD")
        //            {
        //                strfs = SysConfig.GetDescription("04005");
        //            }
        //            if (RName == "卫河" && Ctype == "氨氮")
        //            {
        //                strfs = SysConfig.GetDescription("04006");
        //            }
        //            FileStream fs = new FileStream(strfs, FileMode.Create);
        //            StreamWriter sw = new StreamWriter(fs);

        //            Database dbbase = DataBaseHelper.CreateDataBase();
        //            using (DbConnection dbconn = dbbase.CreateConnection())
        //            {
        //                if (dbconn.State == ConnectionState.Closed)
        //                {
        //                    dbconn.Open();
        //                }
        //                string strSql = " delete B_EE_WC_OUT  where CTYPE=:CTYPE and RIVERS=:RIVERS ";
        //                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                {
        //                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
        //                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

        //                    dbbase.ExecuteNonQuery(cmd);
        //                }
        //                string strType = "";
        //                if (Ctype == "COD")
        //                {
        //                    strType = Ctype;
        //                }
        //                else
        //                {
        //                    strType = "ND";
        //                }
        //                string strRV = "";
        //                if (RName == "贾鲁河")
        //                {
        //                    strRV = "JLH";
        //                }
        //                if (RName == "惠济河")
        //                {
        //                    strRV = "HJH";
        //                }
        //                if (RName == "卫河")
        //                {
        //                    strRV = "WH";
        //                }


        //                int i = 0;
        //                string readDate = "";

        //                while (!sr.EndOfStream)
        //                {
        //                    i = i + 1;
        //                    readDate = "";
        //                    readDate = sr.ReadLine();//读取一行数据

        //                    //合并空格
        //                    readDate = Regex.Replace(readDate, @"\s+", ",");
        //                    readDate = readDate.Substring(1, readDate.Length - 2);

        //                    sw.WriteLine(i.ToString() + "," + readDate + "," + strType + "," + strRV);



        //                }
        //                sw.Close();
        //                sw.Dispose();

        //                try
        //                {


        //                    p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
        //                    p.StartInfo.UseShellExecute = false;
        //                    p.StartInfo.RedirectStandardInput = true;
        //                    p.StartInfo.RedirectStandardOutput = true;
        //                    p.StartInfo.RedirectStandardError = true;
        //                    p.StartInfo.CreateNoWindow = true;

        //                    p.Start();
        //                    string strCtrl = "";
        //                    string Ds = "";
        //                    if (RName == "贾鲁河" && Ctype == "COD")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04003");
        //                        Ds = SysConfig.GetType("04003");
        //                    }
        //                    if (RName == "贾鲁河" && Ctype == "氨氮")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04004");
        //                        Ds = SysConfig.GetType("04004");
        //                    }

        //                    if (RName == "惠济河" && Ctype == "COD")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04001");
        //                        Ds = SysConfig.GetType("04001");
        //                    }
        //                    if (RName == "惠济河" && Ctype == "氨氮")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04002");
        //                        Ds = SysConfig.GetType("04002");
        //                    }

        //                    if (RName == "卫河" && Ctype == "COD")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04005");
        //                        Ds = SysConfig.GetType("04005");
        //                    }
        //                    if (RName == "卫河" && Ctype == "氨氮")
        //                    {
        //                        strCtrl = SysConfig.GetValue("04006");
        //                        Ds = SysConfig.GetType("04006");
        //                    }

        //                    p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

        //                    p.StandardInput.WriteLine("exit");
        //                    p.WaitForExit();
        //                    if (p.HasExited == true)
        //                    {
        //                        //  MessageBox.Show("执行完成");
        //                        //修改表状态
        //                        strSql = " update B_EE_WC_OUT  set CTYPE='氨氮' where CTYPE='ND'  ";
        //                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                        {


        //                            dbbase.ExecuteNonQuery(cmd);
        //                        }

        //                        strSql = " update B_EE_WC_OUT  set RIVERS='贾鲁河' where RIVERS='JLH'  ";
        //                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                        {


        //                            dbbase.ExecuteNonQuery(cmd);
        //                        }
        //                        strSql = " update B_EE_WC_OUT  set RIVERS='惠济河' where RIVERS='HJH'  ";
        //                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                        {


        //                            dbbase.ExecuteNonQuery(cmd);
        //                        }
        //                        strSql = " update B_EE_WC_OUT  set RIVERS='卫河' where RIVERS='WH'  ";
        //                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                        {


        //                            dbbase.ExecuteNonQuery(cmd);
        //                        }
        //                        strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where RIVERS=:RIVERS and CTYPE=:CTYPE  ";
        //                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
        //                        {
        //                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
        //                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

        //                            dbbase.ExecuteNonQuery(cmd);
        //                        }



        //                    }
        //                    p.Close();
        //                }
        //                catch (Exception ex)
        //                {
        //                    throw ex;
        //                }
        //                finally
        //                {
        //                    if (p != null)
        //                    {
        //                        p.Dispose();
        //                        p = null;
        //                    }
        //                }

        //            }

        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }

        //}

        #endregion


        /// <summary>
        /// 溯源分析COD
        /// </summary>
        /// <param name="strfs">数据导入txt文件路径</param>
        /// <param name="Ds">数据源文件路径(c:/XXX.txt)</param>
        /// <param name="strCtrl">控制台文件路径</param>
        /// <param name="file">out文件路径</param>
        public static void B_EE_WC_OUTCODJLHSY(string strfs, string Ds, string strCtrl, string file,  string wd,string IID,string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODJLHSY  where jcfx='"+ qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV+","+ qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                         
                            if (p.HasExited == true)
                            {
                              
                               
                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='贾鲁河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODJLHSY  set RIVERS='贾鲁河',DDATE=sysdate where RIVERS='JLH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODJLHSY where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODJLHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODJLHSY2  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='贾鲁河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODJLHSY2  set RIVERS='贾鲁河',DDATE=sysdate where RIVERS='JLH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODJLHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODWHSY(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODWHSY  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='卫河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODWHSY  set RIVERS='卫河',DDATE=sysdate where RIVERS='WH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODWHSY where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODWHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODWHSY2  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='卫河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODWHSY2  set RIVERS='卫河',DDATE=sysdate where RIVERS='WH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODWHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODHJHSY(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODHJHSY  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='惠济河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODHJHSY  set RIVERS='惠济河',DDATE=sysdate where RIVERS='HJH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODHJHSY where  time !="+istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODHJHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTCODHJHSY2  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='COD' and rivers='惠济河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODHJHSY2  set RIVERS='惠济河',DDATE=sysdate where RIVERS='HJH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTCODHJHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        /// <summary>
        /// 溯源分析氨氮
        /// </summary>
        /// <param name="strfs"></param>
        /// <param name="Ds"></param>
        /// <param name="strCtrl"></param>
        /// <param name="file"></param>
        /// <param name="wd"></param>
        /// <param name="IID"></param>
        /// <param name="qymc"></param>
        public static void B_EE_WC_OUTNDJLHSY(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTNDJLHSY  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            ///readDate = readDate.Substring(1, readDate.Length - 2);
                            readDate = readDate.Substring(1, readDate.Length - 1);
                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='贾鲁河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDJLHSY  set ctype='氨氮',RIVERS='贾鲁河',DDATE=sysdate where RIVERS='JLH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDJLHSY where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDJLHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        //string strSql = string.Empty;
                        string strSql = " delete  B_EE_WC_OUTNDJLHSY2  where jcfx='" + qymc + "'";
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        {


                            dbbase.ExecuteNonQuery(cmd);
                        }
                        string strType = "ND";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='贾鲁河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDJLHSY2  set ctype='氨氮',RIVERS='贾鲁河',DDATE=sysdate where RIVERS='JLH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDJLHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }


        public static void B_EE_WC_OUTNDWHSY(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTNDWHSY  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='卫河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDWHSY  set ctype='氨氮',RIVERS='卫河',DDATE=sysdate where RIVERS='WH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDWHSY where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDWHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        //string strSql = string.Empty;
                        string strSql = " delete  B_EE_WC_OUTNDWHSY2  where jcfx='" + qymc + "'";
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        {


                            dbbase.ExecuteNonQuery(cmd);
                        }
                        string strType = "ND";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='卫河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDWHSY2  set ctype='氨氮',RIVERS='卫河',DDATE=sysdate where RIVERS='WH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDWHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDHJHSY(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTNDHJHSY  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='惠济河' and wd='1' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDHJHSY  set ctype='氨氮',RIVERS='惠济河',DDATE=sysdate where RIVERS='HJH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDHJHSY where  time !="+istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }


        public static void B_EE_WC_OUTNDHJHSY2(string strfs, string Ds, string strCtrl, string file, string wd, string IID, string qymc)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = string.Empty;
                        //string strSql = " delete  B_EE_WC_OUTNDHJHSY2  where jcfx='" + qymc + "'";
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + qymc);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();

                            if (p.HasExited == true)
                            {


                                DataTable dt = new DataTable();

                                strSql = "select c8tbegin from B_EFDC  where ctype='氨氮' and rivers='惠济河' and wd='2' and ismn=2 and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDHJHSY2  set ctype='氨氮',RIVERS='惠济河',DDATE=sysdate where RIVERS='HJH'  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " delete B_EE_WC_OUTNDHJHSY2 where  time !=" + istr;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        /// <summary>
        /// 决策分析流量控制
        /// </summary>
        /// <param name="strfs"></param>
        /// <param name="Ds"></param>
        /// <param name="strCtrl"></param>
        /// <param name="file"></param>
        /// <param name="IID"></param>
        public static void B_EE_WC_OUTLLKZ(string strfs, string Ds, string strCtrl, string file, int IID,string RV,string type)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = " delete  B_EE_WC_OUTLLKZ  where IID=" + IID.ToString();
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        {


                            dbbase.ExecuteNonQuery(cmd);
                        }
                        string strType = type;

                        string strRV = RV;

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                           
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                   

                                }


                               


                                strSql = " update B_EE_WC_OUTLLKZ  set  ctype='" + dt.Rows[0]["ctype"].ToString() + "',RIVERS='" + dt.Rows[0]["rivers"].ToString()+"',IID=" + IID.ToString() + " where RIVERS='"+ strRV + "' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }


                                strSql = " select max(to_number(time)) from  B_EE_WC_OUTLLKZ  where IID=" + IID.ToString() ;
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                               

                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTLLKZ where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='"+ dt.Rows[0]["rivers"].ToString() + "' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                               


                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }
      

        /// <summary>
        /// 溯源分析
        /// </summary>
        /// <param name="HL">河流</param>
        /// <param name="yz">监测项目</param>
        /// <param name="wd">维度</param>
        public static void B_JCFXSY(string HL, string yz, string wd)
        {
            string strSql = "";

            if (wd == "1")
            {
                if (HL == "贾鲁河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTCODJLHSY where  time<=(select  max(time)  from B_EE_WC_OUTCODJLHSY) and L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTNDJLHSY where  time<=(select  max(time)  from B_EE_WC_OUTNDJLHSY) and  L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                }
                if (HL == "卫河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTCODWHSY where  time<=(select  max(time)  from B_EE_WC_OUTCODWHSY) and L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTNDWHSY where  time<=(select  max(time)  from B_EE_WC_OUTNDWHSY) and L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                }

                if (HL == "惠济河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTCODHJHSY where    time<=(select  max(time)  from B_EE_WC_OUTCODHJHSY) and  L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " delete B_EE_WC_OUTNDHJHSY where    time<=(select  max(time)  from B_EE_WC_OUTNDHJHSY) and  L  not in(select one from b_jcfxrv where rname = '" + HL + "')";
                    }
                }
            }
            else
            {
                if (HL == "贾鲁河")
                {
                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTCODJLHSY2 where time<=(select  max(time)  from B_EE_WC_OUTCODJLHSY2) and L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTNDJLHSY2 where time<=(select  max(time)  from B_EE_WC_OUTNDJLHSY2) and L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                }
                if (HL == "卫河")
                {
                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTCODWHSY2 where time<=(select  max(time)  from B_EE_WC_OUTCODWHSY2) and  L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTNDWHSY2 where time<=(select  max(time)  from B_EE_WC_OUTNDWHSY2) and  L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                }

                if (HL == "惠济河")
                {
                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTCODHJHSY2 where time<=(select  max(time)  from B_EE_WC_OUTCODHJHSY2) and  L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " delete B_EE_WC_OUTNDHJHSY2 where time<=(select  max(time)  from B_EE_WC_OUTNDHJHSY2) and  L  not in(select two from b_jcfxrv where rname = '" + HL + "')";
                    }
                }
            }

            Database dbbase = DataBaseHelper.CreateDataBase();
            using (DbConnection dbconn = dbbase.CreateConnection())
            {
                if (dbconn.State == ConnectionState.Closed)
                {
                    dbconn.Open();
                }

                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                {


                    dbbase.ExecuteNonQuery(cmd);
                }

                strSql = " delete b_jcfxsy where wd = '"+wd+"' and RVNAME = '" + HL + "' and ctype = '" + yz + "'";
                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                {


                    dbbase.ExecuteNonQuery(cmd);
                }
                if (HL == "贾鲁河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODJLHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODJLHSY where  time=(select  max(time)  from B_EE_WC_OUTCODJLHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTNDJLHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDJLHSY where  time=(select  max(time)  from B_EE_WC_OUTNDJLHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }
                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODJLHSY2 a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODJLHSY2 where  time=(select  max(time)  from B_EE_WC_OUTCODJLHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from /*B_EE_WC_OUTNDJLHSY2*/ a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDJLHSY2 where  time=(select  max(time)  from B_EE_WC_OUTNDJLHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }
                }
                if (HL == "卫河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODWHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODWHSY where  time=(select  max(time)  from B_EE_WC_OUTCODWHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTNDWHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDWHSY where  time=(select  max(time)  from B_EE_WC_OUTNDWHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }
                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODWHSY2 a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODWHSY2 where  time=(select  max(time)  from B_EE_WC_OUTCODWHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTNDWHSY2 a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDWHSY2 where  time=(select  max(time)  from B_EE_WC_OUTNDWHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }

                }
                if (HL == "惠济河")
                {
                    if (yz == "COD" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODHJHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODHJHSY where  time=(select  max(time)  from B_EE_WC_OUTCODHJHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "1")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTNDHJHSY a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDHJHSY where  time=(select  max(time)  from B_EE_WC_OUTNDHJHSY) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.one  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }

                    if (yz == "COD" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTCODHJHSY2 a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTCODHJHSY2 where  time=(select  max(time)  from B_EE_WC_OUTCODHJHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                    }
                    if (yz == "氨氮" && wd == "2")
                    {
                        strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from B_EE_WC_OUTNDHJHSY2 a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";
                        //strSql = " insert into b_jcfxsy(sitecode, dye, ctype, time, wd, dmmc, qymc, RVNAME,QYMCC) select sitecode, dye,'" + yz + "',time,'" + wd + "',b.dmmc,a.jcfx,b.rname,c.psname from (  select  *  from B_EE_WC_OUTNDHJHSY2 where  time=(select  max(time)  from B_EE_WC_OUTNDHJHSY2) and L   in(select one from b_jcfxrv where rname = '" + HL + "')) a join b_jcfxrv b on a.L = b.two  join   (select distinct jcfx,psname from  b_efdcset) c on a.jcfx=c.jcfx ";

                    }
                }




                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                {
                    dbbase.ExecuteNonQuery(cmd);
                }
            }
               


        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="strfs">数据导入txt文件路径</param>
        /// <param name="Ds">数据源文件路径(c:/XXX.txt)</param>
        /// <param name="strCtrl">控制台文件路径</param>
        /// <param name="file">out文件路径</param>
        public static void B_EE_WC_OUTCODJLH(string strfs, string Ds, string strCtrl,string file,int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTCODJLH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;
                              

                                strSql = " update B_EE_WC_OUTCODJLH  set RIVERS='贾鲁河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='JLH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                               

                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODJLH where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='贾鲁河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }


        public static void B_EE_WC_OUTCODJLH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTCODWH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{
                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        //string strSql = " delete  B_EE_WC_OUTCODJLH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODJLH2  set RIVERS='贾鲁河',DDATE=sysdate,IID=" + IID.ToString() + " where  GUIDS ='" + GUIDS + "' and  RIVERS='JLH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODJLH2 where  GUIDS ='" + GUIDS + "' and  ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='贾鲁河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strfs">数据导入txt文件路径</param>
        /// <param name="Ds">数据源文件路径</param>
        /// <param name="strCtrl">控制台文件路径</param>
        /// <param name="file">out文件路径</param>
        public static void B_EE_WC_OUTCODHJH(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //string strSql = " delete  B_EE_WC_OUTCODHJH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();

                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODHJH  set RIVERS='惠济河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='HJH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODHJH where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='惠济河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }


        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strfs">数据导入txt文件路径</param>
        /// <param name="Ds">数据源文件路径</param>
        /// <param name="strCtrl">控制台文件路径</param>
        /// <param name="file">out文件路径</param>
        public static void B_EE_WC_OUTCODHJH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //string strSql = " delete  B_EE_WC_OUTCODHJH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODHJH2  set RIVERS='惠济河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='HJH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODHJH2 where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='惠济河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }


        }


        public static void B_EE_WC_OUTCODWH(string strfs, string Ds, string strCtrl, string file,int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTCODWH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{
                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODWH  set RIVERS='卫河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='WH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODWH where GUIDS ='"+GUIDS+"' and  ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='卫河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTCODWH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTCODWH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "COD";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTCODWH2  set RIVERS='卫河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and  RIVERS='WH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTCODWH2 where GUIDS ='" + GUIDS + "' and  ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='卫河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                                ////取消更新gp服务。
                                //strSql = @"  merge into JLH_1_Point p using (select dye, a.l from (select * from B_EE_WC_OUTCODJLH where IID=" + IID.ToString() + @") a join(select min(time) as time, l from B_EE_WC_OUTCODJLH  where IID=" + IID.ToString() + @"group by L) b on a.l = b.l and a.time = b.time) np
                                //on(p.objID = np.l)
                                //when  matched then
                                //update set p.cod =  round(np.dye,2)";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}



                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDJLH(string strfs, string Ds, string strCtrl, string file,int IID,string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTNDJLH  where IID="+IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{
                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDJLH  set ctype='氨氮',RIVERS='贾鲁河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='JLH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                //strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{


                                //    dbbase.ExecuteNonQuery(cmd);
                                //}


                                strSql = " delete B_EE_WC_OUTNDJLH where GUIDS='"+GUIDS+"'   and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='贾鲁河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDJLH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }


                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTNDJLH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "JLH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDJLH2  set ctype='氨氮',RIVERS='贾鲁河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='JLH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTNDJLH2 where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='贾鲁河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        public static void B_EE_WC_OUTNDHJH(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //string strSql = " delete  B_EE_WC_OUTNDHJH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {

                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDHJH  set  ctype='氨氮',RIVERS='惠济河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and  RIVERS='HJH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTNDHJH where GUIDS ='" + GUIDS + "' and  ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='惠济河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public static void B_EE_WC_OUTNDHJH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTCODWH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{
                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        //string strSql = " delete  B_EE_WC_OUTNDHJH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "HJH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDHJH2  set  ctype='氨氮',RIVERS='惠济河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='HJH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTNDHJH2 where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='惠济河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public static void B_EE_WC_OUTNDWH(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTNDWH  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{
                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();

                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDWH  set  ctype='氨氮', RIVERS='卫河',DDATE=sysdate,IID=" + IID.ToString() + " where  GUIDS ='" + GUIDS + "' and RIVERS='WH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTNDWH where  GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='卫河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public static void B_EE_WC_OUTNDWH2(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        //string strSql = " delete  B_EE_WC_OUTNDWH2  where IID=" + IID.ToString();
                        //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        //{


                        //    dbbase.ExecuteNonQuery(cmd);
                        //}
                        string strType = "ND";

                        string strRV = "WH";

                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);



                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {


                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;

                            p.Start();


                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            int iwd;
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态

                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    iwd = 1;
                                    if (IID > 100)
                                    {
                                        iwd = 2;
                                    }

                                }
                                string strop = "0";

                                if (dt.Rows[0]["optype"].ToString() == "0")
                                {
                                    strop = "1";
                                }
                                if (dt.Rows[0]["optype"].ToString() == "1")
                                {
                                    strop = "0";
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and wd='" + iwd.ToString() + "' and ismn='" + strop + "' and c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());

                                }
                                istr = istr + 10;


                                strSql = " update B_EE_WC_OUTNDWH2  set  ctype='氨氮', RIVERS='卫河',DDATE=sysdate,IID=" + IID.ToString() + " where GUIDS ='" + GUIDS + "' and RIVERS='WH' and IID is null ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }



                                //如果是模拟删除模拟初始化数据
                                //strSql = " select  OPTYPE from b_jcfxset   where IID= " + IID.ToString();
                                //object ob = null;
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{

                                //    ob = dbbase.ExecuteScalar(cmd);
                                //}
                                //if (ob != null)
                                //{
                                //    if (ob.ToString() == "0")
                                //    {
                                //        ///100以内是一维。200是二维
                                //        if (IID < 100)
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 1";
                                //        }
                                //        else
                                //        {
                                //            strSql = " delete B_JCFXINT   where wd= 2";
                                //        }



                                //        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //        {

                                //            dbbase.ExecuteNonQuery(cmd);
                                //        }
                                //    }
                                //}


                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {


                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                strSql = " delete B_EE_WC_OUTNDWH2 where GUIDS ='" + GUIDS + "' and ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='卫河' and IID=" + IID.ToString() + " and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);

                                }

                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        /// <summary>
        /// 2017年3月2日13:30:14  
        /// 王岩松 添加全省层次河流
        /// 把生成的数据文件导入到，数据库中
        /// </summary>
        /// <param name="strfs"></param>
        /// <param name="Ds"></param>
        /// <param name="strCtrl"></param>
        /// <param name="file"></param>
        /// <param name="IID"></param>
        /// <param name="GUIDS"></param>
        /// <param name="hl"></param>
        /// <param name="yz"></param>

        public static void B_EE_WC_OUTDATA(string strfs, string Ds, string strCtrl, string file, int IID, string GUIDS, string hl,string yz)
        {
            Process p = new Process();
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //oMsg.EXEMsg("2", "模型计算失败。", 4); SysConfig.GetValue("02011")

                    FileStream fs = new FileStream(strfs, FileMode.Create);
                    StreamWriter sw = new StreamWriter(fs);

                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }
                        string strSql = "";
                        //2017年1月11日14:09:37  因为增加解决方案操作，，去除掉删除数据操作
                        string strType = yz;
                        string strRV = hl;
                        int i = 0;
                        string readDate = "";

                        while (!sr.EndOfStream)
                        {
                            i = i + 1;
                            readDate = "";
                            readDate = sr.ReadLine();//读取一行数据

                            //合并空格
                            readDate = Regex.Replace(readDate, @"\s+", ",");
                            readDate = readDate.Substring(1, readDate.Length - 1);

                            sw.WriteLine(readDate + "," + strType + "," + strRV + "," + GUIDS);
                        }
                        sw.Close();
                        sw.Dispose();

                        try
                        {
                            p.StartInfo.FileName = @"C:\WINDOWS\system32\cmd.exe ";
                            p.StartInfo.UseShellExecute = false;
                            p.StartInfo.RedirectStandardInput = true;
                            p.StartInfo.RedirectStandardOutput = true;
                            p.StartInfo.RedirectStandardError = true;
                            p.StartInfo.CreateNoWindow = true;
                            p.Start();
                            p.StandardInput.WriteLine(@"SQLLDR GISDB/jjgis123.0@GISDB96 direct=y DATA=" + Ds + " CONTROL=" + strCtrl + "  LOG=c:/LOG_1.TXT skip=1");

                            p.StandardInput.WriteLine("exit");
                            p.WaitForExit();
                            if (p.HasExited == true)
                            {
                                //  MessageBox.Show("执行完成");
                                //修改表状态 0:模拟分析,1:预警分析
                                DataTable dt = new DataTable();
                                strSql = "  select ctype, rivers, optype from b_jcfxset where IID = " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                }

                                strSql = "select c8tbegin from B_EFDC  where ctype='" + dt.Rows[0]["ctype"].ToString() + "' and rivers='" + dt.Rows[0]["rivers"].ToString() + "' and   c8tbegin is not null order by IID";
                                int istr = 0;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    istr = int.Parse(dbbase.ExecuteScalar(cmd).ToString());
                                }
                                istr = istr + 10;

                                //更改状态
                                strSql = " update b_jcfxset set STATE=0,DDATE=sysdate,msg='数据导入成功'  where  IID=  " + IID.ToString();
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                //删除掉非选择日期的数据
                                strSql = " delete B_EE_WC_OUTDATA where  GUIDS ='" + GUIDS + "'  and time < " + istr.ToString() + "  ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.ExecuteNonQuery(cmd);
                                }

                                //修改河流名称 王岩松 2017年3月3日16:49:26
                                //strSql = " update B_EE_WC_OUTDATA  set  ctype='" + yz + "', RIVERS='" + hl + "',DDATE=sysdate,IID=" + IID.ToString() + " where  GUIDS ='" + GUIDS + "' and RIVERS='WH' and IID is null ";
                                //using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                //{
                                //    dbbase.ExecuteNonQuery(cmd);
                                //}
                            }
                            p.Close();
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            if (p != null)
                            {
                                p.Dispose();
                                p = null;
                            }
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
}
