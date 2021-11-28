import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Branch } from './branch.entity'
import { ImportedItem } from './imported-item.entity'
import { Item } from './item.entity'

@Entity('branch_items')
export class BranchItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({
    name: 'amount',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  amount: number

  @Column({ name: 'branch_id', type: 'int', nullable: false })
  branchId: number

  @Column({ name: 'item_id', type: 'int', nullable: false })
  itemId: number

  @ManyToOne(() => Branch, (branch) => branch.branchItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch

  @ManyToOne(() => Item, (item) => item.branchItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item

  @OneToMany(() => ImportedItem, (importedItem) => importedItem.branchItem, { cascade: true })
  importedItems: ImportedItem[]

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date()
  }
}
