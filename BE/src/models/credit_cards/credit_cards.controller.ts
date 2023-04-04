import JwtAuthenticationGuard from '@authentication/guards/jwt-authentication.guard';
import RequestWithUser from '@authentication/interfaces/requestWithUser.interface';
import { StripeService } from '@models/stripe/stripe.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddCreditCardDto } from './dto/addCreditCard.dto';
import SetDefaultCreditCardDto from './dto/setDefaultCreditCard.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('attach-card')
  async createPayment(
    @Body() data: AddCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    return await this.stripeService.attachCreditCard(
      data.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('list-card-customer')
  async getListCard(@Req() request: RequestWithUser) {
    return await this.stripeService.listCreditCards(
      request.user.stripeCustomerId,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('default')
  @HttpCode(200)
  async setDefaultCard(
    @Body() creditCard: SetDefaultCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    await this.stripeService.setDefaultCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
