import React from 'react';
import styled from 'styled-components';

export default function Loader() {
  return (
    <Container>
      <div className="spinner"></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 4em;
    height: 4em;
    border: 0.5em solid rgba(255, 255, 255, 0.1);
    border-left-color: #7983ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
