import { EntityRepository, Repository } from 'typeorm'

import { BranchItem } from '@/entities'

@EntityRepository(BranchItem)
export class BranchItemRepository extends Repository<BranchItem> {}
