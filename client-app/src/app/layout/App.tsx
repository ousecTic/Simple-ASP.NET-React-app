import { Container } from '@mui/material';
import React,{useEffect, useState} from 'react';
import NavBar from './NavBar';
import TodoForm from "../../features/form/TodoForm"
import './style.css';
import agent from '../api/agent';
import { Todo } from '../models/todo';
import TodoList from '../../features/dashboard/TodoList';
import {v4 as uuid} from "uuid";

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const data = await agent.Todos.list();
    setTodos(data);
  }

  useEffect(() => {
    try {
      fetchTodos();
    } catch (error) {
      console.error(error)
    }
  }, []);


  const handleCreate = async (todo : Todo) => {
    try {
      todo.id = uuid();
      await agent.Todos.create(todo);
      setTodos([...todos, todo]);
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (todo: Todo) => {
    try {
      await agent.Todos.update(todo);
      setTodos([...todos.filter(x => x.id !== todo.id), todo])
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await agent.Todos.delete(id);
      setTodos([...todos.filter(x => x.id !== id)]);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <TodoForm handleCreate={handleCreate}/>
        <TodoList todos={todos} handleEdit={handleEdit} handleDelete={handleDelete} />
      </Container>
    </>
  );
}

export default App;
