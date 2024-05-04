import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryDto } from 'src/domain/common/paginator/baseQuery.dto';
import { IQueryDto } from 'src/domain/common/paginator/paginator.type';
import { IAddressEntity } from 'src/domain/entities/IAdresses.entity';
import { States } from 'src/domain/entities/states.entity';

@Exclude()
export class AddressDto implements IAddressEntity {
  @Expose() readonly id: number;
  @Expose() readonly logradouro: string;
  @Expose() readonly number: number;
  @Expose() readonly district: string;
  @Expose() readonly city: string;
  @Expose() readonly state: string;
}

export class CreateAddressDto {
  @ApiProperty({ description: 'Public Location' })
  @IsString()
  @MinLength(128)
  @IsNotEmpty()
  readonly logradouro: string;

  @ApiProperty({ description: 'Number' })
  @Min(1)
  @IsOptional()
  readonly number: number;

  @ApiProperty({ description: 'ID Document of the person' })
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  @IsNotEmpty()
  readonly district: string;

  @ApiProperty({ description: 'Address city' })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ description: 'Address state' })
  @IsString()
  @IsEnum(States)
  @IsNotEmpty()
  readonly state: string;
}
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
export class QueryAddressDto extends BaseQueryDto implements IQueryDto {}
