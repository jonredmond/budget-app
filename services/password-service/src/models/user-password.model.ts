import {model, property, Entity} from '@loopback/repository';

@model({
  name: 'user_password',
})
export class UserPassword extends Entity {
  @property({
    name: 'user_id',
    type: 'number',
    id: true,
  })
  userId: number;

  @property({
    name: 'password_hash',
    type: 'string',
    required: 'true',
  })
  passwordHash: string;
}
