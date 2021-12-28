using Domain;
using MediatR;
using Persistence;

namespace Application.Todos
{
  public class Create
  {
    public class Command : IRequest
    {
      public Todo Todo { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _dbContext;
      public Handler(DataContext dbContext)
      {
        _dbContext = dbContext;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        _dbContext.Todos.Add(request.Todo);
        await _dbContext.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}