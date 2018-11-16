using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InOutModel
{
    /// <summary>
    /// 字符工具类
    /// </summary>
   public  class HelpUntil
    {
        /// <summary>
        /// 返回格式化后的结果
        /// </summary>
        /// <param name="strVal">内容</param>
        /// <param name="strRC">行列位置</param>
        /// <returns></returns>
        public static string dserResult(string strVal,string strRC)
        {
            ConfigClass config = new ConfigClass();
            int iR= int.Parse(config.ReadConfig("dserR1C1"));
         
            return strVal.PadLeft(iR);
        }
       
    }
}
