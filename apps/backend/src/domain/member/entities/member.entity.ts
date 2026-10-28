import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ unique: true, length: 255 })
  email: string

  @Column()
  password: string

  @Column({ length: 50 })
  username: string
}
