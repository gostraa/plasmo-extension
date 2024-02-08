import React, { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import {
  ContentContainer,
  CountNumber,
  CountText,
  IncrementButton,
} from "~components";

const Popup: React.FC = () => {
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
    <ContentContainer>
      <CountText>
        Count: <CountNumber>{count}</CountNumber>
      </CountText>
      <IncrementButton onClick={handleIncrement}>Increment</IncrementButton>
    </ContentContainer>
  );
};

export default Popup;
