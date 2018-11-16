using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.YNQGL
{
   public  class tradeRuleModel
    {
        /// <summary>
        /// 编码
        /// </summary>
        public decimal TRNO { get; set; }
        /// <summary>
        /// 行政区编号
        /// </summary>
        public string TRREGIONCODE { get; set; }
        /// <summary>
        /// 规则说明
        /// </summary>
        public string TRREMARK { get; set; }

        /// <summary>
        /// 文件GUID
        /// </summary>
        public string FILEGUID { get; set; }
        /// <summary>
        /// 行业编码
        /// </summary>
        public string TRENTERPRISECODE { get; set; }
        /// <summary>
        /// 规则状态
        /// </summary>
        public decimal TRSTATUS { get; set; }

        /// <summary>
        /// 执行日期
        /// </summary>
        public DateTime TRDATE { get; set; }
        /// <summary>
        /// 行业编码
        /// </summary>
        public string INDUSTRYTYPECODE { get; set; }
        /// <summary>
        /// 行业名称
        /// </summary>
        public string INDUSTRYTYPENAME { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string SJ { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string TRFILEPATH { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string TRFILE { get; set; }

        /// <summary>
        /// 有偿基准价
        /// </summary>
        public decimal TRPRICE { get; set; }


        /// <summary>
        /// 有偿基准价
        /// </summary>
        public string TRPRICES { get; set; }

    }
}
