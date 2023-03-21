import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
  AutoIncrement,
  Unique,
  ForeignKey,
  HasMany,
  BelongsToMany,
  BelongsTo,
} from "sequelize-typescript";
import { Ticket } from "./Ticket";
import { User } from "./User";

interface UserTicketAttributes {
  reportedId: number;
  affectedId: number;
  assignedId: number;
}

@Table({ tableName: "user_tickets", underscored: true })
export class UserTicket extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  reportedId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  affectedId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  assignedId!: number;

  @ForeignKey(() => Ticket)
  @Column(DataType.INTEGER)
  ticketId!: number;
}
