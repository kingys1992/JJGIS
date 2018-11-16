using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model.SystemOP
{
    public class User
    {
        /// <summary>
        /// 用户主键
        /// </summary>
        public decimal PMAN_ID { get; set; }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string USER_NAME { get; set; }

        /// <summary>
        /// 登陆账号
        /// </summary>
        public string CUSERNAME { get; set; }

        string strTemp = "";
        /// <summary>
        /// 备注
        /// </summary>
        public string REMARK
        {
            get
            {
                return strTemp;
            }
            set
            {
                strTemp = value;
            }
        }
        /// <summary>
        /// 密码
        /// </summary>
        public string PSD { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime? CREATE_DATE { get; set; }


        private string _role;
        /// <summary>
        /// 备注
        /// </summary>
        public string role
        {
            get
            {
                return _role;
            }
            set
            {
                _role = value;
            }
        }


    }
}
