import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiShutDownLine } from 'react-icons/ri';
import styled from 'styled-components';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    navigate('/login');
  };

  return (
    <>
      <Button onClick={handleLogout}>
        <IconContext.Provider value={{ className: 'logout' }}>
          <RiShutDownLine />
        </IconContext.Provider>
      </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff39;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  .logout {
    font-size: 1.1rem;
    color: #ebe7ff;
    transition: 0.3s ease-in-out;
  }

  &:hover {
    background-color: #9a86ef;
    .logout {
      color: #000000;
    }
  }
`;
