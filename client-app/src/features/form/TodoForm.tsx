import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React,{ChangeEvent, useState} from "react";
import { Todo } from "../../app/models/todo";

interface Props{
  handleCreate: (todo: Todo) => void;
}

const TodoForm = ({ handleCreate }: Props) => {

  const InitialState = {
    id: "",
    description: ""
  }
  
  const [todo, setTodo] = useState(InitialState);

  const handleSubmit = () => {
    handleCreate(todo);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  }

  return (
    <>
      <Box component="form">
        <TextField id="outlined-basic" label="What do you need to do?" variant="outlined" value={todo.description} name="description" onChange={handleInputChange}/>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </Box>
    </>
  )
}

export default TodoForm;