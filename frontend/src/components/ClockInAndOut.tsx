import React, { useState } from 'react'

export const ClockInAndOut = () => {

    // const [date, setDate] = useState(new Date());

    const [buttonText, setButtonText] = useState("Clock In");

    const toggle = () => buttonText==="Clock In" ? setButtonText("Clock Out"): setButtonText("Clock In"); 
    

  return (
    <div>
        <button onClick={toggle}>{buttonText}</button>
    </div>
  )
}


