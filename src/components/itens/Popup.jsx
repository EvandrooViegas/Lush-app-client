import React from 'react'
import '../../styles/Popup.css'
import {CgDanger} from 'react-icons/cg'
import {IoCloseSharp} from 'react-icons/io5'
import {BsCheckLg} from 'react-icons/bs'
import {FiAlertTriangle} from 'react-icons/fi'
function Popup(props) {
    setInterval(() => {
        props.setIsOpenPopUp({
            isopen: false,
            text: "",
            type: undefined,
        })
    }, 3000)
    function closePopup() {
       
        props.setIsOpenPopUp({
            isopen: false,
            text: "",
            type: undefined,
        })
    }

    function alertPopupHandler (response) {
        props.setIsOpenPopUp({
            isopen: false,
            text: "",
            type: undefined,
            response: response
        })
    }
  return (
    <div className='popup-container'>
        {
            props.type == "danger"
            &&
            <div className='popup-danger'>
                <p className='danger-icon'><CgDanger /></p>
                <p>{props.text}</p>
         
            </div>
        }

        {
            props.type == "success"
            &&
            <div className='popup-success'>
                <p className='success-icon'><BsCheckLg /></p>
                <p>{props.text}</p>

            </div>
        }

        {
            props.type == "alert"
            &&
            <div className='popup-alert'>
                <div className="topContainer">
   
                    <p>{props.text}</p>

                </div>

                <div className="bottomContainer">
                    <button onClick={() => alertPopupHandler("close")} className='closePopup'>Yes</button>
                    <button onClick={() => alertPopupHandler("cancel")} className='cancelPopup'>Cancel</button>
                </div>
            </div>
        }

    </div>
  )
}

export default Popup