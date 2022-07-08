import React, { useEffect, useState } from 'react'
import '../../../styles/Day.css'
import {MdAdd} from 'react-icons/md'
import Axios from 'axios'

function Day({day, daysHandler, currentDate, setCalendarModalIsOpen, calendarModalIsOpen, setAllEvents, allEvents, author}) {

  const addTask = (date) => {
    setCalendarModalIsOpen({isopen: true, date: date})  
  }

  const openModal = (event) => {
    setCalendarModalIsOpen({isopen: true, date: event.date, event: event})  
  }


  return (
    <div className='dayContainer' key={Math.floor(Math.random() * 100000000)}>
      <>
        {
          <>
            {
            day.value == 'day' && 
              <div className="day">
                  <div className="top">
                  {
                    day.date == currentDate ?
                    <p className='currentDate'>{day.day}</p> :
                    <p className='date'>{day.day}</p>
                  }
                  <div className="addEventButton">
                    <button onClick={() => addTask(day.date)} className="addButton"><MdAdd /></button>
                  </div>
                </div>
                

                <div className="eventsListContainer">
                  {
                    allEvents.map(event => (
                      event.author == author &&
                      event.date == day.date &&
                      <div className="eventContainer" onClick={() => openModal(event)}>
                        <div className="indicators">
                            {event.indicator === 'Vermelho' && 
                            <div className='indicatorContainerRed'>

                            </div>
                            }

                            {event.indicator === 'Laranja' && 
                            <div className='indicatorContainerOrange'>
                          
                            </div>
                            }

                            {event.indicator === 'Verde' && 
                            <div className='indicatorContainerGreen'>
                        
                            </div>
                            
                          } 
                        </div>
                        <div className="text">
                          {event.text}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </>
        }

        {
            day.value == 'padding' &&
            <div className="padding">
            
            </div>
        }
      </>

      
    </div>
  )
}

export default Day