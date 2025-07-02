import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  department!: string;

  @Column({ type: 'float' })
  allocatedBudget!: number;

  @Column({ type: 'float', default: 0 })
  utilizedBudget!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
