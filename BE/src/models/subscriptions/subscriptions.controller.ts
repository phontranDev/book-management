import JwtAuthenticationGuard from '@authentication/guards/jwt-authentication.guard';
import RequestWithUser from '@authentication/interfaces/requestWithUser.interface';
import { StripeService } from '@models/stripe/stripe.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateSubScriptionDto } from './dto/createSubscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly stripeService: StripeService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('monthly')
  async createMonthlySubscription(
    @Body() data: CreateSubScriptionDto,
    @Req() request: RequestWithUser,
  ) {
    return this.subscriptionsService.stripeCreateMonthlySubscription(
      data.stripePriceId,
      request.user.stripeCustomerId,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('monthly')
  async getMonthlySubscription(@Req() request: RequestWithUser) {
    return this.subscriptionsService.stripeGetMonthlySubscription(
      request.user.stripeCustomerId,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':stripeSubId')
  async delete(@Param('stripeSubId') stripeSubId: string) {
    return this.subscriptionsService.stripeRemoveSub(stripeSubId);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getListSubscription() {
    return this.stripeService.listSubscription();
  }
}
