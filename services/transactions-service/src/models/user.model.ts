import {Entity, model, property, hasMany} from '@loopback/repository';
import {
  UserTransaction,
  UserTransactionWithRelations,
} from './user-transaction.model';

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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @hasMany(() => UserTransaction, {keyTo: 'beneficiaryId'})
  beneficiaryTransactions?: UserTransaction[];

  @hasMany(() => UserTransaction, {keyTo: 'creditorId'})
  creditorTransactions?: UserTransaction[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  beneficiaryTransactions?: UserTransactionWithRelations[];
  creditorTransactions?: UserTransactionWithRelations[];
}

export type UserWithRelations = User & UserRelations;
