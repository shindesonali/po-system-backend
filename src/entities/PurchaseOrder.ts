import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  orderID!: number;

  @Column()
  requestID!: number;

  @Column()
  vendorID!: number;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'date' })
  deliveryDate!: string;

  @Column({ default: 'Pending' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
