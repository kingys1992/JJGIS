using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.ZLYJ
{
    public class ZLYJModel
    {
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string citycode { get; set; }
        /// <summary>
        /// 行政区名称
        /// </summary>
        public string cityname { get; set; }
        /// <summary>
        /// 年度总量
        /// </summary>
        public decimal yeartotal { get; set; }

        /// <summary>
        /// 年度累计
        /// </summary>
        public decimal yearsum { get; set; }
        /// <summary>
        /// 上年度累计
        /// </summary>
        public decimal oldyearsum { get; set; }
        /// <summary>
        /// 计划增长率
        /// </summary>
        public decimal planread { get; set; }

        /// <summary>
        /// 实际增长率
        /// </summary>
        public decimal actualread { get; set; }
        public string actualreads { get; set; }
        
        /// <summary>
        /// 月份
        /// </summary>
        public decimal YF { get; set; }


        public string[]  jXZQHBM { get; set; }
        public decimal[] jBND { get; set; }
        public decimal[] jSND { get; set; }
        public decimal[] jBNZL { get; set; }
        public decimal[] jSNZL { get; set; }
        public decimal[] jYF { get; set; }
    }
}
