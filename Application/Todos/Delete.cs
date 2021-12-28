using MediatR;
using Persistence;

namespace Application.Todos
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
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
        var todo = await _dbContext.Todos.FindAsync(request.Id);
        _dbContext.Remove(todo);

        await _dbContext.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}