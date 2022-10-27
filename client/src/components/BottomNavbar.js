import React from "react";
import axios from "axios";

import { FaUsers } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoMdChatbubbles } from "react-icons/io";
import { BsPencilSquare, BsCodeSlash } from "react-icons/bs";
import { AiFillFolderOpen } from "react-icons/ai";

// import ShowFiles from "./ShowFiles";

const Screens = {
  CODE_EDITOR: 0,
  WHITEBOARD: 1,
};
Object.freeze(Screens);

class BottomNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: Screens.CODE_EDITOR,
    };
    this.hiddenInputButton = React.createRef();
  }

  drawers = ["chat-drawer", "files-drawer", "members-drawer"];
  toggleAndHideOthers(toggled) {
    const otherDrawers = this.drawers.filter(
      (drawerId) => drawerId !== toggled
    );
    for (const drawerId of otherDrawers) {
      const drawer = document.getElementById(drawerId);
      drawer.classList.remove("visible");
    }

    const drawer = document.getElementById(toggled);
    drawer.classList.toggle("visible");
  }

  toggleChat = () => {
    this.toggleAndHideOthers("chat-drawer");
  };

  toggleFiles = () => {
    this.props.socket.emit("filesList");
    this.toggleAndHideOthers("files-drawer");
  };

  toggleMembers = () => {
    this.toggleAndHideOthers("members-drawer");
  };

  toggle = () => {
    const codeEditor = document.querySelector("#code-editor");
    const whiteboard = document.querySelector("#whiteboard");

    for (const element of [codeEditor, whiteboard]) {
      element.classList.toggle("expand");
      element.classList.toggle("shrink");
    }

    this.setState((prevState) => {
      return {
        visible:
          prevState.visible === Screens.CODE_EDITOR
            ? Screens.WHITEBOARD
            : Screens.CODE_EDITOR,
      };
    });
  };

  uploadButton = () => {
    this.hiddenInputButton.current.click();
  };

  handleFileChange = async (event) => {
    const file = event.target.files[0];

    console.log("file uploaded " + file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("roomId", this.props.roomId);

    // we can not directly print formData because it will prints an empty object so we have to print it in the following way
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    const res = await axios.post(`http://localhost:4000/upload/`, formData);
    console.log("response is ", res);
  };

  render() {
    return (
      <div className="bottom-navbar-wrapper">
        <div id="bottom-navbar-container">
          <div className="bottom-navbar-button" onClick={this.toggleMembers}>
            <FaUsers size="35" />
            <span style={{ marginLeft: "0.25rem" }}>Members</span>
          </div>

          <div className="bottom-navbar-button" onClick={this.toggleChat}>
            <IoMdChatbubbles size="35" />
            <span style={{ marginLeft: "0.25rem" }}>Chat</span>
          </div>

          <div className="bottom-navbar-button" onClick={this.toggle}>
            {this.state.visible === Screens.CODE_EDITOR ? (
              <BsPencilSquare size="35" />
            ) : (
              <BsCodeSlash size="35" />
            )}

            {this.state.visible === Screens.CODE_EDITOR ? (
              <span style={{ marginLeft: "0.25rem" }}>Whiteboard</span>
            ) : (
              <span style={{ marginLeft: "0.25rem" }}>Code Editor</span>
            )}
          </div>

          <div className="bottom-navbar-button" onClick={this.toggleFiles}>
            <AiFillFolderOpen size="35" />
            <span style={{ marginLeft: "0.25rem" }}>Files</span>
          </div>

          <div className="bottom-navbar-button" onClick={this.uploadButton}>
            <input
              type="file"
              ref={this.hiddenInputButton}
              onChange={this.handleFileChange}
              hidden
            />
            <FiUpload size="35" />
            <span style={{ marginLeft: "0.25rem" }}>Upload</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomNavbar;
