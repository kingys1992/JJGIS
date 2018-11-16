using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JNJC.BLL
{
    public class UploadToken
    {
        public string name { get; set; }
        public long size { get; set; }
        public string token { get; set; }

        public long upsize { get; set; }

        public string filePath { get; set; }
        public string modified { get; set; }
    }
}
