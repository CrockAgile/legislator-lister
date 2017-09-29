import React from "react";
import Glamorous from "glamorous";
import PropTypes from "prop-types";
import DebounceInput from "../components/DebounceInput";
import CivicQuery from "../components/CivicQuery";

const CivicQueryListWrapper = Glamorous.div({
  backgroundColor: "#88CC88",
  padding: "1.2rem",
  marginTop: "1rem"
});

const ListHeader = Glamorous.h1({
  padding: "1rem 0",
  margin: "0",
  color: "#444"
});

const CivicQueryWrapper = Glamorous.div({
  display: "flex",
  flex: "1 1 auto",
  borderTop: "0.1em solid black",
  padding: "0.3em 0",
  minHeight: "2.5em",
  ":last-child": {
    borderBottom: "0.1em solid black"
  },
  "& input": {
    padding: "0",
    fontSize: "1.4em",
    border: "none"
  }
});

export default class CivicQueryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debounce: 2000,
      addressList: Array(this.props.initialLength).fill("")
    };
    this.handleInput = this.handleInput.bind(this);
  }
  static propTypes = {
    initialLength: PropTypes.number.isRequired
  };
  handleInput(input, index) {
    this.setState(prevState => {
      prevState.addressList[index] = input;
      return prevState;
    });
  }
  render() {
    const civicQueries = this.state.addressList.map((address, index) => {
      return (
        <CivicQueryWrapper key={index}>
          <DebounceInput
            type="text"
            size={40}
            debounce={this.state.debounce}
            inputHandler={this.handleInput}
            inputHandlerArgs={[index]}
          />
          <CivicQuery address={address} />
        </CivicQueryWrapper>
      );
    });
    return (
      <CivicQueryListWrapper>
        <ListHeader>Legislator Lookup</ListHeader>
        {civicQueries}
      </CivicQueryListWrapper>
    );
  }
}
