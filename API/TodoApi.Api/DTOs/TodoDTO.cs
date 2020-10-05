using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Api.DTOs
{
    public class TodoDTO
    {
        public int todoid { get; set; }
        [Required]
        public string title { get; set; }
        [DefaultValue(false)]
        public bool iscomplete { get; set; }
    }
}
