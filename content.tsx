import React, { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type { PlasmoCSConfig } from "plasmo";
import styleText from "data-text:./style.css";
import type { PlasmoGetStyle } from "plasmo";

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"],
};

const Content: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const updateCounter = (messageName) => {
    sendToBackground({ name: messageName }).then(({ counter }) => {
      setCount(counter);
    });
  };

  useEffect(() => {
    updateCounter("getCounterValue");

    const messageListener = ({
      name,
      counter,
    }: {
      name: string;
      counter: number;
    }) => {
      if (name === "counterUpdated") {
        setCount(counter);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleIncrement = () => updateCounter("increment");

  return (
    <div className="counter-container">
      <p className="count-text">
        Count: <span className="count-number">{count}</span>
      </p>
      <button className="increment-button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
};

export default Content;
