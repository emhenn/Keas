import * as moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import DatePicker from "react-datepicker";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { AppContext, IPerson, ISerial } from "../../Types";
import AssignPerson from "../Biographical/AssignPerson";
import HistoryContainer from "../History/HistoryContainer";
import SerialEditValues from "./SerialEditValues";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  onCreate: (person: IPerson, serial: ISerial, date: any) => void;
  modal: boolean;
  onAddNew: () => void;
  closeModal: () => void;
  selectedSerial: ISerial;
  person?: IPerson;
}

interface IState {
  date: any;
  serial: ISerial;
  error: string;
  person: IPerson;
  validState: boolean;
}

export default class AssignSerial extends React.Component<IProps, IState> {
  public static contextTypes = {
    fetch: PropTypes.func,
    team: PropTypes.object
  };
  public context: AppContext;
  constructor(props) {
    super(props);

    this.state = {
        date: moment().add(3, "y"),
        error: "",
        person: null,
        serial: this.props.selectedSerial,
        validState: false,
    };
}

  // make sure we change the serial we are updating if the parent changes selected serial
  public componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSerial !== this.props.selectedSerial) {
      this.setState({ serial: nextProps.selectedSerial });
    }

    if (nextProps.person !== this.props.person) {
      this.setState({ person: nextProps.person });
    }
  }

  public render() {
    return (
      <div>
         <Modal isOpen={this.props.modal} 
                toggle={this._closeModal} 
                size="lg">
                <ModalHeader>Assign Serial</ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <form>
                <div className="form-group">
                  <label htmlFor="assignto">Assign To</label>
                  <AssignPerson
                    person={this.props.person || this.state.person}
                    onSelect={this._onSelectPerson}
                  />
                </div>
                <SerialEditValues
                  selectedSerial={this.state.serial}
                  changeProperty={this._changeProperty}
                  creating={true}
                  disableEditing={false}
                />

                {(!!this.state.person || !!this.props.person) && (
                  <div className="form-group">
                    <label>Set the expiration date</label>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this._changeDate}
                      onChangeRaw={this._changeDateRaw}
                      className="form-control"
                    />
                  </div>
                )}
                {this.state.error}
              </form>
            </div>
          </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._assignSelected}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={this._closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
      </div>
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
      serial: null,
      error: "",
      person: null,
      validState: false
    });
    this.props.closeModal();
  };

  // assign the selected serial even if we have to create it
  private _assignSelected = async () => {
    if (!this.state.validState) {
      return;
    }

    const person = this.props.person ? this.props.person : this.state.person;
    const serial = this.state.serial;

    await this.props.onCreate(person, serial, this.state.date.format());

    this._closeModal();
  };

  // once we have either selected or created the serial we care about
  private _onSelected = (serial: ISerial) => {
    // if this serial is not already assigned

    // TODO: more validation of name
    if (serial.name.length > 64) {
      this.setState(
        {
          serial: null,
          error: "The serial name you have chosen is too long",
        },
        this._validateState
      );
    } else {
      // else if (this.props.assignedSerialList.findIndex(x => x == serial.name) != -1)
      // {
      //    this.setState({ selectedSerial: null, error: "The serial you have chosen is already assigned to this user", validSerial: false }, this._validateState);
      // }
      this.setState({ serial, error: "" }, this._validateState);
    }
  };

  private _onDeselected = () => {
    this.setState({ serial: null, error: "" }, this._validateState);
  };

  private _onSelectPerson = (person: IPerson) => {
    this.setState({ person }, this._validateState);
  };

  private _validateState = () => {
    let valid = true;
    if (!this.state.serial) {
      valid = false;
    } else if (this.state.error !== "") {
      valid = false;
    } else if (!this.state.date) {
      valid = false;
    } else if (moment().isSameOrAfter(this.state.date)) {
        valid = false;
    } 
    this.setState({ validState: valid });
  };

  private _changeDate = newDate => {
    this.setState({ date: newDate, error: "" }, this._validateState);
  };

  private _changeDateRaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const m = moment(value, "MM/DD/YYYY", true);
    if (m.isValid()) {
      this._changeDate(m);
    } else {
      this.setState({ date: null, error: "Please enter a valid date" }, this._validateState);
    }
  };
}
