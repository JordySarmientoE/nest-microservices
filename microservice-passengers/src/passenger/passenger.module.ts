import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerSchema } from './schema/passenger.schema';
import { PASSENGER } from '../common/models/models';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ]
})
export class PassengerModule {}
