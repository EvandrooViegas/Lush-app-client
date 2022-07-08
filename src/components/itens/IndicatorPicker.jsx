import React from 'react'
import '../../styles/IndicatorPicker.css'
import Axios from 'axios'
import newTodoTextValue from '../itens/IndicatorPopup'

function IndicatorPicker(props) {
    let todo = props.todo
    let setTodoList = props.setTodoList
    let todoList = props.todoList

    //Todo Info
    let _id = todo._id
    let text = todo.text
    let indicator = todo.indicator
    let isCompleted = todo.isCompleted
    let author = todo.author

    const changeIndicator = async (e) => {
        
        const indicator = e
     
        const todoId = todo._id
        const newIndicator = indicator
 
        let todoToUpdate = todo
        todoToUpdate.indicator = newIndicator
        setTodoList([...todoList])

        await Axios.post('http://localhost:3001/updateindicator', {indicator, todoId}).then((res) => {
          setTodoList([...todoList], {_id: todoId, text, indicator: indicator, isCompleted, author})
        })
        
    }
  return (
    <>
        <div className="indicatorButtons">
            <button value='🔴' onClick={(e) => changeIndicator(e.target.value)} className="vermelhoIndicator"></button>
            <button value='🟠' onClick={(e) => changeIndicator(e.target.value)} className="laranjaIndicator"></button>
            <button value='🟢' onClick={(e) => changeIndicator(e.target.value)} className="verdeIndicator"></button>
        </div>
    </>
  )
}

export default IndicatorPicker