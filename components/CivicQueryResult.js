import React from "react";
import Glamorous from "glamorous";

const CivicQueryResultWrapper = Glamorous.span({
  padding: "0 0.5rem"
});

export default props => {
  return (
    <CivicQueryResultWrapper>
      {props.official.name}
      <br />
      {props.office.name}
    </CivicQueryResultWrapper>
  );
};
