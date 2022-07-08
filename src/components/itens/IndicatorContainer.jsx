import React, { useState } from 'react'
import '../../styles/IndicatorContainer.css'
import IndicatorPicker from './IndicatorPicker'

function IndicatorContainer(props) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (

    <>
   
       {isOpen &&  <IndicatorPicker todo={props.todo} todoList={props.todoList} setTodoList={props.setTodoList}/>}
      <div className='indicatorContainer' onClick={() => setIsOpen(!isOpen)}>
        
          {props.todo.indicator === '🔴' && 
          <div className='indicatorContainerRed'>

          </div>
          }

          {props.todo.indicator === '🟠' && 
          <div className='indicatorContainerOrange'>
        
          </div>
          }

          {props.todo.indicator === '🟢' && 
          <div className='indicatorContainerGreen'>
      
          </div>
          
          }

          
      </div> 
      
      
    </>

      
    
  )
}

export default IndicatorContainer