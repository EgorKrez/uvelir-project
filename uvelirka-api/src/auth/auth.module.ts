import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigModule } from '../config/api.config.module';
import { MongoModule } from '../mongo/mongo.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google-auth.strategy';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { SessionGuard } from './session.guard';

@Module({
  imports: [
    ApiConfigModule,
    MongoModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [GoogleStrategy, SessionGuard, JwtStrategy, JwtGuard],
  controllers: [AuthController],
})
export class AuthModule {

}