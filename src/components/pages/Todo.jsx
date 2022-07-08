import React, { useState, useEffect } from 'react'

import Axios from 'axios'
import newTodoTextValue from '../itens/IndicatorPopup'

//Icons
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi'
import {RiAddLine, RiCoinsLine} from 'react-icons/ri'
//Style
import '../../styles/Todo.css'
import IndicatorContainer from '../itens/IndicatorContainer'





//Itens
import Popup from '../itens/Popup';
function Todo() {

  //Pop controller 
  const [isOpenPopUp, setIsOpenPopUp] = useState({
    isopen: false,
    text: "",
    type: undefined
  })
  //Todo List
  const [todoList, setTodoList] = useState([])

  //Todo
  const [text, setText] = useState('')
  const [isCompleted, setIsCompleted] = useState('false')
  const [author, setAuthor] = useState('')
  const [indicator, setIndicator] = useState()


  const [newIndicator, setNewIndicator] = useState('')
  //User
  const [userInfo, setUserInfo] = useState({})
  const [userTodoList, setUserTodoList] = useState([])

  //Indicator
  const [isOpen, setIsOpen] = useState(false)


  //Todo Infos

  const [allTodos, setAllTodos] = useState([])
  const [cloneList, setCloneList] = useState(todoList)
  
  //change text value
  const  [newInputTextValue, setNewInputTextValue] = useState('')
  const [isOpenModalText, setIsOpenModalText] = useState(false)

  //Input


  useEffect(() => {

    
    const getUserInfoFromLocalStorge = async () => {
      const userDataJSON = await localStorage.getItem("userInfo")
      const userDataObj = JSON.parse(userDataJSON)
      setUserInfo(userDataObj)
      await setAuthor(userDataObj._id)
    }   
    
    const getTodoListDataFromDB = async () => {
      try { 
        await Axios.get(`${process.env.REACT_APP_API_URL}/gettodo`)
        .then(res => {
          const data = res.data
          setTodoList(data)

          //
          let tempList = []
          todoList.map(todo => {
            if(todo.author === userInfo._id) {
              // console.log("aaaaa")
              tempList.push(todo) 
              setUserTodoList(tempList)
              setAllTodos(todoList)
              
              // console.log(userTodoList)
            }
          })
  
        })
        .catch(err => console.log(err))

      } catch(error) {
        console.log(error)
      }
    }

    getUserInfoFromLocalStorge()
    getTodoListDataFromDB()
    // addProptyToTodoList()
    // getAllTodosClassInfo()
  }, [])




  const addTodoListToDB = async (e) => {
    e.preventDefault()

    setIsCompleted('false') 
    if(text) {
      try {
        Axios.post(`${process.env.REACT_APP_API_URL}/addtodo`, {text, isCompleted, author, indicator}).then(res => {
          const todoId = res.data._id
          setTodoList([...todoList, {text, isCompleted, author, indicator, _id: todoId}])
    
        })
      } catch (error) {
        console.log(error) 
      }
    } else {

       setIsOpenPopUp({
         isopen: true,
         text: "You must write something",
         type: "danger"
       })
   
    }
    setText('')
    
  }
  //Options Todo
  function getInputValue(e) {
    setText(e.target.value)
  }

  const deleteTodo = (id) => {
    const tempList = []
    const tempListUser = []
    todoList.map(todo => {
      if(todo._id != id) {
        tempList.push(todo)
        if(todo._id == userInfo._id) {
          tempListUser.push(todo)
        }
      }
    })
    setTodoList(tempList)
    Axios.delete(`${process.env.REACT_APP_API_URL}/deletetodo/${id}`).then(() => {
      setTodoList(tempList)
      setUserTodoList(tempListUser)
    })
  }

  const updateTodo = (todo, e) => {

    let input = e.target
    let inputValue = input.value

    console.log(inputValue)

  
    const id = todo._id
    const newTodoTextValue = inputValue

    
    if(inputValue) {
        todo.text = inputValue
        setTodoList([...todoList])
        console.log(inputValue)
        Axios.put(`${process.env.REACT_APP_API_URL}/updatetodo`, {id, newTodoTextValue}).then((res) => {
          setTodoList([...todoList, {text: inputValue, _id: todo._id, isCompleted: todo.isCompleted, author: todo.author, indicator: todo.indicator}])
        })
      } 

      
    }
   
    


 

  return (
    <div>

      {isOpenPopUp.isopen == true ? <Popup text={isOpenPopUp.text} type={isOpenPopUp.type} setIsOpenPopUp={setIsOpenPopUp}/> : ""}
     
      <div className="mainTodo">
        <div className="formContainer">
        <h1>✅ Tasks</h1>
          <div className="inputContainer">
            <div className="todoConfigContainer">
              <input className="inputTodo" onChange={getInputValue} value={text}/>

              <div className="todoConfigContainerOthers">
                <button text="Adicionar" onClick={addTodoListToDB} className="buttonTodo">+</button>
                {/* <button text="Adicionar" onClick={addTodoListToDB} className="buttonTodo"><RiAddLine /></button> */}
                <select value={indicator} onChange={e => setIndicator(e.target.value)} className="selectTodo">
                  <option className='optionIndicator'>No Indicator</option>
                  <option className='optionIndicator'>🔴</option>
                  <option className='optionIndicator'>🟠</option>
                  <option className='optionIndicator'>🟢</option>
                </select>
              </div>
          
            </div>
            

            <div className="todoListContainer">
            
              
            {

              todoList.map(todo => (    
        
                userInfo._id == todo.author
                &&
    
                <div className='todoContainer' key={todo._id}> 
                    <div className="textContainer">
                
                      <input type="text" defaultValue={todo.text} onChange={(e) => updateTodo(todo, e)} className='textInput'/>
                      {/* {console.log(todo)} */}
                    </div>
                    <div className="optionsContainer">
                      <button onClick={() => deleteTodo(todo._id)} className="deleteBtn"><MdOutlineDeleteOutline /></button>
                      {todo.indicator 
                      &&
                      <>
                       <IndicatorContainer todo={todo} todoList={todoList} setTodoList={setTodoList}/> 
                      </>
                      }
                    </div>       
                  </div>              
                
              ))
            }
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo