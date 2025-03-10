import React from "react"
import Todolist from "./components/Todolist"
import Todocard from "./components/Todocard"
import Todoinput from "./components/Todoinput"
import { useState } from "react"

const App=() =>{
  const [todos,setTodos]= useState([
    "go to gym",
    "execute the projects",
    "learn new techs"
  ]);

  const [todoVal, setTodoVal] = useState('')
  
  const handleAddTodo=(newTodo)=>{
    const newList = [...todos,newTodo];
    setTodos(newList);
  }

  const handleDeleteTodo =(index)=>{
    const newtodo = todos.filter((todo,todoIndex)=>{
      return todoIndex !== index;
    });
    setTodos(newtodo);
  }

  const handleEditTodo=(index)=>{
    const valuetobeEdited = todos[index]
    setTodoVal(valuetobeEdited);
    handleDeleteTodo(index);
  }

  return (
    <>
    <Todoinput todoVal={todoVal} setTodoVal={setTodoVal} handleAddTodo={handleAddTodo}/>
  <main>
    <Todolist todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/> 
  </main>
  </>
  )
}

export default App
