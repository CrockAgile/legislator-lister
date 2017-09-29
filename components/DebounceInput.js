import React from "react";
import Glamorous from "glamorous";

export default class DebounceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debounceTimeout: null,
      input: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const newInput = event.target.value;
    this.setState(prevState => {
      if (prevState.debounceTimeout) {
        clearTimeout(prevState.debounceTimeout);
      }
      const newTimeout = setTimeout(() => {
        this.props.inputHandler(newInput, this.props.inputHandlerArgs);
      }, this.props.debounce );
      return { input: newInput, debounceTimeout: newTimeout };
    });
  }
  render() {
    return (
      <input
        type={this.props.type}
        size={this.props.size}
        onChange={this.handleInputChange}
      />
    );
  }
}
