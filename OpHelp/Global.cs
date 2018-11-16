using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpHelp
{
    public class DataBaseHelper
    {

        public static Database CreateDataBase()
        {
            Database db = DatabaseFactory.CreateDatabase("DEFAULT_CONNECTION_STRING");
           // Database db = DatabaseFactory.CreateDatabase();
            return db;
        }

    }

  
}
