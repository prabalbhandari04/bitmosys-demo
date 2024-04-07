import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Rate } from './rate.entity';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  BookingId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  User: User;

  @ManyToOne(() => Rate)
  @JoinColumn({ name: 'RateID' })
  Rate: Rate;

  @Column({ type: 'timestamp with time zone', nullable: false })
  StartDatetime: Date;

  @Column({ type: 'timestamp with time zone', nullable: false })
  EndDatetime: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  CreatedOn: Date;

  @Column({ default: 0 })
  status: number;
}