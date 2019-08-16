import { UseGuards } from '@nestjs/common';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionUser } from '../../module/x000/_service/user';
export { SessionUser } from '../../module/x000/_service/user';
import { createParamDecorator, ParamDecoratorEnhancer } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
class FlagGuard extends AuthGuard('jwt') {
  constructor(private readonly userflag: number) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    interface UserRequest extends Request {
      user: SessionUser;
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
  data?: keyof SessionUser
) => ParamDecoratorEnhancer = createParamDecorator(
  (data: keyof SessionUser, req: Request) => {
    return data ? req.user && req.user[data] : req.user;
  }
);
