using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model
{
    //用户表
    public class PUB_USER
    {

        /// <summary>
        /// 用户主键
        /// </summary>		
        private decimal _user_id;
        public decimal USER_ID
        {
            get { return _user_id; }
            set { _user_id = value; }
        }
        /// <summary>
        /// 部门主键 wys 
        /// </summary>		
        private decimal _dept_id;
        public decimal DEPT_ID
        {
            get { return _dept_id; }
            set { _dept_id = value; }
        }
        /// <summary>
        /// 用户名称
        /// </summary>		
        private string _user_name;
        public string USER_NAME
        {
            get { return _user_name; }
            set { _user_name = value; }
        }
        /// <summary>
        /// 密码
        /// </summary>		
        private string _password;
        public string PASSWORD
        {
            get { return _password; }
            set { _password = value; }
        }
        /// <summary>
        /// 1：可用,0：不可用
        /// </summary>		
        private decimal _is_available;
        public decimal IS_AVAILABLE
        {
            get { return _is_available; }
            set { _is_available = value; }
        }
        /// <summary>
        /// 备注
        /// </summary>		
        private string _memo;
        public string MEMO
        {
            get { return _memo; }
            set { _memo = value; }
        }
        /// <summary>
        /// 建立日期
        /// </summary>		
        private DateTime _createdate;
        public DateTime CREATEDATE
        {
            get { return _createdate; }
            set { _createdate = value; }
        }
        /// <summary>
        /// 停用日期
        /// </summary>		
        private DateTime _enddate;
        public DateTime ENDDATE
        {
            get { return _enddate; }
            set { _enddate = value; }
        }
        /// <summary>
        /// 邮件地址
        /// </summary>		
        private string _email;
        public string EMAIL
        {
            get { return _email; }
            set { _email = value; }
        }

    }
}
