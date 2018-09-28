import * as React from "react";

import { IAccess } from "../../Types";

import ReactTable from 'react-table';

interface IProps {
    selectedAccess: IAccess;
    disableEditing: boolean;
    changeProperty?: (property: string, value: string) => void;
    creating?: boolean;
}

export default class AccessEditValues extends React.Component<IProps, {}> {

    public render() {
        const assignments = this.props.selectedAccess.assignments.length > 0 ? this.props.selectedAccess.assignments.map(x =>
            <div key={x.id} >
                <div className="form-group">
                    <label>Assigned To</label>
                    <input type="text"
                        className="form-control"
                        disabled={true}
                        value={x.person.name}
                    />
                </div>
                <div className="form-group">
                    <label>Expires At</label>
                    <input type="text"
                        className="form-control"
                        disabled={true}
                        value={x.expiresAt.toString()}
                    />
                </div>
            </div>) : "";
        
        const columns = [{
            id: 'personFirstName',
            Header: 'First Name',
            accessor: x=> x.person.firstName
        }, {
            id: 'personLastName',
            Header: 'Last Name',
            accessor: x=> x.person.lastName
        }, {
            id: 'expiresAt'
            Header: 'Expires at',
            accessor: x=> x.expiresAt.toString()
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
}
