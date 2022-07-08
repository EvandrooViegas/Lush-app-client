import {useNavigate} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import logo from '../images/retha-logo.png'
import '../styles/Home.css'
import ilustration from '../images/todolist.jpg'
import { useState,useEffect } from 'react'
import Axios from 'axios'
function Dashboard() {

  const [userInfo, setUserInfo] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const getUserInfo = () => {
      const userInfoJSON = localStorage.getItem("userInfo")
      const userInfoObj = JSON.parse(userInfoJSON)
      setUserInfo(userInfoObj)
    } 
    getUserInfo()

   
  }, [])

  useEffect(() => {
    if(userInfo) {
      navigate(`/${userInfo._id}/dashboard/main`)
    }
  }, [userInfo])
  
  const redirectSignupPage = () => {
    navigate("/signup")
  }
  const redirectLoginPage = () => {
    navigate("/login")
  }
  return ( 
      <div className='home-main'>
        <div className="topContainer">
          <div className="logoContainer">
            <img src={logo} alt="" width="90px"/>
          </div>
          <div className="authContainer">
            <button className='loginBtn' onClick={redirectLoginPage}>Login</button>
            <button className='createAccountBtn' onClick={redirectSignupPage}>Create Account</button>
          </div>
        </div>

        <div className="bottomContainer">
          <div className="contentContainer">
            <div className="leftContainer">
              <div className="title">
                <h1>Welocome 😀</h1>
                <p>📑Organize your work and life</p>
                <p>Simple organization app</p>
                
              </div>
              <div className="list">
                <h2>This app Includes: </h2>
                <p>- Tasks List app✅</p>
                <p>- Ideas app💡</p>
                <p>- Calendar app 📆</p>

              </div>
           

              <div className='buttonContainer' onClick={redirectSignupPage}>
                <p>Start using <strong>Now</strong></p>
                <p className='arrow'><BsArrowRight /></p> 
              </div>
            </div>

            <div className="rightContainer">
              <img src={ilustration} alt="" width="500px"/>
            </div>
          </div>

          <div className="footer">
            
          </div>
        </div>

        {/* <button onClick={redirectSignupPage}>Sign UP</button> */}
      </div>
      
  );
}

export default Dashboard;
