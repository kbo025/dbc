import { PrismaService } from '../prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { IAddressRepository } from 'src/domain/repositories/IAddress.repository';
import { IAddressEntity } from 'src/domain/entities/IAdresses.entity';

@Injectable()
export class AddressPrismaRepository implements IAddressRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async createAddressByPerson(
    personId: number,
    data: Partial<IAddressEntity>,
  ): Promise<IAddressEntity> {
    const { logradouro, number, district, city, state } = data;
    const response = await this.prisma.client.address.create({
      data: { logradouro, number, district, city, state, personId },
    });

    return response;
  }

  async updateAddress(
    id: number,
    personId: number,
    data: Partial<IAddressEntity>,
  ): Promise<IAddressEntity> {
    const { logradouro, number, district, city, state } = data;
    const response = await this.prisma.client.address.update({
      where: { id, personId },
      data: { logradouro, number, district, city, state },
    });

    return response;
  }

  async findAddress(id: number, personId: number): Promise<IAddressEntity> {
    const response = await this.prisma.client.address.findFirst({
      where: { id, personId },
    });
    return response;
  }

  async findAllAddressByPerson(personId: number): Promise<IAddressEntity[]> {
    const models = await this.prisma.client.address.findMany({
      where: { personId },
    });

    return models;
  }

  async deleteAddress(id: number, personId: number): Promise<boolean> {
    await this.prisma.client.address.delete({ id, personId });
    return true;
  }
}
