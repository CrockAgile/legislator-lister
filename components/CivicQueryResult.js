import React from "react";
import Glamorous from "glamorous";

const QueryResultWrapper = Glamorous.div({
  margin: "0 0.3rem",
  backgroundColor: "rgba(255,255,255,0.7)",
  display: "flex",
  flex: "0 1 50%",
  alignItems: "center",
  justifyContent: "center"
});

const QueryErrorWrapper = Glamorous(QueryResultWrapper)({
  color: "#a00"
});

export default class CivicQueryResult extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.error) {
      return <QueryErrorWrapper>Error</QueryErrorWrapper>;
    }
    return (
      <QueryResultWrapper>
        {this.props.official.name}
      </QueryResultWrapper>
    );
  }
}
