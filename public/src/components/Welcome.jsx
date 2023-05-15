import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

export default function Welcome({ currentUser }) {
  return (
    <>
      <Container>
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome <span>{currentUser ? currentUser.username : ''}!</span>{' '}
        </h1>
        <h3>Please select a chat to start messaging.</h3> {/* //! 2:37:34 */}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  img {
    height: 28rem;
  }
  span {
    color: #4e0eff;
  }
`;
