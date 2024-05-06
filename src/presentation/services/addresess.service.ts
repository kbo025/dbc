import { Inject, Injectable } from '@nestjs/common';
import {
  AddressDto,
  CreateAddressDto,
  UpdateAddressDto,
} from '../dtos/address.dto';
import { AddressPrismaRepository } from 'src/infra/prisma/repositories/AddressPrisma.repository';
import { CreateAddressByPersonUsecase } from 'src/domain/useCases/addresses/CreateAddressByPerson.usecase';
import { ListAddressesByPersonUseCase } from 'src/domain/useCases/addresses/ListAddressesByPerson.usecase';
import { GetAddressUseCase } from 'src/domain/useCases/addresses/GetAddress.usecase';
import { UpdateAddressUseCase } from 'src/domain/useCases/addresses/UpdateAddress.usecase';
import { DeleteAddressUseCase } from 'src/domain/useCases/addresses/DeleteAddress.usecase';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddresessService {
  constructor(
    @Inject(AddressPrismaRepository)
    private readonly addressRepository: AddressPrismaRepository,
  ) {}

  async create(personId: number, dto: CreateAddressDto): Promise<AddressDto> {
    const useCase = new CreateAddressByPersonUsecase(this.addressRepository);
    const response = await useCase.execute({ personId, ...dto });

    return plainToInstance(AddressDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async list(personId: number): Promise<AddressDto[]> {
    const useCase = new ListAddressesByPersonUseCase(this.addressRepository);
    const response = await useCase.execute({ personId });

    return response.map((e) =>
      plainToInstance(AddressDto, e, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async get(personId: number, id: number): Promise<AddressDto> {
    const useCase = new GetAddressUseCase(this.addressRepository);
    const response = await useCase.execute({ id, personId });

    return plainToInstance(AddressDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    personId: number,
    id: number,
    dto: UpdateAddressDto,
  ): Promise<AddressDto> {
    const useCase = new UpdateAddressUseCase(this.addressRepository);
    const response = await useCase.execute({ id, personId, ...dto });

    return plainToInstance(AddressDto, response, {
      excludeExtraneousValues: true,
    });
  }

  async delete(personId: number, id: number): Promise<boolean> {
    const useCase = new DeleteAddressUseCase(this.addressRepository);
    const response = await useCase.execute({ id, personId });
    return response;
  }
}
