import { IAddressEntity } from '../entities/IAdresses.entity';

export interface IAddressRepository {
  createAddressByPerson(
    personId: number,
    data: Partial<IAddressEntity>,
  ): Promise<IAddressEntity>;
  updateAddress(
    id: number,
    personId: number,
    data: Partial<IAddressEntity>,
  ): Promise<IAddressEntity>;
  findAddress(id: number, personId: number): Promise<IAddressEntity>;
  findAllAddressByPerson(personId: number): Promise<IAddressEntity[]>;
  deleteAddress(id: number, personId: number): Promise<boolean>;
}
