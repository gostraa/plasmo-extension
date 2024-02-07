import React, { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import { PopupContainer } from "~components";
import "./style.css";
const Popup: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const updateCounter = (messageName) => {
    sendToBackground({ name: messageName }).then((response) => {
      setCount(response.counter);
    });
  };

  useEffect(() => {
    updateCounter("getCounterValue");

    const messageListener = (message: any) => {
      if (message.name === "counterUpdated") {
        setCount(message.counter);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleIncrement = () => updateCounter("increment");

  return (
    <PopupContainer>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </PopupContainer>
  );
};

export default Popup;
