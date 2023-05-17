import { Optional } from "sequelize";
import {
   Table,
   Column,
   Model,
   DataType,
   PrimaryKey,
   AutoIncrement,
   ForeignKey,
   BelongsTo,
} from "sequelize-typescript";
import { Ticket } from "./Ticket";
import { User } from "./User";

interface CommentAttributes {
   id: number;
   ticketId: number;
   userId: number;
   commentBody: string;
   createdAt?: Date;
}

export interface CommentInput extends Optional<CommentAttributes, "id"> {}
export interface CommentOutput extends Required<CommentAttributes> {}

@Table
export class Comment
   extends Model<CommentAttributes, CommentInput>
   implements CommentAttributes
{
   @AutoIncrement
   @PrimaryKey
   @Column(DataType.INTEGER)
   public id!: number;

   @ForeignKey(() => Ticket)
   @Column(DataType.INTEGER)
   public ticketId!: number;

   @ForeignKey(() => User)
   @Column(DataType.INTEGER)
   public userId!: number;

   @BelongsTo(() => User)
   public user!: User;

   @BelongsTo(() => Ticket)
   public ticket!: Ticket;

   @Column(DataType.TEXT)
   public commentBody!: string;

   public readonly createdAt!: Date;
}
