import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @ValidateIf((_object, value) => value !== undefined)
  @Length(2, 20)
  readonly username?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsEmail()
  readonly email?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @Length(8, 128)
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly bio?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;
}
