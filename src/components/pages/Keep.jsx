
import NavBar from '../NavBar'
import React, {useState, useRef, useMemo} from 'react';
import TextEditor from '../itens/Keep/TextEditor'
import { useEffect } from 'react';
import '../../styles/Keep.css'
import {GrFormAdd} from 'react-icons/gr'
import KeepModal from '../itens/Keep/KeepModal';
import Axios from 'axios';
import {BiTrash} from 'react-icons/bi'
function Keep() {
  const [openModal, setOpenModal] = useState({isopen: false, idea: undefined})

  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [indicator, setIndicator] = useState(undefined)
  const [author, setAuthor] = useState(undefined)


  const [allIdeas, setAllIdeas] = useState([])
  useEffect(() => {
    const userInfoDataJSON = localStorage.getItem('userInfo')
    const userInfoData = JSON.parse(userInfoDataJSON)
    setAuthor(userInfoData)

    const getAllIdeas = () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/getideas`).then(res => {
        setAllIdeas(res.data)
      })
    } 

    getAllIdeas()
  }, [])

  const deleteIdea = (idea) => {
    const id = idea._id
    Axios.delete(`${process.env.REACT_APP_API_URL}/deleteidea/${id}`).then(res => {
      const ideaToDeleteId = res.data._id 
      let tempList = []
      allIdeas.map(idea => {
        if(idea._id != ideaToDeleteId) {
          tempList.push(idea)
        }
      })

      setAllIdeas(tempList)
    })
  }

  const openModalFunc = (idea) => {
    setOpenModal({isopen: true, idea: idea})
  }
  return (
    

      <div className='keepMain'>
          <div className="keepButtonContianer">
            <button className='newEvent' onClick={() => setOpenModal({isopen: true, idea: undefined})}>
              <GrFormAdd />
            </button>
          </div>

         

          <div className="contentContainer">
            {
              allIdeas.map(idea => (
                idea.author == author._id && 
                <div className="ideaContainer" >
                  <div className="topContainer" onClick={() => openModalFunc(idea)}>
                    <div className="topUpContainer">
                      <div className="titleContainer">
                        <h3>{idea.text}</h3>
                      </div>
                      <div className="indicatorContainer">
      
                            {
                              idea.indicator == "🔴" &&
                              <div className="redCircle">

                              </div>
                            }

                            {
                              idea.indicator == "🟠" &&
                              <div className="orangeCircle">
                                
                              </div>
                            }

                            {
                              idea.indicator == "🟢" &&
                              <div className="greenCircle">
                                
                              </div>
                            }
                      </div>
                    </div>
                  
                    <div className="descriptionContainer">
                          <p dangerouslySetInnerHTML={{__html: idea.description}}>

                          </p>
                    </div>
                    
                  </div>
    
                  <div className="bottomContainer">
                    <div className="deleteContainer">
                      <button onClick={() => deleteIdea(idea)}><BiTrash /></button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {
            openModal.isopen &&
            <KeepModal openModal={openModal} allIdeas={allIdeas} setAllIdeas={setAllIdeas} author={author} setOpenModal={setOpenModal} text={text} setText={setText} description={description} setDescription={setDescription} indicator={indicator} setIndicator={setIndicator}/>
            }
          
      </div>


    
  )
}

export default Keep