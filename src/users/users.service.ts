import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,

    private carService: CarsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find({ relations: ['cars'] });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    if (!updatedUser.affected) {
      return new InternalServerErrorException();
    }

    return updatedUser;
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async addCarToUser(userId: number, carId: number) {
    const car = await this.carService.findOne(carId);

    if (!car) {
      throw new NotFoundException();
    }

    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException();
    }

    user.cars = [car];

    return this.usersRepository.save(user);
  }
}
