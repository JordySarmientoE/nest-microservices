import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  controllers: [FlightController],
  imports: [ProxyModule]
})
export class FlightModule {}
