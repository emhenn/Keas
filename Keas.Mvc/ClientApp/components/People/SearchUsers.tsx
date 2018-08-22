﻿import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "reactstrap";

import { AppContext, IUser, IPerson } from "../../Types";

interface IState {
    reloaded: boolean;
    reloading: boolean;
    search: string;
}

interface IProps {
  updateUser: (user: IUser) => void;
}

export default class SearchUsers extends React.Component<IProps, IState> {
  public static contextTypes = {
    fetch: PropTypes.func,
    router: PropTypes.object,
    team: PropTypes.object
  };
  public context: AppContext;
  constructor(props) {
    super(props);

    this.state = {
        reloaded: false, // controls checkmark to show that user have been searched for
        reloading: false, // controls loading icon while fetching
        search: "",
    };
  }

  public render() {
    return (
          <div className="form-group">
                    <label>Search For User</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.search}
                        onChange={(e) => this.setState({search: e.target.value})}
                    />
            <Button onClick={this._loadUser} disabled={this.state.reloading}>
              Search For User {" "}
              {this.state.reloaded ? <i className="fas fa-check" /> : null}
              {this.state.reloading ? <i className="fas fa-spin fa-spinner" /> : null}
            </Button> 
        </div>
        );
  }

  private _loadUser = async () => {
    this.setState({reloading: true, reloaded: false});
    const userFetchUrl = `/api/${this.context.team.name}/people/searchUser?searchTerm=${this.state.search}`;
  
    const user = await this.context.fetch(userFetchUrl);
    this.props.updateUser(user);
    this.setState({ reloading: false, reloaded: true });
  }

}
