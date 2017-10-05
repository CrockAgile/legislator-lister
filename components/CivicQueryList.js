import React from "react";
import Glamorous from "glamorous";
import PropTypes from "prop-types";
import DebounceInput from "./DebounceInput";
import CivicQuery from "./CivicQuery";
import CivicQueryListControls from "./CivicQueryListControls";

const CivicQueryListWrapper = Glamorous.div({
  backgroundColor: "#88CC88",
  padding: "1.2rem",
  marginTop: "1rem"
});

const ListHeaderWrapper = Glamorous.div({
  padding: "1rem 0",
  display: "flex",
  flex: "1 1 auto",
  justifyContent: "space-between",
  alignItems: "flex-end"
});

const ListHeader = Glamorous.h1({
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
      addressList: Array(this.props.initialLength).fill("")
    };
    this.handleInput = this.handleInput.bind(this);
    this.handlelistResize = this.handlelistResize.bind(this);
  }
  static propTypes = {
    initialLength: PropTypes.number.isRequired,
    debounce: PropTypes.number.isRequired
  };
  handleInput(input, index) {
    this.setState(prevState => {
      prevState.addressList[index] = input;
      return prevState;
    });
  }
  handlelistResize(newListSize) {
    this.setState(prevState => {
      const listSizeDiff = newListSize - prevState.addressList.length;
      if (listSizeDiff > 0) {
        const newAddresses = Array(listSizeDiff).fill("");
        prevState.addressList = prevState.addressList.concat(newAddresses);
      } else if (listSizeDiff < 0) {
        prevState.addressList.splice(prevState.addressList.length + listSizeDiff, Math.abs(listSizeDiff));
      }
      return prevState;
    });
  }
  render() {
    const civicQueries = this.state.addressList.map((address, index) => {
      return (
        <CivicQueryWrapper key={index}>
          <DebounceInput
            initialInput=""
            type="text"
            size={40}
            debounce={this.props.debounce}
            inputHandler={this.handleInput}
            inputHandlerArgs={[index]}
          />
          <CivicQuery address={address} />
        </CivicQueryWrapper>
      );
    });
    return (
      <CivicQueryListWrapper>
        <ListHeaderWrapper>
          <ListHeader>Legislator Lookup</ListHeader>
          <CivicQueryListControls
            listSize={this.state.addressList.length}
            listResizeHandler={this.handlelistResize}
          />
        </ListHeaderWrapper>
      </CivicQueryListWrapper>
    );
  }
}
