import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePeopleDto,
  FilterPeopleDto,
  PeopleDto,
  QueryPeopleDto,
  UpdatePeopleDto,
} from '../dtos/people.dto';
import { QueryResponse } from 'src/domain/common/paginator/paginator.type';
import { PersonPrismaRepository } from 'src/infra/prisma/repositories/PersonPrisma.repository';
import { CreatePersonUseCase } from 'src/domain/useCases/people/CreatePerson.usecase';
import { plainToInstance } from 'class-transformer';
import { GetPersonUseCase } from 'src/domain/useCases/people/GetPerson.usecase';
import { DeletePersonUseCase } from 'src/domain/useCases/people/DeletePerson.usecase';
import { UpdatePersonUseCase } from 'src/domain/useCases/people/UpdatePerson.usecase';
import { ListPeopleUseCase } from 'src/domain/useCases/people/ListPeople.usecase';

@Injectable()
export class PeopleService {
  constructor(
    @Inject(PersonPrismaRepository)
    private readonly personRepository: PersonPrismaRepository,
  ) {}

  async create(dto: CreatePeopleDto): Promise<PeopleDto> {
    const useCase = new CreatePersonUseCase(this.personRepository);
    const response = await useCase.execute(dto);

    return plainToInstance(PeopleDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async list(
    params: QueryPeopleDto,
  ): Promise<
    QueryResponse<PeopleDto, FilterPeopleDto> | QueryResponse<PeopleDto>
  > {
    const useCase = new ListPeopleUseCase(this.personRepository);
    const response = await useCase.execute(params);
    response.data = response.data.map((e) =>
      plainToInstance(PeopleDto, e, {
        excludeExtraneousValues: true,
      }),
    );
    return response;
  }

  async get(id: number): Promise<PeopleDto> {
    const useCase = new GetPersonUseCase(this.personRepository);
    const response = await useCase.execute({ id });

    if (!response) {
      throw new NotFoundException('Entity Not Found');
    }

    return plainToInstance(PeopleDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdatePeopleDto): Promise<PeopleDto> {
    const useCase = new UpdatePersonUseCase(this.personRepository);
    const response = await useCase.execute({ id, ...dto });

    return plainToInstance(PeopleDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: number): Promise<PeopleDto> {
    const useCase = new DeletePersonUseCase(this.personRepository);
    const response = await useCase.execute({ id });

    return plainToInstance(PeopleDto, response, {
      excludeExtraneousValues: true,
    });
  }
}
