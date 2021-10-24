import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Bill } from './bill.entity'
import { Item } from './item.entity'

@Entity('sold_items')
export class SoldItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({ name: 'bill_id', type: 'int', nullable: false })
  billId: number

  @Column({ name: 'item_id', type: 'int', nullable: false })
  itemId: number

  @ManyToOne(() => Bill, (bill) => bill.soldItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bill_id' })
  bill: Bill

  @ManyToOne(() => Item, (item) => item.soldItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item

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
