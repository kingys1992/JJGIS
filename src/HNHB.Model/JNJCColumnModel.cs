using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model
{
    public class ColumnModel
    {

        /// <summary>
        /// 标题
        /// </summary>
        public string title
        {
            get;
            set;
        }

        public string defaultSortable
        {
            get;
            set;
        }
        /// <summary>
        /// 合并列
        /// </summary>
        public int rowspan
        {
            get;
            set;
        }
        /// <summary>
        /// 合并行
        /// </summary>
        public int colspan
        {
            get;
            set;
        }
        /// <summary>
        /// 绑定字段
        /// </summary>
        public string field
        {
            get;
            set;
        }
        /// <summary>
        /// 宽度
        /// </summary>
        public string width
        {
            get;
            set;
        }
        /// <summary>
        /// 布局
        /// </summary>
        public string align
        {
            get;
            set;
        }
        /// <summary>
        /// 类型
        /// </summary>
        public string fild
        {
            get;
            set;
        }
        /// <summary>
        /// tag  标签
        /// </summary>
        public string tag
        {
            get;
            set;
        }
        /// <summary>
        /// 隐藏
        /// </summary>
        public string hidden
        {
            get;
            set;
        }
        /// <summary>
        /// 排序
        /// </summary>
        public string sortable
        {
            get;
            set;
        }

    }
}
