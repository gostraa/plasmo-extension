import React, { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { ContentContainer } from "~components";
import "./style.css";
import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/"],
};

const Content: React.FC = () => {
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
    <ContentContainer>
      <p>
        Count: <span>{count}</span>
      </p>
      <button onClick={handleIncrement}>Increment</button>
    </ContentContainer>
  );
};

export default Content;
