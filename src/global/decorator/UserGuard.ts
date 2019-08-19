import { UseGuards } from '@nestjs/common';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserS2S } from '../../shared/user';
import { createParamDecorator, ParamDecoratorEnhancer } from '@nestjs/common';
import { Request } from 'express';

export { UserS2S } from '../../shared/user';

@Injectable()
class FlagGuard extends AuthGuard('jwt') {
  constructor(private readonly userflag: number) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    interface UserRequest extends Request {
      user: UserS2S;
    }
    if (await super.canActivate(context)) {
      const { user } = context.switchToHttp().getRequest<UserRequest>();
      return !user || (user.userflag & this.userflag) > 0;
    }
    return false;
  }
}

export const UserGuard = (userflag: number = 0) =>
  userflag ? UseGuards(new FlagGuard(userflag)) : UseGuards(AuthGuard('jwt'));

export const User: (
  data?: keyof UserS2S
) => ParamDecoratorEnhancer = createParamDecorator(
  (data: keyof UserS2S, req: Request) => {
    return data ? req.user && req.user[data] : req.user;
  }
);
