using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/* 河南省流域水污染自动监控管理系统 
   沈阳金建数字城市软件有限公司 承建 */
namespace HNHB.Model
{
    #region 《 企业信息表 》实体类
    public class T_INFO_PSBASEINFO
    {
        /// <summary>
        /// 污染源编码
        /// </summary>
        private decimal _PSCODE;
        public decimal PSCODE
        {
            get
            { return this._PSCODE; }
            set
            { this._PSCODE = value; }
        }
        /// <summary>
        /// 污染源名称
        /// </summary>
        private string _PSNAME;
        public string PSNAME
        {
            get
            { return this._PSNAME; }
            set
            { this._PSNAME = value; }
        }
        /// <summary>
        /// 污染源号
        /// </summary>
        private string _PSNUMBER;
        public string PSNUMBER
        {
            get
            { return this._PSNUMBER; }
            set
            { this._PSNUMBER = value; }
        }
        /// <summary>
        /// 行政区划编码
        /// </summary>
        private decimal _REGIONCODE;
        public decimal REGIONCODE
        {
            get
            { return this._REGIONCODE; }
            set
            { this._REGIONCODE = value; }
        }
        /// <summary>
        /// 注册类型编码
        /// </summary>
        private string _REGISTTYPECODE;
        public string REGISTTYPECODE
        {
            get
            { return this._REGISTTYPECODE; }
            set
            { this._REGISTTYPECODE = value; }
        }
        /// <summary>
        /// 单位类别编码
        /// </summary>
        private string _UNITTYPECODE;
        public string UNITTYPECODE
        {
            get
            { return this._UNITTYPECODE; }
            set
            { this._UNITTYPECODE = value; }
        }
        /// <summary>
        /// 污染源规模编码
        /// </summary>
        private string _PSSCALECODE;
        public string PSSCALECODE
        {
            get
            { return this._PSSCALECODE; }
            set
            { this._PSSCALECODE = value; }
        }
        /// <summary>
        /// 隶属关系编码
        /// </summary>
        private string _SUBJECTIONRELATIONCODE;
        public string SUBJECTIONRELATIONCODE
        {
            get
            { return this._SUBJECTIONRELATIONCODE; }
            set
            { this._SUBJECTIONRELATIONCODE = value; }
        }
        /// <summary>
        /// 行业类别编码
        /// </summary>
        private string _INDUSTRYTYPECODE;
        public string INDUSTRYTYPECODE
        {
            get
            { return this._INDUSTRYTYPECODE; }
            set
            { this._INDUSTRYTYPECODE = value; }
        }
        /// <summary>
        /// 流域编码
        /// </summary>
        private string _VALLEYCODE;
        public string VALLEYCODE
        {
            get
            { return this._VALLEYCODE; }
            set
            { this._VALLEYCODE = value; }
        }
        /// <summary>
        /// 关注程度 1:国控 2:省控 3:市控
        /// </summary>
        private decimal _ATTENTIONDEGREECODE;
        public decimal ATTENTIONDEGREECODE
        {
            get
            { return this._ATTENTIONDEGREECODE; }
            set
            { this._ATTENTIONDEGREECODE = value; }
        }
        /// <summary>
        /// 污染源地址
        /// </summary>
        private string _PSADDRESS;
        public string PSADDRESS
        {
            get
            { return this._PSADDRESS; }
            set
            { this._PSADDRESS = value; }
        }
        /// <summary>
        /// 中心经度
        /// </summary>
        private decimal _LONGITUDE;
        public decimal LONGITUDE
        {
            get
            { return this._LONGITUDE; }
            set
            { this._LONGITUDE = value; }
        }
        /// <summary>
        /// 中心纬度
        /// </summary>
        private decimal _LATITUDE;
        public decimal LATITUDE
        {
            get
            { return this._LATITUDE; }
            set
            { this._LATITUDE = value; }
        }
        /// <summary>
        /// 污染源环保部门
        /// </summary>
        private string _PSENVIRONMENTDEPT;
        public string PSENVIRONMENTDEPT
        {
            get
            { return this._PSENVIRONMENTDEPT; }
            set
            { this._PSENVIRONMENTDEPT = value; }
        }
        /// <summary>
        /// 环保负责人
        /// </summary>
        private string _ENVIRONMENTPRINCIPAL;
        public string ENVIRONMENTPRINCIPAL
        {
            get
            { return this._ENVIRONMENTPRINCIPAL; }
            set
            { this._ENVIRONMENTPRINCIPAL = value; }
        }
        /// <summary>
        /// 专职环保人员数
        /// </summary>
        private decimal _ENVIRONMENTMANS;
        public decimal ENVIRONMENTMANS
        {
            get
            { return this._ENVIRONMENTMANS; }
            set
            { this._ENVIRONMENTMANS = value; }
        }
        /// <summary>
        /// 法人代码
        /// </summary>
        private string _CORPORATIONCODE;
        public string CORPORATIONCODE
        {
            get
            { return this._CORPORATIONCODE; }
            set
            { this._CORPORATIONCODE = value; }
        }
        /// <summary>
        /// 法定代表人
        /// </summary>
        private string _CORPORATIONNAME;
        public string CORPORATIONNAME
        {
            get
            { return this._CORPORATIONNAME; }
            set
            { this._CORPORATIONNAME = value; }
        }
        /// <summary>
        /// 开工日期
        /// </summary>
        private DateTime _RUNDATE;
        public DateTime RUNDATE
        {
            get
            { return this._RUNDATE; }
            set
            { this._RUNDATE = value; }
        }
        /// <summary>
        /// 开户银行
        /// </summary>
        private string _OPENACOCUNTBANK;
        public string OPENACOCUNTBANK
        {
            get
            { return this._OPENACOCUNTBANK; }
            set
            { this._OPENACOCUNTBANK = value; }
        }
        /// <summary>
        /// 银行帐号
        /// </summary>
        private string _BANKACCOUNT;
        public string BANKACCOUNT
        {
            get
            { return this._BANKACCOUNT; }
            set
            { this._BANKACCOUNT = value; }
        }
        /// <summary>
        /// 污染源网址
        /// </summary>
        private string _PSWEBSITE;
        public string PSWEBSITE
        {
            get
            { return this._PSWEBSITE; }
            set
            { this._PSWEBSITE = value; }
        }
        /// <summary>
        /// 办公电话
        /// </summary>
        private string _OFFICEPHONE;
        public string OFFICEPHONE
        {
            get
            { return this._OFFICEPHONE; }
            set
            { this._OFFICEPHONE = value; }
        }
        /// <summary>
        /// 传真
        /// </summary>
        private string _FAX;
        public string FAX
        {
            get
            { return this._FAX; }
            set
            { this._FAX = value; }
        }
        /// <summary>
        /// 移动电话
        /// </summary>
        private string _MOBILEPHONE;
        public string MOBILEPHONE
        {
            get
            { return this._MOBILEPHONE; }
            set
            { this._MOBILEPHONE = value; }
        }
        /// <summary>
        /// 电子邮箱
        /// </summary>
        private string _EMAIL;
        public string EMAIL
        {
            get
            { return this._EMAIL; }
            set
            { this._EMAIL = value; }
        }
        /// <summary>
        /// 邮政编码
        /// </summary>
        private string _POSTALCODE;
        public string POSTALCODE
        {
            get
            { return this._POSTALCODE; }
            set
            { this._POSTALCODE = value; }
        }
        /// <summary>
        /// 通讯地址
        /// </summary>
        private string _COMMUNICATEADDR;
        public string COMMUNICATEADDR
        {
            get
            { return this._COMMUNICATEADDR; }
            set
            { this._COMMUNICATEADDR = value; }
        }
        /// <summary>
        /// 地区代码
        /// </summary>
        private decimal _AREACODE;
        public decimal AREACODE
        {
            get
            { return this._AREACODE; }
            set
            { this._AREACODE = value; }
        }
        /// <summary>
        /// 污染源类别编码（弃用，由PSCLASSCODEXC代替）
        /// </summary>
        private decimal _PSCLASSCODE;
        public decimal PSCLASSCODE
        {
            get
            { return this._PSCLASSCODE; }
            set
            { this._PSCLASSCODE = value; }
        }
        /// <summary>
        /// 联系人
        /// </summary>
        private string _LINKMAN;
        public string LINKMAN
        {
            get
            { return this._LINKMAN; }
            set
            { this._LINKMAN = value; }
        }
        /// <summary>
        /// 备注
        /// </summary>
        private string _COMMENTS;
        public string COMMENTS
        {
            get
            { return this._COMMENTS; }
            set
            { this._COMMENTS = value; }
        }
        /// <summary>
        /// 审核状态
        /// </summary>
        private decimal _CHECKSTATUS;
        public decimal CHECKSTATUS
        {
            get
            { return this._CHECKSTATUS; }
            set
            { this._CHECKSTATUS = value; }
        }
        /// <summary>
        /// 状态(0-在用；1-停运)
        /// </summary>
        private decimal _STATUS;
        public decimal STATUS
        {
            get
            { return this._STATUS; }
            set
            { this._STATUS = value; }
        }
        /// <summary>
        /// 是否在线
        /// </summary>
        private decimal _IFALREADYONLINE;
        public decimal IFALREADYONLINE
        {
            get
            { return this._IFALREADYONLINE; }
            set
            { this._IFALREADYONLINE = value; }
        }
        /// <summary>
        /// 在线状态
        /// </summary>
        private decimal _ONLINESTATUS;
        public decimal ONLINESTATUS
        {
            get
            { return this._ONLINESTATUS; }
            set
            { this._ONLINESTATUS = value; }
        }
        /// <summary>
        /// 处理厂类型
        /// </summary>
        private decimal _DISPOSETYPECODE;
        public decimal DISPOSETYPECODE
        {
            get
            { return this._DISPOSETYPECODE; }
            set
            { this._DISPOSETYPECODE = value; }
        }
        /// <summary>
        /// 是否30万千瓦电力企业
        /// </summary>
        private decimal _IFTHIRTYTENTHOUSANDKILOWAT;
        public decimal IFTHIRTYTENTHOUSANDKILOWAT
        {
            get
            { return this._IFTHIRTYTENTHOUSANDKILOWAT; }
            set
            { this._IFTHIRTYTENTHOUSANDKILOWAT = value; }
        }
        /// <summary>
        /// 总占地面积
        /// </summary>
        private decimal _TOTALAREA;
        public decimal TOTALAREA
        {
            get
            { return this._TOTALAREA; }
            set
            { this._TOTALAREA = value; }
        }
        /// <summary>
        /// 是否监控
        /// </summary>
        private decimal _ISMONITOR;
        public decimal ISMONITOR
        {
            get
            { return this._ISMONITOR; }
            set
            { this._ISMONITOR = value; }
        }
        /// <summary>
        /// 建设状态
        /// </summary>
        private decimal _BUILDSTATUS;
        public decimal BUILDSTATUS
        {
            get
            { return this._BUILDSTATUS; }
            set
            { this._BUILDSTATUS = value; }
        }
        /// <summary>
        /// 照片
        /// </summary>
        private string _PHOTO;
        public string PHOTO
        {
            get
            { return this._PHOTO; }
            set
            { this._PHOTO = value; }
        }
        /// <summary>
        /// 更新时间
        /// </summary>
        private DateTime _UPDATEDATE;
        public DateTime UPDATEDATE
        {
            get
            { return this._UPDATEDATE; }
            set
            { this._UPDATEDATE = value; }
        }
        /// <summary>
        /// 拼音助记符
        /// </summary>
        private string _SPELL;
        public string SPELL
        {
            get
            { return this._SPELL; }
            set
            { this._SPELL = value; }
        }
        /// <summary>
        /// 删除标记
        /// </summary>
        private decimal _DELETEFLAG;
        public decimal DELETEFLAG
        {
            get
            { return this._DELETEFLAG; }
            set
            { this._DELETEFLAG = value; }
        }         
	    	/// <summary>
            /// 国控类型（
0: 污水处理厂
1: 水国控
2: 气国控
3: 水气国控
4: 重金属
5: 水重金属
6: 气重金属
7: 水气重金属）

            /// </summary>
            private decimal _STATECONTROLLEDTYPECODE;
        public decimal STATECONTROLLEDTYPECODE
        {
            get
            { return this._STATECONTROLLEDTYPECODE; }
            set
            { this._STATECONTROLLEDTYPECODE = value; }
        }
        /// <summary>
        /// 停废业状态
        /// </summary>
        private decimal _STOPWASTESTATUS;
        public decimal STOPWASTESTATUS
        {
            get
            { return this._STOPWASTESTATUS; }
            set
            { this._STOPWASTESTATUS = value; }
        }
        /// <summary>
        /// PSMONITORCATEGORYTYPECODE
        /// </summary>
        private decimal _PSMONITORCATEGORYTYPECODE;
        public decimal PSMONITORCATEGORYTYPECODE
        {
            get
            { return this._PSMONITORCATEGORYTYPECODE; }
            set
            { this._PSMONITORCATEGORYTYPECODE = value; }
        }
        /// <summary>
        /// 污染源别名
        /// </summary>
        private string _PSALIAS;
        public string PSALIAS
        {
            get
            { return this._PSALIAS; }
            set
            { this._PSALIAS = value; }
        }
        /// <summary>
        ///  雪城处理 1 工业企业废水 2 工业企业废气 3 工业企业既涉水又涉气4 污水处理厂5 省控电厂涉水6 省控电厂7 污水处理厂涉气
        /// </summary>
        private string _PSCLASSCODEXC;
        public string PSCLASSCODEXC
        {
            get
            { return this._PSCLASSCODEXC; }
            set
            { this._PSCLASSCODEXC = value; }
        }
        /// <summary>
        /// 行业类别编码_雪城专用
        /// </summary>
        private string _INDUSTRYTYPECODE_XC;
        public string INDUSTRYTYPECODE_XC
        {
            get
            { return this._INDUSTRYTYPECODE_XC; }
            set
            { this._INDUSTRYTYPECODE_XC = value; }
        }
        /// <summary>
        /// CREDITCODE
        /// </summary>
        private string _CREDITCODE;
        public string CREDITCODE
        {
            get
            { return this._CREDITCODE; }
            set
            { this._CREDITCODE = value; }
        }
        /// <summary>
        /// EXCHANGEDATE
        /// </summary>
        private DateTime _EXCHANGEDATE;
        public DateTime EXCHANGEDATE
        {
            get
            { return this._EXCHANGEDATE; }
            set
            { this._EXCHANGEDATE = value; }
        }
        /// <summary>
        /// 污染源编码(资源中心库)
        /// </summary>
        private string _ENPCODE;
        public string ENPCODE
        {
            get
            { return this._ENPCODE; }
            set
            { this._ENPCODE = value; }
        }
    }
    #endregion
}