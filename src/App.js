import React, { Component } from 'react'

 
class App extends Component {
 
  render() {
    return (
      <div className="App">
        <header>React ChatBot</header>
        <div className="ChatComponent">
          <div className="ChatBot">
            <div className="ChatMessages"></div>
            <div className="ChatInput"></div>
          </div>
          <div className="ChatTrigger"></div>
        </div>
      </div>
    )
  }
}
export default App;
