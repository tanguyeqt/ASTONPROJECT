using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Commentary
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("account")]
        public int? Account { get; set; }
        [Required]
        [Column("body")]
        [StringLength(255)]
        public string Body { get; set; }
        [Column("posted", TypeName = "datetime")]
        public DateTime Posted { get; set; }
        [Column("idquestion")]
        public int? Idquestion { get; set; }
        [Column("seen")]
        public bool? Seen { get; set; }

        [ForeignKey("Account")]
        [InverseProperty("Commentary")]
        public Account AccountNavigation { get; set; }
        [ForeignKey("Idquestion")]
        [InverseProperty("Commentary")]
        public Question IdquestionNavigation { get; set; }
    }
}
