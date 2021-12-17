import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { BranchItem } from './branch-item.entity'
import { SoldItem } from './sold-item.entity'

@Entity('items')
export class Item {
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
    name: 'des',
    type: 'varchar',
    length: 1000,
    collation: 'utf8_general_ci',
    nullable: true,
  })
  des: string

  @Column({
    name: 'price',
    type: 'float',
    unsigned: true,
    nullable: false,
  })
  price: number

  @Column({
    name: 'picture_key',
    type: 'varchar',
    length: 255,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  pictureKey: string

  @Column({
    name: 'picture_url',
    type: 'varchar',
    length: 255,
    collation: 'utf8_general_ci',
    nullable: false,
  })
  pictureUrl: string

  @Column({
    name: 'qr_code',
    type: 'varchar',
    length: 50,
    collation: 'latin1_general_ci',
    nullable: false,
  })
  qrCode: string

  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    nullable: false,
  })
  type: number

  @OneToMany(() => BranchItem, (branchItem) => branchItem.item, { cascade: true })
  branchItems: BranchItem[]

  @OneToMany(() => SoldItem, (soldItem) => soldItem.item, { cascade: true })
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
