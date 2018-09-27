import * as React from "react";
import SerialListItem from "./SerialListItem";

import { ISerial } from "../../Types";

interface IProps {
    serials: ISerial[];
    onRevoke?: (serial: ISerial) => void;
    onAdd?: (serial: ISerial) => void;
    onCreate?: () => void;
    showDetails?: (serial: ISerial) => void;
    onEdit?: (serial: ISerial) => void;
}

export default class SerialList extends React.Component<IProps, {}> {
  public render() {
      const serials = this.props.serials.map(x => (
          <SerialListItem
              key={x.id.toString()}
              serialEntity={x}
              onRevoke={this.props.onRevoke}
              onAdd={this.props.onAdd}
              showDetails={this.props.showDetails}
              onEdit={this.props.onEdit}
          />
    ));
      return (
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th>Key Name</th>
              <th>Spaces</th>
              <th>Number</th>
              <th>Assigned To</th>
              <th>Expiration</th>
              <th className="list-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{serials}</tbody>
        </table>
      </div>
    );
  }
}
