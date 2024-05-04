import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IAddressEntity } from 'src/domain/entities/IAdresses.entity';
import { IAddressRepository } from 'src/domain/repositories/IAddress.repository';

type Payload = {
  personId: number;
};

export class ListAddressesByPersonUseCase
  extends BaseUseCase
  implements IUseCase
{
  constructor(private addressesRepository: IAddressRepository) {
    super();
  }

  async execute(payload: Payload): Promise<IAddressEntity[]> {
    const { personId } = payload;
    const response = await this.addressesRepository.findAllAddressByPerson(
      personId,
    );

    return response;
  }
}
