import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IPersonRepository } from 'src/domain/repositories/IPerson.repository';

type Payload = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
};

export class UpdatePersonUseCase extends BaseUseCase implements IUseCase {
  constructor(private peopleRepository: IPersonRepository) {
    super();
  }

  async execute(payload: Partial<Payload>): Promise<any> {
    const { id, ...data } = payload;
    const response = await this.peopleRepository.updatePerson(id, data);
    return response;
  }
}
