using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model.SystemOP
{
    public class ROLE
    {
        /// <summary>
        /// 角色主键
        /// </summary>
        private decimal _ROLE_ID;

        /// <summary>
        /// 角色名称
        /// </summary>
        private string _ROLE_NAME;

        /// <summary>
        /// 是否管理员角色
        /// </summary>
        private decimal _ISADMIN;

        /// <summary>
        /// 建立日期
        /// </summary>
        private DateTime _CREATEDATE;

        /// <summary>
        /// 是否停止
        /// </summary>
        private decimal _ISSTOP;

        /// <summary>
        /// 角色主键
        /// </summary>
        public decimal ROLE_ID
        {
            get
            {
                return this._ROLE_ID;
            }
            set
            {
                this._ROLE_ID = value;
            }
        }
        /// <summary>
        /// 角色名称
        /// </summary>
        public string ROLE_NAME
        {
            get
            {
                return this._ROLE_NAME;
            }
            set
            {
                this._ROLE_NAME = value;
            }
        }
        /// <summary>
        /// 是否管理员角色
        /// </summary>
        public decimal ISADMIN
        {
            get
            {
                return this._ISADMIN;
            }
            set
            {
                this._ISADMIN = value;
            }
        }
        /// <summary>
        /// 建立日期
        /// </summary>
        public DateTime CREATEDATE
        {
            get
            {
                return this._CREATEDATE;
            }
            set
            {
                this._CREATEDATE = value;
            }
        }
        /// <summary>
        /// 是否停止
        /// </summary>
        public decimal ISSTOP
        {
            get
            {
                return this._ISSTOP;
            }
            set
            {
                this._ISSTOP = value;
            }
        }
    }
}
