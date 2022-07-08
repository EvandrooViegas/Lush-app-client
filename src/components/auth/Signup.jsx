import { useState } from "react";
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/Signup.css'
import {BsArrowRight} from 'react-icons/bs'
import img from '../../images/signupImage.png'
import rethaLogo from '../../images/retha-logo.png'
import Popup from '../itens/Popup'
function App() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [userUsername, setUserUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [isOpenPopUp, setIsOpenPopUp] = useState({
    isopen: false,
    text: "",
    type: undefined
  })
  const SignUpUser = async (e) => {
    e.preventDefault()
    if (!userName || !userUsername || !userEmail || !userPassword) {
      setIsOpenPopUp({
        isopen: true,
        text: "All inputs are required",
        type: "danger"
      })
    } else {
        await Axios.post("http://localhost:3001/signin", {
        userName,
        userUsername,
        userEmail,
        userPassword
      }).then((res) => {

        if (res.data.type === "success") {
          setIsOpenPopUp({
            isopen: true,
            text: "User Created",
            type: "success"
          })

          const data = res.data.user
          const user = data

          localStorage.setItem("userInfo", JSON.stringify(data))
          navigate(`/${user._id}/dashboard/main`)
          // navigate('/login')
        } else {
          setIsOpenPopUp({
            isopen: true,
            text: res.data.errormessage,
            type: "danger"
          })
        }

        
      }
        
      )
    }
    
    
    
  }

  const redirectLoginPage = () => {
    navigate('/login')
  }
  return (
    
    <div className="signupMain">
      <div className="topContainer">
        <img src={rethaLogo} alt="" width="70px"/>
      </div>
      {isOpenPopUp.isopen == true ? <Popup text={isOpenPopUp.text} type={isOpenPopUp.type} setIsOpenPopUp={setIsOpenPopUp}/> : ""}
      <div className="formContainer">

          <h2 className="text-signup">Sign Up</h2>

          <input id="name" type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} className="input" required/><br />
          <input type="text" placeholder="Username" onChange={(e) => setUserUsername(e.target.value)} className="input" id="username" required/><br />
          <input type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} className="input" id="email" required/><br />
          <input type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)} className="input" id="password" required/><br />

          <button onClick={SignUpUser} className="btn-signup"><BsArrowRight /></button><br />
                    <button onClick={redirectLoginPage} className="login-btn-signup">Already have an account?<small> Login Page</small></button>   
 
      </div>
     
    </div>
  );
}

export default App;
