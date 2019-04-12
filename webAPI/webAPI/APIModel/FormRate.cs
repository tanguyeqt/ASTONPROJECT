using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.APIModel
{
    public class FormRate
    {
        public int IdQuestion { get; set; }
        public int IdAccount { get; set; }
        public decimal Rate { get; set; }
    }
}
