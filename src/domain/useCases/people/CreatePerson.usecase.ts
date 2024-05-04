import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IPersonRepository } from 'src/domain/repositories/IPerson.repository';

type Payload = {
  cpf: string;
  name: string;
  email: string;
  phone: string;
};

export class CreatePersonUseCase extends BaseUseCase implements IUseCase {
  constructor(private peopleRepository: IPersonRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const response = await this.peopleRepository.createPerson(payload);
    return response;
  }
}
