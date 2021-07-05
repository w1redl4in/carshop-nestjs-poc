import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}
  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async findAll() {
    const cars = await this.carRepository.find({ relations: ['user'] });
    return cars;
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne(id);
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
