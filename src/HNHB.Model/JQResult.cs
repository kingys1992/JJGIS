using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model
{
    /// <summary>
    /// 页面结果类
    /// </summary>
    public class JQResult
    {
        public bool success { get; set; }
        public string msg { get; set; }
        /// <summary>
        /// 一般只有在表格内编辑模式的时候才用赋此值
        /// 为处理表格内编辑模式（RowEditor）游离对象时返回Id
        /// </summary>
        public string id { get; set; }
    }
}
