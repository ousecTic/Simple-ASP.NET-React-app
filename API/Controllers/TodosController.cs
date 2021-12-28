using Application.Todos;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
  public class TodosController : BaseApiController
  {
    private readonly DataContext _dbContext;

    public TodosController(DataContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo(Todo todo)
    {

      return Ok(await Mediator.Send(new Create.Command { Todo = todo }));
    }

    [HttpGet]

    public async Task<ActionResult<List<Todo>>> GetTodos()
    {
      return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTodo(Guid id, Todo todo)
    {

      todo.Id = id;
      return Ok(await Mediator.Send(new Edit.Command { Todo = todo }));
    }

    [HttpDelete("{id}")]

    public async Task<ActionResult> DeleteTodo(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}