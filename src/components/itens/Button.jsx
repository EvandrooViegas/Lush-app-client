import React from 'react'

function Button(props) {
  return (
    <div className='mainButton'>
        <button onClick={props.function}>{props.text}</button>
    </div>
  )
}

export default Button