import PropTypes from "prop-types";
import * as React from "react";
import {
    Button,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";

import { AppContext, IPerson } from "../../Types";
import BioEditValues from "./BioEditValues";

interface IProps {
    onEdit: (person: IPerson) => void;
    modal: boolean;
    closeModal: () => void;
    selectedPerson: IPerson;
}

interface IState {
    error: string;
    person: IPerson;
    validState: boolean;
}

export default class EditBio extends React.Component<IProps, IState> {
    public static contextTypes = {
        fetch: PropTypes.func,
        team: PropTypes.object
    };
    public context: AppContext;

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            person: this.props.selectedPerson,
            validState: false
        };
    }

    // make sure we change the person we are updating if the parent changes selected key
    public componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPerson !== this.props.selectedPerson) {
            this.setState({ person: nextProps.selectedPerson });
        }
    }


    public render() {
        if (!this.state.person) {
            return null;
        }
        return (
            <Modal isOpen={this.props.modal} toggle={this._closeModal} size="lg">
                <ModalHeader>Edit Biographical Info</ModalHeader>
                <ModalBody>
                    <div className="container-fluid">
                        <form>
                            <BioEditValues
                                selectedKey={this.state.key}
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
                        disabled={!this.state.validState}
                    >
                        Update Biography
                    </Button>{" "}
                    <Button color="secondary" onClick={this._closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    private _changeProperty = (property: string, value: string) => {
        this.setState({
            person: {
                ...this.state.person,
                [property]: value
            }
        }, this._validateState);
    };

    // clear everything out on close
    private _closeModal = () => {
        this.setState({
            error: "",
            person: null,
            validState: false
        });
        this.props.closeModal();
    };

    // assign the selected key even if we have to create it
    private _editSelected = async () => {
        if (!this.state.validState) {
            return;
        }


        await this.props.onEdit(this.state.person);

        this._closeModal();
    };


    private _validateState = () => {
        let valid = true;
        if (!this.state.person) {
            valid = false;
        } else if (this.state.error !== "") {
            valid = false;
        }
        this.setState({ validState: valid });
    };

}