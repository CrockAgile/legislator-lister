import React from "react";
import Glamorous from "glamorous";
import LegislatorQuery from "./LegislatorQuery";

const LegislatorQueryListWrapper = Glamorous.div({
  backgroundColor: "#88CC88",
  padding: "1.2rem",
  marginTop: "1rem"
});

const ListHeader = Glamorous.h1({
  padding: "1rem 0",
  margin: "0",
  color: "#444"
});

const InputLabel = Glamorous.label({
  padding: "0.5rem 0.5rem 0.5rem 0"
});

export default class LegislatorQueryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debounce: 1000,
      listSize: 10
    };
    this.handleListSizeChange = this.handleListSizeChange.bind(this);
  }
  handleListSizeChange(event) {
    this.setState({
      listSize: event.target.value
    });
  }
  render() {
    const listItems = [...Array(this.state.listSize)].map((elem, index) => {
      return <LegislatorQuery debounce={this.state.debounce} key={index} />;
    });

    return (
      <LegislatorQueryListWrapper>
        <ListHeader>Legislator Lookup</ListHeader>
        <InputLabel htmlFor="listSize">Number of Addresses:</InputLabel>
        <input name="listSize" type="number" value={this.state.listSize} onChange={this.handleListSizeChange} min="0" />
        {listItems}
      </LegislatorQueryListWrapper>
    );
  }
}
