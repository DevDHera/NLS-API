// core
import { EntityRepository, Repository } from 'typeorm';

// schemas
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// schemas
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
  }
}
