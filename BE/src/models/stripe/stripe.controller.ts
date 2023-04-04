import { Body, Controller, Post } from '@nestjs/common';
import { CardInfoDto } from './dto/CardInfor.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-method')
  async createPayment(@Body() cardInfo: CardInfoDto) {
    return await this.stripeService.createPaymentMethod(cardInfo);
  }
}
