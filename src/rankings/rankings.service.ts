import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxyRabbitMq } from 'src/proxyrmq/client-proxy';
import { IRanking } from './interfaces/ranking.interface';
import { Ranking, RankingDocument } from './schemas/ranking.schema';

@Injectable()
export class RankingsService {
  private clientRabbitMQAdmin = this.clientProxy.getClientProxyRabbitmq('micro-admin-back');

  constructor(
    @InjectModel(Ranking.name)
    private readonly rankingModel: Model<RankingDocument>,

    private clientProxy: ClientProxyRabbitMq,
  ) {}

  async proccessRanking(processRankingDto: IRanking): Promise<void> {
    await this.rankingModel.create(processRankingDto);

    const allPlayersScore = await this.rankingModel.aggregate([
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { $group: { _id: '$player', score: { $sum: '$score' } } },
    ]);

    const positionsRankings = [...allPlayersScore]
      .sort((a, b) => b.score - a.score)
      .map((e, i) => ({ positionRanking: i + 1, ...e }));

    this.clientRabbitMQAdmin.emit('update-positions-rankings', positionsRankings);
  }
}
