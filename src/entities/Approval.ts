import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn()
  approvalID!: number;

  @Column()
  requestID!: number;

  @Column()
  approvedBy!: number; // userID

  @Column()
  status!: string; // Approved / Rejected

  @Column({ nullable: true })
  comments!: string;

  @CreateDateColumn()
  approvedAt!: Date;
}
