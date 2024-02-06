import React, { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

const Popup = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    sendToBackground({
      name: "getCounterValue"
    }).then((response) => {
      setCount(response.counter)
    })

    chrome.runtime.onMessage.addListener((message) => {
      if (message.name === "counterUpdated") {
        setCount(message.counter)
      }
    })
  }, [])

  const handleIncrement = () => {
    sendToBackground({ name: "increment" }).then((response) => {
      setCount(response.counter)
    })
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}

export default Popup
