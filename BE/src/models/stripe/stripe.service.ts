import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CardInfoDto } from './dto/CardInfor.dto';
import StripeError from './stripeError.enum';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async createPaymentMethod(cardInfo: CardInfoDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardInfo.number,
        exp_month: cardInfo.exp_month,
        exp_year: cardInfo.exp_year,
        cvc: cardInfo.cvc,
      },
    });
    return {
      paymentMethod_Id: paymentMethod.id,
    };
  }

  public async attachCreditCard(paymentMethodId: string, customerId: string) {
    return this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }

  public async listCreditCards(customerId: string) {
    return this.stripe.customers.listPaymentMethods(customerId, {
      type: 'card',
    });
  }

  public async createSubscription(priceId: string, customerId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
      });
    } catch (error) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }

  public async setDefaultCreditCard(
    paymentMethodId: string,
    customerId: string,
  ) {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listSubscriptions(priceId: string, customerId: string) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
    });
  }

  public async cancelSubscription(id: string) {
    return await this.stripe.subscriptions.del(id);
  }

  public async listSubscription() {
    return await this.stripe.subscriptions.list({
      limit: 3,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirm: true,
    });
  }
}
