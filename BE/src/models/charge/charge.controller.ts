import JwtAuthenticationGuard from '@authentication/guards/jwt-authentication.guard';
import RequestWithUser from '@authentication/interfaces/requestWithUser.interface';
import { StripeService } from '@models/stripe/stripe.service';
import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import CreateChargeDto from './dto/createCharge.dto';

@Controller('charge')
export class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCharge(
    @Body() charge: CreateChargeDto,
    @Req() request: RequestWithUser,
  ) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
