import PropTypes from "prop-types";
import * as React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { ISerial } from "../../Types";
import HistoryContainer from "../History/HistoryContainer";
import SerialEditValues from "./SerialEditValues";


interface IProps {
    modal: boolean;
    closeModal: () => void;
    selectedSerial: ISerial;
}


export default class SerialDetails extends React.Component<IProps, {}> {

    public render() {
        if (this.props.selectedSerial == null) 
        {
            return null;
        }
        const serial = this.props.selectedSerial;
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.closeModal} size="lg">
                    <ModalHeader>Details for {serial.number}</ModalHeader>
                    <ModalBody>
                        <SerialEditValues selectedSerial={serial} disableEditing={true} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.closeModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
