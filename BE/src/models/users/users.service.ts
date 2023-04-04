import { PageDto, PageMetaDto, PageOptionsDto } from '@common/dtos';
import { BaseService } from '@models/base/base.service';
import { LocalFilesService } from '@models/local-files/local-files.service';
import { StripeService } from '@models/stripe/stripe.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private stripeService: StripeService,
    private localFilesService: LocalFilesService,
  ) {
    super(usersRepository);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    await this.getUserExitByEmail(userData.email);

    const avatar = await this.localFilesService.getFileById(userData.avatar_Id);

    const stripeCustomer = await this.stripeService.createCustomer(
      userData.name,
      userData.email,
    );

    const newUser = await this.usersRepository.create({
      ...userData,
      avatar,
      stripeCustomerId: stripeCustomer.id,
    });

    return await this.usersRepository.save(newUser);
  }

  public async getUserByStripeCustomer(stripeCustomerId: string) {
    return await this.findByCondition({
      stripeCustomerId,
    });
  }

  public async updateMonthlySubscriptionUser(
    userId: number,
    isSubscrite: boolean,
  ) {
    const user = await this.findOneById(userId);
    user.isSubscrite = isSubscrite;
    await this.repository.save({
      ...user,
    });
  }

  public async addAvatar(userId: number, fileData: LocalFileDto) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const avatar = await this.localFilesService.saveLocalFileData(fileData);
    user.avatar = avatar;
    await this.usersRepository.save(user);
  }

  public async searchForUsers(pageOptionsDto: PageOptionsDto) {
    const [items, itemCount] = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.avatar', 'avatarUser')
      .where('users.name like :search', {
        search: `%${pageOptionsDto.search || ''}%`,
      })
      .orderBy('users.createdAt', pageOptionsDto.order)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(items, pageMetaDto);
  }

  public async findUserByName(name: string) {
    return await this.usersRepository.findOne({
      where: { name },
    });
  }

  public async updateUser(id: number, editUserData: EditUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${editUserData.id} not found`);
    }

    const avatar = await this.localFilesService.getFileById(
      editUserData.avatar_Id,
    );

    return await this.usersRepository.save({
      id: user.id,
      ...editUserData,
      avatar,
    });
  }

  async findUsersFllowing(id: number) {
    const following = await this.usersRepository.findOne({
      where: { id },
      relations: [
        'posts',
        'followers',
        'followings',
        'followers.follower',
        'followings.following',
      ],
    });
    return following;
  }

  async validateUserById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: [
        'posts',
        'followers',
        'followings',
        'followers.follower',
        'followings.following',
      ],
    });
  }

  async getUserExitByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('This email is registered', HttpStatus.CONFLICT);
    }
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  public async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.usersRepository.save({
      ...user,
      isBanned: true,
    });
  }
}
