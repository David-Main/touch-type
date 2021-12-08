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
    <React.Fragment>
      <p className="input-indicator">Start typing here</p>
      <input
            type="text"
            name="typing"
            id="typing"
            tabIndex="1"
            autoCapitalize="false"
            autoComplete="false"
            autoSave="false"
            autoCorrect="false"
            autoFocus="true"
            value={inputValue}
            className={validation}
            onChange={handleChange}
          />
    </React.Fragment>
  )
}

export default InputArea