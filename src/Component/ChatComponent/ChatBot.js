import React from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const ChatBot = () => {
  
  return (
    <div className='ChatBot-Messages'>
      <ChatMessages/>
      <ChatInput/>
    </div>
  )
}

export default ChatBot