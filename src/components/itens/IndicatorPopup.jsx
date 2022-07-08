import React from 'react'
import IndicatorContainer from './IndicatorContainer'
import IndicatorPicker from './IndicatorPicker'

function IndicatorPopup({todo}) {

 
  return (
    <>
        <IndicatorPicker todo={todo}/>
    </>
    
  )
}

export default IndicatorPopup