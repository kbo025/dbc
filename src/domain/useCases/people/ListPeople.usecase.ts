import { BaseUseCase } from 'src/domain/common/BaseUseCase';
import { IUseCase } from 'src/domain/common/IUseCase';
import {
  IQueryDto,
  QueryResponse,
} from 'src/domain/common/paginator/paginator.type';
import {
  IPeopleEntity,
  IPeopleFilters,
} from 'src/domain/entities/IPeople.entity';
import { IPersonRepository } from 'src/domain/repositories/IPerson.repository';

export class ListPeopleUseCase extends BaseUseCase implements IUseCase {
  constructor(private peopleRepository: IPersonRepository) {
    super();
  }

  async execute(
    payload: IQueryDto<IPeopleFilters>,
  ): Promise<
    QueryResponse<IPeopleEntity, IPeopleFilters> | QueryResponse<IPeopleEntity>
  > {
    const response = await this.peopleRepository.findAllPersons(payload);
    return response;
  }
}
