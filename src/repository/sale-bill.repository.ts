import { EntityRepository, Repository } from 'typeorm'

import { SaleBill } from '@/entities'

@EntityRepository(SaleBill)
export class SaleBillRepository extends Repository<SaleBill> {}
