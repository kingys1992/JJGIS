using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model.SystemOP
{
    public class SYS_MENU
    {
        public string  ENAME { get; set; }
        /// <summary>
        /// 主键
        /// </summary>
        private decimal? _ID;

        /// <summary>
        /// 菜单名称
        /// </summary>
        private string _TEXT;

        /// <summary>
        /// 图标样式
        /// </summary>
        private string _ICONCLS;

        /// <summary>
        /// 小图标地址
        /// </summary>
        private string _ICONURL;

        /// <summary>
        /// 地址
        /// </summary>
        private string _URL;

        /// <summary>
        /// 父节点
        /// </summary>
        private decimal? _PARENTID;

        /// <summary>
        /// 序号
        /// </summary>
        private decimal? _SORTNUM;

        /// <summary>
        /// 大图标地址
        /// </summary>
        private string _BIGIMAGEURL;

        /// <summary>
        /// 菜单状态
        /// </summary>
        private string _STATE;

        /// <summary>
        /// 1:可见0.不可见
        /// </summary>
        private decimal _ISVISABLE;



        /// <summary>
        /// 主键
        /// </summary>
        public decimal? ID
        {
            get
            {
                return this._ID;
            }
            set
            {
                this._ID = value;
            }
        }
        /// <summary>
        /// 菜单名称
        /// </summary>
        public string TEXT
        {
            get
            {
                return this._TEXT;
            }
            set
            {
                this._TEXT = value;
            }
        }
        /// <summary>
        /// 图标样式
        /// </summary>
        public string ICONCLS
        {
            get
            {
                return this._ICONCLS;
            }
            set
            {
                this._ICONCLS = value;
            }
        }
        /// <summary>
        /// 小图标地址
        /// </summary>
        public string ICONURL
        {
            get
            {
                return this._ICONURL;
            }
            set
            {
                this._ICONURL = value;
            }
        }
        /// <summary>
        /// 地址
        /// </summary>
        public string URL
        {
            get
            {
                return this._URL;
            }
            set
            {
                this._URL = value;
            }
        }
        /// <summary>
        /// 父节点
        /// </summary>
        public decimal? PARENTID
        {
            get
            {
                return this._PARENTID;
            }
            set
            {
                this._PARENTID = value;
            }
        }
        /// <summary>
        /// 序号
        /// </summary>
        public decimal? SORTNUM
        {
            get
            {
                return this._SORTNUM;
            }
            set
            {
                this._SORTNUM = value;
            }
        }
        /// <summary>
        /// 大图标地址
        /// </summary>
        public string BIGIMAGEURL
        {
            get
            {
                return this._BIGIMAGEURL;
            }
            set
            {
                this._BIGIMAGEURL = value;
            }
        }
        /// <summary>
        /// 菜单状态
        /// </summary>
        public string STATE
        {
            get
            {
                return this._STATE;
            }
            set
            {
                this._STATE = value;
            }
        }
        /// <summary>
        /// 1:可见0.不可见
        /// </summary>
        public decimal ISVISABLE
        {
            get
            {
                return this._ISVISABLE;
            }
            set
            {
                this._ISVISABLE = value;
            }
        }



    }
}
