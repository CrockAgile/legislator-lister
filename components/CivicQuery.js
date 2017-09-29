import React from "react";
import Glamorous from "glamorous";
import PropTypes from "prop-types";
import CivicQueryResult from "./CivicQueryResult";

const googleCivicsKey = "AIzaSyBn9na2UKkxK1LtpZmgUQimxckotK6fNKk";
const QueryResultWrapper = Glamorous.div({
  display: "flex",
  flex: "1 1 auto",
  width: "auto",
  flexBasis: "auto",
  padding: "0 0.3rem"
});

export default class CivicQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offices: [],
      officicals: [],
      error: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.address && this.props.address != prevProps.address) {
      let queryString = CivicQuery.propsToQueryString(this.props);
      fetch(queryString)
        .then(response => {
          return response.json();
        })
        .then(civicData => {
          this.handleCivicData(civicData);
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  }
  static propTypes = {
    address: PropTypes.string.isRequired,
    includeOffices: PropTypes.bool,
    levels: PropTypes.arrayOf(PropTypes.string),
    roles: PropTypes.arrayOf(PropTypes.string)
  };
  static defaultProps = {
    includeOffices: true,
    levels: ["administrativeArea1"],
    roles: ["legislatorUpperBody", "legislatorLowerBody"]
  };
  static propsToQueryString(props) {
    let queryString = "https://www.googleapis.com/civicinfo/v2/representatives";
    queryString += `?address=${props.address}`;

    if (props.includeOffices) {
      queryString += "&includeOffices=true";
    } else {
      queryString += "&includeOffices=false";
    }

    if (props.levels) {
      props.levels.forEach(level => {
        queryString += `&levels=${level}`;
      });
    }

    if (props.roles) {
      props.roles.forEach(role => {
        queryString += `&roles=${role}`;
      });
    }

    queryString += `&key=${googleCivicsKey}`;
    return queryString;
  }
  handleCivicData(civicData) {
    const considerError = !(civicData.offices && civicData.officials);
    this.setState({
      offices: civicData.offices,
      officials: civicData.officials,
      error: considerError
    });
  }
  handleError(error) {
    console.log(error, queryString, this.state);
    this.setState({
      error: true
    });
  }
  render() {
    let queryResults = <CivicQueryResult error={this.state.error} />;
    if (!this.state.error) {
      queryResults = this.state.offices.map((office, index) => {
        const official = this.state.officials[office.officialIndices[0]];
        return <CivicQueryResult official={official} office={office} key={index} />;
      });
    }
    return <QueryResultWrapper>{queryResults}</QueryResultWrapper>;
  }
}
