import PropTypes from "prop-types";
import * as React from "react";
import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";

import { AppContext, ISerial, ISpace } from "../../Types";

interface IProps {
    selectedSerial?: ISerial;
    space: ISpace;
    onSelect: (serial: ISerial) => void;
    onDeselect: () => void;
}

interface IState {
    isSearchLoading: boolean;
    serials: ISerial[];
}

// Search for existing serial then send selection back to parent
export default class SearchSerials extends React.Component<IProps, IState> {
    public static contextTypes = {
        fetch: PropTypes.func,
        person: PropTypes.object,
        team: PropTypes.object
    };
    public context: AppContext;
    constructor(props) {
        super(props);
        this.state = {
            isSearchLoading: false,
            serials: [],
        };
    }

    public render() {
        if (this.props.selectedSerial != null) {
            return this._renderExistingSerial();
        }
        else {
            return this._renderSelectSerial();
        }
    }

    private _renderSelectSerial = () => {
        const searchUrl = this.props.space ? `/api/${this.context.team.name}/serials/searchInSpace?spaceId=${this.props.space.id}&q=` :
            `/api/${this.context.team.name}/serials/search?q=`;
        return (
            <div>
                <AsyncTypeahead
                    isLoading={this.state.isSearchLoading}
                    minLength={3}
                    placeholder="Search for serial by name or room"
                    labelKey="name"
                    filterBy={() => true} // don't filter on top of our search
                    allowNew={true}
                    renderMenuItemChildren={(option, props, index) => (
                        <div>
                            <div>
                                <Highlighter key="name" search={props.text}>
                                    {option.name}
                                </Highlighter>
                            </div>
                            <div>
                                <small>
                                    Room: {" "}
                                    <Highlighter key="space.roomNumber" search={props.text}>{option.space.roomNumber}</Highlighter>
                                    {" "} 
                                    <Highlighter key="space.bldgName" search={props.text}>{option.space.bldgName}</Highlighter>
                                </small>
                            </div>
                        </div>
                    )}
                    onSearch={async query => {
                        this.setState({ isSearchLoading: true });
                        const serials = await this.context.fetch(
                            searchUrl + query
                        );
                        this.setState({
                            isSearchLoading: false,
                            serials
                        });
                    }}
                    onChange={selected => {
                        if (selected && selected.length === 1) {
                            this._onSelected(selected[0]);
                        }
                    }}
                    options={this.state.serials}
                />
            </div>
        );
    }

    private _renderExistingSerial = () => {
        return (
            <input
                type="text"
                className="form-control"
                value={this.props.selectedSerial.number}
                disabled={true}
            />
        );
    };

    private _onSelected = (serial: ISerial) => {
        // onChange is called when deselected
        if (serial == null || serial.number == null) {
            this.props.onDeselect();
        }
        else {
            // if teamId is not set, this is a new serial
            this.props.onSelect({
                assignment: null, 
                id: serial.id,
                keyId: serial.keyId,
                number: serial.number,
            });
        }
    };
}
