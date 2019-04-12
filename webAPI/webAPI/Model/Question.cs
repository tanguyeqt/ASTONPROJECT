using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Question
    {
        public Question()
        {
            Commentary = new HashSet<Commentary>();
            Rate = new HashSet<Rate>();
            UsingQuestion = new HashSet<UsingQuestion>();
        }

        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("color")]
        [StringLength(255)]
        public string Color { get; set; }
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
        [Column("difficulty")]
        public int? Difficulty { get; set; }
        [Required]
        [Column("question")]
        [StringLength(255)]
        public string Question1 { get; set; }
        [Required]
        [Column("response")]
        [StringLength(255)]
        public string Response { get; set; }

        [ForeignKey("Account")]
        [InverseProperty("Question")]
        public Account AccountNavigation { get; set; }
        [ForeignKey("Difficulty")]
        [InverseProperty("Question")]
        public Difficulty DifficultyNavigation { get; set; }
        [ForeignKey("Grade")]
        [InverseProperty("Question")]
        public Grade GradeNavigation { get; set; }
        [InverseProperty("IdquestionNavigation")]
        public ICollection<Commentary> Commentary { get; set; }
        [InverseProperty("IdquestionNavigation")]
        public ICollection<Rate> Rate { get; set; }
        [InverseProperty("IdquestionNavigation")]
        public ICollection<UsingQuestion> UsingQuestion { get; set; }
    }
}
