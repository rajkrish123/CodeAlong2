import React from "react";

import BasicDrawer from "./BasicDrawer";
import MemberCard from "./drawer_cards/MemberCard";

class MembersWindow extends React.Component {
  state = {
    members: null,
  };

  componentDidMount() {
    this.props.socket.on("newMember", (data) => {
      this.setState({ members: data });
    });

    this.props.socket.on("memberLeave", (data) => {
      this.setState((prevState) => {
        let newList = { ...prevState.members };
        delete newList[data.id];

        return {
          members: { ...newList },
        };
      });
    });
  }

  renderMemberCardHelper = () => {
    if (this.state.members) {
      const members = this.state.members;
      const ids = Object.keys(this.state.members);

      ids.sort((i, j) => {
        const a = members[i],
          b = members[j];
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      return ids.map((id) => {
        let userName = members[id];
        return <MemberCard key={id} id={id} userName={userName} />;
      });
    }
  };

  render() {
    return (
      <BasicDrawer
        id="members-drawer"
        title="Members"
        content={this.renderMemberCardHelper()}
      />
    );
  }
}

export default MembersWindow;
