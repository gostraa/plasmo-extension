import styled from "styled-components";

export const ContentContainer = styled.div`
  background-color: #f0f4f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 2rem auto;
  font-family: "Arial", sans-serif;
`;

export const CountText = styled.p`
  color: #333;
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

export const CountNumber = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

export const IncrementButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2ecc71;
  }

  &:active {
    background-color: #229954;
  }

  &:focus {
    outline: none;
  }
`;
