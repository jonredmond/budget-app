import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'user',
})
export class User extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}

export type UserWithRelations = User & UserRelations;
