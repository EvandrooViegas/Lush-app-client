
import React, { useState, useEffect } from 'react'
import MonthSwipper from '../itens/Calendar/MonthSwipper'
import Axios from 'axios'
import '../../styles/Calendar.css'
import Day from '../itens/Calendar/Day'
import CalendarModal from '../itens/Calendar/CalendarModal'

function Calendar() {
  const [allEvents, setAllEvents] = useState([])
  const [author, setAuthor] = useState()

  const [year, setYear] = useState(new Date().getFullYear())

  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState()
  const [firstDayWeekIndex, setFirstDayWeekIndex] = useState()
  
  const [monthDays, setMonthDays]  = useState([])
  const [monthName, setMonthName] = useState('')
  const [monthNumber, setMonthNumber] = useState(0)

  
  const [daysHandler, setDaysHandler] = useState([])
  const [paddingDays, setPaddingDays] = useState()
  const [sortedWeekDays, setSortedWeekDays] = useState([])
  const [weekDays, setWeekDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [lastWeekDayMonth, setLastWeekDayMonth] = useState(monthDays.length) 
  const [displayDays, setDisplayDays] = useState()
  
  const [currentDate, setCurrentDate] = useState(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)
  const [calendarModalIsOpen, setCalendarModalIsOpen] = useState({isopen: false, date: undefined})

  

  useEffect(() => {

    const getDataFromDB = async () => {
      await Axios.get(`${process.env.REACT_APP_API_URL}/getevents`).then(res => {
        setAllEvents(res.data)
      
      })
    } 

    

    const daysArr = []
 

    let i = 1
    let counter = 1
    while(counter <= monthDays.length + paddingDays) {
      const dateString = `${i}/${monthNumber}/${year}`
      if(counter > paddingDays) {
        daysArr.push({
          day: i,
          date: dateString,
          value: 'day',

        })
        i++
      }  else {
        daysArr.push({
          value: 'padding',
          events: null
        })
      }
      counter++
    }
    setDaysHandler(daysArr)


    const getAuthorId = () => {
      const authorJSON = localStorage.getItem('userInfo')
      const authorInfo = JSON.parse(authorJSON)
      const authorID = authorInfo._id 
      setAuthor(authorID)

    }
    getAuthorId()
    getDataFromDB()
  }, [monthNumber, paddingDays])


  useEffect(()=>{
  }, [calendarModalIsOpen])
  return (
    
    
      <div className="calendarMain">
        <div className="topContainer">
          <h1>📆 {monthName}</h1>
          <MonthSwipper 
          weekDays={weekDays}
          setFirstDayOfTheWeek={setFirstDayOfTheWeek}

          setMonthDays={setMonthDays}
          setMonthName={setMonthName}
          setMonthNumber={setMonthNumber}
          monthNumber={monthNumber}

          setPaddingDays={setPaddingDays}
          paddingDays={paddingDays}
          setFirstDayWeekIndex={setFirstDayWeekIndex}
          />
        </div>

          
          <div className="weeks">
            {
              weekDays.map(week => (
                <div className='week' key={Math.floor(Math.random() * 100000000)}>
                  <p key={week}>{week}</p>
                </div> 
              ))
            }
          </div>


          <div className="calendar">
            {
              daysHandler.map(day => ( 
                <Day author={author} setAllEvents={setAllEvents} allEvents={allEvents} calendarModalIsOpen={calendarModalIsOpen} setCalendarModalIsOpen={setCalendarModalIsOpen} day={day} key={Math.random() * 1000000000} daysHandler={daysHandler} currentDate={currentDate}/>
              ))
            }
          </div>

          {
            calendarModalIsOpen.isopen ? 
            <CalendarModal setAllEvents={setAllEvents} allEvents={allEvents} author={author} setCalendarModalIsOpen={setCalendarModalIsOpen} calendarModalIsOpen={calendarModalIsOpen}/> : 
            ''
          }

      </div>
    
  )
}

export default Calendar