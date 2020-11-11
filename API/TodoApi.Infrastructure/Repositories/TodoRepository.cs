using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task<Todo[]> GetAllTodosAsync(string username)
        {
            Todo[] result = await _context.todos.Where(todo => todo.username.Equals(username)).ToArrayAsync();
            return result;
        }

        public async Task<Todo> GetSingleTodoAsync(int id)
        {
            Todo result = await _context.todos.Where(x => x.todoid == id)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            return result;
        }

        public async Task<Todo> CreateTodoAsync(Todo todo)
        {
            var response = await _context.todos.AddAsync(todo);
            Todo result = response.Entity;

            return result;
        }

        public void DeleteTodoAsync(Todo todo)
        {
             _context.Remove(todo);
        }

        public void UpdateTodoAsync(Todo todo)
        {
            _context.Update(todo);
        }

        public async Task SaveAllChangesAsync()
        {
            await _context.SaveChangesAsync(); 
        }
    }
}