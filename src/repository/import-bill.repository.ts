import { EntityRepository, Repository } from 'typeorm'

import { ImportBill } from '@/entities'

@EntityRepository(ImportBill)
export class ImportBillRepository extends Repository<ImportBill> {}
