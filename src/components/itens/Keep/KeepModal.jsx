import React, { useEffect, useState } from 'react'
import TextEditor from './TextEditor'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import '../../../styles/KeepModal.css'
import Axios from 'axios'
import Popup from '../Popup'

function KeepModal({openModal, allIdeas, setAllIdeas, author ,setOpenModal, text, setText, description, setDescription, indicator, setIndicator}) {
    console.log(openModal.idea)
    const [updatedText, setUpdatedText] = useState(openModal.idea ? openModal.idea.text : "")
    const [updatedDescription, setUpdatedDescription] = useState(openModal.idea ? openModal.idea.description : "")
    const [updatedIndicator, setUpdatedIndicator] = useState(openModal.idea ? openModal.idea.indicator : undefined)

    const [isOpenPopUp, setIsOpenPopUp] = useState({ isopen: false, text: "", type: undefined})

    
    const addIdea = async () => {
        if(text) {
            Axios.put(`${process.env.REACT_APP_API_URL}/addidea`, {text, description, indicator, author: author._id}).then(res => {
                setAllIdeas([...allIdeas, res.data])
                console.log(allIdeas)
            })
            setOpenModal({isopen: false, idea: undefined})
        } else {
            setIsOpenPopUp({isopen: true, text: "No text Given", type: "danger"})
        }
    }

    const updateIdea = (idea) => {

        if(updatedText) {
            const ideaId = idea._id 
            Axios.put(`${process.env.REACT_APP_API_URL}/updateidea`, {_id: ideaId, description: updatedDescription, indicator: updatedIndicator, text: updatedText}).then(res => { 
                const ideaIdDB  = res.data._id
                allIdeas.map(idea => {
                    if(ideaIdDB == idea._id) {
                        idea.text = updatedText 
                        idea.description = updatedDescription 
                        idea.indicator = updatedIndicator 
                    }
                })
    
                setAllIdeas([...allIdeas])
                setOpenModal({isopen: false, idea: undefined})
            })

        } else {
            setIsOpenPopUp({isopen: true, text: "No text Given", type: "danger"})
        }
        
    }

  return (
  
        <div className="keepModalContainer">
            { openModal.idea ?
                <div className="modalFormContainer">
         
                    <div className="topContainer">
                
                        <div className="topUpContainer">
                            {
                                isOpenPopUp.isopen && <Popup setIsOpenPopUp={setIsOpenPopUp} type={isOpenPopUp.type} text={isOpenPopUp.text} isopen={isOpenPopUp.isopen} />
                            }
                            <div className="closeBtn">
                                <button onClick={() => setOpenModal({isopen: false, idea: undefined})}>
                                    <BsFillArrowRightCircleFill />
                                </button>
                            </div>
                            <div className="inputArea">
                                <input type="text" onChange={(e) => setUpdatedText(e.target.value)} defaultValue={openModal.idea.text}/>
                            </div>

                        </div>


                        <div className="divider"></div>

                        <div className="descriptionArea">
                            <TextEditor setUpdatedDescription={setUpdatedDescription} description={description} setDescription={setDescription} updatedDescription={updatedDescription}  descriptionDefaultValue={openModal.idea.description}/>
                        </div>
                    </div>

                    <div className="bottomContainer">
                        <div className="indicatorArea">
                            <select onChange={(e) => setUpdatedIndicator(e.target.value)} defaultValue={openModal.idea.indicator}>
                                <option value={openModal.idea.indicator}>{openModal.idea.indicator}</option>
                                <option value="undefined">No indicador</option>
                                <option value="🔴">🔴</option>
                                <option value="🟠">🟠</option>
                                <option value="🟢">🟢</option>
                            </select>
                        </div>
                        <div className="addBtnContainer">
                            <button className='addBtn' onClick={() => updateIdea(openModal.idea)}>Update</button>
                        </div>
                    </div>
                </div>
                 :
                 <div className="modalFormContainer">
                    
                    <div className="topContainer">
                        
                
                        <div className="topUpContainer">
                            {
                                isOpenPopUp.isopen && <Popup setIsOpenPopUp={setIsOpenPopUp} type={isOpenPopUp.type} text={isOpenPopUp.text} isopen={isOpenPopUp.isopen} />
                            }
                            <div className="closeBtn">
                                <button onClick={() => setOpenModal({isopen: false, idea: undefined})} className="">
                                    <BsFillArrowRightCircleFill />
                                </button>
                            </div>
                            <div className="inputArea">
                                <input type="text" onChange={(e) => setText(e.target.value)}/>
                            </div>

                        </div>


                        <div className="divider"></div>

                        <div className="descriptionArea">
                            <TextEditor setDescription={setDescription} setUpdatedDescription={setUpdatedDescription}/>
                        </div>
                    </div>

                    <div className="bottomContainer">
                        <div className="indicatorArea">
                            <select onChange={(e) => setIndicator(e.target.value)}>
                                <option value="undefined">No indicador</option>
                                <option value="🔴">🔴</option>
                                <option value="🟠">🟠</option>
                                <option value="🟢">🟢</option>
                            </select>
                        </div>
                        <div className="addBtnContainer">
                            <button className='addBtn' onClick={addIdea}>Add</button>
                        </div>
                    </div>
                </div>
                
            }

        </div>
  )
}

export default KeepModal