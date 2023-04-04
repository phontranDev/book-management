import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { StripeModule } from '@models/stripe/stripe.module';

@Module({
  imports: [StripeModule],
  providers: [ChargeService],
  controllers: [ChargeController],
})
export class ChargeModule {}
