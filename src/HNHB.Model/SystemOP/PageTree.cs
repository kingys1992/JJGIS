using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HNHB.Model.SystemOP
{
    public class PageTree
    {

        public System.Decimal? id { get; set; }

        /// <summary>
        /// 图标
        /// </summary>
        public string iconCls { get; set; }

        public string text { get; set; }

        public bool @checked { get; set; }

        // public string @int { get; set; }
        public List<PageTree> children { get; set; }


    }
}
