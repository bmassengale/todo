using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TodoApi.Core.Entities;
using TodoApi.Core.Interfaces;
using TodoApi.Infrastructure.Contexts;

namespace TodoApi.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<Todo[]> GetAllTodosAsync()
        {
            Todo[] result = await _context.Todos.ToArrayAsync();
            return result;
        }

        public async Task<Todo> GetSingleTodoAsync(int id)
        {
            Todo result = await _context.Todos.FindAsync(id);
            return result;
        }

        public async Task<Todo> CreateTodoAsync(Todo todo)
        {
            var something = await _context.Todos.AddAsync(todo);
            Todo something2 = something.Entity;

            return something2;
        }

        public async Task RemoveTodoAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Todo> UpdateTodoAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task SaveAllChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}