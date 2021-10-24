import { EntityRepository, Repository } from 'typeorm'

import { Bill } from '@/entities'

@EntityRepository(Bill)
export class BillRepository extends Repository<Bill> {}
