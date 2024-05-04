import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import { IPersonRepository } from 'src/domain/repositories/IPerson.repository';

type Payload = {
  id: number;
};

export class GetPersonUseCase extends BaseUseCase implements IUseCase {
  constructor(private peopleRepository: IPersonRepository) {
    super();
  }

  async execute(payload: Payload): Promise<any> {
    const { id } = payload;
    const response = await this.peopleRepository.findPerson(id);
    return response;
  }
}
