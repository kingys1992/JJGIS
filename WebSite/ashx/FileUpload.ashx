<%@ WebHandler Language="C#" Class="FileUpload" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using EntApp.Common;
using System.IO;
using EntApp.Common.Extension;
using Newtonsoft;
using Newtonsoft.Json;
using System.Web.SessionState;
using JNJC.BLL;
using JNJC.Model.YNQGL;
using JNJC.Utility;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using JNJC.Utility.Help;
using JNJC.Utility.DataClass;

/// <summary>
///     Upload 的摘要说明
/// </summary>
public class FileUpload : IHttpHandler, IRequiresSessionState
{
    HttpRequest _request;
    HttpResponse _response;
    HttpServerUtility _server;
    FileHelper _fileHelper = new FileHelper();
    private string _tokenPath = "../upload/tokens/";            //令牌保存目录
    private string _filePath = "../upload/files/";              //上传文件保存目录
    private int i = 0;

    public void ProcessRequest(HttpContext context)
    {

        _request = context.Request;
        _response = context.Response;
        _server = context.Server;

        string method = Convert.ToString(_request["Method"]);
        string strName = Convert.ToString(_request["name"]);//文件名
        string RTYPE = Convert.ToString(_request["RTYPE"]);//判断哪个业务调用的上传文件

        //获得到GUID ，，用于存储文件关联
        HttpCookie cookie = HttpContext.Current.Request.Cookies["FILEGUID"];
        if (cookie != null && i == 0)
        {

            //string strUrl = DateTime.Now.ToString("yyyy-MM-dd");
            //if (!System.IO.Directory.Exists(@"D:\省节能平台\省节能平台\10-编码测试\04-.NETPROJECT\JNJC_Solution\WebSite\upload\files\" + strUrl + ""))
            //{
            //    System.IO.Directory.CreateDirectory(@"D:\省节能平台\省节能平台\10-编码测试\04-.NETPROJECT\JNJC_Solution\WebSite\upload\files\" + strUrl + "");//不存在就创建文件夹
            //}

            //虚拟机服务器上     网站对应上处文件夹的位置==物理
            string strUrl = DateTime.Now.ToString("yyyy-MM-dd");
            if (!System.IO.Directory.Exists(@"D:\WebSiteIIS8001\JNJCWebsite\upload\files\" + strUrl + ""))
            {
                System.IO.Directory.CreateDirectory(@"D:\WebSiteIIS8001\JNJCWebsite\upload\files\" + strUrl + "");//不存在就创建文件夹
            }

            //string _uploadUrl = "http://192.168.14.32/JnWebSite/upload/files/" + strUrl + "/";
            string _uploadUrl = "http://123.160.220.47:5001/YNJYGL/upload/files/" + strUrl + "/";
            string FILEGUIDs = HttpContext.Current.Request.Cookies["FILEGUID"].Value;

            if (RTYPE == "YC")
            {
                /*有偿交易规则2017年6月27日19:23:54 王岩松*/
                /*交易规则2017年6月27日19:23:54 王岩松*/
                YCEdit(FILEGUIDs, strName, _uploadUrl);
            }
            else if (RTYPE == "JY")
            {
                /*交易规则2017年6月27日19:23:54 王岩松*/
                JYEdit(FILEGUIDs, strName, _uploadUrl);
               }
            else if (RTYPE == "JZ" || RTYPE == "JP")
            {
                /* 行业基准法文件上传 2017年6月28日15:01:42 王岩松*/
                JZEdit(FILEGUIDs, strName, _uploadUrl);
            }else if (RTYPE == "YN")
            {
                /* 行业基准法文件上传 2017年6月28日15:01:42 王岩松*/
                YNEdit(FILEGUIDs, strName, _uploadUrl);
            }
            else if (RTYPE == "OA")
            {
                /* 行业基准法文件上传 2017年6月28日15:01:42 王岩松*/
                OAEdit(FILEGUIDs, strName, _uploadUrl);
            }
            else if (RTYPE == "JYGL")
            {
                /* 行业基准法文件上传 2017年6月28日15:01:42 王岩松*/
                JYGLEdit(FILEGUIDs, strName, _uploadUrl);
            }
            i++;
        }

        MethodInfo methodInfo = GetType().GetMethod(method);
        methodInfo.Invoke(this, null);
    }

    public void upload()
    {

        //string strUrl = DateTime.Now.ToString("yyyy-MM-dd");
        //if (!System.IO.Directory.Exists(@"D:\省节能平台\省节能平台\10-编码测试\04-.NETPROJECT\JNJC_Solution\WebSite\upload\files\" + strUrl + ""))
        //{
        //    System.IO.Directory.CreateDirectory(@"D:\省节能平台\省节能平台\10-编码测试\04-.NETPROJECT\JNJC_Solution\WebSite\upload\files\" + strUrl + "");//不存在就创建文件夹
        //}

        //虚拟机服务器上     网站对应上处文件夹的位置==物理
        string strUrl = DateTime.Now.ToString("yyyy-MM-dd");
        if (!System.IO.Directory.Exists(@"D:\WebSiteIIS8001\JNJCWebsite\upload\files\" + strUrl + ""))
        {
            System.IO.Directory.CreateDirectory(@"D:\WebSiteIIS8001\JNJCWebsite\upload\files\" + strUrl + "");//不存在就创建文件夹
        }

        string token = _request.QueryString["token"];
        UploadToken uploadToken = GetTokenInfo(token);

        if (uploadToken != null && uploadToken.size > uploadToken.upsize)
        {
            Stream stream = _request.InputStream;
            if (stream != null && stream.Length > 0)
            {
                _fileHelper.FileName = uploadToken.name;
                _fileHelper.FilePath = _server.MapPath(_filePath + strUrl + "/");
                _fileHelper.WriteFile(stream);

                uploadToken.upsize += stream.Length;
                if (uploadToken.size > uploadToken.upsize)
                {
                    SetTokenInfo(token, uploadToken);
                }
                else
                {
                    //上传完成后删除令牌信息
                    DelTokenInfo(token);
                }
            }
        }
        UploadResult ur = new UploadResult();
        ur.message = "";
        ur.start = uploadToken.upsize;
        ur.success = true;

        string result = JsonHelper.SerializeObject(ur);
        _response.Write(result);
    }

    /// <summary>
    /// 获取令牌
    /// </summary>
    public void tk()
    {
        UploadToken uploadToken = new UploadToken();

        string name = _request.QueryString["name"];
        string size = _request.QueryString["size"];
        string ext = name.Substring(name.LastIndexOf('.'));
        string token = SimpleEncryptor.MD5(name + size);
        uploadToken.name = name;
        uploadToken.size = size.ToInt(0);
        uploadToken.token = token;

        if (!File.Exists(_server.MapPath(_tokenPath + token + ".token")))
        {
            string modified = _request.QueryString["modified"];

            uploadToken.filePath = "";
            uploadToken.modified = modified;

            SetTokenInfo(token, uploadToken);
        }

        TokenResult tokenResult = new TokenResult();
        tokenResult.message = "";
        tokenResult.token = token;
        tokenResult.success = true;

        string result = JsonHelper.SerializeObject(tokenResult); ;

        _response.Write(result);
    }

    private void SetTokenInfo(string token, UploadToken uploadToken)
    {
        _fileHelper.FileName = token + ".token";
        _fileHelper.FilePath = _server.MapPath(_tokenPath);
        _fileHelper.WriteFile(JsonHelper.SerializeObject(uploadToken));
    }

    private UploadToken GetTokenInfo(string token)
    {
        string tokenPath = _tokenPath + token + ".token";
        if (File.Exists(_server.MapPath(tokenPath)))
        {
            _fileHelper.FileName = token + ".token";
            _fileHelper.FilePath = _server.MapPath(_tokenPath);
            UploadToken uploadToken = JsonHelper.DeserializeJsonToObject<UploadToken>(_fileHelper.ReadFile());

            return uploadToken;
        }

        return null;
    }

    private void DelTokenInfo(string token)
    {
        string tokenPath = _tokenPath + token + ".token";
        if (File.Exists(_server.MapPath(tokenPath)))
        {
            _fileHelper.FileName = token + ".token";
            _fileHelper.FilePath = _server.MapPath(_tokenPath);
            _fileHelper.DeleteFile();
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }



    #region 修改交易规则信息------根据规则 ，，filegurd   修改文件
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <param name="GZ">规则说明</param>
    /// <param name="SJ">执行日期</param>
    /// <param name="WJ">附件名称:abc.doc</param>
    /// <param name="WJLJ">附件路径</param>
    /// <returns></returns>
    public string JYEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   T_ENERGY_DEALRULE    set DRFILE=:DRFILE, DRFILEPATH=:DRFILEPATH
                            where FILEGUID=:FILEGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "DRFILE", DbType.String, name);
                        dbbase.AddInParameter(cmd, "DRFILEPATH", DbType.String, url);
                        dbbase.AddInParameter(cmd, "FILEGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权交易规则-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion
    #region 修改有偿交易规则信息------根据规则 ，，filegurd   修改文件
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <param name="GZ">规则说明</param>
    /// <param name="SJ">执行日期</param>
    /// <param name="WJ">附件名称:abc.doc</param>
    /// <param name="WJLJ">附件路径</param>
    /// <returns></returns>
    public string YCEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   T_ENERGY_TRADERULE   set TRFILE=:TRFILE, TRFILEPATH=:TRFILEPATH
                            where FILEGUID=:FILEGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "TRFILE", DbType.String, name);
                        dbbase.AddInParameter(cmd, "TRFILEPATH", DbType.String, url);
                        dbbase.AddInParameter(cmd, "FILEGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权有偿交易规则-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion

    #region 修改交易规则信息------根据规则 ，，filegurd   修改文件
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <param name="GZ">规则说明</param>
    /// <param name="SJ">执行日期</param>
    /// <param name="WJ">附件名称:abc.doc</param>
    /// <param name="WJLJ">附件路径</param>
    /// <returns></returns>
    public string JZEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   T_ENERGY_BASERULE   set BRFILE=:BRFILE, BRFILEPATH=:BRFILEPATH
                            where FILEGUID=:FILEGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "BRFILE", DbType.String, name);
                        dbbase.AddInParameter(cmd, "BRFILEPATH", DbType.String, url);
                        dbbase.AddInParameter(cmd, "FILEGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权初始规则-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion

    #region 修改交易规则信息------根据规则 ，，filegurd   修改文件
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <param name="GZ">规则说明</param>
    /// <param name="SJ">执行日期</param>
    /// <param name="WJ">附件名称:abc.doc</param>
    /// <param name="WJLJ">附件路径</param>
    /// <returns></returns>
    public string YNEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   T_ENERGY_PURCHASE  set PFILE=:PFILE, PFILEPATH=:PFILEPATH
                            where FILEGUID=:FILEGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "PFILE", DbType.String, name);
                        dbbase.AddInParameter(cmd, "PFILEPATH", DbType.String, url);
                        dbbase.AddInParameter(cmd, "FILEGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权有偿使用-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion


    #region 修改交易规则信息------根据规则 ，，filegurd   修改文件
    /// <summary>
    /// 添加交易规则信息
    /// </summary>
    /// <param name="GZ">规则说明</param>
    /// <param name="SJ">执行日期</param>
    /// <param name="WJ">附件名称:abc.doc</param>
    /// <param name="WJLJ">附件路径</param>
    /// <returns></returns>
    public string OAEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.mirs);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   OA_SYSTEM  set OAFILE=:OAFILE, OAFILEPATH=:OAFILEPATH
                            where FILEGUID=:FILEGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "OAFILE", DbType.String, name);
                        dbbase.AddInParameter(cmd, "OAFILEPATH", DbType.String, url);
                        dbbase.AddInParameter(cmd, "FILEGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("用能权有偿使用-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion
    #region 修改交易管理附件信息------ ，，filegurd   修改文件
    /// <summary>
    /// 添加交易管理附件信息
    /// </summary>

    /// <returns></returns>
    public string JYGLEdit(string guid, string name, string url)

    {

        Database dbbase = DataBaseHelper.CreateDataBase(DataBaseHelper.typedb.zlyjgisdb);
        using (DbConnection dbconn = dbbase.CreateConnection())
        using (DbConnection conn = dbbase.CreateConnection())
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            using (DbTransaction tran = conn.BeginTransaction())
            {
                try
                {

                    //*********添加信息 -----****************//
                    string strSql = @"update   T_TRANSACTION_MANAGEMENT  set TMENCLOSURENAME=:TMENCLOSURENAME, TMENCLOSUREPATHFILE=:TMENCLOSUREPATHFILE
                            where TMGUID=:TMGUID ";
                    using (DbCommand cmd = dbbase.GetSqlStringCommand(strSql))
                    {
                        dbbase.AddInParameter(cmd, "TMENCLOSURENAME", DbType.String, name);
                        dbbase.AddInParameter(cmd, "TMENCLOSUREPATHFILE", DbType.String, url);
                        dbbase.AddInParameter(cmd, "TMGUID", DbType.String, guid);
                        dbbase.ExecuteNonQuery(cmd, tran);
                    }
                    tran.Commit();
                    return "";

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    JNJC.Utility.Help.HelpUtils.ErrorLog("交易管理附件-增加信息！ ||" + ex.ToString());
                    return "";
                }
            }
        }
    }
    #endregion

}