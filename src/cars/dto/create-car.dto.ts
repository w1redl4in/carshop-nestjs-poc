import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  image: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  rate: number;
}
