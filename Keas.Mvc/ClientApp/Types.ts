import { History, Location } from "history";
import { match } from "react-router";

// Main Type of the context
// tslint:disable-next-line:interface-name
export interface AppContext {
  fetch: (url: string, init?: RequestInit) => any;
  router: {
    history: History;
    route: {
      location: Location;
      match: match<IRouteProps>;
    };
  };
  team: ITeam;
  permissions: string[];
}

export interface IRouteProps {
  id: string;
  action: string;
  assetType: string;
  personId: string;
  personAction: string;
  spaceId: string;
  spaceAction: string;
  serialAsset: string;
  serialAction: string;
  serialId: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IPerson {
  id: number;
  userid: number;
  teamId: number;
  user: IUser;
  tags: string;
}

export interface IPersonInfo {
  person: IPerson;
  id: number;
  accessCount: number;
  equipmentCount: number;
  keyCount: number;
  workstationCount: number;
}

export interface ITeam {
  id: number;
  name: string;
}

export interface IKey {
  id: number;
  keyXSpaces: IKeyXSpace[];
  name: string;
  number: string;
  serials: ISerial[];
  tags: string;
  teamId: number;
}

export interface IKeyXSpace {
  keyId: number;
  spaceId: number;
  space: ISpace;
}

export interface ISerial {
  id: number;
  key?: IKey;
  keyId: number;
  number: string;
  assignment: IKeyAssignment;
}

export interface IKeyAssignment {
  id: number;
  keyId: number;
  expiresAt: Date;
  person: IPerson;
}

export interface IAccess {
  id: number;
  teamId: number;
  name: string;
  assignments: IAccessAssignment[];
}

export interface IAccessAssignment {
  id: number;
  accessId: number;
  expiresAt: Date;
  person: IPerson;
  personId: number;
}

export interface IEquipment {
  assignment?: IEquipmentAssignment;
  id: number;
  make: string;
  model: string;
  name: string;
  space: ISpace;
  serialNumber: string;
  tags: string; 
  teamId: number;
  type: string;
  attributes: IEquipmentAttribute[];
}

export interface IEquipmentAssignment {
  id: number;
  equipmentId: number;
  expiresAt: Date;
  equipment: IEquipment;
  person: IPerson;
}

export interface IEquipmentAttribute {
  id?: number;
  equipmentId: number;
  key: string;
  value: string;
}


export interface ISpaceInfo {
  space: ISpace;
  id: number;
  equipmentCount: number;
  keyCount: number;
  workstationsTotal: number;
  workstationsInUse: number;
  tags: string; // comma separated list of workstation tags in this space 
}

export interface ISpace {
    id: number;
    roomKey: string;
    orgId: string;
    deptName: string;
    bldgName: string;
    floorName: string;
    roomName: string;
    roomNumber: string;
}

export interface IWorkstation {
  id: number;
  name: string;
  space: ISpace;
  tags: string;
  teamId: number;
  assignment?: IWorkstationAssignment;
}

export interface IWorkstationAssignment {
  id: number;
  workstationId: number;
  expiresAt: Date;
  person: IPerson;
}

export interface IHistory {
  description: string;
  actedDate: Date;
  actionType?: string;
  assetType?: string;
  id: number;
}