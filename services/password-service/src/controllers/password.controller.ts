import {repository} from '@loopback/repository';
import {
  get,
  post,
  getModelSchemaRef,
  requestBody,
  param,
  put,
} from '@loopback/rest';

import {UserPassword} from '../models';
import {PasswordRepository} from '../repositories';

export class PasswordController {
  constructor(
    @repository(PasswordRepository)
    public passwordRepository: PasswordRepository,
  ) {}

  @post('/password', {
    responses: {
      '200': {
        description: 'Password successfully stored against user id',
        content: {
          'application/json': getModelSchemaRef(UserPassword),
        },
      },
    },
  })
  async storePassword(
    @requestBody({
      content: {
        'application/json': getModelSchemaRef(UserPassword),
      },
    })
    userPassword: UserPassword,
  ): Promise<UserPassword> {
    return await this.passwordRepository.create(userPassword);
  }

  @put('/password/{id}', {
    responses: {
      '204': {
        description: 'Password updated successfully',
      },
    },
  })
  async updatePasswordForUserId(
    @param.path.number('id')
    userId: number,
    @requestBody({
      content: {
        'application/json': getModelSchemaRef(UserPassword),
      },
    })
    userPassword: UserPassword,
  ): Promise<void> {
    return await this.passwordRepository.updateById(userId, userPassword);
  }

  @get('/password/{id}', {
    responses: {
      '200': {
        description: 'Found password for user',
        content: {
          'application/json': {schema: getModelSchemaRef(UserPassword)},
        },
      },
    },
  })
  async fetchPasswordByUserId(
    @param.path.number('id')
    userId: number,
  ): Promise<UserPassword> {
    return await this.passwordRepository.findById(userId);
  }
}
