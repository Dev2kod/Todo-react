import React, { useState } from 'react'

const Todoinput = (props) => {
  const {handleAddTodo,setTodoVal,todoVal}=props

  return (
    <header>
      <input type="text" placeholder='Enter your task' value={todoVal} onChange={(e)=>{setTodoVal(e.target.value)}}/>
      <button onClick={()=>{
        handleAddTodo(todoVal)
        setTodoVal('')
}}>add</button>
    </header>
  )
}

export default Todoinput