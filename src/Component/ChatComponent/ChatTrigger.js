import React, { useContext } from 'react'
import { Context } from '../Context';
import ChatBotImg from "../../assets/Chatbot.png";
// import GuestImg from "../../assets/guest.png";

const ChatTrigger = () => {
  const {toggleChatBox}=useContext(Context)
  return (
    <>
      <div className="ChatBot-Trigger">
        <img src={ChatBotImg} alt="Open Chat" onClick={toggleChatBox} />
      </div>
    </>
  )
}

export default ChatTrigger