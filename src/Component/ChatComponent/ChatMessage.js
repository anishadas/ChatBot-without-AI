import { useContext } from "react";
import ChatBotImg from "../../assets/Chatbot.png";
import GuestImg from "../../assets/guest.png";
import { Context } from "../Context";

const ChatMessage = ({ msg }) => {
  const {GitHubUser}=useContext(Context);

  return <li className={msg.Bot ? "ChatBot" : "Guest"}>
    <img
      src={msg.Bot? ChatBotImg:GitHubUser? GitHubUser.avatar_url: GuestImg}
      alt={msg.Bot ? "ChatBot" : "Guest"}
    />
    <p>{msg.Text}</p>
  </li>;
};

export default ChatMessage;