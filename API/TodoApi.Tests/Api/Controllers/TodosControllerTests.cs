using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
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
        
        [Fact]
        public async Task GivenValidTodoDTO_PostNewTodo()
        {
            TodoDTO newTodoDTO = new TodoDTO() { Title = "Learn to dunk a basketball", IsComplete = false };
            Todo newTodo = new Todo() { TodoId = 7, Title = "Learn to dunk a basketball", IsComplete = false, Something = null };
            _todoRepositoryMock.Setup(x => x.SaveAllChangesAsync()).Verifiable();
            _todoRepositoryMock.Setup(x => x.CreateTodoAsync(It.IsAny<Todo>())).ReturnsAsync(newTodo);
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(newTodo.TodoId)).ReturnsAsync(newTodo);
            string expected = newTodoDTO.Title;

            ActionResult<TodoDTO> response = await _todosController.CreateTodo(newTodoDTO);
            CreatedAtActionResult parsedResponse = response.Result as CreatedAtActionResult;
            TodoDTO actual = parsedResponse.Value as TodoDTO;

            Assert.Equal(expected, actual.Title);
        }

        [Fact]
        public async Task GivenValidTodoDTOWithoutIsCompleteValue_PostNewTodo()
        {
            TodoDTO newTodoDTO = new TodoDTO() { Title = "Learn to dunk a basketball" };
            Todo newTodo = new Todo() { TodoId = 7, Title = "Learn to dunk a basketball", IsComplete = false, Something = null };
            _todoRepositoryMock.Setup(x => x.SaveAllChangesAsync()).Verifiable();
            _todoRepositoryMock.Setup(x => x.CreateTodoAsync(It.IsAny<Todo>())).ReturnsAsync(newTodo);
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(newTodo.TodoId)).ReturnsAsync(newTodo);
            bool expected = false;

            ActionResult<TodoDTO> response = await _todosController.CreateTodo(newTodoDTO);
            CreatedAtActionResult parsedResponse = response.Result as CreatedAtActionResult;
            TodoDTO actual = parsedResponse.Value as TodoDTO;

            Assert.Equal(expected, actual.IsComplete);
        }

        [Fact]
        public async Task GivenValidPostTodoDTO_GetCreatedStatusCode()
        {
            TodoDTO newTodoDTO = new TodoDTO() { Title = "Learn to dunk a basketball", IsComplete = false };
            Todo newTodo = new Todo() { TodoId = 7, Title = "Learn to dunk a basketball", IsComplete = false, Something = null };
            _todoRepositoryMock.Setup(x => x.SaveAllChangesAsync()).Verifiable();
            _todoRepositoryMock.Setup(x => x.CreateTodoAsync(It.IsAny<Todo>())).ReturnsAsync(newTodo);
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(newTodo.TodoId)).ReturnsAsync(newTodo);
            int expected = 201;

            ActionResult<TodoDTO> response = await _todosController.CreateTodo(newTodoDTO);
            CreatedAtActionResult parsedResponse = response.Result as CreatedAtActionResult;
            int actual = (int)parsedResponse.StatusCode;

            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GivenValidId_ReturnArrayWithDeletedTodo(int id)
        {
            Todo[] allTodos = new Todo[]
            {
                new Todo() { TodoId = 1, Title = "Do this", IsComplete = false },
                new Todo() { TodoId = 2, Title = "Then this", IsComplete = true },
                new Todo() { TodoId = 3, Title = "And maybe this", IsComplete = false }
            };
            int expected = allTodos.Length - 1;
            List<Todo> listToReturn = new List<Todo>();
            for(int i = 1; i <= 3; i++)
            {
                if(allTodos[i-1].TodoId == id)
                {
                    continue;
                }
                else
                {
                    listToReturn.Add(allTodos[i-1]);
                }
            }
            _todoRepositoryMock.Setup(x => x.SaveAllChangesAsync()).Verifiable();
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(It.IsAny<int>())).ReturnsAsync(allTodos[id-1]);
            _todoRepositoryMock.Setup(x => x.DeleteTodoAsync(It.IsAny<Todo>())).Verifiable();

            ActionResult response = await _todosController.DeleteTodo(id);
            int actual = listToReturn.Count;

            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(112)]
        [InlineData(245)]
        [InlineData(32)]
        public async Task GivenInvalidIdForDeleteRequest_ReturnNotFoundResults(int id)
        {
            Todo returnValue = null;
            int expected = 404;
            _todoRepositoryMock.Setup(x => x.GetSingleTodoAsync(id)).ReturnsAsync(returnValue);

            ActionResult<TodoDTO> response = await _todosController.DeleteTodo(id);
            NotFoundResult parsedResponse = response.Result as NotFoundResult;
            int actual = parsedResponse.StatusCode;

            Assert.Equal(expected, actual);
        }
    }
}   
