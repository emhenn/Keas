import * as React from "react";

import { IPerson } from "../../Types";

interface IProps {
    selectedPerson: IPerson;
    disableEditing: boolean;
    changeProperty?: (property: string, value: string) => void;
    creating?: boolean;
}

export default class BioEditValues extends React.Component<IProps, {}> {

    public render() {
        return (
            <div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                            className="form-control"
                            disabled={this.props.disableEditing}
                            value={this.props.selectedPerson.name ? this.props.selectedPerson.name : ""}
                            onChange={(e) => this.props.changeProperty("name", e.target.value)}
                        />
                    </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing || !this.props.creating}
                        autoFocus={!this.props.disableEditing && this.props.creating}
                        value={this.props.selectedPerson.user.email ? this.props.selectedPerson.user.email : ""}
                        onChange={(e) => this.props.changeProperty("serialNumber", e.target.value)}
                    />
                </div>
            </div>
        );
    }
}