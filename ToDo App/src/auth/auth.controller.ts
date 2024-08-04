import {
  Body,
  Catch,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/public-routes/public-routes.decorator';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Catch()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *  Login function
   * @param loginUserDTO - The user login props
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<boolean | { access_token: string }> {
    return req.user;
  }

  /**
   * Register function
   * @param registerUserDTO - User register props
   */

  @Public()
  @Post('register')
  register(@Body() registerUserDTO: CreateUserDTO): Promise<{status:boolean}> {
    return this.authService.registerAccount(registerUserDTO);
  }
}
