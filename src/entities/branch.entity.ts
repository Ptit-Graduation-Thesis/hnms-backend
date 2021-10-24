import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BranchItem } from './branch-item.entity'

import { User } from './user.entity'

@Entity('branchs')
export class Branch {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 127,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  name: string

  @Column({
    name: 'address',
    type: 'varchar',
    length: 256,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  address: string

  @OneToMany(() => User, (user) => user.branch, { cascade: true })
  users: User[]

  @OneToMany(() => BranchItem, (branchItem) => branchItem.branch, { cascade: true })
  branchItems: BranchItem[]

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
