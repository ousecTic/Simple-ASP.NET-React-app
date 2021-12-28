using Domain;
using MediatR;
using Persistence;

namespace Application.Todos
{
  public class Edit
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
        var todo = await _dbContext.Todos.FindAsync(request.Todo.Id);

        todo.Description = request.Todo.Description;

        await _dbContext.SaveChangesAsync();

        return Unit.Value;
      }
    }

  }
}