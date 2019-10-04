import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';

import {
  Transaction,
  UserTransaction,
  User,
  UserTransactionRelations,
} from '../models';
import {TransactionRepository} from './transaction.repository';
import {UserRepository} from './user.repository';

export class UserTransactionRepository extends DefaultCrudRepository<
  UserTransaction,
  typeof UserTransaction.prototype.userTransactionId,
  UserTransactionRelations
> {
  public readonly transaction: BelongsToAccessor<
    Transaction,
    typeof UserTransaction.prototype.transactionId
  >;
  public readonly beneficiary: BelongsToAccessor<
    User,
    typeof UserTransaction.prototype.beneficiaryId
  >;
  public readonly creditor: BelongsToAccessor<
    User,
    typeof UserTransaction.prototype.creditorId
  >;

  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    @repository.getter('TransactionRepository')
    getTransactionRepository: Getter<TransactionRepository>,
    @repository.getter('UserRepository')
    getUserRepository: Getter<UserRepository>,
  ) {
    super(UserTransaction, db);

    this.beneficiary = this.createBelongsToAccessorFor(
      'beneficiary',
      getUserRepository,
    );
    this.creditor = this.createBelongsToAccessorFor(
      'creditor',
      getUserRepository,
    );
    this.transaction = this.createBelongsToAccessorFor(
      'transaction',
      getTransactionRepository,
    );

    this.registerInclusionResolver(
      'beneficiary',
      this.beneficiary.inclusionResolver,
    );
    this.registerInclusionResolver('creditor', this.creditor.inclusionResolver);
    this.registerInclusionResolver(
      'transaction',
      this.transaction.inclusionResolver,
    );
  }
}
