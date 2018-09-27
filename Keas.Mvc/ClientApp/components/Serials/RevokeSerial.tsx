import PropTypes from "prop-types";
import * as React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { AppContext, ISerial } from "../../Types";
import HistoryContainer from "../History/HistoryContainer";
import SerialEditValues from "./SerialEditValues";


interface IProps {
    modal: boolean;
    closeModal: () => void;
    revokeSerial: (serial: ISerial) => void;
    selectedSerial: ISerial;
}

interface IState{
    loading: boolean;
}

export default class RevokeSerial extends React.Component<IProps, IState> {
    public static contextTypes = {
        fetch: PropTypes.func,
        router: PropTypes.object,
        team: PropTypes.object
    };

    public context: AppContext;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    public render() {
        if (!this.props.selectedSerial || !this.props.selectedSerial.assignment) 
        {
            return null;
        }
        if(this.state.loading) 
        {
            return <h2>Loading...</h2>;
        }
        return (
            <div>
            <Modal isOpen={this.props.modal} 
                toggle={this.props.closeModal} 
                size="lg">
                <ModalHeader>Revoke {this.props.selectedSerial.number}</ModalHeader>
                <ModalBody>
                    <SerialEditValues selectedSerial={this.props.selectedSerial} disableEditing={true}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._revokeSerial}>
                        Confirm Revoke
                    </Button>
                    <Button color="secondary" onClick={this.props.closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>            </div>
        );
    }

    private _revokeSerial = async () => {
        if(!this.props.selectedSerial)
        {
            return null;
        }
        await this.props.revokeSerial(this.props.selectedSerial);
        this.props.closeModal();
    }
}
