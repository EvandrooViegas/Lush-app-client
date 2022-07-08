import React from 'react'
import Axios from 'axios'
import {useEffect, useState} from 'react'
import '../../styles/KeepChooser.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'


function KeepChooser({KeepChooserIsOpen, setKeepChooserIsOpen, event}) { 

    
    const [author, setAuthor] = useState()
    const [allKeeps, setAllKeeps] = useState([])

    useEffect(() => {
        const authorJSON = localStorage.getItem('userInfo')
        const authorInfo = JSON.parse(authorJSON)
        const authorID = authorInfo._id 
        setAuthor(authorID)

        const getAllKeeps = async () => {
            await Axios.get("http://localhost:3001/getideas").then(res => {
                const data = res.data 
                setAllKeeps([...data])
                console.log(allKeeps)
        })
        }
        getAllKeeps()
    }, [])

    return (
    <div className='keep-chooser'>
        <div className="keep-chooser-main">
            <div className="closeBtnContainer">
                <button onClick={() => setKeepChooserIsOpen({isopen: false, idea: undefined, event: undefined})}><BsFillArrowRightCircleFill/></button>
            </div>
           
            {
                allKeeps.map(idea => (
                author == idea.author &&
              
                    <div className="userKeepContainer" onClick={() => setKeepChooserIsOpen({isopen: false, idea: idea, event: event})}>
                        <div className="topContainer">
                            <h4>{idea.text}</h4>
                            {idea.indicator != "undefined" &&
                                <div className="keepIndicatorContainer">
                                    <p>{idea.indicator}</p>
                                </div>
                            }

                        </div>

                        <div className="keepDescriptionContainer">
                            <p dangerouslySetInnerHTML={{__html: idea.description}}>

                            </p>
                        </div>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default KeepChooser