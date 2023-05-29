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
   BelongsToMany,
   HasMany,
   ForeignKey,
   BelongsTo,
} from "sequelize-typescript";
import { Ticket } from "./Ticket";
import { Comment } from "./Comment";
import { Group } from "./Group";
import { UserTicket } from "./UserTicket";
import { UserGroup } from "./UserGroup";

interface UserAttributes {
   id: number;
   firstName: string;
   lastName: string;
   email?: string;
   department?: string;
   phone?: string;
   pwd: string;
   salt: string;
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id" | "salt"> {}
export interface UserOutput extends Required<UserAttributes> {}

@Table
export class User
   extends Model<UserAttributes, UserInput>
   implements UserAttributes
{
   @AutoIncrement
   @PrimaryKey
   @Column(DataType.INTEGER)
   public id!: number;

   @Column(DataType.STRING)
   public firstName!: string;

   @Column(DataType.STRING)
   public lastName!: string;

   @Unique
   @Column(DataType.STRING)
   public email!: string;

   @Column(DataType.STRING)
   public department!: string;

   @Column(DataType.STRING)
   public phone!: string;

   @Column(DataType.STRING)
   public pwd!: string;

   @Column(DataType.STRING)
   public salt!: string;

   @HasMany(() => Ticket)
   public assignedTickets?: Ticket[];

   @HasMany(() => Ticket)
   public reportedTickets?: Ticket[];

   @HasMany(() => Ticket)
   public affectedTickets?: Ticket[];

   @HasMany(() => Comment)
   public comments!: Comment[];

   @BelongsToMany(() => Group, () => UserGroup)
   public groups?: Group[];

   @ForeignKey(() => UserGroup)
   public ownerId!: number;

   @HasMany(() => Group, "ownerId")
   public ownedGroups!: Group[];

   // timestamps!
   public readonly createdAt!: Date;

   public readonly updatedAt!: Date;

   public readonly deletedAt!: Date;
}
