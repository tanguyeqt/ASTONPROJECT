using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Rate
    {
        [Column("idquestion")]
        public int Idquestion { get; set; }
        [Column("idaccount")]
        public int Idaccount { get; set; }
        [Column("rate", TypeName = "decimal(18, 0)")]
        public decimal Rate1 { get; set; }

        [ForeignKey("Idaccount")]
        [InverseProperty("Rate")]
        public Account IdaccountNavigation { get; set; }
        [ForeignKey("Idquestion")]
        [InverseProperty("Rate")]
        public Question IdquestionNavigation { get; set; }
    }
}
