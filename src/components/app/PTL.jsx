import * as React from "react";
import "./ATL.css";

class PTL extends React.Component {
  state = {
      red: 'black',
      green: 'black'
    }

  componentDidMount() {
    this.handleChange();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleChange();
    }
  }

  handleChange = () => {
    if (this.props.data.red === 'red') {
      this.setState({
        red: 'black',
        green: 'green'
      })
    } else {
      this.setState({
        red: 'red',
        green: 'black'
      })
    }
  }

  render() {
    return (
      <div className="traffic-light">
        <div
          className="traffic-light-box"
          style={{ backgroundColor: this.state.red }}
        ></div>
        <div
          className="traffic-light-box"
          style={{ backgroundColor: this.state.green }}
        ></div>
      </div>
    )
  }
}
export default PTL;
