import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';

import {UserPassword} from '../models';

export class PasswordRepository extends DefaultCrudRepository<
  UserPassword,
  typeof UserPassword.prototype.userId
> {
  constructor(@inject('datasources.db') db: juggler.DataSource) {
    super(UserPassword, db);
  }
}
