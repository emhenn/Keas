import * as React from "react";

import { IKey } from "../../Types";

interface IProps {
    selectedKey: IKey;
    disableEditing: boolean;
    changeProperty?: (property: string, value: string) => void;
    creating?: boolean;
}

export default class KeyEditValues extends React.Component<IProps, {}> {

    public render() {
        return (
            <div>
                {!this.props.creating &&
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                        className="form-control"
                        disabled={this.props.disableEditing}
                        value={this.props.selectedKey.name ? this.props.selectedKey.name : ""}
                        onChange={(e) => this.props.changeProperty("name", e.target.value)}
                    />
                </div>}
            </div>
        );
    }
}
