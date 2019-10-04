import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  getJsonSchema,
  getJsonSchemaRef,
} from '@loopback/rest';
import {Transaction, UserTransaction, CreateNewTransaction} from '../models';
import {
  TransactionRepository,
  UserTransactionRepository,
} from '../repositories';

export class TransactionController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,

    @repository(UserTransactionRepository)
    public userTransactionRepository: UserTransactionRepository,
  ) {}

  @post('/transactions', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {transactionId: {type: 'number'}},
            },
          },
        },
      },
    },
  })
  async create(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(CreateNewTransaction),
      },
    },
  })
  {
    beneficiaryId,
    creditorId,
    ...transaction
  }: Omit<CreateNewTransaction, 'transactionId'>): Promise<{
    transactionId: number;
  }> {
    const {transactionId} = await this.transactionRepository.create(
      transaction,
    );

    try {
      await this.userTransactionRepository.create({
        transactionId,
        beneficiaryId,
        creditorId,
      });
    } catch (error) {
      await this.transactionRepository.deleteById(transactionId);
    }

    return {transactionId};
  }

  @get('/users/{id}/transactions', {
    responses: {
      '200': {
        description:
          'Found transactions where user was a beneficiary or creditor',
        content: {
          'application/json': {schema: getModelSchemaRef(Transaction)},
        },
      },
    },
  })
  async findTransactionsForUserId(
    @param.path.number('id') id: number,
  ): Promise<UserTransaction[]> {
    return await this.userTransactionRepository.find({
      where: {beneficiaryId: id},
      include: [
        {relation: 'transaction'},
        {relation: 'beneficiary'},
        {relation: 'creditor'},
      ],
    });
  }
}
