import { EntityRepository, Repository } from 'typeorm'

import { SoldItem } from '@/entities'

@EntityRepository(SoldItem)
export class SoldItemRepository extends Repository<SoldItem> {}
