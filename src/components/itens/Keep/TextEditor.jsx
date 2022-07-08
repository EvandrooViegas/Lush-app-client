import React, {useState, useRef, useMemo, useEffect} from 'react';
import JoditEditor from "jodit-react";


function TextEditor({	descriptionDefaultValue, setContent, setDescription, updatedDescription, description, setUpdatedDescription }) {
	const editor = useRef(null)  
  

  useEffect(() => {
    if(descriptionDefaultValue) {
      console.log(editor.current.defaultValue)
      editor.current.defaultValue = descriptionDefaultValue
    } 
  }, [])

  useEffect(() => {
    setUpdatedDescription(description)
  }, [description])
  console.log(descriptionDefaultValue)
	return (

      <div className='joditEditor'>
        <JoditEditor
        ref={editor}
        defaultValue={descriptionDefaultValue}
        config = {{
          readonly: false,
          height: 400,
          placeholder: 'Add a description...',
          buttons: ["bold","italic","file","copy","copyformat", "indent","left"],
          toolbarAdaptive:false,
          limitWords: false
        }}
        tabIndex={1} 
        onBlur={newContent => setDescription(newContent)}

        
        />

      </div>
  )
}

export default TextEditor;