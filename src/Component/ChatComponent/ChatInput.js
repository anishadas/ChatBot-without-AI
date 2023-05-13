import React, { useContext } from 'react'
import { Context } from '../Context'
const ChatInput = () => {
  const {GuestMsg,handleGuestMsgSubmit,handleGuestMsgChange,GitHubUser}=useContext(Context);
  const PersonName = GitHubUser? GitHubUser.name? GitHubUser.name: GitHubUser.login: null;
  return (
    <div className='chatInput'>
        <form className="ChatBot-Input" onSubmit={handleGuestMsgSubmit}>
            <input
            type="text"
            value={GuestMsg}
            onChange={handleGuestMsgChange}
            placeholder={
                GitHubUser
                ? `Please write something ${PersonName}...`
                : "Please start typing something..."
            }
            />
        </form>
    </div>
  )
}

export default ChatInput