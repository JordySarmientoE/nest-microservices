import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  controllers: [UserController],
  imports: [ProxyModule]
})
export class UserModule {}
