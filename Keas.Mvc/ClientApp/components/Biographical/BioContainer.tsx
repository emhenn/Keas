import PropTypes from "prop-types";
import * as React from "react";

import { AppContext, IPerson } from "../../Types";

interface IProps {
    person: IPerson;
}

export default class BioContainer extends React.Component<IProps, {}> {
  public static contextTypes = {
    fetch: PropTypes.func
  };
  public context: AppContext;
  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.props.person.name}</h4>
          <p className="card-text">
            <i className="fa fa-phone" aria-hiddent="true" /> {" "}
            {this.props.person.phone}
                    <br/>
            <i className="fa fa-envelope-o" aria-hidden="true" />{" "}
            {this.props.person.user.email}
          </p>
        </div>
      </div>
    );
  }
}
