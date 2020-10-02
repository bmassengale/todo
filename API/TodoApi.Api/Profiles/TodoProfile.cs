using AutoMapper;
using TodoApi.Api.DTOs;
using TodoApi.Core.Entities;

namespace TodoApi.Api.Profiles
{
    public class TodoProfile : Profile
    {
        public TodoProfile()
        {
            this.CreateMap<Todo, TodoDTO>();
        }
    }
}
