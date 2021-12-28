import { List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import { Todo } from "../../app/models/todo";
import TodoDashboard from "./TodoDashboard";

interface Props
{
  todos: Todo[];
  handleEdit: (todo: Todo) => void;
  handleDelete: (id: string) => void;
}

const TodoList = ({todos, handleDelete, handleEdit} : Props) => {
  return (
    <>
      <List>
        {
          todos.map(todo => (
            <ListItem key={todo.id}>
              <ListItemText>{todo.description}</ListItemText>
              <TodoDashboard handleEdit={handleEdit} handleDelete={handleDelete} todo={todo}/>
            </ListItem>
          ))
        }
      </List>
    </>
  )
}

export default TodoList;