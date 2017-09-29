import React from "react";
import { rehydrate, css } from "glamor";
import Glamorous from "glamorous";
import CivicQueryList from "../components/CivicQueryList";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    css.global("html, body", {
      boxSizing: "border-box",
      padding: "0.5rem 0",
      margin: 0,
      backgroundColor: "#55AA55",
      minHeight: "100%",
      fontFamily: "Ubuntu, Helvetica"
    });

    css.global("*", {
      boxSizing: "border-box"
    });
  }
  render() {
    return <CivicQueryList />;
  }
}
