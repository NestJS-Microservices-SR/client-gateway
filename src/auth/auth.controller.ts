import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDTO, RegisterUserDTO } from './dto';

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

  @Get('verify')
  verifyUser(data: any) {
    return this.client.send('auth.verify.user', 'verify').pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
