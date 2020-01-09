import React, { Component } from "react";
import PropTypes from "prop-types";
import TLWrapper from "./TLWrapper.jsx";
import Tab from "./Tab.jsx";
import { Link } from "react-router-dom";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;

            return (
              <Link
                  key={label}
                  to={`${child.props.href}`}>
                <Tab
                  activeTab={activeTab}
                  label={label}
                  onClick={onClickTabItem}
                />
              </Link>
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return null;
            return <TLWrapper key={child.props.label} disabled={child.props.disabled} />;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
