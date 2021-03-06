import * as PropTypes from "prop-types";
import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { AppContext, IKey, IKeySerial } from "../../Types";
import KeySerialEditValues from "./KeySerialEditValues";

interface IProps {
    selectedKey: IKey;
    onCreate: (keySerial: IKeySerial) => void;
    isModalOpen: boolean;
    onOpenModal: () => void;
    closeModal: () => void;
}

interface IState {
    error: string;
    keySerial: IKeySerial;
    submitting: boolean;
    validState: boolean;
}

export default class CreateKeySerial extends React.Component<IProps, IState> {
    public static contextTypes = {
        fetch: PropTypes.func,
        team: PropTypes.object
    };

    public context: AppContext;

    constructor(props: IProps) {
        super(props);

        this.state = {
            error: "",
            keySerial: null,
            submitting: false,
            validState: false
        };
    }

    public render() {
        return (
            <div>
                <Button color="link" onClick={this.props.onOpenModal}>
                    <i className="fas fa-plus fa-sm" aria-hidden="true" /> Add Key
                </Button>
                {this.renderModal()}
            </div>
        );
    }

    private renderModal() {
        const { isModalOpen } = this.props;
        const { keySerial } = this.state;

        return (
            <Modal isOpen={isModalOpen} toggle={this._closeModal} size="lg" className="keys-color">
                <div className="modal-header row justify-content-between">
                    <h2>Create Key</h2>
                    <Button color="link" onClick={this._closeModal}>
                        <i className="fas fa-times fa-lg" />
                    </Button>
                </div>
                <ModalBody>
                    <div className="container-fluid">
                        <form>
                            <KeySerialEditValues
                                keySerial={keySerial}
                                changeProperty={this._changeProperty}
                                disableEditing={false}
                            />
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this._editSelected}
                        disabled={!this.state.validState || this.state.submitting}
                    >
                        Go! {this.state.submitting && <i className="fas fa-circle-notch fa-spin" />}
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        );
    }

    private _changeProperty = (property: string, value: string) => {
        this.setState(
            {
                keySerial: {
                    ...this.state.keySerial,
                    [property]: value
                }
            },
            this._validateState
        );
    };

    // clear everything out on close
    private _closeModal = () => {
        this.setState({
            error: "",
            keySerial: null,
            submitting: false,
            validState: false
        });
        this.props.closeModal();
    };

    // assign the selected key even if we have to create it
    private _editSelected = async () => {
        if (!this.state.validState || this.state.submitting) {
            return;
        }

        this.setState({ submitting: true });
        await this.props.onCreate(this.state.keySerial);

        this._closeModal();
    };

    private _validateState = () => {
        let valid = true;
        let error = "";

        if (!this.state.keySerial) {
            valid = false;
        } else if (!this.state.keySerial.number) {
            valid = false;
            error = "You must give this key serial a number.";
        } else if (this.state.keySerial.number.length > 64) {
            valid = false;
            error = "The name you have chosen is too long";
        }

        this.setState({ validState: valid, error });
    };
}
