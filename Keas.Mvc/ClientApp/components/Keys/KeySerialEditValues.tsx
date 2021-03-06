import * as PropTypes from "prop-types";
import * as React from "react";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { AppContext, IKeySerial } from "../../Types";

interface IProps {
    keySerial: IKeySerial;
    disableEditing: boolean;
    changeProperty?: (property: string, value: string) => void;
    openEditModal?: (keySerial: IKeySerial) => void;
}

export default class KeySerialEditValues extends React.Component<IProps, {}> {
    public static contextTypes = {
        router: PropTypes.object,
        team: PropTypes.object
    };

    public context: AppContext;
    
    public render() {
        const { keySerial } = this.props;

        const numberValue = keySerial ? keySerial.number : "";
        const statusValue = keySerial ? keySerial.status : "Active";

        const { personAction } = this.context.router.route.match.params;

        return (
            <div>
                {this.props.disableEditing && this.props.openEditModal && (
                    <Button color="link" onClick={() => this.props.openEditModal(keySerial)}>
                        <i className="fas fa-edit fa-xs" /> Edit Serial
                    </Button>
                )}
                <div className="wrapperasset">
                    <div className="form-group">
                        <label>Key Name</label>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={
                                this.props.keySerial.key.name ? this.props.keySerial.key.name : ""
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Key Code</label>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.props.keySerial.key.code}
                        />
                    </div>
                    {personAction &&
                    <Button color="link" onClick={() => this._goToKeyDetails()}>
                        <i className="fas fa-link fa-xs" /> View Key Details
                    </Button>}
                    <FormGroup>
                        <Label for="item">Number</Label>
                        <Input
                            type="text"
                            className="form-control"
                            disabled={this.props.disableEditing}
                            value={numberValue}
                            onChange={this.onChangeNumber}
                            onBlur={this.onBlurNumber}
                            invalid={!numberValue}
                        />
                        <FormFeedback>Serial number is required</FormFeedback>
                    </FormGroup>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-control"
                            value={statusValue}
                            onChange={this.onChangeStatus}
                            disabled={this.props.disableEditing}
                        >
                            <option value="Active">Active</option>
                            <option value="Lost">Lost</option>
                            <option value="Destroyed">Destroyed</option>
                            <option value="Dog ate">Dog ate</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            className="form-control"
                            disabled={this.props.disableEditing}
                            value={this.props.keySerial.notes || ""}
                            onChange={e => this.props.changeProperty("notes", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private onBlurNumber = () => {
        let value = this.props.keySerial.number;
        value = value.trim();

        this.props.changeProperty("number", value);
    };

    private onChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeProperty("number", event.target.value);
    };

    private onChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.changeProperty("status", event.target.value);
    };

    private _goToKeyDetails = () => {
        if (!this.props.keySerial || !this.props.keySerial.key) {
            return;
        }
        const { team } = this.context;
        this.context.router.history.push(
            `/${team.slug}/keys/details/${this.props.keySerial.key.id}`
        );
    };
}
