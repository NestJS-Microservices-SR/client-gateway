import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.client.send('auth.login.user', loginUserDTO).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
