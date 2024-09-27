import React, { useState } from "react"

const NewTab = () => {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(prevState => prevState + 1)}>
      {count}
    </button>
  )
}

export default NewTab
