using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class UsingQuestion
    {
        [Column("idquestionnaire")]
        public int Idquestionnaire { get; set; }
        [Column("idquestion")]
        public int Idquestion { get; set; }
        [Column("points", TypeName = "decimal(18, 0)")]
        public decimal? Points { get; set; }

        [ForeignKey("Idquestion")]
        [InverseProperty("UsingQuestion")]
        public Question IdquestionNavigation { get; set; }
        [ForeignKey("Idquestionnaire")]
        [InverseProperty("UsingQuestion")]
        public Questionnaire IdquestionnaireNavigation { get; set; }
    }
}
