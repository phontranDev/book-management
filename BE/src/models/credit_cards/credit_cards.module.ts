import { StripeModule } from '@models/stripe/stripe.module';
import { Module } from '@nestjs/common';
import { CreditCardsController } from './credit_cards.controller';

@Module({
  imports: [StripeModule],
  controllers: [CreditCardsController],
})
export class CreditCardsModule {}
