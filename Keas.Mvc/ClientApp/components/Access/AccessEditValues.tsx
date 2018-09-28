﻿import * as React from 'react';

import { IAccess } from '../../Types';

import ReactTable from 'react-table';
import * as moment from "moment";

interface IProps {
    selectedAccess: IAccess;
    disableEditing: boolean;
    changeProperty?: (property: string, value: string) => void;
    creating?: boolean;
}

export default class AccessEditValues extends React.Component<IProps, {}> {

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
            Cell: "X do something here",
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
}
