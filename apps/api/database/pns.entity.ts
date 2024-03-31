import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; 

@Entity()
export class Pns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceCode: number;

  @Column()
  serviceName: string;

  @Column()
  type: string;

  @Column()
  hourlyRate: number;

  @Column()
  vat: number;

  @ManyToOne(() => User) 
  @JoinColumn({ name: 'user_id' })
  user: User;
}
