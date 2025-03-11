import React from "react"
import Todolist from "./components/Todolist"
import Todoinput from "./components/Todoinput"
import { useState,useEffect } from "react"

const App=() =>{
  const [todos,setTodos]= useState([]);

  const [todoVal, setTodoVal] = useState('')
  
  const persistdata = (newList)=>{
    localStorage.setItem('todos',JSON.stringify({
      todos: newList
    }))
  }

  const handleAddTodo=(newTodo)=>{
    const newList = [...todos,newTodo];
    persistdata(newList);
    setTodos(newList);
  }

  const handleDeleteTodo =(index)=>{
    const newtodo = todos.filter((todo,todoIndex)=>{
      return todoIndex !== index;
    });
    persistdata(newtodo);
    setTodos(newtodo);
  }

  const handleEditTodo=(index)=>{
    const valuetobeEdited = todos[index]
    setTodoVal(valuetobeEdited);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if(!localStorage){
      return;
    }

    let localtodos = localStorage.getItem('todos')
    if(!localtodos){
      return;
    }

    localtodos = JSON.parse(localtodos).todos;
    setTodos(localtodos);
  }, [todos])
  

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
