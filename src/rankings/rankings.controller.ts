import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { IRanking } from './interfaces/ranking.interface';
import { RankingsService } from './rankings.service';

@Controller('rankings')
export class RankingsController {
  constructor(private rankingService: RankingsService) {
    this.rankingService = rankingService;
  }

  @EventPattern('proccess-ranking')
  async create(@Payload() processRankingDto: IRanking, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();

    const originalMsg = context.getMessage();

    try {
      await this.rankingService.proccessRanking(processRankingDto);

      await channel.ack(originalMsg);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
