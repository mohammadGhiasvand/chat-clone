// Packages
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Custom Componenets
import { loginRoute } from '../utils/APIRoutes';

// Import Images
import Logo from '../assets/logo.png';

// Import Css files
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [values, setValue] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isInputsValid = handleValidation();
    if (isInputsValid) {
      // POST request
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (!data.status) {
        toast.error(data.message, toastOptions);
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
      // Authentication from the server
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username.trim().length < 3 || !username.match(/^[a-zA-Z0-9]+$/)) {
      toast.error('A valid username is required!', toastOptions);
      return false;
    } else if (password.trim().length < 8) {
      toast.error('Password is required!', toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)} method="post">
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>TalkaTive</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min={3}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997ef0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
