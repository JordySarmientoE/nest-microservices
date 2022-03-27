import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  controllers: [PassengerController],
  imports: [ProxyModule]
})
export class PassengerModule {}
