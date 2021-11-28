import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { SaleBill } from './sale-bill.entity'
import { Item } from './item.entity'

@Entity('sold_items')
export class SoldItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({
    name: 'amount',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  amount: number

  @Column({ name: 'sale_bill_id', type: 'int', nullable: false })
  saleBillId: number

  @Column({ name: 'item_id', type: 'int', nullable: false })
  itemId: number

  @ManyToOne(() => SaleBill, (saleBill) => saleBill.soldItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_bill_id' })
  saleBill: SaleBill

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
