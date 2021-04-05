import { GroupName } from './../../GroupNameService/models/GroupName';
import { InterName } from './../../InterNameService/models/InterName';
import { Manufacturer } from './../../ManufacturerService/models/Manufacturer';

export interface Product {
  id: number;
  name: string;
  interNameId: number;
  groupNameId: number;
  manufacturerId: number;
  manufacturer: Manufacturer;
  interName: InterName;
  groupName: GroupName;
}
