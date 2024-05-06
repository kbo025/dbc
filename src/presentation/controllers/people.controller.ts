import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config';
import { PeopleService } from '../services/people.service';
import {
  CreatePeopleDto,
  FilterPeopleDto,
  PeopleDto,
  QueryPeopleDto,
  UpdatePeopleDto,
} from '../dtos/people.dto';
import { QueryResponse } from 'src/domain/common/paginator/paginator.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePeopleDto): Promise<PeopleDto> {
    return await this.peopleService.create(dto);
  }

  @Get()
  async list(
    @Query() params: QueryPeopleDto,
  ): Promise<
    QueryResponse<PeopleDto, FilterPeopleDto> | QueryResponse<PeopleDto>
  > {
    return await this.peopleService.list(params);
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.peopleService.get(id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeopleDto,
  ) {
    return await this.peopleService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.peopleService.delete(id);
  }
}
