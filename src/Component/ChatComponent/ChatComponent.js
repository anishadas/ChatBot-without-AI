import React, { useContext } from 'react'
import ChatBot from './ChatBot'
import ChatTrigger from './ChatTrigger'
import { Context } from '../Context'
const ChatComponent = () => {
  const {Open}=useContext(Context);
  return (
    <div className='ChatBot-Wrapper'>
      {
        Open && (
        <ChatBot/>
        )
      }
      <ChatTrigger/>
    </div>
  )
}

export default ChatComponent