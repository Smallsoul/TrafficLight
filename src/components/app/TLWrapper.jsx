import * as React from "react";
import ATL from "./ATL.jsx";
import PTL from "./PTL.jsx";
import "./TLWrapper.css";

class TLWrapper extends React.Component {
  state = {
    isButtonClick: false,
    isSignal: false,
    color: {
      red: "black",
      yellow: "black",
      green: "green"
    },
    timeout: {
      red: 10000,
      yellow: 700,
      green: 10000
    },
    next: "red"
  };

  componentDidMount() {
    console.log("Mount", this.state);
    this.handleChange();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.color != this.state.color) {
      console.log("Update");
      this.handleChange();
    }
  }

  changeColor = (newState, timeout) => {
    console.log("Вызов промиса");
    return new Promise(resolve => {
      setTimeout(() => resolve(newState), timeout);
    });
  };

  signalTransmission = () => {
    if (this.state.color.green === "green" && !this.state.isSignal) {
      this.setState({
        ...this.state,
        isSignal: true
      });
      console.log("Сработала кнопка", this.state);
      let temp = this.changeFromGreen();

      this.changeColor(temp.tempState, 2000).then(result => {
        this.setState({ ...this.state, ...result, isButtonClick: true })
        console.log("State из кнопки", this.state)
      });

      setTimeout(() => {
        this.setState({
          ...this.state,
          isSignal: false
        });
        console.log("Кнопка доступна", this.state);
      }, 30000);
    }
  };

  changeFromRed = () => {
    console.log("вызов FromRed");
    const time = this.state.timeout.red;
    const tempState = {
      color: {
        red: "red",
        yellow: "yellow",
        green: "black"
      },
      next: "green"
    };
    return { tempState, time };
  };

  changeFromYellow = () => {
    console.log("вызов FromYellow");
    let time = this.state.timeout.yellow;
    let tempState = {
      color: {
        red: "black",
        yellow: "black",
        green: "green"
      },
      next: "red"
    };
    if (this.state.next !== "green") {
      time *= 2;
      tempState = {
        color: {
          red: "red",
          yellow: "black",
          green: "black"
        },
        next: "green"
      };
    }
    return { tempState, time };
  };

  changeFromGreen = () => {
    console.log("вызов FromGreen");
    const time = this.state.timeout.green;
    const tempState = {
      color: {
        red: "black",
        yellow: "yellow",
        green: "black"
      },
      next: "red"
    };
    return { tempState, time };
  };

  handleChange = () => {
    let template = { tempState: {}, time: {}};

    if (
      this.state.color.red === "red" &&
      this.state.color.yellow !== "yellow"
    ) {
      template = this.changeFromRed();
    } else {
      if (this.state.color.yellow === "yellow") {
        template = this.changeFromYellow();
      } else {
        template = this.changeFromGreen();
      }
    }

    this.changeColor(template.tempState, template.time).then(result => {
      if (!this.state.isButtonClick) {
        this.setState({ ...this.state, ...result });
        console.log("Сработал переход", this.state);
      } else {
        this.setState({
          ...this.state,
          isButtonClick: false
        });
        console.log("Сработал переход из-за кнопки", this.state);
      }
    });
  };

  render() {
    return (
      <div className="wrapper">
        {!this.props.disabled[0] && <ATL data={this.state.color} />}
        {!this.props.disabled[1] && (
          <div className="inner">
            <PTL data={this.state.color} />
            <button onClick={this.signalTransmission} className="btn btn-warning">
              Нажми
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TLWrapper;
