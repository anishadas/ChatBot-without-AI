import React, { useContext, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { Context } from '../Context';
const ChatMessages = () => {
  const {Messages} =useContext(Context);
  useEffect(()=>{
   
    document.querySelector("#messages").scrollTop =
    document.querySelector("#messages").scrollHeight;
  })
  return (
    <div className=''>
        <ul id="messages">
          {Messages.map((msg,id)=>(
            <ChatMessage key={id} msg={msg}/>
          ))}
        </ul>
    </div>
  );
};

export default ChatMessages