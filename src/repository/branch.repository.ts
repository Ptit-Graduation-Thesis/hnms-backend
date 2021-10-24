import { EntityRepository, Repository } from 'typeorm'

import { Branch } from '@/entities'

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {}
