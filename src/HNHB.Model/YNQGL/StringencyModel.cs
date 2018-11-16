using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.YNQGL
{
   public  class StringencyModel
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
        /// 强度基数
        /// </summary>
        public string NYQDJS { get; set; }
        /// <summary>
        /// 目标分值
        /// </summary>
        public string MBFZ { get; set; }
        /// <summary>
        /// 年均降低目标
        /// </summary>
        public string NJJDMB { get; set; }

        /// <summary>
        /// 实际_能耗指标值
        /// </summary>
        public decimal  SJ_NHZBZ { get; set; }

        /// <summary>
        /// 年度
        /// </summary>
        public string ND { get; set; }

        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal? SJ_NHXJFD { get; set; }

        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal? DWNH_BNLJTJZ { get; set; }

        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal yi { get; set; }
        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal er { get; set; }
        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal san { get; set; }
        /// <summary>
        /// 实际_能耗下降幅度
        /// </summary>
        public decimal si { get; set; }

        //public string nd { get; set; }
        public decimal?[] w { get; set; }
        public decimal?[] b { get; set; }
        public decimal?[] c { get; set; }

        public string[] yf { get; set; }
        public decimal[] lj { get; set; }

    }
}
