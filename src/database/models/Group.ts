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
import { UserGroup } from "./UserGroup";

interface GroupAttributes {
   id: number;
   name: string;
   description: string;
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date;
   ownerId: number;
}

export interface GroupInput
   extends Optional<GroupAttributes, "id" | "ownerId"> {}
export interface GroupOutput extends Required<GroupAttributes> {}

@Table
export class Group
   extends Model<GroupAttributes, GroupInput>
   implements GroupAttributes
{
   @AutoIncrement
   @PrimaryKey
   @Column(DataType.INTEGER)
   public id!: number;

   @Column(DataType.STRING)
   public name!: string;

   //TODO: Review to use the TINYTEXT type (if possible)
   @Column(DataType.TEXT)
   public description!: string;

   @BelongsToMany(() => User, () => UserGroup)
   public members?: User[];

   @ForeignKey(() => User)
   public ownerId!: number;

   @BelongsTo(() => User)
   public owner!: User;

   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
   public readonly deletedAt!: Date;
}
