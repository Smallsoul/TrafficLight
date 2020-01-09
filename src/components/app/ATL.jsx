import * as React from "react";
import "./ATL.css";

class ATL extends React.Component {

  render() {
    return (
      <div className="traffic-light">
        <div
          className="traffic-light-box"
          style={{ backgroundColor: this.props.data.red }}
        ></div>
        <div
          className="traffic-light-box"
          style={{ backgroundColor: this.props.data.yellow }}
        ></div>
        <div
          className="traffic-light-box"
          style={{ backgroundColor: this.props.data.green }}
        ></div>
      </div>
    );
  }
}

export default ATL;
