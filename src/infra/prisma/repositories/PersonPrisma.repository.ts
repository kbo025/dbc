import {
  IQueryDto,
  QueryResponse,
} from 'src/domain/common/paginator/paginator.type';
import { PrismaService } from '../prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { IPersonRepository } from 'src/domain/repositories/IPerson.repository';
import {
  IPeopleEntity,
  IPeopleFilters,
} from 'src/domain/entities/IPeople.entity';

@Injectable()
export class PersonPrismaRepository implements IPersonRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async createPerson(data: Partial<IPeopleEntity>): Promise<IPeopleEntity> {
    const { name, cpf, email, phone } = data;
    const response = await this.prisma.client.person.create({
      data: { name, cpf, email, phone },
    });

    return response;
  }

  async updatePerson(
    id: number,
    data: Partial<IPeopleEntity>,
  ): Promise<IPeopleEntity> {
    const { name, cpf, email, phone } = data;
    const response = await this.prisma.client.person.update({
      where: { id },
      data: { name, cpf, email, phone },
    });

    return response;
  }

  async findPerson(id: number): Promise<IPeopleEntity> {
    const response = await this.prisma.client.person.findFirst({
      where: { id },
    });
    return response;
  }

  async findAllPersons(
    dto: IQueryDto<Partial<Omit<IPeopleEntity, 'id' | 'phone' | 'password'>>>,
  ): Promise<
    | QueryResponse<
        IPeopleEntity,
        Partial<Omit<IPeopleEntity, 'id' | 'phone' | 'password'>>
      >
    | QueryResponse<IPeopleEntity>
  > {
    const { itemsPerPage, sortBy, page, filters } = dto;
    const take = itemsPerPage;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await this.prisma.client.person.count({
      where: {
        name: filters?.name
          ? {
              contains: filters.name,
              mode: 'insensitive',
            }
          : undefined,
        email: filters?.email
          ? {
              contains: filters.email,
              mode: 'insensitive',
            }
          : undefined,
      },
    });
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const persons = await this.prisma.client.person.findMany({
      take,
      skip,
      where: {
        name: filters?.name
          ? {
              contains: filters.name,
              mode: 'insensitive',
            }
          : undefined,
        email: filters?.email
          ? {
              contains: filters.email,
              mode: 'insensitive',
            }
          : undefined,
      },
    });

    const resp: QueryResponse<IPeopleEntity, IPeopleFilters> = {
      data: persons,
      meta: {
        itemsPerPage,
        totalItems,
        currentPage: page,
        totalPages,
        sortBy,
        filters,
      },
    };

    return resp;
  }

  async deletePerson(id: number): Promise<boolean> {
    await this.prisma.client.person.delete({ id });
    return true;
  }
}
