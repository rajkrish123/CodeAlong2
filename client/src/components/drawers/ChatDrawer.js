import React from "react";

import BasicDrawer from "./BasicDrawer";
import { IoMdSend } from "react-icons/io";
import ChatCard from "./drawer_cards/ChatCard";

export default class ChatWindow extends React.Component {
  state = {
    messages: [
      {
        message: "Welcome to the Chat Section",
        user: "Server",
        timeStamp: Date.now(),
      },
    ],
  };

  messagesEnd = React.createRef();

  componentDidMount() {
    this.props.socket.on("newMessage", (data) => {
      this.setState((prevState) => {
        const messages = [...prevState.messages];
        messages.push({
          message: data.message,
          user: data.user,
          timeStamp: data.timeStamp,
        });

        return {
          messages,
        };
      });
    });
  }

  renderChatHelper = () => {
    return (
      <div>
        {this.state.messages.map((message) => (
          <ChatCard message={message} key={message.timeStamp} />
        ))}
      </div>
    );
  };

  sendMessage = (event) => {
    event.preventDefault();

    const input = document.getElementById("chat-input");
    const inputValue = input.value;
    input.value = "";

    if (inputValue !== "") {
      this.props.socket.emit("messageSend", {
        message: inputValue,
        timeStamp: Date.now(),
      });
    }
  };

  render() {
    return (
      <BasicDrawer
        id="chat-drawer"
        title="Chat"
        content={this.renderChatHelper()}
        trailingContent={
          <div id="chat-input-wrapper">
            <form onSubmit={this.sendMessage}>
              <input id="chat-input" />

              <button
                id="chat-send-button"
                type="submit"
                onClick={this.sendMessage}
              >
                <IoMdSend id="chat-send" />
              </button>
            </form>
          </div>
        }
      />
    );
  }
}
