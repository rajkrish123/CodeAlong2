import React from "react";
import ReactDOM from "react-dom";

import Loader from "./Loader";

class OutputSection extends React.Component {
  state = {
    eventsAdded: false
  };

  setVisibility() {
    const outputSection = document.getElementById("output-section");
    const outputWindow = document.getElementById("output-window");

    (this.props.visible) ?
      outputSection.classList.add("output-visible") :
      outputSection.classList.remove("output-visible");

    if(!this.state.eventsAdded) {
      outputSection.addEventListener("click", (e) => {
        outputSection.classList.remove("output-visible");
        this.props.onDismiss();
      });

      outputWindow.addEventListener("click", (e) => e.stopPropagation());

      this.setState({
        
        eventsAdded: true
      });
    }
  }

  componentDidMount() {
    this.setVisibility();  
  }

  componentDidUpdate() {
    this.setVisibility();
  }

  render() {
    return ReactDOM.createPortal(
      <div id="output-section-wrapper" className="">
        <div id="output-window">
            <div id="output-text">Output</div>
            {
              (this.props.output) ? (   
                <div id="output-value">
                  {this.props.output.split("\n").map(x => <div>{x}</div>)}
                </div>
              ) : <Loader />
            }
        </div>
      </div>,
      document.getElementById("output-section")
    );
  }
}

export default OutputSection;
