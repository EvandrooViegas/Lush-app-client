import React from 'react'
import '../../../styles/CalendarModal.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {RiDeleteBin7Line} from 'react-icons/ri'
import Axios from 'axios'
import {useState} from 'react'
import { useEffect } from 'react'
import Popup from '../Popup'
import {MdAdd} from 'react-icons/md'
import KeepChooser from '../KeepChooser'
const { convert } = require('html-to-text');


function CalendarModal({setCalendarModalIsOpen, calendarModalIsOpen, author, setAllEvents, allEvents}) {
  
  const [eventText, setEventText] = useState()
  const [eventDescription, setEventDescription] = useState()
  const [eventIndicator, setEventIndicator] = useState()

  const [indicator, setIndicator] = useState(undefined)
  const [text, setText] = useState(calendarModalIsOpen.event ? calendarModalIsOpen.event.text : '')
  const [description, setDescription] = useState(calendarModalIsOpen.event ? calendarModalIsOpen.event.description : '')
  const [indicatorColor, setIndicatorColor] = useState(calendarModalIsOpen.event ? calendarModalIsOpen.event.indicator : "No Indicator")

  const [date, setDate] = useState()
  const [isOpenPopUp, setIsOpenPopUp] = useState({isopen: false, text: "", type: undefined})
  const [showEditableDiv, setShowEditableDiv] = useState(false)

  const [KeepChooserIsOpen, setKeepChooserIsOpen] = useState({isopen: false, description: undefined, event: undefined})
  const [allIdeas, setAllIdeas] = useState([])

    useEffect(() => {
      setDate(calendarModalIsOpen.date)
    }, [calendarModalIsOpen])

    const closeModal = () => {
      setCalendarModalIsOpen({isopen: false, date: undefined})
    }
    const addEvent = async () => {

      if(text) {
        await Axios.post(`${process.env.REACT_APP_API_URL}/addevent`, {text, description, author, indicator, date}).then(res => {

          const newEvent = res.data
          console.log(newEvent)
          setAllEvents([...allEvents, newEvent])
        })
        setCalendarModalIsOpen({isopen: false, date: date})
      } else {
        setIsOpenPopUp({isopen: true, text:"No title given", type: "danger"})
      }
    }
    const deleteEvent = async (event) => {
      setCalendarModalIsOpen({isopen: false, date: date})
      await Axios.delete(`${process.env.REACT_APP_API_URL}/deleteevent/${event._id}`).then(res => {
        const tempList = []
        const id = event._id
        allEvents.map(event => {
          if(event._id != id) {
            tempList.push(event)
          }
        })
        setAllEvents(tempList)
      })
    }

    const updateButton = (event) => {
      
      const eventId = event._id
     

        Axios.put(`${process.env.REACT_APP_API_URL}/updateevent`, {id: eventId, text, description, indicator: indicatorColor}).then(res =>{
          allEvents.map(event => {
            if(event._id == res.data._id) {
              event.text = text 
              event.description = description 
              event.indicator = indicatorColor
            }
          })
  
          setAllEvents([...allEvents])
          
        })      
        setCalendarModalIsOpen({isopen: false, date: undefined})
      
    }

    const updateButtonWithKeep = (event) => {

      var keepText = KeepChooserIsOpen.idea.description.replace(/<[^>]+>/g, '');
      const eventId = event._id
      console.log(keepText)
    
   
        Axios.put(`${process.env.REACT_APP_API_URL}/updateevent`, {id: eventId, text, description: keepText, indicator: indicatorColor}).then(res =>{
          allEvents.map(event => {
            if(event._id == res.data._id) {
              event.text = text 
              event.description = keepText
              event.indicator = indicatorColor
            }
          })
  
          setAllEvents([...allEvents])
          
        })      
        setCalendarModalIsOpen({isopen: false, date: undefined})
    }

    useEffect(() => {
      if(KeepChooserIsOpen.idea) {
        console.log(KeepChooserIsOpen.event)
        setDescription(KeepChooserIsOpen.idea.description)
        updateButtonWithKeep(KeepChooserIsOpen.event)
      }
    }, [KeepChooserIsOpen])
  return (
   
    <div className="mainModalContianer">
 
      {
        calendarModalIsOpen.event 
        ? 
        <div className='calendarModalMain'>
            {
              KeepChooserIsOpen.isopen && 
              <KeepChooser KeepChooserIsOpen={KeepChooserIsOpen} setKeepChooserIsOpen={setKeepChooserIsOpen} event={calendarModalIsOpen.event}/>
            }
            <button onClick={closeModal} className='closeButton'><BsFillArrowRightCircleFill /></button>
            <div className="form">
              <input type="text" className='inputArea' defaultValue={calendarModalIsOpen.event.text} onChange={(e) => setText(e.target.value)}/>

              <textarea name="" id="" cols="30" rows="10" className='descriptionBox' defaultValue={description} onChange={(e) => setDescription(e.target.value)}>
              </textarea>

              <br />

              <div className="bottomContainer">
                <div className="optionContainer">
        
                  <select name="" id="" className='indicatorSelector' defaultValue={indicatorColor} onChange={e => setIndicatorColor(e.target.value)}>
                    <option>{indicatorColor}</option>
                    <option value="Vermelho">🔴</option>
                    <option value="Verde">🟢</option>
                    <option value="Laranja">🟠</option>
                  </select> 

                  <button className='deleteButton' onClick={() => deleteEvent(calendarModalIsOpen.event)}><RiDeleteBin7Line /></button>
                  
                </div>
                <div className="rightBtns">
                    <button onClick={() => setKeepChooserIsOpen({isopen: true, idea: undefined, event: calendarModalIsOpen.event})} className="addKeepBtn">Add a Idea</button>
                  <button className='updateButton' onClick={() => updateButton(calendarModalIsOpen.event)}>Update</button>
                </div>
              </div>
            </div>

            {
              isOpenPopUp.isopen ? <Popup setIsOpenPopUp={setIsOpenPopUp} type={isOpenPopUp.type} text={isOpenPopUp.text} isopen={isOpenPopUp.isopen}/> : null
            }
            
        </div>
        :
        <div className='calendarModalMain'>
            <button onClick={closeModal} className='closeButton'><BsFillArrowRightCircleFill /></button>
            <div className="form">
              <input type="text" name="" id="" className='inputArea' placeholder='Add a title' onChange={e => setText(e.target.value)}/>
              <textarea name="" id="" cols="30" rows="10" className='descriptionBox' placeholder='Description...' onChange={e => setDescription(e.target.value)}>
              </textarea>
              <br />

              <div className="bottomContainer">
                <select name="" id="" className='indicatorSelector' onChange={e => setIndicator(e.target.value)}>
                  <option value="undefined">No indicator</option>
                  <option value="Vermelho">🔴</option>
                  <option value="Verde">🟢</option>
                  <option value="Laranja">🟠</option>
                </select>
                <button className='addButton' onClick={addEvent}>Add</button>
              </div>
            </div>

            {
              isOpenPopUp.isopen ? <Popup setIsOpenPopUp={setIsOpenPopUp} type={isOpenPopUp.type} text={isOpenPopUp.text} isopen={isOpenPopUp.isopen}/> : null
            }
            
        </div>

        
      }
    </div>
  )
}

export default CalendarModal