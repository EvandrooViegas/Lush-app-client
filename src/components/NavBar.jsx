import React from 'react'
import {Link} from 'react-router-dom'
import Todo from './pages/Todo'
import Calendar from './pages/Calendar'
import Keep from './pages/Keep'
import { useEffect, useState } from 'react'
import {HiOutlineMenu} from 'react-icons/hi'
import '../styles/Navbar.css'
import Popup from './itens/Popup'
import logo from '../images/retha-logo.png'

import {RiDashboardLine} from 'react-icons/ri'
import {GoCalendar} from 'react-icons/go'
import {BsLightbulb} from 'react-icons/bs'
import {RiTaskLine} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {FiSettings} from 'react-icons/fi'
import {Outlet, useNavigate} from 'react-router-dom'
import {RiLogoutBoxRLine} from 'react-icons/ri'


function NavBar() {
  
  const [openNavBar, setOpenNavBar] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()
  const [isOpenPopUp, setIsOpenPopUp] = useState({
    isopen: false,
    text: "",
    type: undefined
  })


  useEffect(() => {
    const getUserInfoFromLocalStorge = async () => {
      const userDataJSON = await localStorage.getItem("userInfo")
      const userDataObj = JSON.parse(userDataJSON)
      setUserInfo(userDataObj)
    } 
    getUserInfoFromLocalStorge()
  }, [])

  const logoutUser = () => {
    setIsOpenPopUp({
      isopen: true,
      text: "Are you sure?",
      type: "alert"
    })

    
  }

  useEffect(() => {
    if(isOpenPopUp.response == "close") {
      localStorage.removeItem("userInfo")
      navigate("/")
      
    }
  }, [isOpenPopUp])


  return (
    <>
    <div className={openNavBar ? "navbarContainerOpen" : "navbarContainer"}>
      {
        isOpenPopUp.isopen && 
        <Popup setIsOpenPopUp={setIsOpenPopUp} type={isOpenPopUp.type} text={isOpenPopUp.text}/>
      }
        {
          !openNavBar &&
          <div className="openButtonContainer">
            <button className='openBtn'><HiOutlineMenu onClick={() => setOpenNavBar(true)}/></button>
          </div>
        }
        {
          openNavBar &&
          <div className="navbarContentContainer">
            <div className="topContainer">
              <div className="logoContainer">
                <span><img src={logo} alt="" width="50px"/></span>
                <span className='retha'>Retha</span>
              </div>
              
              <button className='closeBtn'><HiOutlineMenu onClick={() => setOpenNavBar(false)}/></button>
            </div>
            <div className="topLinks">
                <Link to='main'>
                <div className="link">
                  <RiDashboardLine /><span> Dashboard</span>
                </div>
                </Link>
              
              
                <Link to='todo'><div className="link"><RiTaskLine /><span> Tasks</span></div></Link>

              
              

                <Link to='calendar'><div className="link"><GoCalendar /><span> Calendar</span></div></Link>
              
              
                <Link to='keep'><div className="link"><BsLightbulb /><span> Ideas</span></div></Link>

              
            </div>

            <div className="bottomLinks" onClick={logoutUser}>
              <span>
                <li><button className='logoutBtn'><RiLogoutBoxRLine /><span> Logout</span></button></li>
              </span>
            </div>
          </div>
        }
    </div>
    </>
  )
}

export default NavBar