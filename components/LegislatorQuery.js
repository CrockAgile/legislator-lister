import React from "react";
import Glamorous from "glamorous";
import LegislatorQueryResult from "./LegislatorQueryResult";

const LegislatorQueryWrap = Glamorous.div({
  padding: "0.4rem 0.2rem 0.4rem 0",
  borderTop: "0.1rem solid #004400",
  display: "flex",
  flex: "1 1 auto",
  "&:last-child": {
    borderBottom: "0.1rem solid #004400",
  }
});

const LegislatorQueryInput = Glamorous.input({
  border: "none",
  fontSize: "1.3rem",
  flexBasis: "40rem"
});

export default class LegislatorQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      debounceTimeout: null,
      queryAddress: ""
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.updateQueryAddress = this.updateQueryAddress.bind(this);
  }
  handleAddressChange(event) {
    const newAddress = event.target.value;

    this.setState((prevState, props) => {
      if (prevState.debounceTimeout) {
        clearTimeout(prevState.debounceTimeout);
      }
      const newTimeout = setTimeout(
        this.updateQueryAddress,
        this.props.debounce,
        newAddress
      );
      return { address: newAddress, debounceTimeout: newTimeout };
    });
  }
  updateQueryAddress(queryAddress) {
    queryAddress = queryAddress.replace(/(\r\n|\n|\r)/gm, "");
    this.setState({
      queryAddress: queryAddress
    });
  }
  render() {
    return (
      <LegislatorQueryWrap>
        <LegislatorQueryInput name="address" type="text" size="40" onChange={this.handleAddressChange} />
        <LegislatorQueryResult
          address={this.state.queryAddress}
          includeOffices={true}
          levels={["administrativeArea1"]}
          roles={["legislatorUpperBody", "legislatorLowerBody"]}
        />
      </LegislatorQueryWrap>
    );
  }
}
