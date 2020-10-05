using System.Threading.Tasks;
using TodoApi.Core.Entities;

namespace TodoApi.Core.Interfaces
{
    public interface ITodoRepository
    {
        Task<Todo[]> GetAllTodosAsync();
        Task<Todo> GetSingleTodoAsync(int id);
        Task<Todo> UpdateTodoAsync();
        Task<Todo> CreateTodoAsync(Todo todo);
        void DeleteTodoAsync(Todo todo);
        Task SaveAllChangesAsync();
    }
}
