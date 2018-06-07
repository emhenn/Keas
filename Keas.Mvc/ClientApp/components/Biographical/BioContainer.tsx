import PropTypes from "prop-types";
import * as React from "react";

import { AppContext, IPerson } from "../../Types";

import EditBio from "./EditBio";

interface IProps {
    person: IPerson;
}
interface IState {
    loading: boolean;
}
export default class BioContainer extends React.Component<IProps, IState> {
    public static contextTypes = {
        fetch: PropTypes.func,
        permissions: PropTypes.array,
        router: PropTypes.object,
        team: PropTypes.object
    };
    public context: AppContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

  public render() {
      

      const { action, assetType, id } = this.context.router.route.match.params;
      const activeAsset = !assetType || assetType === "person";
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.props.person.name}</h4>
          <p className="card-text">
            <i className="fa fa-phone" aria-hidden="true" /> {" "}
            {this.props.person.phone}
                    <br/>
            <i className="fa fa-envelope-o" aria-hidden="true" />{" "}
            {this.props.person.user.email}
          </p>
            <EditBio
                onEdit={this._editBio}
                closeModal={this._closeModals}
                modal={activeAsset && (action === "edit")}
                selectedPerson={this.props.person}
            />
        </div>
      </div>
    );
  }

    private _editBio = async (person: IPerson) => {
        const index = this.state.person.findIndex(x => x.id === person.id);

        if (index === -1) // should always already exist
        {
            return;
        }

        const updated: IPerson = await this.context.fetch(`/api/${this.context.team.name}/person/update`, {
            body: JSON.stringify(key),
            method: "POST"
        });

        // update already existing entry in key
        const updateperson = [...this.state.person];
        updatePerson[index] = updated;

        this.setState({
            ...this.state,
            person: updateperson
        });
    }
}


