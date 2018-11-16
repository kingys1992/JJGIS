using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.YNQGL
{
   public class EnergyConsumptionModel
    {
        /// <summary>
        /// 行政区代码
        /// </summary>
        public string REGIONCODE { get; set; }
        /// <summary>
        /// 行政区名称
        /// </summary>
        public string REGIONNAME { get; set; }

        /// <summary>
        /// 能耗数量
        /// </summary>
        public decimal ENERGYNUMBER { get; set; }

        /// <summary>
        /// 企业代码
        /// </summary>
        public string COMPANYCODE { get; set; }
        /// <summary>
        /// 企业名称
        /// </summary>
        public string COMPANYNAME { get; set; }

    }
}
