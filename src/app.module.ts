import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ClientProxyRabbitMq } from './proxyrmq/client-proxy';
import { RankingsModule } from './rankings/rankings.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_STRING_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RankingsModule,
  ],
  providers: [ClientProxyRabbitMq],
})
export class AppModule {}
