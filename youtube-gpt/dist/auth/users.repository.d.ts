import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
export declare class UsersRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
