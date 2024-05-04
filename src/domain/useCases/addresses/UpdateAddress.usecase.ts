import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IAddressRepository } from 'src/domain/repositories/IAddress.repository';

type Payload = {
  id: number;
  personId: number;
  logradouro: string;
  number: number;
  district: string;
  city: string;
  state: string;
};

export class UpdateAddressUseCase extends BaseUseCase implements IUseCase {
  constructor(private addressesRepository: IAddressRepository) {
    super();
  }

  async execute(payload: Partial<Payload>): Promise<any> {
    const { id, personId, ...data } = payload;
    const response = await this.addressesRepository.updateAddress(
      id,
      personId,
      data,
    );
    return response;
  }
}
