using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Supper 的摘要说明
/// </summary>
public class Supper
{
    public Supper()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }
    /// <summary>
    /// 在线用户
    /// </summary>
    public class OnlineUser
    {
        public string LoginName { get; set; }//登录名
        public DateTime ActiveTime { get; set; }//活跃时间
        public string IP { get; set; }//IP地址
        /// <summary>
        /// 用户主键
        /// </summary>
        public string PMAN_ID { get; set; }        //用户主键ID
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string USER_NAME { get; set; }// 
        /// <summary>
        /// 用户账号
        /// </summary>
        public string CUSERNAME { get; set; }//

    }
    /// <summary>
    /// 在线用户Manager
    /// </summary>
    public static class UserOnlineManager
    {
        //private static readonly string CACHE_KEY = "ONLINE_USER_LIST";
        //private static readonly int ALLOW_ACTIVE_SPAN = 1;//间隔1分钟
        static readonly List<OnlineUser> OnlineUser = new List<OnlineUser>();

        //获取在线用户列表
        public static List<OnlineUser> GetList()
        {

            return UserOnlineManager.OnlineUser;
        }

        /// <summary>
        /// 获取在线活动用户列表
        /// </summary>
        /// <returns></returns>
        public static List<OnlineUser> GetActiveUserList()
        {
            List<OnlineUser> list = GetList();
            var onlineList = from t in list where IsActive(t.LoginName) select t;
            return onlineList.ToList();
        }

        // 将一个用户加入到在线用户列表，如果已存在则更新活跃时间
        public static void SetActive(string loginName, string PMAN_ID, string USER_NAME)
        {

            var list = GetList();


            lock (list)
            {
                var isInList = list.Exists(u => u.LoginName == loginName);
                if (isInList == true)
                {
                    var user = list.Find(u => u.LoginName == loginName);
                    user.ActiveTime = DateTime.Now;
                    user.IP = GetUserIP();
                    user.CUSERNAME = loginName;


                }
                else
                {
                    list.Add(new OnlineUser { CUSERNAME = loginName, PMAN_ID = PMAN_ID, USER_NAME = USER_NAME, LoginName = loginName, ActiveTime = DateTime.Now, IP = GetUserIP() });
                }
            }
        }
        //判断用户是否在线 误差ALLOW_ACTIVE_SPAN
        public static bool IsActive(string loginName)
        {
            //开发阶段，可以多次登陆
            return false;
            //if (SysConfig.GetValue("01002").ToLower() == "true")
            //{
            //    return false;
            //}
            //var list = GetList();
            //lock (list)
            //{
            //    var isInList = list.Exists(u => u.LoginName == loginName);
            //    if (isInList == true)
            //    {
            //        var activeTime = list.Find(u => u.LoginName == loginName).ActiveTime;
            //        var span = DateTime.Now - activeTime;
            //        if (span > new TimeSpan(0, ALLOW_ACTIVE_SPAN, 0))
            //            return false;
            //        else
            //            return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
        }
        //设置离线
        public static void OffLine(string loginName)
        {
            var list = GetList();
            lock (list)
            {
                list.RemoveAll(u => u.LoginName == loginName);
            }
        }
        //设置所有都离线
        public static void OffLineAll()
        {
            var list = GetList();
            lock (list)
            {
                list.Clear();
            }
        }
        //获取当前在线用户
        public static OnlineUser GetUserOnline(string loginName)
        {
            var list = GetList();
            return list.Find(u => u.LoginName == loginName);
        }
        //获取在线用户数量
        public static Int32 GetOnlineUserNum()
        {
            var list = GetList();
            var activeList = from t in list where IsActive(t.LoginName) select t; // jcl changed
            return activeList.Count();
        }
        //获取用户IP
        private static string GetUserIP()
        {
            var request = HttpContext.Current.Request;
            string userIP;
            if (request.ServerVariables["HTTP_VIA"] == null)
            {
                userIP = request.UserHostAddress;
            }
            else
            {
                userIP = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
            return userIP;
        }
    }
}