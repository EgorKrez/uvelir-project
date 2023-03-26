import { Controller, Get, Post, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiRequest, ApiResponse, ApiSession } from '../models/api-request.model';
import { IToken } from '../models/token.model';
import { MongoService } from '../mongo/mongo.service';
import { SaveQueryGuard } from './save-query.guard';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mongoService: MongoService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('google')
  @UseGuards(
    SaveQueryGuard,
    AuthGuard('google'),
  )
  async googleAuth() {
  }

  @Get('token')
  @UseGuards(SessionGuard)
  async getToken(
    @Session() session: ApiSession,
  ): Promise<IToken> {
    return {
      token: this.jwtService.sign(session.persistentUser),
    };
  }

  @Get('user')
  async getUser(
    @Req() r: any,
    @Session() session: ApiSession,
  ) {
    console.log(session.test);
    if (typeof session.test !== 'number') {
      session.test = 0;
    }
    session.test += 1;

    session.save();

    console.log(session.test);
    return session.persistentUser;
  }

  @Post('logout')
  async logout(
    @Session() session: ApiSession,
  ) {
    session.destroy(() => void 0);
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuthRedirect(
    @Req() request: ApiRequest,
    @Res() response: ApiResponse,
    @Session() session: ApiSession,
  ) {
    console.log(session.persistentUser);

    const { user } = request;

    let persistentUser = await this.mongoService.UserModel.findOne({ email: user.email });

    if (!persistentUser) {
      persistentUser = await this.mongoService.UserModel.create({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      });
    }

    session.persistentUser = persistentUser.toObject();

    session.save();

    console.log(session.persistentUser);

    return {
      url: session.from,
    };
  }
}