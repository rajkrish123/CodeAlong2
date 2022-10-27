import React from "react";

export default class ChatCard extends React.Component {
    convertTime(timeStamp) {
      const date = new Date(timeStamp);
      
      let hours = date.getHours();
      let ampm = 
        (hours < 12) ? 
          "AM" : "PM";
      hours = hours % 12;
      if (hours === 0) 
        hours = 12;

      let minutes = date.getMinutes();
      if (minutes < 10)
        minutes = "0" + minutes;
      
      let timeString = hours + ":" + minutes + " " + ampm;
      return timeString;
    };
        
    render() {
        const message = this.props.message;
        return (
          <div 
            id="chat-card-wrapper" 
            key={message.timeStamp}
          >

            <div id="message-card-header">
              <div id="messenger-name">
                {message.user}
              </div>
                
              <div id="message-time">
                {this.convertTime(message.timeStamp)}
              </div>
            </div>
            
            <div id="message">
              <p>{message.message}</p>
            </div>
          
          </div>
        );
    }
}