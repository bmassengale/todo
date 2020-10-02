using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoApi.Core.Entities;
using TodoApi.Core.Interfaces;
using TodoApi.Api.DTOs;

namespace TodoApi.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public TodosController(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<TodoDTO[]>> GetAllTodos()
        {
            Todo[] response = await _todoRepository.GetAllTodosAsync();

            TodoDTO[] result = _mapper.Map<TodoDTO[]>(response);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDTO>> GetTodo(int id)
        {
            Todo response = await _todoRepository.GetSingleTodoAsync(id);

            if(response == null)
            {
                return NotFound();
            }

            TodoDTO result = _mapper.Map<TodoDTO>(response);

            return Ok(result);
        }
    }
}
 