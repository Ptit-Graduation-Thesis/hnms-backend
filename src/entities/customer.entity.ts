import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Bill } from './bill.entity'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 127,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  fullName: string

  @Column({
    name: 'dob',
    type: 'timestamp',
    nullable: false,
  })
  dob: Date

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    collation: 'latin1_general_ci',
    nullable: false,
  })
  phoneNumber: string

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  address: string

  @OneToMany(() => Bill, (bill) => bill.customer, { cascade: true })
  bills: Bill[]

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
