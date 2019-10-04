import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserTransaction} from './user-transaction.model';

@model({
  name: 'transaction',
})
export class Transaction extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  transactionId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasOne(() => UserTransaction, {keyTo: 'transactionId'})
  userTransaction?: UserTransaction;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
