import React, { useEffect, useState } from 'react'

function InputArea(props) {
  const {inputValue, handleChange, validState} = props;

  useEffect( () => {
    adjustInputSize();

    if(validState){
      setValidation("")
    }
    else{
      setValidation("wrong")
    }
  })
  const [validation, setValidation] = useState("");


  function adjustInputSize() {
    let input = document.getElementById("typing"); 
    input.style.width = inputValue.length + 1 + "ch";
  }

  return ( 
    <input
          type="text"
          name="typing"
          id="typing" 
          tabIndex="1" 
          value={inputValue}
          className={validation}
          onChange={handleChange}
        />
  )
}

export default InputArea