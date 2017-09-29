import React from "react";
import Glamorous from "glamorous";
import PropTypes from "prop-types";
import DebounceInput from "./DebounceInput";

export default class CivicQueryListControls extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="listSizeInput">Number of Addresses: </label>
        <DebounceInput debounce={1000} type="number" inputHandler={this.props.listResizeHandler} initialInput={this.props.listSize} />
      </div>
    );
  }
}
