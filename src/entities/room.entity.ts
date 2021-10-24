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
import { Message } from './message.entity'

import { User } from './user.entity'

@Entity('rooms')
export class Room {
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

  @Column({ name: 'user_one', type: 'int', nullable: false })
  userOneId: number

  @Column({ name: 'user_two', type: 'int', nullable: false })
  userTwoId: number

  @ManyToOne(() => User, (user) => user.roomsHaveUserOne, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_one' })
  userOne: User

  @ManyToOne(() => User, (user) => user.roomsHaveUserTwo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_two' })
  userTwo: User

  @OneToMany(() => Message, (message) => message.room, { cascade: true })
  messages: Message[]

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
