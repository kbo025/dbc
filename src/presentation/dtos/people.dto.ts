import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryDto } from 'src/domain/common/paginator/baseQuery.dto';
import { IQueryDto } from 'src/domain/common/paginator/paginator.type';
import {
  IPeopleFilters,
  IPeopleEntity,
} from 'src/domain/entities/IPeople.entity';

@Exclude()
export class PeopleDto implements IPeopleEntity {
  @Expose() readonly id: number;
  @Expose() readonly cpf: string;
  @Expose() readonly name: string;
  @Expose() readonly email: string;
  @Expose() readonly phone: string;
}

export class CreatePeopleDto {
  @ApiProperty({ description: 'ID Document of the person' })
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ description: "Persons email's" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Person name's" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  name: string;

  @ApiProperty({ description: "Person phone's" })
  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(11)
  phone: string;
}
export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {}
export class FilterPeopleDto
  extends PartialType(CreatePeopleDto)
  implements IPeopleFilters {}

export class QueryPeopleDto
  extends BaseQueryDto<FilterPeopleDto>
  implements IQueryDto<FilterPeopleDto> {}
