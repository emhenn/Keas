import * as React from "react";

import { ISerial } from "../../Types";

interface IProps {
    changeProperty?: (property: string, value: any) => void;
    tags?: string[];
    disableEditing: boolean;
    selectedSerial: ISerial;
    creating?: boolean;
}

export default class SerialEditValues extends React.Component<IProps, {}> {

    public render() {
        if(!this.props.selectedSerial)
        {
            return null;
        }
        const spacesNames = this.props.selectedSerial.key ? 
            this.props.selectedSerial.key.keyXSpaces.map(x => x.space.roomNumber + " " + x.space.bldgName ).join(", ") : "";
        return (
            <div>
                <div className="form-group">
                    <label>Key Name</label>
                    <input type="text"
                        className="form-control"
                        disabled={true}
                        value={this.props.selectedSerial.key.name}
                        />
                </div>
                <div className="form-group">
                    <label>Spaces</label>
                    <input type="text"
                        className="form-control"
                        disabled={true}
                        value={spacesNames}
                        />
                </div>
                {!this.props.creating &&
                <div className="form-group">
                    <label>Serial Number</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedSerial.number ? this.props.selectedSerial.number : ""}
                        onChange={(e) => this.props.changeProperty("number", e.target.value)}
                    />
                </div>}
                {this.props.selectedSerial.assignment != null &&
                <div>
                    <div className="form-group">
                        <label>Assigned To</label>
                        <input type="text"
                            className="form-control"
                            disabled={true}
                            value={this.props.selectedSerial.assignment.person.user.name}
                            />
                    </div>
                    <div className="form-group">
                        <label>Expires at</label>
                        <input type="text"
                            className="form-control"
                            disabled={true}
                            value={this.props.selectedSerial.assignment.expiresAt.toString()}
                            />
                    </div>
                </div>
                }

            </div>
        );
    }
}
