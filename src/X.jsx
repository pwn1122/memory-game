import React, { useState } from 'react'

const X = () => {
  const [val, setVal] = useState(1)

  function handleClick() {
    setVal((prev) => prev+1) // 2
    setVal((prev) => prev+1) // 3
  }

  return (
    <div>
    <p>{val}</p> 
    <button onClick={handleClick}>click</button>
    </div>
  )
}

export default X