using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/*
    交易管理实体类
    2017年6月26日12:59:31
    王岩松
     
     */
namespace JNJC.Model.YNQGL
{
    public class dealReruleModel
    {


        /// <summary>
        /// 编码
        /// </summary>
        public decimal DRNO { get; set; }
        /// <summary>
        /// 编码
        /// </summary>
        public decimal DRNOD { get; set; }

        /// <summary>
        /// 行政区编号
        /// </summary>
        public decimal DRSTATUS { get; set; }
        /// <summary>
        /// 规则说明
        /// </summary>
        public string TRREMARK { get; set; }

        /// <summary>
        /// 文件路径
        /// </summary>
        public string DRFILEPATH { get; set; }
        /// <summary>
        /// 文件名称
        /// </summary>
        public string DRFILE { get; set; }
        /// <summary>
        /// 规则说明

        /// </summary>
        public string DRREMARK { get; set; }

        /// <summary>
        /// 执行日期
        /// </summary>
        public DateTime? DRDATE { get; set; }

        /// </summary>
        public string FILEGUID { get; set; }

        /// <summary>
        /// 行政区编号
        /// </summary>
        public decimal DRPRICE { get; set; }
        /// <summary>
        /// 行政区编号
        /// </summary>
        public decimal DRTHRESHOLD { get; set; }
    }
}
