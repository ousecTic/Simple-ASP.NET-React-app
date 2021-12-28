import { Box, Button, Grid, ListItemButton, Modal, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Todo } from "../../app/models/todo";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props{
  todo: Todo;
  handleEdit: (todo: Todo) => void;
  handleDelete: (id: string) => void;
}

const TodoDashboard = ({handleEdit, handleDelete, todo}: Props) => {

  const [selectedTodo, setSelectedTodo] = useState(todo);
  const [editOpen, setEditOpen] = useState(false);
  const handleOpen = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedTodo({ ...selectedTodo, [name]: value });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button>
            <ListItemButton onClick={handleOpen}>Edit</ListItemButton>
          </Button>
        </Grid>
        <Modal open={editOpen} onClose={handleClose}>
          <Box sx={style}>
            <TextField id="outlined-basic" label="What do you need to do?" variant="outlined" name="description" value={selectedTodo.description} onChange={handleInputChange}/>
            <Button variant="contained" onClick={() => {
              handleEdit(selectedTodo);
              setEditOpen(false);
            }}>Edit</Button>
          </Box>
        </Modal>
        <Grid item xs={6}>
          <Button>
            <ListItemButton onClick={() => handleDelete(todo.id)}>Completed</ListItemButton>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default TodoDashboard;