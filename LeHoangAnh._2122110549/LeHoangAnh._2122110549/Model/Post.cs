
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeHoangAnh._2122110549.Model
{
    [Table("Posts")]
    public class Post
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Thumbnail { get; set; } = string.Empty;

        public int? CreatedBy { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }

        [Required]
        public int Status { get; set; } = 1;

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
