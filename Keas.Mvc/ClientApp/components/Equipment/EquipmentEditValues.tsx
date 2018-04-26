﻿import * as React from "react";

import { IEquipment, IRoom } from "../../Types";
import AssignRoom from "../Spaces/AssignRoom"
import CreateAttribute from "./CreateAttribute";

interface IProps {
    selectedEquipment: IEquipment;
    disableEditing: boolean;
    changeProperty?: (property: string, value: any) => void;
    addAttribute?: (key: string, value: string) => void;
}

export default class EquipmentEditValues extends React.Component<IProps, {}> {

    public render() {
        return (
            <div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                        className="form-control"
                        disabled={true}
                        value={this.props.selectedEquipment.name ? this.props.selectedEquipment.name : ""}
                    />
                </div>
                <div className="form-group">
                    <label>Serial Number</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedEquipment.serialNumber ? this.props.selectedEquipment.serialNumber : ""}
                        onChange={(e) => this.props.changeProperty("serialNumber", e.target.value)}
                    />
                </div>
                {this.props.selectedEquipment.assignment != null &&
                    <div className="form-group">
                        <label>Expires at</label>
                        <input type="text"
                            className="form-control"
                            disabled={this.props.disableEditing}
                            value={this.props.selectedEquipment.assignment.expiresAt ? this.props.selectedEquipment.assignment.expiresAt.toString() : ""}
                            />
                    </div>
                }
                <div className="form-group">
                    <label>Make</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedEquipment.make ? this.props.selectedEquipment.make : ""}
                        onChange={(e) => this.props.changeProperty("make", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedEquipment.model ? this.props.selectedEquipment.model : ""}
                        onChange={(e) => this.props.changeProperty("model", e.target.value)}
                    />
                </div>
                <CreateAttribute equipment={this.props.selectedEquipment} addAttribute={this.props.addAttribute} />
                {this.props.disableEditing &&
                    <div className="form-group">
                        <label>Room</label>
                        <input type="text"
                            className="form-control"
                            disabled={true}
                            value={this.props.selectedEquipment.room ?
                                `${this.props.selectedEquipment.room.roomKey} ${this.props.selectedEquipment.room.bldgName}` : ""}
                        />
                    </div>
                }
                {!this.props.disableEditing &&
                    <div className="form-group">
                        <label>Room</label>
                        <AssignRoom onSelect={this._selectRoom} />
                    </div>
                }

            </div>
        );
    }

    private _selectRoom = (room: IRoom) => {
        this.props.changeProperty("room", room);
    } 
}
