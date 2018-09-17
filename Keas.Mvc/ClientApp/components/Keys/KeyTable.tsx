import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "reactstrap";

import { IKey } from "../../Types";

interface IProps {
    filtered: any[];
    keys: IKey[];
    showDetails: (key: IKey) => void;
    updateFilters: (filters: any[]) => void;
}

export default class KeyTable extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);

        this.state = {
            filtered: []
        };
    }
    public render() {
        return (
            <ReactTable
                data={this.props.keys}
                filterable={true}
                minRows={1}
                filtered={this.props.filtered}
                onFilteredChange={filtered => this.props.updateFilters(filtered)}
                columns = {[
                    {
                        Header: "Actions",
                        headerClassName: "spaces-details",
                        filterable: false,
                        sortable: false,
                        resizable: false,
                        className: "spaces-details",
                        Cell: row => (
                            <Button color="secondary" onClick={() => this.props.showDetails(row.original)}>
                            View Details
                            </Button>
                        ),
                        maxWidth: 150,
                    },
                    {
                        Header: "Name",
                        accessor: "name",
                        filterMethod: (filter, row) => 
                            !!row[filter.id] && row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                        ,
                        Cell: row => (
                                <span>{row.original.name}</span>
                            )
                    },
                    {
                        Header: "Number",
                        accessor: "number",
                        filterMethod: (filter, row) => 
                            !!row[filter.id] &&
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
                        Cell: row => (
                            <span>{row.original.number}</span>
                        ),
                    },
                    {
                        Header: "Serials",
                        headerClassName: "table-10p",
                        className: "table-10p",
                        id: "serials",
                        accessor: (row) => row.serials,
                        filterMethod: (filter, row) => {
                            if( filter.value === "all") {
                                return true;
                            }
                            if( filter.value === "available") {
                                return (row._original.serials.some(x => !x.assignment);
                            }
                        },
                        Filter: ({filter, onChange}) => 
                            <select onChange={e => onChange(e.target.value)}
                            style={{width: "100%"}}
                            value={filter ? filter.value : "all"}
                            >
                                <option value="all">Show All</option>
                                <option value="available">Available</option>
                            </select>,
                        Cell: row => (
                            <span><i className="fas fa-user"></i> {row.original.serials.filter(x => !!x.assignment).length} / {row.original.serials.length}</span>
                        ),
                    },

                    
                ]}
            />
        );
    }
}
