using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoApi.Core.Entities;
using TodoApi.Core.Interfaces;
using TodoApi.Api.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace TodoApi.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper ;

        public TodosController(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;

        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<TodoDTO[]>> GetAllTodos([FromQuery] string username)
        {
            Todo[] response = await _todoRepository.GetAllTodosAsync(username);

            TodoDTO[] result = _mapper.Map<TodoDTO[]>(response);

            return Ok(result);
        }

        
        [HttpGet("{id}")]
        [Authorize]
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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TodoDTO>> CreateTodo(TodoDTO todo)
        {
            Todo newTodo = _mapper.Map<Todo>(todo);
            Todo response = await _todoRepository.CreateTodoAsync(newTodo);
            await _todoRepository.SaveAllChangesAsync();
            TodoDTO result = _mapper.Map<TodoDTO>(response);
            
            return CreatedAtAction(
            nameof(GetTodo),
            new { id = result.todoid },
            result);
        }
        
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            Todo todoToDelete = await _todoRepository.GetSingleTodoAsync(id);

            if (todoToDelete == null)
            {
                return NotFound();
            }

            _todoRepository.DeleteTodoAsync(todoToDelete);
            await _todoRepository.SaveAllChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateTodo(int id, TodoDTO todo)
        {
            if (id != todo.todoid)
            {
                return BadRequest();
            }

            Todo response = await _todoRepository.GetSingleTodoAsync(todo.todoid);

            if (response == null)
            {
                return NotFound();
            }

            Todo updatedTodo = _mapper.Map<Todo>(todo);
            _todoRepository.UpdateTodoAsync(updatedTodo);
            await _todoRepository.SaveAllChangesAsync();

            return Ok();
        }
    }
}
 