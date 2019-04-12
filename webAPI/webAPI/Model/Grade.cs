using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Grade
    {
        public Grade()
        {
            Question = new HashSet<Question>();
            Questionnaire = new HashSet<Questionnaire>();
        }

        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }

        [InverseProperty("GradeNavigation")]
        public ICollection<Question> Question { get; set; }
        [InverseProperty("GradeNavigation")]
        public ICollection<Questionnaire> Questionnaire { get; set; }
    }
}
