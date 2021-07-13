import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginMode, Role } from '../entities/user';
import { Context } from '../types/Context';

@Resolver()
export class AuthResolver {
  @Mutation()
  public signUp(
    @Ctx() context: Context,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('phone') phone: string,
    @Arg('password') password: string,
    @Arg('role') role: Role,
    @Arg('loginMode') loginMode: LoginMode,
  ): string {
    return '';
  }
}
