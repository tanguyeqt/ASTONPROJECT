using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.APIModel
{
    public class FormAccount
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
