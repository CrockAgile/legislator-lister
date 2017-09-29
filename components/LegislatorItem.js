import React from "react";
import Glamorous from "glamorous";

const LegislatorItemWrapper = Glamorous.span({
  padding: "0 0.5rem"
});

export default props => {
  return (
    <LegislatorItemWrapper>
      {props.official.name}
      <br />
      {props.office.name}
    </LegislatorItemWrapper>
  );
};
