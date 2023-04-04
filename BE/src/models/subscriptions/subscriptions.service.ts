import { BaseService } from '@models/base/base.service';
import { PlansService } from '@models/plans/plans.service';
import { StripeService } from '@models/stripe/stripe.service';
import { UsersService } from '@models/users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubScriptionDto } from './dto/createSubscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService extends BaseService<
  Subscription,
  Repository<Subscription>
> {
  constructor(
    @InjectRepository(Subscription)
    private readonly subScriptionRepository: Repository<Subscription>,
    private readonly stripeService: StripeService,
    private readonly plansService: PlansService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super(subScriptionRepository);
  }

  public async stripeCreateMonthlySubscription(
    stripePriceId: string,
    stripeCustomerId: string,
  ) {
    const plan = await this.plansService.getPlanByStripePrice(stripePriceId);
    const user = await this.usersService.getUserByStripeCustomer(
      stripeCustomerId,
    );

    const subscriptions = await this.stripeService.listSubscriptions(
      stripePriceId,
      stripeCustomerId,
    );

    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }

    const stripeSubscription = await this.stripeService.createSubscription(
      stripePriceId,
      stripeCustomerId,
    );

    const createSub = await this.repository.create({
      start: new Date(stripeSubscription.current_period_start * 1000),
      end: new Date(stripeSubscription.current_period_end * 1000),
      plan,
      user,
      stripeSubscriptionId: stripeSubscription.id,
    });

    await this.usersService.updateMonthlySubscriptionUser(user.id, true);

    return await this.repository.save(createSub);
  }

  public async stripeGetMonthlySubscription(customerId: string) {
    const priceId = this.configService.get('MONTHLY_SUBSCRIPTION_PRICE_ID');
    const subscriptions = await this.stripeService.listSubscriptions(
      priceId,
      customerId,
    );

    if (!subscriptions.data.length) {
      throw new NotFoundException('Customer not subscribed');
    }

    return subscriptions.data[0];
  }

  public async stripeRemoveSub(stripeSubId: string) {
    await this.stripeService.cancelSubscription(stripeSubId);

    const sub = await this.repository.findOne({
      relations: ['user'],
      where: {
        stripeSubscriptionId: stripeSubId,
      },
    });
    if (!sub) throw new NotFoundException(`${stripeSubId} not found`);
    await this.repository.delete({
      stripeSubscriptionId: stripeSubId,
    });
    await this.usersService.updateMonthlySubscriptionUser(sub.user.id, false);
  }
}
