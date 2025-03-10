import React from 'react'

const Todocard  = (props) => {
  const {children,handleDeleteTodo,handleEditTodo}=props
  const {index}=props
  return (
    <li className='todoItem'>
      {children}
      <div className='actionsContainer'>
        <i className="fa-solid fa-pen-to-square" onClick={()=>{handleEditTodo(index)}}></i>
        <i className="fa-solid fa-trash" onClick={()=>{
          handleDeleteTodo(index)
        }}></i>
    </div>
  </li>
)
}

export default Todocard