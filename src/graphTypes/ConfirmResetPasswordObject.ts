import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ConfirmResetPasswordObject {
  @Field({
    name: 'success',
    description: 'Successfully confirmed the password reset.',
  })
  public success: boolean;
}
