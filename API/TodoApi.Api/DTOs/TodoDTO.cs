namespace TodoApi.Api.DTOs
{
    public class TodoDTO
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
    }
}
