import { IPeopleEntity, IPeopleFilters } from '../entities/IPeople.entity';
import { IQueryDto, QueryResponse } from '../common/paginator/paginator.type';

export interface IPersonRepository {
  createPerson(data: Partial<IPeopleEntity>): Promise<IPeopleEntity>;
  updatePerson(
    id: number | string,
    data: Partial<IPeopleEntity>,
  ): Promise<IPeopleEntity>;
  findPerson(id: number | string): Promise<IPeopleEntity>;
  findAllPersons(
    dto: IQueryDto<IPeopleFilters>,
  ): Promise<
    QueryResponse<IPeopleEntity, IPeopleFilters> | QueryResponse<IPeopleEntity>
  >;
  deletePerson(id: number | string): Promise<boolean>;
}
