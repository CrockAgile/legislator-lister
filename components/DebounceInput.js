import React from "react";
import Glamorous from "glamorous";
import PropTypes from "prop-types";

export default class DebounceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debounceTimeout: null,
      input: props.initialInput
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  static propTypes = {
    inputHandler: PropTypes.func.isRequired,
    inputHandlerArgs: PropTypes.array,
    initialInput: PropTypes.any,
    debounce: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.number
  };
  componentWillUnmount() {
    if (this.state.debounceTimeout) {
      clearTimeout(this.state.debounceTimeout);
    }
  }
  handleInputChange(event) {
    const newInput = event.target.value;
    this.setState(prevState => {
      if (prevState.debounceTimeout) {
        clearTimeout(prevState.debounceTimeout);
      }
      const newTimeout = setTimeout(() => {
        this.props.inputHandler(newInput, this.props.inputHandlerArgs);
      }, this.props.debounce);
      return { input: newInput, debounceTimeout: newTimeout };
    });
  }
  render() {
    return (
      <input
        type={this.props.type}
        size={this.props.size}
        onChange={this.handleInputChange}
        value={this.state.input}
      />
    );
  }
}
