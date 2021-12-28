import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { RankingsModule } from './rankings/rankings.module';
import { ConfigModule } from '@nestjs/config';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_STRING_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RankingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
