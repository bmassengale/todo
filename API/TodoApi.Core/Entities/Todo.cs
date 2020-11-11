namespace TodoApi.Core.Entities
{
    public class Todo
    {
        public int todoid { get; set; }
        public string title { get; set; }
        public bool iscomplete { get; set; }
        // This is just here so that I can verify AutoMapper is working.
        public string something { get; set; }
        public string username { get; set; }
    }
}
