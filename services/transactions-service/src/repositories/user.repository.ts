import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {User, UserRelations, UserTransaction} from '../models';
import {inject, Getter} from '@loopback/core';
import {UserTransactionRepository} from './user-transaction.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {
  public readonly beneficiaryTransactions: HasManyRepositoryFactory<
    UserTransaction,
    typeof User.prototype.userId
  >;
  public readonly creditorTransactions: HasManyRepositoryFactory<
    UserTransaction,
    typeof User.prototype.userId
  >;

  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    @repository.getter('UserTransactionRepository')
    getUserTransactionRepository: Getter<UserTransactionRepository>,
  ) {
    super(User, db);
    this.beneficiaryTransactions = this.createHasManyRepositoryFactoryFor(
      'beneficiaryTransactions',
      getUserTransactionRepository,
    );
    this.creditorTransactions = this.createHasManyRepositoryFactoryFor(
      'creditorTransactions',
      getUserTransactionRepository,
    );

    this.registerInclusionResolver(
      'beneficiaryTransactions',
      this.beneficiaryTransactions.inclusionResolver,
    );

    this.registerInclusionResolver(
      'creditorTransactions',
      this.creditorTransactions.inclusionResolver,
    );
  }
}
