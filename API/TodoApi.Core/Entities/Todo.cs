namespace TodoApi.Core.Entities
{
    public class Todo
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
        // This is just here so that I can verify AutoMapper is working.
        public string Something { get; set; }
    }
}
