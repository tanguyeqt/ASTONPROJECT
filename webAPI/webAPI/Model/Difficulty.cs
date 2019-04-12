using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Model
{
    public partial class Difficulty
    {
        public Difficulty()
        {
            Question = new HashSet<Question>();
        }

        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }

        [InverseProperty("DifficultyNavigation")]
        public ICollection<Question> Question { get; set; }
    }
}
