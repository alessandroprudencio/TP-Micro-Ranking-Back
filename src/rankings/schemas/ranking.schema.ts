import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RankingDocument = Ranking & Document;

@Schema({ timestamps: true, collection: 'rankings' })
export class Ranking {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  player: string;

  @Prop({ required: true })
  score: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
