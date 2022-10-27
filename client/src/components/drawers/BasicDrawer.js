import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export default class BasicDrawer extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  close = () => {
    const drawer = document.getElementById(this.props.id);
    drawer.classList.remove("visible");
  };

  scrollToBottom = () => {
    const drawer = document.getElementById(this.props.id);
    const listEnd = drawer.querySelector(".list-end");
    listEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div id={this.props.id} className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">{this.props.title}</div>
          {this.props.headerContent}
          <IoCloseOutline
            className="drawer-button"
            onClick={this.close}
            size="30"
          />
        </div>

        <div className="list-wrapper">
          {this.props.content}
          <div className="list-end"></div>
        </div>

        {this.props.trailingContent}
      </div>
    );
  }
}
