import { Member } from '../entities/member.entity'

export const MEMBER_REPOSITORY = Symbol('IMemberRepository')

export interface IMemberRepository {
  findById(id: number): Promise<Member | null>
  findByEmail(email: string): Promise<Member | null>
  save(member: Member): Promise<Member>
  delete(id: number): Promise<void>
}
