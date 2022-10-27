import { Component } from "react";
import { v4 as uuid } from "uuid";
import history from "../history";

export default class Home extends Component {
  joinRoom = (e) => {
    const input = document.querySelector("#room-id");
    const roomId = input.value.length > 0 ? input.value : uuid();
    history.push(`/room/${roomId}`);
  };

  render() {
    return (
      <div id="home-wrapper">
        <div className="home">
          <a href="/">
            <img src="/logo.jpg" alt="code_along logo" />
          </a>

          <form onSubmit={this.joinRoom}>
            <label htmlFor="room-id">Enter a room ID:</label>
            <div id="room-id-input-wrapper">
              <input id="room-id" type="text" autoFocus />
              <button id="submit-room-id" onClick={this.joinRoom}>
                {">"}
              </button>
            </div>
            <input type="submit" hidden />
          </form>

          <div className="separator">or</div>

          <button id="home-create-room" onClick={this.joinRoom}>
            Create a new room
          </button>
        </div>
      </div>
    );
  }
}
