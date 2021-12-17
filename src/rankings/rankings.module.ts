import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProxyRabbitMq } from 'src/proxyrmq/client-proxy';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { Ranking, RankingSchema } from './schemas/ranking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ranking.name, schema: RankingSchema }])],
  providers: [RankingsService, ClientProxyRabbitMq],
  controllers: [RankingsController],
})
export class RankingsModule {}
