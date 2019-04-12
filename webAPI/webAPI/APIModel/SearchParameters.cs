using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.APIModel
{
    public class SearchParameters
    {
        public string Search { get; set; }
        public string Category { get; set; }
        public string Theme { get; set; }
        public int Level { get; set; }
        public int TypeQuestion { get; set; }
        public int Difficulty { get; set; }
        public int Review { get; set; }
        public string UserName { get; set; }
        public int Top { get; set; }
        public decimal Rate { get; set; }
    }
}
