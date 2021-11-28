import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { BranchItem } from './branch-item.entity'
import { ImportBill } from './import-bill.entity'

@Entity('imported_items')
export class ImportedItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({
    name: 'amount',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  amount: number

  @Column({
    name: 'import_price',
    type: 'float',
    unsigned: true,
    nullable: false,
  })
  importPrice: number

  @Column({ name: 'import_bill_id', type: 'int', nullable: false })
  importBillId: number

  @Column({ name: 'branch_item_id', type: 'int', nullable: false })
  branchItemId: number

  @ManyToOne(() => ImportBill, (importBill) => importBill.importedItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'import_bill_id' })
  importBill: ImportBill

  @ManyToOne(() => BranchItem, (branchItem) => branchItem.importedItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_item_id' })
  branchItem: BranchItem

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
