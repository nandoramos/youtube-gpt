import { IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;


  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Matches(
    /^[A-Za-z0-9!@#$%^&*()_+,-./:;<=>?@[\]^_{|}~]{8,16}$/,
    {message: 'Password too weak'}
  )
  password: string;
}
