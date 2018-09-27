import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "reactstrap";
import { AppContext, IKey, IPerson, ISerial, ISpace } from "../../Types";
import AssignSerial from "../Serials/AssignSerial";
import EditSerial from "../Serials/EditSerial";
import RevokeSerial from "../Serials/RevokeSerial";
import SerialList from "./../Serials/SerialList";

interface IProps {
    assetInUseUpdated?: (type: string, spaceId: number, personId: number, count: number) => void;
    assetTotalUpdated?: (type: string, spaceId: number, personId: number, count: number) => void;
    assetEdited?: (type: string, spaceId: number, personId: number) => void; 
    space?: ISpace;
    person?: IPerson;
    key?: IKey;
    tags: string[];
}

interface IState {
    loading: boolean;
    serials: ISerial[];
}

export default class SerialContainer extends React.Component<IProps, IState> {

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
            serials: [],
        };
    }

    public async componentDidMount() {
        this.setState({ loading: true });
        let serials = [];
        if(!this.props.space && !!this.props.person)
        {
            serials = 
                await this.context.fetch(`/api/${this.context.team.name}/serials/listAssigned?personId=${this.props.person.id}`);
        }
        if(!!this.props.space && !this.props.person)
        {
            serials = 
                await this.context.fetch(`/api/${this.context.team.name}/serials/getSerialsInSpace?spaceId=${this.props.space.id}`);
        }
        this.setState({ serials, loading: false });
    }

    public render() {
        if (!this.props.space && !this.props.person)
        {
            return null;
        }
        if (this.state.loading)
        {
            return (<div>Loading Serials...</div>);
        }
        const { action, assetType, id } = this.context.router.route.match.params;
        const activeAsset = assetType === "serials";
        const selectedId = parseInt(id, 10);
        const selectedSerial = this.state.serials.find(k => k.id === selectedId);

        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"><i className="fas fa-user fa-xs"/> Serials</h4>
                        {this.state.serials.length > 0 ? 
                            <SerialList 
                                    serials={this.state.serials} 
                                    showDetails={this._openDetailsModal}
                                    onEdit={this._openEditModal}
                                    onAdd={this._openAssignModal} 
                                    onCreate={this._openCreateModal}
                                    onRevoke={this._openRevokeModal}/> : <div>No Serials</div>}
                            <Button color="danger" onClick={() => this._openCreateModal()}>
                                Add Serial
                            </Button>

                            <EditSerial
                                closeModal={this._closeModals}
                                tags={this.props.tags}
                                modal={activeAsset && action === "edit"}
                                selectedSerial={selectedSerial}
                                onEdit={this._editSerial}
                                />
                            <AssignSerial
                                closeModal={this._closeModals}
                                modal={activeAsset && (action === "assign" || action ==="create")}
                                person={this.props.person}
                                selectedSerial={selectedSerial}
                                tags={this.props.tags}
                                onCreate={this._createAndMaybeAssignSerial}
                                onAddNew={this._openCreateModal} />
                            <RevokeSerial
                                closeModal={this._closeModals}
                                revokeSerial={this._revokeSerial}
                                modal={activeAsset && action === "revoke"}
                                selectedSerial={selectedSerial} />
                </div>
            </div>
        );
    }

    private _createAndMaybeAssignSerial = async (
        person: IPerson,
        serial: ISerial,
        date: any
      ) => {
        let created = false;
        let assigned = false;
        
        // call API to create a serial, then assign it if there is a person to assign to
        // if we are creating a new serial
        if (serial.id === 0) {
          // serial.teamId = this.context.team.id;
          serial = await this.context.fetch(`/api/${this.context.team.name}/serials/create`, {
            body: JSON.stringify(serial),
            method: "POST"
          });
          created = true;
        }
    
        // if we know who to assign it to, do it now
        if (person) {
          const assignUrl = `/api/${this.context.team.name}/serials/assign?serialId=${serial.id}&personId=${
            person.id
          }&date=${date}`;
    
          serial = await this.context.fetch(assignUrl, {
            method: "POST"
          });
          serial.assignment.person = person;
          assigned = true;
        }
    
        const index = this.state.serials.findIndex(x => x.id === serial.id);
        if (index !== -1) {
          // update already existing entry in serial
          const updateSerial = [...this.state.serials];
          updateSerial[index] = serial;
    
          this.setState({
            ...this.state,
            serials: updateSerial
          });
        } else {
          this.setState({
            serials: [...this.state.serials, serial]
          });
        }
        if(created && this.props.assetTotalUpdated)
        {
            this.props.assetTotalUpdated("serial", null, 
                this.props.person? this.props.person.id : null, 1);
        }
        if(assigned && this.props.assetInUseUpdated)
        {
            this.props.assetInUseUpdated("serial", null, 
            this.props.person? this.props.person.id : null, 1);
        }

      };
    
      private _revokeSerial = async (serial: ISerial) => {
        // call API to actually revoke
        const removed: ISerial = await this.context.fetch(`/api/${this.context.team.name}/serials/revoke`, {
          body: JSON.stringify(serial),
          method: "POST"
        });
     
        // remove from state
        const index = this.state.serials.indexOf(serial);
        if (index > -1) {
          const shallowCopy = [...this.state.serials];
          if (!this.props.person && !!this.props.space) {
              // if we are looking at all serials, just update assignment
           shallowCopy[index].assignment = null;
          } else {
            // if we are looking at a person, remove from our list of serials
            shallowCopy.splice(index, 1);
          }
          this.setState({ serials: shallowCopy });

          if(this.props.assetInUseUpdated)
          {
            this.props.assetInUseUpdated("serial",  this.props.space? this.props.space.id : null, 
            this.props.person? this.props.person.id : null, -1);
          }
        }
      };
    
      private _editSerial = async (serial: ISerial) =>
      {
        const index = this.state.serials.findIndex(x => x.id === serial.id);
        if(index === -1 ) // should always already exist
        {
          return;
        }
        const updated: ISerial = await this.context.fetch(`/api/${this.context.team.name}/serials/update`, {
          body: JSON.stringify(serial),
          method: "POST"
        });

        updated.assignment = serial.assignment;

        // update already existing entry in key
        const updateSerial = [...this.state.serials];
        updateSerial[index] = updated;

        this.setState({
          ...this.state,
          serials: updateSerial
        }); 

        if(this.props.assetEdited)
        {
            this.props.assetEdited("serial", this.props.space ? this.props.space.id : null, 
                this.props.person ? this.props.person.id : null);
        }
      }

    private _openDetailsModal = (serial: ISerial) => {
        this.context.router.history.push(
            `${this._getBaseUrl()}/serials/details/${serial.id}`
        );
    };
    
    private _openEditModal = (serial: ISerial) => {
        this.context.router.history.push(
            `${this._getBaseUrl()}/serials/edit/${serial.id}`
        );
    };

    private _openAssignModal = (serial: ISerial) => {
        this.context.router.history.push(
            `${this._getBaseUrl()}/serials/assign/${serial.id}`
        );
    };

    private _openCreateModal = () => {
        this.context.router.history.push(
            `${this._getBaseUrl()}/serials/create/`
        );
    };

    private _openRevokeModal = (serial: ISerial) => {
        this.context.router.history.push(
            `${this._getBaseUrl()}/serials/revoke/${serial.id}`
        );    
    }

    private _closeModals = () => {
        if(!!this.props.person && !this.props.space)
        {
            this.context.router.history.push(`${this._getBaseUrl()}`);
        }
        else if(!this.props.person && !!this.props.space)
        {
            this.context.router.history.push(`${this._getBaseUrl()}`);
        }
    };
    
    private _getBaseUrl = () => {
        return this.props.person
          ? `/${this.context.team.name}/people/details/${this.props.person.id}`
          : `/${this.context.team.name}/spaces/details/${this.props.space.id}`;
      };
}
