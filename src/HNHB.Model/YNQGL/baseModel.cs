using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/*
    基础查询相关实体类
    2017年6月28日09:55:22
    王岩松
     
     */

namespace JNJC.Model.YNQGL
{
    public class baseModel
    {
        /// <summary>
        /// 行政区编号
        /// </summary>
        public decimal XZQBH { get; set; }
        /// <summary>
        /// 行政区名称
        /// </summary>
        public string XZQMC { get; set; }

        /// <summary>
        /// 企业编号
        /// </summary>
        public string  QYBH { get; set; }
        /// <summary>
        /// 企业名称
        /// </summary>
        public string QYMC { get; set; }
    }
}
