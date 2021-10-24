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

import { Customer } from './customer.entity'
import { SoldItem } from './sold-item.entity'
import { User } from './user.entity'

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({ name: 'customer_id', type: 'int', nullable: false })
  customerId: number

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number

  @ManyToOne(() => Customer, (customer) => customer.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => SoldItem, (soldItem) => soldItem.bill, { cascade: true })
  soldItems: SoldItem[]

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
