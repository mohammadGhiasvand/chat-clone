import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

import styled from 'styled-components';

export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerShowHide = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const handleInputChange = (event) => {
    setMsg(event.target.value);
  };

  const sendChatHandler = (event) => {
    event.preventDefault();
    if (msg.trim() && msg.trim().length > 0) {
      handleSendMessage(msg);
      setMsg('');
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerShowHide} />
            {showEmojiPicker && (
              <EmojiPicker theme={'dark'} onEmojiClick={handleEmojiClick} />
            )}
          </div>
        </div>
        <form
          className="input-container"
          onSubmit={sendChatHandler}
          action="POST">
          <input
            type="text"
            placeholder="Message..."
            value={msg}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    /* padding: 1.4rem 1rem; */
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    gap: 1rem;
    .emoji {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 210%;
        left: 0;
        font-size: 1rem;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-emoji-list::-webkit-scrollbar {
          // TODO the scrollBar is not fixes
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      padding: 1rem;
      border-radius: 0.375rem;
      color: #fff;
      background-color: #ffffff34;
      border: none;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 0.375rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }
`;
