import {useState} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import '../../styles/Login.css'
import loginImage from '../../images/loginImage.png'
import Popup from '../itens/Popup'
import logo from '../../images/retha-logo.png'
function Login() {
    const navigate = useNavigate()

    const [isOpenPopUp, setIsOpenPopUp] = useState({
        isopen: false,
        text: "",
        type: undefined
      })



    const LoginUser = async () => {
 
        try {   
            await Axios.post(`${process.env.REACT_APP_API_URL}/login`, { userEmail, userPassword })
            .then((response) => {

                if(response.data.type == "success") {
                    const data = response.data.user
                    const user = data
                        localStorage.setItem("userInfo", JSON.stringify(data))
                        navigate(`/${user._id}/dashboard/main`)
                }
                   
                 else {
                    setIsOpenPopUp({
                        isopen: true,
                        text: response.data.errormessage,
                        type: "danger"
                    })
                }
              
            })
            
            
        } catch (error) {
            console.log(error)
        }        
    }
    const redirectSignupPage = () => {
        navigate('/signup')
    }
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    return (
        <div className="loginMain">
           
                <div className="topContainer">
                    <span> <img src={logo} alt=""width="60px" /> </span>
                </div>
           {isOpenPopUp.isopen == true ? <Popup text={isOpenPopUp.text} type={isOpenPopUp.type} setIsOpenPopUp={setIsOpenPopUp}/> : ""}
            <div className="formContainer">

                <h1>Login</h1>
                <div className="input">
                    <input placeholder='Email' type="text"  id='email' onChange={(e) => setUserEmail(e.target.value)} required className="input"/><br />
                </div>
                <div className="input">
                    <input  placeholder='Password' type="text" onChange={(e) => setUserPassword(e.target.value)} required className="input" id='password'/><br />
                </div>

                    <button onClick={LoginUser} className="btn-login"><BsArrowRight /></button><br />
                    <button onClick={redirectSignupPage} className="signup-btn-login">Dont have an account?<small> Sign Up Page</small></button>   
                </div>

         
            
        </div>
    );
  }
  
  export default Login;
  