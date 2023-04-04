import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post('save')
  async create(@Body() data: CreatePlanDto) {
    return await this.plansService.createPlan(data);
  }

  @Get('/first-plan')
  async getFirstPlan() {
    return await this.plansService.loadFirstPlan();
  }
}
