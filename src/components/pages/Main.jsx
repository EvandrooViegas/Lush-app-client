import {Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import "../../styles/Main.css"
function Dashboard() {
  const [inspirationalQuote, setInspirationalQuote] = useState()
  const [inspirationalQuoteAuthor, setInspirationalQuoteAuthor] = useState()
  const [userInfo, setUserInfo] = useState({})

  const [allIdea, setAllIdeas] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [allTasks, setAllTasks] = useState([])


  const [time, setTime] = useState()
  const [author, setAuthor] = useState()

  useEffect(() => {
    const getUserInfoFromLocalStorge = async () => {
      const userDataJSON = await localStorage.getItem("userInfo")
      const userDataObj = JSON.parse(userDataJSON)
      setUserInfo(userDataObj)
    } 
    const getInspirationalQuote = () => {
      Axios.get("https://api.quotable.io/random").then(res => {
        setInspirationalQuote(res.data.content)
        setInspirationalQuoteAuthor(res.data.author)
      })
    }
    const getTime = () => {
      setInterval(() => {
        const dt = new Date()
        let hr = dt.getHours()
        let min = dt.getMinutes()
        let sec = dt.getSeconds()
  
        setTime(`${hr}:${min}:${sec}`)

      }, 1000)
    }

    const getAllEvents = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/getevents`).then(res => {
        setAllEvents(res.data)
      })
    }

    const getAllIdeas = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/getideas`).then(res => {

        setAllIdeas(res.data)
      })
    }

    const getAllTasks = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/gettodo`).then(res => {
        setAllTasks(res.data)
      })
    }

    const getUserInfo = () => {
      const userInfoJSON = localStorage.getItem("userInfo")
      const userInfo = JSON.parse(userInfoJSON)
      setAuthor(userInfo)
    }


    getTime()
    getUserInfoFromLocalStorge()
    getInspirationalQuote()
    getAllEvents()
    getAllIdeas()
    getAllTasks()
    getUserInfo()
    
    
  }, [])
  const navigate = useNavigate()
  
  const logoutUser = () => {
    window.confirm("Are you sure?")
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const navigateTo = (page) => {
    navigate(`/${userInfo._id}/dashboard/${page}`)
  }

  return ( 
      <div className='main-contianer'>
        <div className="topsContainer">
          <div className="welcome-container">
            <h3>👉Welcome, {userInfo.name}</h3>
          </div>

          {/* <button onClick={logoutUser}>Logout</button> */}
          <div className="timeContainer">
            <p>{time}</p>
          </div>

        </div>


        <div className="inspirationalQuoteContainer">
          <p>{inspirationalQuote}</p>
          <p>by {inspirationalQuoteAuthor}</p>
        </div>

        <div className="contentContainer">
          <div className="ideas-container" onClick={() => navigateTo("keep")}>
            <h1>💡Idea</h1>
              {
                allIdea.map(idea => (
                      idea.author == author._id &&
                      idea.indicator == "🔴" &&
                      <div className="idea-container">
                        {
                          <p>{idea.text}</p>
                        }
                        
                      </div>
                ))
              }
           
          </div>
          <div className="tasks-container" onClick={() => navigateTo("todo")}>
            <h1>✅ Tasks</h1>
              {
                allTasks.map(task => (
                      task.author == author._id &&
                      task.indicator == "🔴" &&
                      <div className="task-container">
                        {
                          <p>{task.text}</p>
                        }
                        
                      </div>
                ))
              }
           
          </div>

          <div className="events-container" onClick={() => navigateTo("calendar")}>
            <h1>📅Events</h1>
              {
                allEvents.map(event => (
                  event.author == author._id &&
                  event.indicator == "Vermelho" &&
                      <div className="event-container">
                        {
                          <p>{event.text}</p>
                        }
                        
                      </div>
                ))
              }
           
          </div>

          
        </div>
      </div>
      
  );
}

export default Dashboard;
