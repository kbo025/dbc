import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, IsArray } from 'class-validator';
import { IQueryDto, Order } from './paginator.type';

const MIN_ITEM_PER_PAGE = 10;
const MAX_ITEM_PER_PAGE = 200;

export class BaseQueryDto<T = null> implements IQueryDto<T> {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: MIN_ITEM_PER_PAGE,
    maximum: MAX_ITEM_PER_PAGE,
    default: MIN_ITEM_PER_PAGE,
  })
  @Type(() => Number)
  @IsInt()
  @Min(MIN_ITEM_PER_PAGE)
  @Max(MAX_ITEM_PER_PAGE)
  @IsOptional()
  readonly itemsPerPage: number = MIN_ITEM_PER_PAGE;

  @ApiPropertyOptional({ description: 'Array of filters' })
  @IsOptional()
  readonly filters?: T;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  @IsArray()
  readonly sortBy?: [string, Order][];
}
