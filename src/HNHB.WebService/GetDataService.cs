using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace JNJC.WebService
{
    // 注意: 使用“重构”菜单上的“重命名”命令， 可以同时更改代码和配置文件中的类名“GetDataService”。
    public class GetDataService : IGetDataService
    {
        public void DoWork()
        {
            int a = 1;
            int b = 2;
            int c = a * b;
        }
    }
}
