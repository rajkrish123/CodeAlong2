import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const CircularIndeterminate = (props) => {
  return (
    <div id="loader-wrapper">
      <CircularProgress id="circular-loader" />
      <div id="message-wrapper">{props.message}</div>
    </div>
  );
};

CircularIndeterminate.defaultProps = {
  message: "Loading...",
};

export default CircularIndeterminate;
