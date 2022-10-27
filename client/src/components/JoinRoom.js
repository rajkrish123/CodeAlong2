import { Component } from "react";
import { io } from "socket.io-client";
import { Redirect, withRouter } from "react-router";
import { validate as uuidValidate } from "uuid";

import history from "../history";

import Loader from "./Loader";
import Prompt from "./Prompt.js";
import OutputSection from "./OutputSection";
import RoomId from "./RoomId";
import CodeEditor from "./CodeEditor.js";
import Whiteboard from "./Whiteboard.js";
import BottomNavbar from "./BottomNavbar";
import MembersWindow from "./drawers/MembersDrawer";
import ChatWindow from "./drawers/ChatDrawer";
import FilesWindow from "./drawers/FilesDrawer";

class JoinRoom extends Component {
  state = {
    socket: null,
    roomId: null,
    userName: null,
    eventAdded: false,

    roomLoaded: false,

    code: "",
    language: "python",
    whiteboard: {},

    output: null,
    outputVisible: false,
    typing: {},
  };

  joinRoom = async () => {
    const userName = localStorage.getItem("userName");
    console.log(`Asking server to join room ${this.props.match.params.id}`);
    const socket = await io.connect("http://localhost:4000", {
      query: {
        roomId: this.props.match.params.id,
        userName,
      },
    });

    socket.on("changedCode", (args) => {
      console.log("changedCode", args);

      const newState = {};
      if (args.lang === this.state.language) newState.code = args.code;

      const timer = setTimeout(() => {
        this.setState((prevState) => {
          const typing = {
            ...prevState.typing,
          };
          delete typing[args.lang];

          return {
            ...prevState,
            typing,
          };
        });
      }, 1500);

      this.setState((prevState) => {
        const oldTimer = (prevState.typing[args.lang] ?? {}).timer;
        if (oldTimer !== undefined) {
          console.log("Clearing timer");
          clearTimeout(oldTimer);
        }

        const typing = {
          ...prevState.typing,
        };
        typing[args.lang] = {
          userName: args.userName,
          timer: timer,
        };

        newState.typing = typing;
        console.log("Typing:", typing);

        return {
          ...prevState,
          ...newState,
        };
      });
    });

    socket.on("codeResponse", (args) => {
      console.log("codeResponse", args);
      this.setState((prevState) => {
        return {
          ...prevState,
          code: args.code,
        };
      });
    });

    socket.on("codeOutput", (args) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          output: args.stdout.length > 0 ? args.stdout : args.stderr,
        };
      });
    });

    socket.on("roomState", (args) => {
      console.log("roomState", args);
      this.setState((prevState) => {
        return {
          ...prevState,
          code: args.code[this.state.language] ?? "",
          whiteboard: args.whiteboard,
          roomLoaded: true,
        };
      });
    });

    this.setState({
      socket,
      roomId: this.props.match.params.id,
      userName,
    });
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    if (!uuidValidate(this.props.match.params.id))
      history.push("/room-not-found");
  }

  componentWillUnmount() {
    if (this.state.socket !== null) {
      this.state.socket.emit("explicitDisconnect");
      this.state.socket.removeAllListeners();
    }
  }

  executeCode() {
    if (this.state.code.length === 0) return;

    this.setState((prevState) => {
      return {
        ...prevState,
        output: null,
        outputVisible: true,
      };
    });

    this.state.socket.emit("executeCode", {
      code: this.state.code,
      lang: this.state.language,
    });
  }

  updateCode(newCode) {
    this.state.socket.emit("changedCode", {
      code: newCode,
      lang: this.state.language,
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        code: newCode,
      };
    });
  }

  updateLanguage(newLanguage) {
    this.state.socket.emit("codeRequest", {
      lang: newLanguage,
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        language: newLanguage,
        code: "",
      };
    });
  }

  hideOutputSection() {
    this.setState((prevState) => {
      return {
        ...prevState,
        outputVisible: false,
      };
    });
  }

  renderHelper = () => {
    return (
      <div className="main-wrapper">
        <OutputSection
          visible={this.state.outputVisible}
          output={this.state.output}
          onDismiss={this.hideOutputSection.bind(this)}
        />
        {!this.state.roomLoaded ? (
          <Loader />
        ) : (
          <div id="join-room-wrapper">
            <nav>
              <a href="/">
                <img src="/logo.jpg" alt="code_along logo" itemType="jpeg" />
              </a>
              <RoomId roomId={this.state.roomId} />
            </nav>

            <div className="content">
              <CodeEditor
                socket={this.state.socket}
                code={this.state.code}
                language={this.state.language}
                onChange={this.updateCode.bind(this)}
                onLanguageChange={this.updateLanguage.bind(this)}
                onExecute={this.executeCode.bind(this)}
                typing={this.state.typing}
              />
              <Whiteboard
                socket={this.state.socket}
                whiteboardData={this.state.whiteboard}
              />
              <MembersWindow
                socket={this.state.socket}
                roomId={this.state.roomId}
              />
              <ChatWindow socket={this.state.socket} />
              <FilesWindow
                socket={this.state.socket}
                roomId={this.state.roomId}
              />
            </div>
            <BottomNavbar
              socket={this.state.socket}
              roomId={this.state.roomId}
            />
          </div>
        )}
        <Prompt
          open={this.state.socket === null}
          onSubmit={this.joinRoom.bind(this)}
        />
      </div>
    );
  };

  render() {
    console.log(`Room ID is ${this.props.match.params.id}`);
    return <>{this.renderHelper()}</>;
  }
}

export default withRouter(JoinRoom);
