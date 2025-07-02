import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchase_requests')
export class PurchaseRequest {
  @PrimaryGeneratedColumn()
  requestID!: number;

  @Column()
  itemName!: string;

  @Column()
  quantity!: number;

  @Column()
  department!: string;

  @Column({ default: 'Pending' })
  status!: string;

  @Column()
  requestedBy!: number; // userID

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
