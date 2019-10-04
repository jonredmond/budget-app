import {model, property} from '@loopback/repository';

@model()
export class CreateNewTransaction {
  @property({
    type: 'number',
    required: true,
  })
  beneficiaryId: number;

  @property({
    type: 'number',
    required: true,
  })
  creditorId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;
}
