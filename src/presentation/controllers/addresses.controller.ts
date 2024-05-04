import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { config } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { AddresessService } from '../services/addresess.service';
import { AddressDto, CreateAddressDto } from '../dtos/address.dto';
import { UpdatePeopleDto } from '../dtos/people.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Addresses')
@Controller('/addresses')
export class AddressesController {
  constructor(
    private readonly addressService: AddresessService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAddressDto,
    @Param('idPerson', ParseIntPipe) idPerson: number,
  ): Promise<AddressDto> {
    return await this.addressService.create(idPerson, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Param('idPerson', ParseIntPipe) idPerson: number,
  ): Promise<AddressDto[]> {
    return await this.addressService.list(idPerson);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('idPerson', ParseIntPipe) idPerson: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.addressService.get(idPerson, id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('idPerson', ParseIntPipe) idPerson: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeopleDto,
  ) {
    return await this.addressService.update(idPerson, id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('idPerson', ParseIntPipe) idPerson: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.addressService.delete(idPerson, id);
  }
}
