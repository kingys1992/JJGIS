using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace InOutModel
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "文本文档|*.inp";
            ofd.ShowDialog();

            //如果用户没有选择文件并确定则直接返回
            if (ofd.FileName =="")
            {
                return;
            }
            //获得文件名包括路径
            string fileName = ofd.FileName;

            try
            {
                //定义一个开始时间
                DateTime startTime = DateTime.Now;
                //因为文件比较大，所有使用StreamReader的效率要比使用File.ReadLines高
                using (StreamReader sr = new StreamReader(fileName, Encoding.Default))
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
                            //得到记录数
                            int RowCount = 0;
                            while (!sr.EndOfStream)
                            {

                                string readStr = sr.ReadLine();//读取一行数据
                                if (readStr.StartsWith("          1"))//去掉标题行
                                {
                                    //合并空格
                                    readStr = Regex.Replace(readStr, @"\s+", " ");
                                    // string[] strs = readStr.Split(new char[] { '\t' }, StringSplitOptions.RemoveEmptyEntries);//将读取的字符串按"制表符/t“和””“分割成数组
                                    string[] strs = readStr.Split(' ');
                                   
                                    string startNum = strs[0];
                                    string numArea = strs[1];
                                    //得到行数
                                    RowCount  = int.Parse(strs[2]);

                                }
                                if (readStr.StartsWith("  1.0"))//去掉标题行
                                {
                                    //string[] strs = readStr.Split(' ');
                                    for (int i = 0; i < RowCount; i++)
                                    {
                                        string readDate = sr.ReadLine();//读取一行数据
                                                                        //合并空格
                                        readDate = Regex.Replace(readDate, @"\s+", " ");
                                        string[] strTemp = readDate.Split(' ');


                                        
                                        string strSql = " insert into B_dser(IID,Col1,iRcount,BRESULT) values ((select (decode(max(IID), null, 0, max(IID))) + 1  from B_dser),"
                                                   + ":Col1,:iRcount)";

                                        using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                                        {
                                            dbbase.AddInParameter(cmd, "Col1", DbType.String,"XXX");
                                            dbbase.AddInParameter(cmd, "iRcount", DbType.String, "XXX");
                                            dbbase.ExecuteNonQuery(cmd);
                                        }
                                    }

                                }
                            }

                        }

                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }



                //结束时间-开始时间=总共花费的时间
                TimeSpan ts = DateTime.Now - startTime;
                MessageBox.Show("导入数据成功！共花费时间:" + ts.ToString());

            }

            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        private void button2_Click(object sender, EventArgs e)
        {
           string strTemp= HelpUntil.dserResult("1", "dserR1C1");
           strTemp = HelpUntil.dserResult("12", "dserR1C1");

        }
    }
}
