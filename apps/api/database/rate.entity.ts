import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pns } from './pns.entity'; 

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  rateId: number;

  @Column()
  hourlyRate: number;

  @Column()
  vat: number;

  @ManyToOne(() => Pns) 
  @JoinColumn({ name: 'serviceId' })
  pns: Pns;

  @Column({ default: 0 })
  status: number;
}
