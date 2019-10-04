import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {Transaction, TransactionRelations, UserTransaction} from '../models';
import {inject, Getter} from '@loopback/core';

import {UserTransactionRepository} from './user-transaction.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.transactionId,
  TransactionRelations
> {
  public readonly userTransaction: HasOneRepositoryFactory<
    UserTransaction,
    typeof Transaction.prototype.transactionId
  >;

  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    @repository.getter('UserTransactionRepository')
    getUserTransactionRepository: Getter<UserTransactionRepository>,
  ) {
    super(Transaction, db);

    this.userTransaction = this.createHasOneRepositoryFactoryFor(
      'userTransaction',
      getUserTransactionRepository,
    );
  }
}
