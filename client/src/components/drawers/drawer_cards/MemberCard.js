import React from "react";

class MemberCard extends React.Component {
  generateRandomHue() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = "50%";
    const lightness = "60%";
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  }

  genImage() {
    const firstLetter = this.props.userName.charAt(0).toUpperCase();
    // console.log(firstLetter);
    return <div id="member-image">{firstLetter}</div>;
  }

  render() {
    // console.log("from participantCard", this.props.id);
    return (
      <div id="member-card-wrapper">
        <div
          id="member-image-container"
          style={{ backgroundColor: this.generateRandomHue() }}
        >
          {this.genImage()}
        </div>
        <div id="member-name">{this.props.userName}</div>
      </div>
    );
  }
}

export default MemberCard;
