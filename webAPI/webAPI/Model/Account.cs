using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Account
    {
        public Account()
        {
            Commentary = new HashSet<Commentary>();
            Question = new HashSet<Question>();
            Questionnaire = new HashSet<Questionnaire>();
            Rate = new HashSet<Rate>();
        }

        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("login")]
        [StringLength(255)]
        public string Login { get; set; }
        [Required]
        [Column("password")]
        [StringLength(255)]
        public string Password { get; set; }
        [Column("firstname")]
        [StringLength(255)]
        public string Firstname { get; set; }
        [Column("lastname")]
        [StringLength(255)]
        public string Lastname { get; set; }
        [Required]
        [Column("email")]
        [StringLength(255)]
        public string Email { get; set; }
        [Column("birthdate", TypeName = "date")]
        public DateTime? Birthdate { get; set; }
        [Column("image")]
        [StringLength(1)]
        public string Image { get; set; }

        [InverseProperty("AccountNavigation")]
        public ICollection<Commentary> Commentary { get; set; }
        [InverseProperty("AccountNavigation")]
        public ICollection<Question> Question { get; set; }
        [InverseProperty("AccountNavigation")]
        public ICollection<Questionnaire> Questionnaire { get; set; }
        [InverseProperty("IdaccountNavigation")]
        public ICollection<Rate> Rate { get; set; }
    }
}
