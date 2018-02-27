import PropTypes from "prop-types";
import * as React from "react";

import { AppContext, IEquipment, IEquipmentAttribute, IPerson } from "../../Types";

import AssignEquipment from "./AssignEquipment";
import EquipmentList from "./EquipmentList";
import EquipmentDetails from "./EquipmentDetails";

interface IState {
    loading: boolean;
    //either equipment assigned to this person, or all team equipment
    equipment: IEquipment[];
    //unassigned equipment for this team, used in modal's search
    unassignedEquipment: IEquipment[];
    selectedEquipment: IEquipment;
    assignModal: boolean;
    assignModalLoading: boolean;
    detailsModal: boolean;
}

export default class EquipmentContainer extends React.Component<{}, IState> {
  public static contextTypes = {
    fetch: PropTypes.func,
    person: PropTypes.object,
    team: PropTypes.object
  };
  public context: AppContext;
  constructor(props) {
    super(props);

    this.state = {
        equipment: [],
        unassignedEquipment: [],
        selectedEquipment: null,
        loading: true,
        assignModal: false,
        assignModalLoading: true,
        detailsModal: false,
    };
  }
  public async componentDidMount() {
      // are we getting the person's equipment or the team's?
      const equipmentFetchUrl = this.context.person
          ? `/equipment/listassigned?id=${this.context.person.id}&teamId=${this.context.person.teamId}`
      : `/equipment/list/${this.context.team.id}`;

    const equipment = await this.context.fetch(equipmentFetchUrl);
    this.setState({ equipment , loading: false });
  }
  public render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
      }
    const assignedEquipmentList = this.context.person ? this.state.equipment.map(x => x.name) : null;
    const allEquipmentList = this.context.person ? null : this.state.equipment;
    return (
      <div className="card">
        <div className="card-body">
                <h4 className="card-title">Equipment</h4>
                <EquipmentList equipment={this.state.equipment} onRevoke={this._revokeEquipment} onAdd={this._assignSelectedEquipment} showDetails={this._showDetails} />
                <AssignEquipment
                    onCreate={this._createAndMaybeAssignEquipment}
                    modal={this.state.assignModal}
                    modalLoading={this.state.assignModalLoading}
                    openModal={this.openAssignModal}
                    closeModal={this.closeAssignModal}
                    selectedEquipment={this.state.selectedEquipment}
                    selectEquipment={this._selectEquipment}
                    unassignedEquipment={this.state.unassignedEquipment}
                />
                <EquipmentDetails selectedEquipment={this.state.selectedEquipment} modal={this.state.detailsModal} closeModal={this.closeDetailsModal} />
        </div>
      </div>
    );
  }
  public _createAndMaybeAssignEquipment = async (person: IPerson) => {
      // call API to create a equipment, then assign it if there is a person to assign to
      var equipment = this.state.selectedEquipment;
      //if we are creating a new equipment
      if (equipment.id === 0) {
          equipment.teamId = this.context.team.id;
          equipment = await this.context.fetch("/equipment/create", {
              body: JSON.stringify(equipment),
              method: "POST"
          });
      }


    // if we know who to assign it to, do it now
    if (person) {
      const assignUrl = `/equipment/assign?equipmentId=${equipment.id}&personId=${
        person.id
      }`;

      equipment = await this.context.fetch(assignUrl, {
        method: "POST"
      });
      }

    let index = this.state.equipment.findIndex(x => x.id == equipment.id);
    console.log("index " + index);
    if (index != -1) {
        console.log("changing");
        let updateEquipment = this.state.equipment.slice();
        updateEquipment[index] = equipment;
        //since this equipment already exists, we should remove it from our list of unassigned
        let unassignedIndex = this.state.unassignedEquipment.findIndex(x => x.id == equipment.id);
        let unassignedCopy = [...this.state.unassignedEquipment];
        unassignedCopy.splice(unassignedIndex, 1);

        this.setState({
            ...this.state,
            equipment: updateEquipment,
            unassignedEquipment: unassignedCopy,
        });
    }
    else {
        this.setState({
            equipment: [...this.state.equipment, equipment]
        });
    }
  };

  public _revokeEquipment = async (equipment: IEquipment) => {

      // call API to actually revoke
      const removed: IEquipment = await this.context.fetch("/equipment/revoke", {
          body: JSON.stringify(equipment),
          method: "POST"
      });

      //remove from state
      const index = this.state.equipment.indexOf(equipment);
      if (index > -1) {
          let shallowCopy = [...this.state.equipment];
          if (this.context.person == null) {
              //if we are looking at all equipment, just update assignment
              shallowCopy[index] = removed;
          }
          else {
              //if we are looking at a person, remove from our list of equipment
              shallowCopy.splice(index, 1);
          }
          //either way, update equipment and add this newly revoked equipment to our list of unassigned for searching
          this.setState({ equipment: shallowCopy, unassignedEquipment: [...this.state.unassignedEquipment, equipment] });
      }
  }

  public _assignSelectedEquipment = (equipment: IEquipment) => {
      this.setState({ selectedEquipment: equipment });
      this.openAssignModal();
  }

    //open modal and fetch list of unassigned equipment for typeahead
  public openAssignModal = async () => {
      this.setState({ assignModal: true, assignModalLoading: true });
      //fetch on first time opening
      if (this.state.unassignedEquipment == null) { 
          const equipmentList: IEquipment[] = await this.context.fetch(
              `/equipment/listunassigned?teamId=${this.context.team.id}`);
          this.setState({ unassignedEquipment: equipmentList, assignModalLoading: false });
      }
      else {
          this.setState({ assignModalLoading: false });
      }
  };

  //clear everything out on close
  public closeAssignModal = () => {
      this.setState({
          assignModal: false,
          selectedEquipment: null,
      });
  };

  private _showDetails = (equipment: IEquipment) => {
      this.setState({ detailsModal: true, selectedEquipment: equipment });
  }
  public closeDetailsModal = () => {
      this.setState({ detailsModal: !this.state.detailsModal, selectedEquipment: null });
  }

  public _selectEquipment = (equipment: IEquipment) => {
      this.setState({ selectedEquipment: equipment });
  }
}
