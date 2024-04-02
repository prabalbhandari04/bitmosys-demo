import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pns } from './pns.entity'; 

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    hourlyRate: number;
  
    @Column()
    vat: number;
  
    @ManyToOne(() => Pns) 
    @JoinColumn({ name: 'pns_id' })
    pns: Pns;
  

  @Column({ default: 0 })
  status: number;
}
