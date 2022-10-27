import { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import { FaDownload, FaEraser } from "react-icons/fa";

export default class Whiteboard extends Component {
  state = {
    penSize: 3,
    eraserSize: 5,
    eraseEnable: false,
  };

  onPenSizeChange(event) {
    this.setState({
      penSize: event.target.value,
    });
  }
  onEraserSizeChange(event) {
    this.setState({
      eraserSize: event.target.value,
    });
  }

  render() {
    return (
      <div id="whiteboard" className="shrink">
        <div className="sidebar" id="sidebar">
          <div id="drawing-tools">
            <div className="sidebar-element selected-sidebar-element">
              <label htmlFor="color">Pen</label>
              <input
                type="color"
                id="color"
                style={{ cursor: "pointer", border: "0rem" }}
              />
              <input
                type="range"
                id="penWeight"
                min="3"
                max="60"
                value={this.state.penSize}
                onChange={this.onPenSizeChange.bind(this)}
              />
            </div>

            <div className="sidebar-element">
              <label htmlFor="eraser">Eraser</label>
              <button
                id="eraser"
                value={this.state.eraseEnable}
                onClick={this.toggleErase}
              >
                <FaEraser size="25" />
              </button>
              <input
                type="range"
                id="eraserWeight"
                min="3"
                max="60"
                value={this.state.eraserSize}
                onChange={this.onEraserSizeChange.bind(this)}
              />
            </div>
          </div>

          <div id="save-element">
            <div className="sidebar-element">
              <label htmlFor="save">Save</label>
              <button id="save">
                <FaDownload size="25" />
              </button>
            </div>
          </div>
        </div>

        <div className="p5-wrapper">
          <P5Wrapper
            sketch={(p5) =>
              sketch(p5, this.props.socket, this.props.whiteboardData)
            }
          />
        </div>
      </div>
    );
  }
}

function sketch(p5, socket, whiteboardData) {
  let px, py, canvas;
  let eraseEnable = false;

  const colorPicker = document.getElementById("color");
  const penSlider = document.getElementById("penWeight");
  const eraser = document.getElementById("eraser");
  const eraserSlider = document.getElementById("eraserWeight");
  const download = document.getElementById("save");
  // console.log("colorpicker " + colorPicker.value);
  // console.log("togglebtnr " + eraseEnable);
  socket.on("draw", (drawData) => {
    p5.stroke(drawData.color);
    p5.strokeWeight(drawData.penWidth);

    if (drawData.color === "255") p5.strokeWeight(drawData.eraseWidth);

    p5.line(drawData.x, drawData.y, drawData.px, drawData.py);
    whiteboardData.push(drawData);
  });

  p5.mouseMoved = () => {
    [px, py] = [p5.mouseX, p5.mouseY];
  };

  p5.mouseDragged = () => {
    const [x, y] = [Math.round(p5.mouseX), Math.round(p5.mouseY)];

    const drawData = {
      x,
      y,
      px: px ?? x,
      py: py ?? y,
      color: colorPicker.value,
      eraseWidth: eraserSlider.value,
      penWidth: penSlider.value,
    };

    p5.stroke(drawData.color);
    p5.strokeWeight(drawData.penWidth);
    p5.cursor("default");

    if (eraseEnable) {
      drawData.color = "255";
      p5.stroke(255);
      p5.strokeWeight(drawData.eraseWidth);
      p5.cursor("crosshair");
    }
    // console.log(
    //   "color befor emitting " + drawData.color + "  " + drawData.eraseWidth
    // );

    p5.line(drawData.x, drawData.y, drawData.px, drawData.py);
    socket.emit("draw", drawData);
    whiteboardData.push(drawData);

    [px, py] = [x, y];
  };

  p5.setup = () => {
    canvas = p5.createCanvas(2500, 2000);

    p5.noLoop();
    p5.redraw();
  };

  p5.draw = () => {
    p5.background(255);
    for (const drawData of whiteboardData) {
      p5.stroke(drawData.color);
      p5.strokeWeight(drawData.penWidth);
      if (drawData.color === "255") p5.strokeWeight(drawData.eraseWidth);
      p5.line(drawData.x, drawData.y, drawData.px, drawData.py);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.redraw();
  };

  download.addEventListener("click", () => {
    p5.save(canvas, "myCanvas.jpg");
  });

  const colorElement = colorPicker.parentElement;
  const eraserElement = eraser.parentElement;
  function setEraserMode(enabled) {
    eraseEnable = enabled;
    if (enabled) {
      colorElement.classList.remove("selected-sidebar-element");
      eraserElement.classList.add("selected-sidebar-element");
    } else {
      colorElement.classList.add("selected-sidebar-element");
      eraserElement.classList.remove("selected-sidebar-element");
    }
  }

  colorElement.addEventListener("click", () => setEraserMode(false));
  eraserElement.addEventListener("click", () => setEraserMode(true));

  colorPicker.addEventListener("change", () => setEraserMode(false));
  eraserSlider.addEventListener("change", () => setEraserMode(true));
}
