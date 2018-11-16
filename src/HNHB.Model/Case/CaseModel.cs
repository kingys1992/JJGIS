namespace JNJC.Model.Case
{
    public class CaseModel
    {
        /// <summary>
        /// 案件数量
        /// </summary>
        public decimal CASENUMBER { get; set; }

        /// <summary>
        /// 节监立案表字
        /// </summary>
        public string TABLEWORDS { get; set; }

        /// <summary>
        /// 案件处理状态
        /// </summary>
        public string STATUS { get; set; }

        public decimal[] JCASENUMBER { get; set; }
        public string[] JTABLEWORDS { get; set; }
        public string[] JSTATUS { get; set; }
    }

    public class CaseMonthModel
    {
        /// <summary>
        /// 月份
        /// </summary>
        public string MON { get; set; }

        /// <summary>
        /// 次数
        /// </summary>
        public decimal COUNTS { get; set; }

        /// <summary>
        /// 日常监察
        /// </summary>
        public decimal RCJC { get; set; }

        /// <summary>
        /// 举报投诉
        /// </summary>
        public decimal JBTS { get; set; }

        /// <summary>
        /// 有关部门移送
        /// </summary>
        public decimal YGBM { get; set; }

        /// <summary>
        /// 主管部门交办
        /// </summary>
        public decimal ZGBM { get; set; }

        public string[] JMON { get; set; }
        public decimal[] JCOUNTS { get; set; }
        public decimal[] JRCJC { get; set; }
        public decimal[] JJBTS { get; set; }
        public decimal[] JYGBM { get; set; }
        public decimal[] JZGBM { get; set; }
    }

    public class CaseCityModel
    {
        /// <summary>
        /// 城市代码
        /// </summary>
        public string CITYCODE
        { get; set; }

        /// <summary>
        /// 城市名称
        /// </summary>
        public string CITYNAME { get; set; }

        /// <summary>
        /// 未处理案件
        /// </summary>
        public decimal UNTREATED { get; set; }

        /// <summary>
        /// 完成案件
        /// </summary>
        public decimal COMPLETED { get; set; }

        /// <summary>
        /// 全部案件
        /// </summary>
        public decimal ALLCASE { get; set; }

        /// <summary>
        /// 完成率
        /// </summary>
        public decimal RATE { get; set; }

        public string[] JCITYCODE { get; set; }
        public string[] JCITYNAME { get; set; }
        public decimal?[] JUNTREATED { get; set; }
        public decimal?[] JCOMPLETED { get; set; }
        public decimal?[] JALLCASE { get; set; }
        public decimal?[] JRATE { get; set; }
    }
}