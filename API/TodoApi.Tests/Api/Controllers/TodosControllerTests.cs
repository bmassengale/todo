using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using TodoApi.Api.Controllers;
using TodoApi.Api.DTOs;
using TodoApi.Api.Profiles;
using TodoApi.Core.Entities;
using TodoApi.Core.Interfaces;
using Xunit;

namespace TodoApi.Tests.Api.Controllers
{
    public class TodosControllerTests
    {
        private readonly Mock<ITodoRepository> _todoRepositoryMock;
        private readonly TodosController _todosController;
        private readonly IMapper _mapper;
        private Todo[] todoArray;

        public TodosControllerTests()
        {
            _todoRepositoryMock = new Mock<ITodoRepository>();
            _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<TodoProfile>()));
            _todosController = new TodosController(_todoRepositoryMock.Object, _mapper);
            todoArray = new Todo[]
            {
                new Todo() { TodoId = 1, Title = "Do this", IsComplete = false, Something = "asdf"  },
                new Todo() { TodoId = 2, Title = "Then this", IsComplete = true, Something = "qwerewr"  },
                new Todo() { TodoId = 3, Title = "And maybe this", IsComplete = false, Something = "eree"  }
            };
        }

        [Fact]
        public async Task GivenGetRequest_ReturnsAllTodosAsTodoDTO()
        {
            Todo[] allTodos = todoArray;
            TodoDTO[] expected = new TodoDTO[]
            {
                new TodoDTO() { TodoId = 1, Title = "Do this", IsComplete = false },
                new TodoDTO() { TodoId = 2, Title = "Then this", IsComplete = true },
                new TodoDTO() { TodoId = 3, Title = "And maybe this", IsComplete = false }
            };
            _todoRepositoryMock.Setup(x => x.GetAllTodosAsync()).ReturnsAsync(allTodos);

            ActionResult<TodoDTO[]> response = await _todosController.GetAllTodos();
            OkObjectResult parsedResponse = response.Result as OkObjectResult;
            TodoDTO[] actual = parsedResponse.Value as TodoDTO[];

            Assert.Equal(expected[0].Title, actual[0].Title);
            Assert.Equal(expected[1].TodoId, actual[1].TodoId);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GivenValidId_ReturnSingleTodoDTO(int id)
        {
            Todo[] allTodos = todoArray;
            Todo randomTodo = new Todo();
            foreach (Todo todo in allTodos)
            {
                if (todo.TodoId == id)
                {
                    randomTodo = todo;
                }
            }
            TodoDTO expected = _mapper.Map<TodoDTO>(randomTodo);
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(id)).ReturnsAsync(randomTodo);

            ActionResult<TodoDTO> response = await _todosController.GetTodo(id);
            OkObjectResult parsedResponse = response.Result as OkObjectResult;
            TodoDTO actual = parsedResponse.Value as TodoDTO;

            Assert.Equal(expected.Title, actual.Title);
            Assert.Equal(expected.TodoId, actual.TodoId);
            Assert.Equal(expected.IsComplete, actual.IsComplete);
        }

        [Theory]
        [InlineData(12)]
        [InlineData(245)]
        [InlineData(32)]
        public async Task GivenInvalidId_ReturnNotFoundResults(int id)
        {
            Todo returnValue = null;
            int expected = 404;
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(id)).ReturnsAsync(returnValue);

            ActionResult<TodoDTO> response = await _todosController.GetTodo(id);
            NotFoundResult parsedResponse = response.Result as NotFoundResult;
            int actual = parsedResponse.StatusCode;

            Assert.Equal(expected, actual);
        }
    }
}
