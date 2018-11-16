using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpHelp
{
    public class InpOp
    {

        public static string GetIID(string HL, string optype)
        {
            string strTemp = "";
            DataTable dtCustomerClassSM = new DataTable();
            Database dbbase = DataBaseHelper.CreateDataBase();
            using (DbConnection dbconn = dbbase.CreateConnection())
            {
                if (dbconn.State == ConnectionState.Closed)
                {
                    dbconn.Open();
                }
                DataTable dt = new DataTable();
                string strSql = "  select IID from b_jcfxset where rivers='贾鲁河' and optype=3 and IID<100";
                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                {
                    dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                }
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    strTemp = strTemp + dt.Rows[i]["IID"].ToString() + ",";
                }
            }
            return strTemp.Substring(0, strTemp.Length - 1);

        }
        /// <summary>
        /// 生成efdc文件
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="isn">模拟是1，预警是0，溯源2，流量3</param>
        public static void efdcMarkDB(string RName, string Ctype, string file, string path, string isn, string wd, ref string strTBEGIN, ref string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //
                    DataTable dtCustomerClassSM = new DataTable();
                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }


                        while (!sr.EndOfStream)
                        {

                            string readStr = sr.ReadLine();//读取一行数据
                                                           //开始写入
                            sw.Write(readStr);


                            if (readStr.StartsWith("C7      NTC"))//去掉标题行
                            {


                                string readDate = sr.ReadLine();//读取一行数据


                                string strSql = "  select  IID,C7NTC,C7NTSPTC,C7NLTC,C7NTTC,C7NTCPP,C7NTSTBC,C7NTCNB,C7NTCVB,C7NTSMMT,C7NFLTMT,C7NDRYSTP,CTYPE,RIVERS from B_EFDC where  C7NTC is not null and CTYPE=:CTYPE and RIVERS=:RIVERS and ISMN=" + isn.ToString() + " and wd=" + wd;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {

                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTC"].ToString(), "efdcC7NTC");
                                        strNTC = strTemp;
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSPTC"].ToString(), "efdcC7NTSPTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NLTC"].ToString(), "efdcC7NLTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTTC"].ToString(), "efdcC7NTTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCPP"].ToString(), "efdcC7NTCPP");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSTBC"].ToString(), "efdcC7NTSTBC");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCNB"].ToString(), "efdcC7NTCNB");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCVB"].ToString(), "efdcC7NTCVB");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSMMT"].ToString(), "efdcC7NTSMMT");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NFLTMT"].ToString(), "efdcC7NFLTMT");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NDRYSTP"].ToString(), "efdcC7NDRYSTP");
                                        sw.Write(strTemp);



                                    }
                                }


                            }
                            if (readStr.StartsWith("C8       TCON"))//去掉标题行
                            {


                                string readDate = sr.ReadLine();//读取一行数据


                                string strSql = "  select IID,C8TCON,C8TBEGIN,C8TREF,C8CORIOLIS,C8ISCORV,C8ISCCA,C8ISCFL,C8ISCFLM,C8DTSSFAC,C8DTSSDHDT,CTYPE,RIVERS from B_EFDC where  C8TCON is not null and CTYPE=:CTYPE and RIVERS=:RIVERS and ISMN=" + isn.ToString() + " and wd=" + wd;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {

                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TCON"].ToString(), "efdcC8TCON");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TBEGIN"].ToString(), "efdcC8TBEGIN");

                                        strTBEGIN = strTemp;

                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TREF"].ToString(), "efdcC8TREF");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8CORIOLIS"].ToString(), "efdcC8CORIOLIS");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCORV"].ToString(), "efdcC8ISCORV");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCCA"].ToString(), "efdcC8ISCCA");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCFL"].ToString(), "efdcC8ISCFL");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCFLM"].ToString(), "efdcC8ISCFLM");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8DTSSFAC"].ToString(), "efdcC8DTSSFAC");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8DTSSDHDT"].ToString(), "efdcC8DTSSDHDT");
                                        sw.Write(strTemp);





                                    }
                                }
                            }
                            if (readStr.StartsWith("C46    BSC"))//去掉标题行
                            {
                                string readDate = sr.ReadLine();//读取一行数据


                                string strSql = "  select IID,C46BSC,C46TEMO,C46HEQT,C46ISBEDTEMI,C46KBH,C46RKDYE,C46NCBS,C46NCBW,C46NCBE,C46NCBN,CTYPE,RIVERS from B_EFDC where  C46BSC is not null and CTYPE=:CTYPE and RIVERS=:RIVERS and ISMN=" + isn.ToString() + " and wd=" + wd;
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {

                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C46BSC"].ToString(), "efdcC46BSC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46TEMO"].ToString(), "efdcC46TEMO");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46HEQT"].ToString(), "efdcC46HEQT");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46ISBEDTEMI"].ToString(), "efdcC46ISBEDTEMI");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46KBH"].ToString(), "efdcC46KBH");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46RKDYE"].ToString(), "efdcC46RKDYE");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBS"].ToString(), "efdcC46NCBS");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBW"].ToString(), "efdcC46NCBW");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBE"].ToString(), "efdcC46NCBE");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBN"].ToString(), "efdcC46NCBN");
                                        sw.Write(strTemp);


                                    }
                                }
                            }
                            sw.Write("\r\n");
                        }

                        //清空缓冲区
                        sw.Flush();
                        //关闭流
                        sw.Close();
                        fs.Close();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }


        /// <summary>
        /// 王岩松  
        /// 2017年3月3日14:47:37 
        /// 说明： 河南省第一层次河流模拟
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="isn"></param>
        /// <param name="wd"></param>
        /// <param name="strTBEGIN"></param>
        /// <param name="strNTC"></param>模拟是0，预警是1，溯源2，流量3</param>
        public static void efdcMarkDBnew(string RName, string Ctype, string file, string path, string isn, string wd, ref string strTBEGIN, ref string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //
                    DataTable dtCustomerClassSM = new DataTable();
                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        while (!sr.EndOfStream)
                        {
                            string readStr = sr.ReadLine();//读取一行数据
                                                           //开始写入
                            sw.Write(readStr);
                            if (readStr.StartsWith("C7      NTC"))//去掉标题行
                            {
                                string readDate = sr.ReadLine();//读取一行数据
                                string strSql = "  select  IID,C7NTC,C7NTSPTC,C7NLTC,C7NTTC,C7NTCPP,C7NTSTBC,C7NTCNB,C7NTCVB,C7NTSMMT,C7NFLTMT,C7NDRYSTP,CTYPE,RIVERS from B_EFDC where  C7NTC is not null and CTYPE=:CTYPE and RIVERS=:RIVERS ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);
                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTC"].ToString(), "efdcC7NTC");
                                        strNTC = strTemp;
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSPTC"].ToString(), "efdcC7NTSPTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NLTC"].ToString(), "efdcC7NLTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTTC"].ToString(), "efdcC7NTTC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCPP"].ToString(), "efdcC7NTCPP");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSTBC"].ToString(), "efdcC7NTSTBC");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCNB"].ToString(), "efdcC7NTCNB");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTCVB"].ToString(), "efdcC7NTCVB");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NTSMMT"].ToString(), "efdcC7NTSMMT");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NFLTMT"].ToString(), "efdcC7NFLTMT");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C7NDRYSTP"].ToString(), "efdcC7NDRYSTP");
                                        sw.Write(strTemp);
                                    }
                                }
                            }
                            if (readStr.StartsWith("C8       TCON"))//去掉标题行
                            {
                                string readDate = sr.ReadLine();//读取一行数据
                                string strSql = "  select IID,C8TCON,C8TBEGIN,C8TREF,C8CORIOLIS,C8ISCORV,C8ISCCA,C8ISCFL,C8ISCFLM,C8DTSSFAC,C8DTSSDHDT,CTYPE,RIVERS from B_EFDC where  C8TCON is not null and CTYPE=:CTYPE and RIVERS=:RIVERS ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {
                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);
                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TCON"].ToString(), "efdcC8TCON");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TBEGIN"].ToString(), "efdcC8TBEGIN");

                                        strTBEGIN = strTemp;

                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8TREF"].ToString(), "efdcC8TREF");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8CORIOLIS"].ToString(), "efdcC8CORIOLIS");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCORV"].ToString(), "efdcC8ISCORV");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCCA"].ToString(), "efdcC8ISCCA");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCFL"].ToString(), "efdcC8ISCFL");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8ISCFLM"].ToString(), "efdcC8ISCFLM");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8DTSSFAC"].ToString(), "efdcC8DTSSFAC");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C8DTSSDHDT"].ToString(), "efdcC8DTSSDHDT");
                                        sw.Write(strTemp);
                                    }
                                }
                            }
                            if (readStr.StartsWith("C46    BSC"))//去掉标题行
                            {
                                string readDate = sr.ReadLine();//读取一行数据
                                string strSql = "  select IID,C46BSC,C46TEMO,C46HEQT,C46ISBEDTEMI,C46KBH,C46RKDYE,C46NCBS,C46NCBW,C46NCBE,C46NCBN,CTYPE,RIVERS from B_EFDC where  C46BSC is not null and CTYPE=:CTYPE and RIVERS=:RIVERS ";
                                using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                {

                                    dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                    dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                    DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                                    for (int i = 0; i < dt.Rows.Count; i++)
                                    {
                                        sw.Write("\r\n");
                                        string strTemp = HelpUntil.dserResult(dt.Rows[i]["C46BSC"].ToString(), "efdcC46BSC");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46TEMO"].ToString(), "efdcC46TEMO");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46HEQT"].ToString(), "efdcC46HEQT");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46ISBEDTEMI"].ToString(), "efdcC46ISBEDTEMI");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46KBH"].ToString(), "efdcC46KBH");
                                        sw.Write(strTemp);
                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46RKDYE"].ToString(), "efdcC46RKDYE");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBS"].ToString(), "efdcC46NCBS");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBW"].ToString(), "efdcC46NCBW");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBE"].ToString(), "efdcC46NCBE");
                                        sw.Write(strTemp);

                                        strTemp = HelpUntil.dserResult(dt.Rows[i]["C46NCBN"].ToString(), "efdcC46NCBN");
                                        sw.Write(strTemp);
                                    }
                                }
                            }
                            sw.Write("\r\n");
                        }

                        //清空缓冲区
                        sw.Flush();
                        //关闭流
                        sw.Close();
                        fs.Close();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }


        /// <summary>
        /// 生成dye文件
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        public static void dyeMarkDB(string RName, string Ctype, string file, string path, string wd)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //
                    DataTable dtCustomerClassSM = new DataTable();
                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }



                        sw.WriteLine(sr.ReadLine());


                        sw.WriteLine(sr.ReadLine());

                        sw.WriteLine(sr.ReadLine());

                        sw.WriteLine(sr.ReadLine());

                        sw.WriteLine(sr.ReadLine());



                        string strSql = "  select IID,Col1,Col2,CTYPE,RIVERS from B_dye where  CTYPE=:CTYPE and RIVERS=:RIVERS and wd=" + wd;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        {

                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {

                                string strTemp = string.Empty;
                                if (dt.Rows[i]["Col1"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dyeRnC1");
                                    sw.Write(strTemp);
                                }
                                if (dt.Rows[i]["Col2"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dt.Rows[i]["Col2"].ToString(), "dyeRnC2");
                                    sw.Write(strTemp);
                                }
                                sw.Write("\r\n");
                            }
                        }
                    }
                    //清空缓冲区
                    sw.Flush();
                    //关闭流
                    sw.Close();
                    fs.Close();

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }


        public static void dyeMarkDBnew(string RName, string Ctype, string file, string path, string wd)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                try
                {
                    //
                    DataTable dtCustomerClassSM = new DataTable();
                    Database dbbase = DataBaseHelper.CreateDataBase();
                    using (DbConnection dbconn = dbbase.CreateConnection())
                    {
                        if (dbconn.State == ConnectionState.Closed)
                        {
                            dbconn.Open();
                        }

                        sw.WriteLine(sr.ReadLine());
                        sw.WriteLine(sr.ReadLine());
                        sw.WriteLine(sr.ReadLine());
                        sw.WriteLine(sr.ReadLine());
                        sw.WriteLine(sr.ReadLine());

                        string strSql = "  select IID,Col1,Col2,CTYPE,RIVERS from B_dye where  CTYPE=:CTYPE and RIVERS=:RIVERS ";
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                        {

                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            DataTable dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {

                                string strTemp = string.Empty;
                                if (dt.Rows[i]["Col1"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dyeRnC1");
                                    sw.Write(strTemp);
                                }
                                if (dt.Rows[i]["Col2"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dt.Rows[i]["Col2"].ToString(), "dyeRnC2");
                                    sw.Write(strTemp);
                                }
                                sw.Write("\r\n");
                            }
                        }
                    }
                    //清空缓冲区
                    sw.Flush();
                    //关闭流
                    sw.Close();
                    fs.Close();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }


        /// <summary>
        /// 生成qser文件
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="isn">模拟是1，预警是0，溯源2，流量3</param>
        public static void qserMarkDB(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }

                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days = (strED - strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'" + icol.ToString() + ".00',";
                    //for (int i = 1; i < days; i++)
                    //{
                    //    if (icol + i <= 365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'" + icol.ToString() + ".00'";
                    //    strReal = strReal + stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,Col9,CTYPE,RIVERS from B_QSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS  order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";
                        // string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col10";
                        DataTable dtT = new DataTable();
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }
                        int Rcount = 0;
                        if (Rcount == 0)
                        {
                            strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";

                            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                            {
                                dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                            }
                        }
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "qserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "qserR1C2");
                            // strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "qserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "qserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "qserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "qserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "qserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "qserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "qserR1C8");
                            sw.Write(" " + strTemp);
                        }
                        if (dt.Rows[i]["Col9"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col9"].ToString(), "qserR1C9");
                            sw.Write("  " + strTemp);
                        }
                        sw.Write("\r\n");
                        // strTemp = HelpUntil.dserResult("1", "qserR2C1");
                        sw.Write(" 1 ");
                        sw.Write("\r\n");
                        //插入子表

                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "qserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col11"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col11"].ToString(), "qserRnC2");
                                //strTemp = dtT.Rows[j]["col11"].ToString();
                                sw.Write(" " + strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }


        /// <summary>
        /// wys
        /// 2017年3月3日14:54:27
        /// 说明：
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="wd"></param>
        /// <param name="isn"></param>
        /// <param name="strTB"></param>
        /// <param name="strNTC"></param>
        public static void qserMarkDBnew(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }

                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and  c7ntc is not null  ";
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }
                    } 
                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,Col9,CTYPE,RIVERS from B_QSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS  order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";
                        // string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col10";
                        DataTable dtT = new DataTable();
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);
                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];
                        }
                        int Rcount = 0;
                        if (Rcount == 0)
                        {
                            strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";

                            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                            {
                                dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                dtT = dbbase.ExecuteDataSet(cmd).Tables[0];
                            }
                        }
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "qserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "qserR1C2");
                            // strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "qserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "qserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "qserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "qserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "qserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "qserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "qserR1C8");
                            sw.Write(" " + strTemp);
                        }
                        if (dt.Rows[i]["Col9"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col9"].ToString(), "qserR1C9");
                            sw.Write("  " + strTemp);
                        }
                        sw.Write("\r\n");
                        // strTemp = HelpUntil.dserResult("1", "qserR2C1");
                        sw.Write(" 1 ");
                        sw.Write("\r\n");
                        //插入子表

                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {
                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "qserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col11"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col11"].ToString(), "qserRnC2");
                                //strTemp = dtT.Rows[j]["col11"].ToString();
                                sw.Write(" " + strTemp);
                            }
                            sw.Write("\r\n");
                        }
                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static void qserMarkDBLLTK(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }

                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days = (strED - strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'" + icol.ToString() + ".00',";
                    //for (int i = 1; i < days; i++)
                    //{
                    //    if (icol + i <= 365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'" + icol.ToString() + ".00'";
                    //    strReal = strReal + stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,Col9,CTYPE,RIVERS from B_QSERLLTK  where  CTYPE=:CTYPE and RIVERS=:RIVERS  order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strSqlT = " select col10, col11, numbatch from B_QSERLLTK  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";
                        // string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col10";
                        DataTable dtT = new DataTable();
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }
                        int Rcount = 0;
                        if (Rcount == 0)
                        {
                            strSqlT = " select col10, col11, numbatch from B_QSERLLTK  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";

                            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                            {
                                dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                            }
                        }
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "qserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "qserR1C2");
                            // strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "qserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "qserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "qserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "qserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "qserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "qserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "qserR1C8");
                            sw.Write(" " + strTemp);
                        }
                        if (dt.Rows[i]["Col9"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col9"].ToString(), "qserR1C9");
                            sw.Write("  " + strTemp);
                        }
                        sw.Write("\r\n");
                        // strTemp = HelpUntil.dserResult("1", "qserR2C1");
                        sw.Write(" 1 ");
                        sw.Write("\r\n");
                        //插入子表

                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "qserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col11"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col11"].ToString(), "qserRnC2");
                                //strTemp = dtT.Rows[j]["col11"].ToString();
                                sw.Write(" " + strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public static void qser2MarkDB(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }

                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days = (strED - strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'" + icol.ToString() + ".00',";
                    //for (int i = 1; i < days; i++)
                    //{
                    //    if (icol + i <= 365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'" + icol.ToString() + ".00'";
                    //    strReal = strReal + stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,Col9,CTYPE,RIVERS from B_QSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS  order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strSqlT = " select col10, col11, numbatch from B_QSER2  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";
                        // string strSqlT = " select col10, col11, numbatch from B_QSER  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col10";
                        DataTable dtT = new DataTable();
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }
                        int Rcount = 0;
                        if (Rcount == 0)
                        {
                            strSqlT = " select col10, col11, numbatch from B_QSER2  where   CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col10)";

                            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                            {
                                dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                            }
                        }
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "qserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "qserR1C2");
                            // strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "qserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "qserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "qserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "qserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "qserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "qserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "qserR1C8");
                            sw.Write(" " + strTemp);
                        }
                        if (dt.Rows[i]["Col9"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col9"].ToString(), "qserR1C9");
                            sw.Write("  " + strTemp);
                        }
                        sw.Write("\r\n");
                        // strTemp = HelpUntil.dserResult("1", "qserR2C1");
                        sw.Write(" 1 ");
                        sw.Write("\r\n");
                        //插入子表

                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "qserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col11"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col11"].ToString(), "qserRnC2");
                                //strTemp = dtT.Rows[j]["col11"].ToString();
                                sw.Write(" " + strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public static void dxdyMarkDB(string RName, string Ctype, string file, string path, string wd)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }


                    string strSql = "  select IID,I,J,DX,DY,DEPTH,ELEV,ZROUGH,TYPE,CTYPE,RIVERS from B_dxdy  where  CTYPE=:CTYPE and RIVERS=:RIVERS and wd=" + wd + " order by IID";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strTemp = string.Empty;
                        if (dt.Rows[i]["I"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["I"].ToString(), "dxdyRnC1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["J"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["J"].ToString(), "dxdyRnC2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DX"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DX"].ToString(), "dxdyRnC3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DY"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DY"].ToString(), "dxdyRnC4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DEPTH"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DEPTH"].ToString(), "dxdyRnC5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["ELEV"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["ELEV"].ToString(), "dxdyRnC6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["ZROUGH"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["ZROUGH"].ToString(), "dxdyRnC7");
                            sw.Write(strTemp);
                        }



                        sw.Write("\r\n");



                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public static void dxdyMarkDBnew(string RName, string Ctype, string file, string path, string wd)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();
                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }


                    string strSql = "  select IID,I,J,DX,DY,DEPTH,ELEV,ZROUGH,TYPE,CTYPE,RIVERS from B_dxdy  where  CTYPE=:CTYPE and RIVERS=:RIVERS   order by IID";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        string strTemp = string.Empty;
                        if (dt.Rows[i]["I"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["I"].ToString(), "dxdyRnC1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["J"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["J"].ToString(), "dxdyRnC2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DX"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DX"].ToString(), "dxdyRnC3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DY"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DY"].ToString(), "dxdyRnC4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["DEPTH"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["DEPTH"].ToString(), "dxdyRnC5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["ELEV"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["ELEV"].ToString(), "dxdyRnC6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["ZROUGH"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["ZROUGH"].ToString(), "dxdyRnC7");
                            sw.Write(strTemp);
                        }
                        sw.Write("\r\n");
                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file">模板文件</param>
        /// <param name="path">生成的文件</param>
        /// <param name="wd"></param>
        /// <param name="isn">模拟是1，预警是0，溯源2，流量3</param>
        public static void dserMarkDB(string RName, string Ctype, string file, string path, string wd, string isn, string strTB,  string strNTC)
        {

            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();



                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }
                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days=(strED-strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'"+icol.ToString()+ ".00',";
                    //for (int i = 1; i < days;i++)
                    //{
                    //    if(icol + i<=365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'"+icol.ToString() + ".00'";
                    //    strReal = strReal+stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";

                        //string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col9";
                        DataTable dtT = new DataTable();
                        int Rcount = 0;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }


                        //if (Rcount == 0)
                        //{
                        //     strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col9)";


                        //    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        //    {
                        //        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        //        dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        //    }
                        //}
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "dserR1C2");
                            //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "dserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "dserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "dserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "dserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "dserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "dserR1C8");
                            sw.Write("  " + strTemp);
                        }

                        sw.Write("\r\n");
                        strTemp = HelpUntil.dserResult("1.0", "dserR2C1");
                        sw.Write(strTemp);
                        sw.Write("\r\n");
                        //插入子表
                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col9"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col9"].ToString(), "dserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "dserRnC2");
                                //strTemp = dtT.Rows[j]["col10"].ToString();
                                sw.Write(strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }



        }

        /// <summary>
        /// wys 
        /// 2017年3月3日14:50:47  
        /// 说明： dser 文件生成
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="wd"></param>
        /// <param name="isn"></param>
        /// <param name="strTB"></param>
        /// <param name="strNTC"></param>

        public static void dserMarkDBnew(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {

            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();

                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }
                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and  c7ntc is not null ";
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }
                    } 
                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";
                        DataTable dtT = new DataTable();
                        int Rcount = 0;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);
                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];
                        }

                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "dserR1C2");
                            //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "dserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "dserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "dserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "dserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "dserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "dserR1C8");
                            sw.Write("  " + strTemp);
                        }

                        sw.Write("\r\n");
                        strTemp = HelpUntil.dserResult("1.0", "dserR2C1");
                        sw.Write(strTemp);
                        sw.Write("\r\n");
                        //插入子表
                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {
                            
                            if (dtT.Rows[j]["col9"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col9"].ToString(), "dserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "dserRnC2");
                                sw.Write(strTemp);
                            }
                            sw.Write("\r\n");
                        }
                    }
                }
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static void dserMarkDBLLKZ(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {

            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();



                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }
                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days=(strED-strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'"+icol.ToString()+ ".00',";
                    //for (int i = 1; i < days;i++)
                    //{
                    //    if(icol + i<=365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'"+icol.ToString() + ".00'";
                    //    strReal = strReal+stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSERLLTK  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string strSqlT = " select col9, col10, numbatch from B_dSERLLTK  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";

                        //string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col9";
                        DataTable dtT = new DataTable();
                        int Rcount = 0;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }


                        //if (Rcount == 0)
                        //{
                        //     strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col9)";


                        //    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        //    {
                        //        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        //        dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        //    }
                        //}
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "dserR1C2");
                            //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "dserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "dserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "dserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "dserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "dserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "dserR1C8");
                            sw.Write("  " + strTemp);
                        }

                        sw.Write("\r\n");
                        strTemp = HelpUntil.dserResult("1.0", "dserR2C1");
                        sw.Write(strTemp);
                        sw.Write("\r\n");
                        //插入子表
                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col9"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col9"].ToString(), "dserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "dserRnC2");
                                //strTemp = dtT.Rows[j]["col10"].ToString();
                                sw.Write(strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }



        }


        public static void dser2MarkDB(string RName, string Ctype, string file, string path, string wd, string isn, string strTB, string strNTC)
        {

            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();



                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }
                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days=(strED-strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'"+icol.ToString()+ ".00',";
                    //for (int i = 1; i < days;i++)
                    //{
                    //    if(icol + i<=365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'"+icol.ToString() + ".00'";
                    //    strReal = strReal+stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);

                    string strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string strSqlT = " select col9, col10, numbatch from B_dSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";

                        //string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col9";
                        DataTable dtT = new DataTable();
                        int Rcount = 0;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }


                        //if (Rcount == 0)
                        //{
                        //     strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col9)";


                        //    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        //    {
                        //        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        //        dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        //    }
                        //}
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(Rcount.ToString(), "dserR1C2");
                            //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "dserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "dserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "dserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "dserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "dserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "dserR1C8");
                            sw.Write("  " + strTemp);
                        }

                        sw.Write("\r\n");
                        strTemp = HelpUntil.dserResult("1.0", "dserR2C1");
                        sw.Write(strTemp);
                        sw.Write("\r\n");
                        //插入子表
                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        for (int j = 0; j < dtT.Rows.Count; j++)
                        {


                            if (dtT.Rows[j]["col9"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col9"].ToString(), "dserRnC1");
                                sw.Write(strTemp);
                            }
                            if (dtT.Rows[j]["col10"].ToString() != "")
                            {
                                strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "dserRnC2");
                                //strTemp = dtT.Rows[j]["col10"].ToString();
                                sw.Write(strTemp);
                            }
                            sw.Write("\r\n");
                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }



        }

        /// <summary>
        /// 溯源分析得到dser
        /// </summary>
        /// <param name="RName"></param>
        /// <param name="Ctype"></param>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <param name="wd"></param>
        /// <param name="isn"></param>
        /// <param name="cfile"></param>
        public static void dserMarkSYDB(string RName, string Ctype, string file, string path, string wd, string isn, string cfile,string strTB,string strNTC)
        {

            FileStream fs = new FileStream(path, FileMode.Create);
            StreamWriter sw = new StreamWriter(fs);
            using (StreamReader sr = new StreamReader(file, Encoding.Default))
            {



                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());

                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
                sw.WriteLine(sr.ReadLine());
            }
            try
            {
                //
                DataTable dtCustomerClassSM = new DataTable();
                Database dbbase = DataBaseHelper.CreateDataBase();



                using (DbConnection dbconn = dbbase.CreateConnection())
                {
                    if (dbconn.State == ConnectionState.Closed)
                    {
                        dbconn.Open();
                    }
                    string strTemp1 = "select c7ntc from B_EFDC where CTYPE='" + Ctype + "' and RIVERS='" + RName + "' and wd='" + wd + "' and c7ntc is not null and ISMN=" + isn.ToString();
                    string Time = "1";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strTemp1))
                    {
                        //dbbase.AddInParameter(cmd, "wd", DbType.String, wd);

                        //dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        //dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        var obj = dbbase.ExecuteScalar(cmd);
                        if (obj != null)
                        {
                            Time = obj.ToString();
                        }

                    }
                    //DateTime strST = System.DateTime.Today.AddYears(-1);
                    //DateTime strED = System.DateTime.Today.AddDays(double.Parse(Time)).AddYears(-1);

                    //double days=(strED-strST).TotalDays;
                    //int icol = strST.DayOfYear;
                    //string strReal = "'"+icol.ToString()+ ".00',";
                    //for (int i = 1; i < days;i++)
                    //{
                    //    if(icol + i<=365)
                    //    {
                    //        icol = icol + 1;
                    //    }
                    //    else
                    //    {
                    //        icol = 0;
                    //    }
                    //    string stricol = "'"+icol.ToString() + ".00'";
                    //    strReal = strReal+stricol + ",";
                    //}
                    //strReal = strReal.Substring(0, strReal.Length - 1);
                    string strSql = " ";
                    if (wd == "1")
                    {
                        strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    }
                    else
                    {
                        strSql = "  select distinct numbatch, Col1,iRcount,Col3,Col4,Col5,Col6,Col7,Col8,CTYPE,RIVERS from B_dSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS order by numbatch";
                    }
                    DataTable dt = new DataTable();
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {

                        dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                        dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                        dt = dbbase.ExecuteDataSet(cmd).Tables[0];
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string strSqlT = "";
                        if (wd == "1")
                        {
                            strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";
                        }
                        else
                        {
                            strSqlT = " select col9, col10, numbatch from B_dSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by  to_number(col9)";
                        }
                        //string strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by col9";
                        DataTable dtT = new DataTable();
                        int Rcount = 0;
                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                        {
                            dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                            dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                            dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                        }


                        if (Rcount == 0)
                        {
                            if (wd == "1")
                            {
                                strSqlT = " select col9, col10, numbatch from B_dSER  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col9)";
                            }
                            else
                            {
                                strSqlT = " select col9, col10, numbatch from B_dSER2  where  CTYPE=:CTYPE and RIVERS=:RIVERS and numbatch=" + dt.Rows[i]["numbatch"].ToString() + " order by to_number(col9)";
                            }

                            using (DbCommand cmd = dbbase.GetSqlStringCommand(strSqlT))
                            {
                                dbbase.AddInParameter(cmd, "CTYPE", DbType.String, Ctype);
                                dbbase.AddInParameter(cmd, "RIVERS", DbType.String, RName);

                                dtT = dbbase.ExecuteDataSet(cmd).Tables[0];

                            }
                        }
                        Rcount = dtT.Rows.Count;
                        string strTemp = string.Empty;
                        if (dt.Rows[i]["Col1"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col1"].ToString(), "dserR1C1");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["iRcount"].ToString() != "")
                        {
                            if (dt.Rows[i]["col8"].ToString().Trim().ToLower() == cfile.Trim().ToLower())
                            {
                                strTemp = HelpUntil.dserResult(Rcount.ToString(), "dserR1C2");
                                //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                                sw.Write(strTemp);
                            }
                            else
                            {
                                strTemp = HelpUntil.dserResult("2", "dserR1C2");
                                //  strTemp = HelpUntil.dserResult(dt.Rows[i]["iRcount"].ToString(), "dserR1C2");
                                sw.Write(strTemp);
                            }
                        }
                        if (dt.Rows[i]["Col3"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col3"].ToString(), "dserR1C3");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col4"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col4"].ToString(), "dserR1C4");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col5"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col5"].ToString(), "dserR1C5");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col6"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col6"].ToString(), "dserR1C6");
                            sw.Write(strTemp);
                        }
                        if (dt.Rows[i]["Col7"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col7"].ToString(), "dserR1C7");
                            sw.Write(strTemp);
                        }

                        if (dt.Rows[i]["Col8"].ToString() != "")
                        {
                            strTemp = HelpUntil.dserResult(dt.Rows[i]["Col8"].ToString(), "dserR1C8");
                            sw.Write("  " + strTemp);
                        }

                        sw.Write("\r\n");
                        strTemp = HelpUntil.dserResult("1.0", "dserR2C1");
                        sw.Write(strTemp);
                        sw.Write("\r\n");
                        //插入子表
                        if (dtT.Rows.Count == 0)
                        {
                            sw.Write("\r\n");
                        }
                        if (dt.Rows[i]["col8"].ToString().Trim().ToLower() == cfile.Trim().ToLower())
                        {
                            for (int j = 0; j < dtT.Rows.Count; j++)
                            {


                                if (dtT.Rows[j]["col9"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dtT.Rows[j]["col9"].ToString(), "dserRnC1");
                                    sw.Write(strTemp);
                                }
                                if (dtT.Rows[j]["col10"].ToString() != "")
                                {
                                    strTemp = HelpUntil.dserResult(dtT.Rows[j]["col10"].ToString(), "dserRnC2");
                                    //strTemp = dtT.Rows[j]["col10"].ToString();
                                    sw.Write(strTemp);
                                }
                                sw.Write("\r\n");
                            }
                        }
                        else
                        {
                            //-31.00     0.000
                            //    364.00     0.000
                            strTemp = HelpUntil.dserResult("-31.00", "dserRnC1");
                            sw.Write(strTemp);
                            strTemp = HelpUntil.dserResult("0.000", "dserRnC2");
                            sw.Write(strTemp);
                            sw.Write("\r\n");
                            strTemp = HelpUntil.dserResult("364.00", "dserRnC1");
                            sw.Write(strTemp);
                            strTemp = HelpUntil.dserResult("0.000", "dserRnC2");
                            sw.Write(strTemp);

                            sw.Write("\r\n");

                        }


                        //sw.Write("\r\n");

                    }
                }
                // sw.Write("\r\n");
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();

            }
            catch (Exception ex)
            {
                throw ex;
            }



        }
    }
}

