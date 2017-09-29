import React from "react";
import Glamorous from "glamorous";
import DebounceInput from "../components/DebounceInput";

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

const CivicQueryWrapper = Glamorous.div({});

export default class CivicQueryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debounce: 1000,
      addressList: Array(10).fill("")
    };
    this.handleInput = this.handleInput.bind(this);
  }
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
            size="40"
            debounce={this.state.debounce}
            inputHandler={this.handleInput}
            inputHandlerArgs={[index]}
          />
          {address}
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
