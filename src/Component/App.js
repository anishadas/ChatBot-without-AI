import { React,Component } from "react";
import ChatComponent from "./ChatComponent/ChatComponent";
import Header from "./Header";
import { MyContextProvider } from "./Context";

class App extends Component {
    
  render() {
    return (
      <div className="App">
        <Header containerClass="justify-content-center" dark={true}>
          ChatBot Without AI
        </Header>
        <MyContextProvider>
            <ChatComponent />
        </MyContextProvider>
      </div>
    );
  }
}

export default App;