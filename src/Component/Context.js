import React, { createContext, useEffect, useState } from 'react'

export const Context=createContext(null);

export const MyContextProvider=({children})=>{
  const [text,setText]=useState("")
  const [Open,setOpen]=useState(false);
  const [GuestMsg,setGuestMsg]=useState("");
  const [ChatBotState,setChatBotState]=useState(0);
  const [Messages,setMessages]=useState([
    {
      Text: "Hey there! I am a ChatBot! Type start to begin...",
      Bot: true
    }
  ]);
  const [GitHubUser,setGitHubUser]=useState(null);
  const [submit,setSubmit]=useState(false)
  const toggleChatBox = () => {
    setOpen(!Open)
  };
  const handleGuestMsgChange = e => {
    setGuestMsg(e.target.value)
  };
  
  const botAction=()=>{
    console.log(GuestMsg)
    setSubmit(false);
    const PersonName = GitHubUser? GitHubUser.name? GitHubUser.name: GitHubUser.login: null;
    const LastMessage = [...Messages].reverse()[0].Text;
    if (LastMessage.toLowerCase() === "start" && ChatBotState === 0) {
      const myText =
        "Hey Guest, thanks for starting me up! Please enter your github username.";
      setChatBotState(1);
      setMessages([
        ...Messages,
        {
          Text:myText,
          Bot:true
        }
      ])
    }
    if (ChatBotState === 1) {
      const myText = `Thanks for providing ${LastMessage} as your GitHub username...`;
      setChatBotState(2);
      setMessages([
        ...Messages,
        {
          Text:myText,
          Bot: true
        },
        {
          Text: "Let's look it up with GitHub... Please wait...",
          Bot: true
        }
      ])
      fetch("https://api.github.com/users/" + LastMessage)
        .then(res => res.json())
        .then(user => {
          const PersonName = user?user.name?user.name:user.login:null;
          const Text = `Hey ${
            user.name ? user.name : user.login
          }! I found you! You're awesome, coz you have got ${
            user.public_repos
          } public repos! Saving your details!`;
          const NoName = {
            Text: (
              <>
                Hey, {user.login}, it seems like you haven't set your
                name. Would you like to please set one by going to{" "}
                <a
                  href="https://github.com/settings/profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  your profile settings
                </a>{" "}
                after you login?
              </>
            ),
            Bot: true
          };
          const Msgs = [
            ...Messages,
            {
              Text,
              Bot: true
            },
            {
              Text: (
                <>
                  So what do you want to do now? Please enter one of the options
                  here:
                  <br />- help: Displays this message again.
                  <br />- bio: Displays the GitHub Bio, if found.
                  <br />- company: Displays the Company, if found.
                  <br />- avatar: Displays the GitHub Avatar, if found.
                  <br />- blog site: Displays the Blog Link, if found.
                  <br />- location: Displays the Location, if found.
                  <br />- can hire: Tells if the person can be hired.
                  <br />- followers: Displays the number of followers of{" "}
                  {PersonName}
                  .
                  <br />- following: Displays the number of people {
                    PersonName
                  }{" "}
                  follows.
                  <br />- reset: Back to Square one! 😉
                </>
              ),
              Bot: true
            }
          ];
          if (!user.name) {
            Msgs.push(NoName);
          }
          setGitHubUser(user);
          setChatBotState(3);
          setMessages(Msgs);
        });
      }
      if (ChatBotState === 3) {
        switch (LastMessage) {
          case "help":
            setMessages([
              ...Messages,
              {
                Text: (
                  <>
                    So what do you want to do now? Please enter one of the
                    options here:
                    <br />- help: Displays this message again.
                    <br />- bio: Displays the GitHub Bio, if found.
                    <br />- company: Displays the Company, if found.
                    <br />- avatar: Displays the GitHub Avatar, if found.
                    <br />- blog site: Displays the Blog Link, if found.
                    <br />- location: Displays the Location, if found.
                    <br />- can hire: Tells if the person can be hired.
                    <br />- followers: Displays the number of followers of{" "}
                    {PersonName}
                    .
                    <br />- following: Displays the number of people{" "}
                    {PersonName} follows.
                    <br />- reset: Back to Square one! 😉
                  </>
                ),
                Bot: true
              }
            ]);
            break;
          case "bio":
            setMessages([
              ...Messages,
              {
                Text: GitHubUser.bio
                  ? GitHubUser.bio
                  : `${PersonName} hasn't updated their bio.`,
                Bot: true
              }
            ])
            break;
          case "company":
            setMessages([
              ...Messages,
              {
                Text: GitHubUser.company
                  ? `${PersonName} works at ${GitHubUser.company}`
                  : `${PersonName} hasn't updated their company.`,
                Bot: true
              }
            ])
            break;
          case "avatar":
            setMessages([
              ...Messages,
              {
                Text: (
                  <>
                    <img
                      src={GitHubUser.avatar_url}
                      alt={`${GitHubUser.login}'s Avatar`}
                    />
                  </>
                ),
                Bot: true
              }
            ])
            break;
          case "website":
          case "blog site":
            setMessages([
              ...Messages,
              {
                Text: GitHubUser.blog ? (
                  <>
                    {PersonName} writes at{" "}
                    <a
                      href={GitHubUser.blog}
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    ...
                  </>
                ) : (
                  `${PersonName} hasn't got a blog or website.`
                ),
                Bot: true
              }
            ])
            break;
          case "location":
            setMessages([
              ...Messages,
              {
                Text: GitHubUser.location
                  ? `${PersonName} lives in ${GitHubUser.location}`
                  : `${PersonName} lives somewhere we don't know.`,
                Bot: true
              }
            ])
            break;
          case "can hire":
            setMessages([
              ...Messages,
              {
                Text: `${PersonName} is${
                  GitHubUser.hireable ? "" : " not"
                } available for hire.`,
                Bot: true
              }
            ])
            break;
          case "followers":
            setMessages([
              ...Messages,
              {
                Text: `${PersonName} has got ${GitHubUser.followers} followers.`,
                Bot: true
              }
            ])
            break;
          case "following":
            setMessages([
              ...Messages,
              {
                Text: `${PersonName} follows ${GitHubUser.following} users.`,
                Bot: true
              }
            ])
            break;
          case "reset":
            setGitHubUser(null);
            setChatBotState(0);
            setMessages([
              ...Messages,
              {
                Text: "Thanks for using my service. Please type start to begin once again...",
                Bot: true
              }
            ])
            break;
          default:
        }
      }
  };
  const handleGuestMsgSubmit = e => {
    e.preventDefault();
    const Text = GuestMsg;
    setGuestMsg("");
    
    setMessages([
      ...Messages,
      {
        Text,
        Bot: false
      }
    ]);
    setSubmit(true);
  };
  useEffect(()=>{
    if(submit){
      botAction();
    }
  });

  const value={
    text,
    Open,
    submit,
    GuestMsg,
    Messages,
    setText,
    toggleChatBox,
    handleGuestMsgChange,
    handleGuestMsgSubmit,
  };
  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
};