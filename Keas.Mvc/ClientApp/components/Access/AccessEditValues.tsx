import * as React from 'react';

import { IAccess, IAccessAssignment, IPerson } from '../../Types';

import ReactTable from 'react-table';
import * as moment from "moment";

interface IProps {
    selectedAccess: IAccess;
    onRevoke: (accessAssignment: IAccessAssignment) => void;
}

interface IState {
    access: IAccess;    
    person: IPerson;
}

export default class AccessEditValues extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            access: this.props.selectedAccess,
            person: null
        };
    }

    public render() {
        const columns = [{
            id: "personFirstName",
            Header: "First Name",
            accessor: x=> x.person.firstName
        }, {
            id: "personLastName",
            Header: "Last Name",
            accessor: x=> x.person.lastName
        }, {
            id: "expiresAt"
            Header: "Expires at",
            accessor: x=> moment(x.expiresAt).format("MM/DD/YYYY").toString()
        },{
            Header: "Revoke",
            Cell: <button type="button" className="btn btn-outline-danger" onClick={() => this._revokeAccess(x=> x.person)}><i className="fas fa-trash" /></button>,
            sortable: false,
        }]     
        
        return (
            <div>
                {!this.props.creating &&
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedAccess.name ? this.props.selectedAccess.name : ""}
                        onChange={(e) => this.props.changeProperty("name", e.target.value)}
                    />
                </div>}   
                <h3>Assigned to:</h3>             
                <ReactTable data={this.props.selectedAccess.assignments} columns={columns} minRows={1} />             
            </div>
        );
    }

    private _revokeAccess = async (person: IPerson) => {
               
        const accessAssignment = this.state.access.assignments.filter(x => x.personId === person.id);

        await this.props.onRevoke(accessAssignment[0]);

    };
}
