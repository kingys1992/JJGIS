using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.Model.YNQGL
{
    public class energyModel
    {
        /// <summary>
        /// 主键编码
        /// </summary>
        public decimal BRNO { get; set; }
        /// <summary>
        /// 执行日期
        /// </summary>
        public DateTime? BRDATE { get; set; }
        /// <summary>
        /// 规则说明
        /// </summary>
        public string BRREMARK { get; set; }
        /// <summary>
        /// 0:正常使用,1:停用
        /// </summary>
        public decimal BRSTATUS { get; set; }
        /// <summary>
        /// 规则附件文件名
        /// </summary>
        public string BRFILE { get; set; }
        /// <summary>
        /// 规则附件路径
        /// </summary>
        public string BRFILEPATH { get; set; }
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string BRREGIONCODE { get; set; }
        /// <summary>
        /// 行业编码
        /// </summary>
        public string BRINDUSTRY { get; set; }
        /// <summary>
        /// 文件GUID
        /// </summary>
        public string FILEGUID { get; set; }
        /// <summary>
        /// 创建人
        /// </summary>
        public string YNQCJR { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? YNQCJSJ { get; set; }
        /// <summary>
        /// 基准率
        /// </summary>
        public decimal BRBENCHMARK { get; set; }
        /// <summary>
        /// 下降法
        /// </summary>
        public decimal BRCOEFFICIENT { get; set; }
        /// <summary>
        /// 行业名称
        /// </summary>
        public string INDUSTRYTYPENAME { get; set; }

        /// <summary>
        /// 行业编码
        /// </summary>
        public string INDUSTRYTYPECODE { get; set; }

    }
}
