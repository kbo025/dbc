import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IAddressRepository } from 'src/domain/repositories/IAddress.repository';

type Payload = {
  personId: number;
  logradouro: string;
  number: number;
  district: string;
  city: string;
  state: string;
};

export class CreateAddressByPersonUsecase
  extends BaseUseCase
  implements IUseCase
{
  constructor(private addressesRepository: IAddressRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const { personId, ...data } = payload;
    const response = await this.addressesRepository.createAddressByPerson(
      personId,
      data,
    );
    return response;
  }
}
