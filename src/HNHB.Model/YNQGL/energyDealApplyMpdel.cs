using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.YNQGL
{
    public class energyDealApplyMpdel
    {

        /// <summary>
        /// EINO
        /// </summary>
        public decimal EINO { get; set; }
        /// <summary>
        /// 执行日期

        /// </summary>
        public string EIDATE { get; set; }
        /// <summary>
        /// 行政区编号
        /// </summary>
        public string YNQCSHSM { get; set; }
        /// <summary>
        /// 1.基准法，2.历史下降法

        /// </summary>
        public decimal EITYPE { get; set; }

        /// <summary>
        /// 1.基准法，2.历史下降法

        /// </summary>
        public string EITYPES { get; set; }
        /// <summary>
        /// 企业

        /// </summary>
        public string EIENTERPRISECODE { get; set; }
        /// <summary>
        /// 参考值

        /// </summary>
        public decimal EIREFERENCEVALUE { get; set; }
        /// <summary>
        /// 初始值

        /// </summary>
        public decimal EISETTINGVALUE { get; set; }
        /// <summary>
        /// 行业

        /// </summary>
        public string EIINDUSTRY { get; set; }
        /// <summary>
        /// 减排系数

        /// </summary>
        public decimal EISYSTEM { get; set; }
        /// <summary>
        /// 设置人

        /// </summary>
        public string EICREATOR { get; set; }
        /// <summary>
        /// 行政区编号
        /// </summary>
        public DateTime? EICREATIONDATE { get; set; }

        /// <summary>
        /// 行业类别名称
        /// </summary>
        public string INDUSTRYTYPENAME { get; set; }

        /// <summary>
        /// 企业编码
        /// </summary>
        public string FRDWDM { get; set; }

        /// <summary>
        /// 企业名称
        /// </summary>
        public string DWXXMC { get; set; }

        /// <summary>
        /// 行政区
        /// </summary>
        public string XZQHBM { get; set; }

        /// <summary>
        /// 行政区
        /// </summary>
        public string XZQHM { get; set; }

        /// <summary>
        /// 企业用能
        /// </summary>
        public decimal EITOTAL { get; set; }
    }
}
