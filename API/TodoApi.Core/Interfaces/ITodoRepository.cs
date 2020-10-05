using System.Threading.Tasks;
using TodoApi.Core.Entities;

namespace TodoApi.Core.Interfaces
{
    public interface ITodoRepository
    {
        Task<Todo[]> GetAllTodosAsync();
        Task<Todo> GetSingleTodoAsync(int id);
        void UpdateTodoAsync(Todo todo);
        Task<Todo> CreateTodoAsync(Todo todo);
        void DeleteTodoAsync(Todo todo);
        Task SaveAllChangesAsync();
    }
}
