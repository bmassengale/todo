using AutoMapper;
using TodoApi.Api.DTOs;
using TodoApi.Api.Profiles;
using TodoApi.Core.Entities;
using Xunit;

namespace TodoApi.Tests.Api.Profiles
{
    public class TodoProfileTests
    {

        private readonly IMapper _mapper;

        public TodoProfileTests()
        {
            _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<TodoProfile>()));
        }

        [Fact]
        public void GivenValidTodo_MapsToTodoDTO()
        {
            Todo original = new Todo()
            {
                todoid = 1,
                title = "Cook lunch",
                iscomplete = false,
                something = "Chicago"
            };
            TodoDTO expected = new TodoDTO()
            {
                todoid = 1,
                title = "Cook lunch",
                iscomplete = false
            };

            TodoDTO actual = _mapper.Map<TodoDTO>(original);

            Assert.Equal(expected.todoid, actual.todoid);
            Assert.Equal(expected.title, actual.title);
            Assert.Equal(expected.iscomplete, actual.iscomplete);
        }
    }
}
