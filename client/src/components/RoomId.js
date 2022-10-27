import React from "react";

class RoomId extends React.Component {
  state = {
    roomId: null,
    copied: false,
  };

  componentDidMount() {
    this.setState({ roomId: this.props.roomId });
  }

  copyRoomId() {
    var tempInput = document.createElement("input");
    tempInput.value = this.state.roomId;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    this.setState({
      copied: true,
    });
  }

  render() {
    return (
      <div className="room-id-wrapper">
        <div
          onClick={this.copyRoomId.bind(this)}
          onMouseOut={(_) =>
            this.setState({
              copied: false,
            })
          }
        >
          <span className="tooltip">
            {this.state.copied ? "Copied!" : "Copy to clipboard"}
          </span>
          Room ID: {this.state.roomId}
        </div>
      </div>
    );
  }
}

export default RoomId;
