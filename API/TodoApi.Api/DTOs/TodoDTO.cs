using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Api.DTOs
{
    public class TodoDTO
    {
        public int TodoId { get; set; }
        [Required]
        public string Title { get; set; }
        [DefaultValue(false)]
        public bool IsComplete { get; set; }
    }
}
