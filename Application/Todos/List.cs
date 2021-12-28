using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Todos
{
  public class List
  {
    public class Query : IRequest<List<Todo>> { }

    public class Handler : IRequestHandler<Query, List<Todo>>
    {
      private readonly DataContext _dbContext;
      public Handler(DataContext dbContext)
      {
        _dbContext = dbContext;

      }

      public async Task<List<Todo>> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _dbContext.Todos.ToListAsync();
      }
    }
  }
}