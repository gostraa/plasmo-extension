import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

const CustomButton = () => {
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
    sendToBackground({
      name: "increment"
    }).then((response) => {
      setCount(response.counter)
    })
  }

  return (
    <div style={{ backgroundColor: "azure" }}>
      <p>
        Count: <span> {count}</span>
      </p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}

export default CustomButton
