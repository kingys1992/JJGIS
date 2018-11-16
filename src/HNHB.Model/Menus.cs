using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model
{
    public class Menus
    {
        /// <summary>
        /// 菜单主键
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 菜单显示文本
        /// </summary>
        public string text { get; set; }

        /// <summary>
        /// 菜单图标名称
        /// </summary>
        public string iconCls { get; set; }

        /// <summary>
        /// 菜单是否打开
        /// </summary>
        public string state { get; set; }

        public Attributes attributes { get; set; }

        /// <summary>
        /// 子菜单
        /// </summary>
        public Menus children { get; set; }
    }

    public class Attributes
    {
        /// <summary>
        /// 菜单地址
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// 图标地址
        /// </summary>
        public string iconUrl { get; set; }

        /// <summary>
        /// 父菜单id
        /// </summary>
        public int parentid { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int sortnum { get; set; }

        /// <summary>
        /// 大图片地址
        /// </summary>
        public string BigImageUrl { get; set; }



    }
}
