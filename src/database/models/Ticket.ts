import { Optional } from "sequelize";
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
   DefaultScope,
   BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";
import { UserTicket } from "./UserTicket";

interface TicketAttributes {
   id: number;
   status: string;
   description: string;
   reportedId: number;
   affectedId: number;
   assignedId?: number;
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date;
   priority: string;
   title: string;
   category: string;
   affectedItem: string;
   phone: string;
}

export interface TicketInput
   extends Optional<TicketAttributes, "id" | "assignedId"> {}
export interface TicketOutput
   extends Optional<TicketAttributes, "assignedId"> {}

// @DefaultScope(() => ({
//     include: [{model: Ticket, attributes}]
// }))
@Table
export class Ticket
   extends Model<TicketAttributes, TicketInput>
   implements TicketAttributes
{
   @AutoIncrement
   @PrimaryKey
   @Column(DataType.INTEGER)
   public id!: number;

   @Column(DataType.STRING)
   public status!: string;

   @Column(DataType.STRING)
   public description!: string;

   @Column(DataType.STRING)
   public title!: string;

   @Column(DataType.STRING)
   public category!: string;

   @Column(DataType.STRING)
   public priority!: string;

   @Column(DataType.STRING)
   public affectedItem!: string;

   @Column(DataType.STRING)
   public phone!: string;

   @BelongsTo(() => User)
   public assigned?: User;

   @ForeignKey(() => User)
   @Column(DataType.INTEGER)
   public assignedId?: number;

   @BelongsTo(() => User)
   public reported!: User;

   @ForeignKey(() => User)
   @Column(DataType.INTEGER)
   public reportedId!: number;

   @BelongsTo(() => User)
   public affected!: User;

   @HasMany(() => Comment)
   public comments!: Comment;

   @ForeignKey(() => User)
   @Column(DataType.INTEGER)
   public affectedId!: number;

   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
   public readonly deletedAt!: Date;
}
