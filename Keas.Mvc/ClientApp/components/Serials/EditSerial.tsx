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

import { AppContext, ISerial } from "../../Types";
import SerialEditValues from "./SerialEditValues";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  onEdit: (serial: ISerial) => void;
  modal: boolean;
  closeModal: () => void;
  selectedSerial: ISerial;
}

interface IState {
  error: string;
  serial: ISerial;
  validState: boolean;
}

export default class EditSerial extends React.Component<IProps, IState> {
  public static contextTypes = {
    fetch: PropTypes.func,
    team: PropTypes.object
  };
  public context: AppContext;
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      serial: this.props.selectedSerial,
      validState: false
    };
  }

  // make sure we change the key we are updating if the parent changes selected key
  public componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSerial !== this.props.selectedSerial) {
      this.setState({ serial: nextProps.selectedSerial });
    }
  }

  public render() {
    if(!this.state.serial)
    {
      return null;
    }
    return (
      <Modal isOpen={this.props.modal} toggle={this._closeModal} size="lg">
        <ModalHeader>Edit Serial</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form>
                  <SerialEditValues
                    selectedSerial={this.state.serial}
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
            Update Serial
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
      serial: {
        ...this.state.serial,
        [property]: value
      }
    }, this._validateState);
  };

  // clear everything out on close
  private _closeModal = () => {
    this.setState({
      error: "",
      serial: null,
      validState: false
    });
    this.props.closeModal();
  };

  // assign the selected key even if we have to create it
  private _editSelected = async () => {
    if (!this.state.validState) {
      return;
    }

    await this.props.onEdit(this.state.serial);

    this._closeModal();
  };


  private _validateState = () => {
    let valid = true;
    if (!this.state.serial) {
      valid = false;
    } else if (this.state.error !== "") {
      valid = false;
    }
    this.setState({ validState: valid });
  };

}
