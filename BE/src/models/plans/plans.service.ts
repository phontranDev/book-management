import { BaseService } from '@models/base/base.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/plan.dto';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansService extends BaseService<Plan, Repository<Plan>> {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {
    super(planRepository);
  }

  async createPlan(data: CreatePlanDto) {
    const plan = await this.findByCondition({
      name: data.name,
    });
    if (plan) {
      throw new BadRequestException('Already exist');
    }
    const result = await this.planRepository.create(data);
    if (result) {
      return this.planRepository.save(result);
    }
    throw new BadRequestException('Create Faild');
  }

  public async getPlanByStripePrice(stripePriceId: string) {
    return await this.findByCondition({
      stripePriceId,
    });
  }

  public async loadFirstPlan() {
    const plan = await this.planRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return plan;
  }
}
