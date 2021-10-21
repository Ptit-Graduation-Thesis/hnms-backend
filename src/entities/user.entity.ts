import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Role } from './role.entity'

@Entity('users')
export class User {
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
    name: 'username',
    type: 'varchar',
    length: 127,
    collation: 'latin1_general_ci',
    unique: true,
    nullable: false,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 127,
    collation: 'latin1_general_ci',
    nullable: false,
    select: false,
  })
  password: string

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

  @Column({
    name: 'credential_id',
    type: 'varchar',
    length: 30,
    collation: 'latin1_general_ci',
    nullable: false,
  })
  credentialId: string

  @Column({
    name: 'dob',
    type: 'timestamp',
    nullable: false,
  })
  dob: Date

  @Column({
    name: 'salary',
    type: 'float',
    unsigned: true,
    nullable: false,
  })
  salary: number

  @Column({ name: 'role_id', type: 'int', nullable: false })
  roleId: number

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role

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
