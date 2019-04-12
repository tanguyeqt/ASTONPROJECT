using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Questionnaire
    {
        public Questionnaire()
        {
            UsingQuestion = new HashSet<UsingQuestion>();
        }

        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("color")]
        [StringLength(255)]
        public string Color { get; set; }
        [Required]
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
        [Column("pointsmax", TypeName = "decimal(18, 0)")]
        public decimal Pointsmax { get; set; }
        [Column("showpoints")]
        public bool? Showpoints { get; set; }
        [Column("lastmodified", TypeName = "datetime")]
        public DateTime Lastmodified { get; set; }
        [Column("grade")]
        public int? Grade { get; set; }
        [Required]
        [Column("category")]
        [StringLength(255)]
        public string Category { get; set; }
        [Required]
        [Column("theme")]
        [StringLength(255)]
        public string Theme { get; set; }
        [Column("account")]
        public int? Account { get; set; }

        [ForeignKey("Account")]
        [InverseProperty("Questionnaire")]
        public Account AccountNavigation { get; set; }
        [ForeignKey("Grade")]
        [InverseProperty("Questionnaire")]
        public Grade GradeNavigation { get; set; }
        [InverseProperty("IdquestionnaireNavigation")]
        public ICollection<UsingQuestion> UsingQuestion { get; set; }
    }
}
