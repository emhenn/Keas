import * as React from "react";

import { IKey, ISerial } from "../../Types";
import ListActionsDropdown from "../ListActionsDropdown";

interface IProps {
    serialEntity: ISerial;
    selectedKey?: IKey;
    onRevoke?: (serial: ISerial) => void;
    onAdd?: (serial: ISerial) => void;
    showDetails?: (serial: ISerial) => void;
    onEdit?: (serial: ISerial) => void;
}


export default class EquipmentListItem extends React.Component<IProps, {}> {
    public render() {
        const hasAssignment = !!this.props.serialEntity.assignment;
        const key = this.props.serialEntity.key ? this.props.serialEntity.key : this.props.selectedKey;
        let spaceNamesArray = !!key ? 
          key.keyXSpaces.map(x => x.space.roomNumber + " " + x.space.bldgName) : [];
        let spaceNames = "";
        if(spaceNamesArray.length > 2)
        {
          spaceNamesArray = spaceNamesArray.slice(0,2);
          spaceNames = spaceNamesArray.join(", ").concat(",...");
        }
        else
        {
          spaceNames = spaceNamesArray.join(", ");
        }
        return (
          <tr>
            <td>{key.name ? key.name : ""}</td>
            <td>{spaceNames}</td>
            <td>{this.props.serialEntity.number}</td>
            <td>{hasAssignment ? this.props.serialEntity.assignment.person.user.name : ""}</td>
            <td>
              {hasAssignment ? this.props.serialEntity.assignment.expiresAt : ""}
            </td>
            <td>
              <ListActionsDropdown
                onRevoke={!!this.props.onRevoke && hasAssignment ? 
                  () => this.props.onRevoke(this.props.serialEntity) : null}
                onAdd={!!this.props.onAdd && !hasAssignment ? 
                  () => this.props.onAdd(this.props.serialEntity) : null}
                showDetails={!!this.props.showDetails ? 
                  () => this.props.showDetails(this.props.serialEntity) : null}
                onEdit={!!this.props.onEdit ? 
                  () => this.props.onEdit(this.props.serialEntity) : null}
                />
            </td>
          </tr>
        );
      }
}
 