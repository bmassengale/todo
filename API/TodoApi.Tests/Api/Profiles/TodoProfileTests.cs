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
                TodoId = 1,
                Title = "Cook lunch",
                IsComplete = false,
                Something = "Chicago"
            };
            TodoDTO expected = new TodoDTO()
            {
                TodoId = 1,
                Title = "Cook lunch",
                IsComplete = false
            };

            TodoDTO actual = _mapper.Map<TodoDTO>(original);

            Assert.Equal(expected.TodoId, actual.TodoId);
            Assert.Equal(expected.Title, actual.Title);
            Assert.Equal(expected.IsComplete, actual.IsComplete);
        }
    }
}
