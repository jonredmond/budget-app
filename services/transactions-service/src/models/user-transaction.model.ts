import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Transaction, TransactionWithRelations} from './transaction.model';
import {User, UserWithRelations} from './user.model';

@model({
  name: 'user_transaction',
})
export class UserTransaction extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userTransactionId: number;

  @belongsTo(() => Transaction, {keyTo: 'transactionId'})
  transactionId: number;

  @belongsTo(() => User, {keyTo: 'userId'})
  beneficiaryId: number;

  @belongsTo(() => User, {keyTo: 'userId'})
  creditorId: number;

  constructor(data?: Partial<UserTransaction>) {
    super(data);
  }
}

export interface UserTransactionRelations {
  beneficiary: UserWithRelations;
  creditor: UserWithRelations;
  transaction: TransactionWithRelations;
}

export type UserTransactionWithRelations = UserTransaction &
  UserTransactionRelations;
