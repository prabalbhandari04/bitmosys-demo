import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Pns } from './pns.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  BookingId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  User: User;

  @ManyToOne(() => Pns)
  @JoinColumn({ name: 'PNSID' })
  PNS: Pns;

  @Column({ type: 'timestamp with time zone', nullable: false })
  StartDatetime: Date;

  @Column({ type: 'timestamp with time zone', nullable: false })
  EndDatetime: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  CreatedOn: Date;

  @Column({ default: 0 })
  status: number;
}