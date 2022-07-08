import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import {useState} from 'react'
import '../../../styles/MonthSwipper.css'
function MonthSwipper(props) {
    const setPaddingDays = props.setPaddingDays
    const paddingDays = props.paddingDays
    const setFirstDayWeekIndex = props.setFirstDayWeekIndex
    const setFirstDayOfTheWeek = props.setFirstDayOfTheWeek
    const weekDays = props.weekDays
    const setMonthDays = props.setMonthDays
    const setMonthName = props.setMonthName
    const setMonthNumber = props.setMonthNumber
    const monthNumber = props.monthNumber
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const [month, setMonth] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    const [defaultValueMonth, setDefaultValueMonth] = useState('')
    const selectRef = useRef()
    useEffect(() => {   

        var dt = new Date()
        var monthDate= dt.getMonth()
        setDefaultValueMonth(month)
        setMonthNumber(currentMonth)

        if(currentMonth) {

            let counter = 0
            var dt = new Date();
            var year = dt.getFullYear();
            var daysInMonth = new Date(year, currentMonth, 0).getDate();
            let allDaysofMonth = []
    
            while(allDaysofMonth.length != daysInMonth) {
                counter = counter + 1
                allDaysofMonth.push(counter)
            }

            setMonthDays(allDaysofMonth)
            setMonthName(month[currentMonth - 1])
       
         
        }
        const getFirstDayOfTheWeek = () => {
            
            const date = new Date()
            const currentYear = date.getFullYear()
            const firstDayOfTheWeek = new Date(currentYear, currentMonth - 1, 1)
            
            const dateString = firstDayOfTheWeek.toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })

            const firstDayOfTheWeekIndex = weekDays.indexOf(dateString.split(', ')[0])
            const firstDayOfTheWeekName = weekDays[firstDayOfTheWeekIndex]
            setFirstDayOfTheWeek(firstDayOfTheWeekName)
            setFirstDayWeekIndex(firstDayOfTheWeekIndex)

            const paddingDaysValue = weekDays.indexOf(dateString.split(', ')[0])
            setPaddingDays(paddingDaysValue)
            
        }
        getFirstDayOfTheWeek()
    }, [])

    useEffect(() => {
        const date = new Date()
        const currentYear = date.getFullYear()
        const firstDayOfTheWeek = new Date(currentYear, monthNumber - 1, 1)
        
        const dateString = firstDayOfTheWeek.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })

        const firstDayOfTheWeekIndex = weekDays.indexOf(dateString.split(', ')[0])
        const firstDayOfTheWeekName = weekDays[firstDayOfTheWeekIndex]
        
        setFirstDayOfTheWeek(firstDayOfTheWeekName)
        const paddingDaysValue = weekDays.indexOf(dateString.split(', ')[0])
        setPaddingDays(paddingDaysValue)

    }, [monthNumber])
    

    const selectOnchangeHandler = (e) => {
        
        //month Days
        let counter = 0
        var dt = new Date();
        var year = dt.getFullYear();
        var daysInMonth = new Date(year, e.target.value, 0).getDate();
        let allDaysofMonth = []

        while(allDaysofMonth.length != daysInMonth) {
            counter = counter + 1
            allDaysofMonth.push(counter)
        }
        setMonthDays(allDaysofMonth)
        setMonthNumber(e.target.value)
  
        //month Name
        setMonthName(month[e.target.value - 1])

        
    }




  return (
    <>
        <select name="" id="" onChange={(e) => selectOnchangeHandler(e)} defaultValue={currentMonth} className='selectContainer' ref={selectRef}>
            <option value="none">Select The Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">Setember</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </>
  )
}

export default MonthSwipper