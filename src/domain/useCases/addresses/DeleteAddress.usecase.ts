import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IAddressRepository } from 'src/domain/repositories/IAddress.repository';

type Payload = {
  id: number;
  personId: number;
};

export class DeleteAddressUseCase extends BaseUseCase implements IUseCase {
  constructor(private addressesRepository: IAddressRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const { id, personId } = payload;
    const response = await this.addressesRepository.deleteAddress(id, personId);
    return response;
  }
}
