import {
   Table,
   Column,
   Model,
   DataType,
   ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
import { Group } from "./Group";

interface UserGroupAttributes {
   userId: number;
   groupId: number;
}

@Table({ tableName: "user_group", underscored: true })
export class UserGroup
   extends Model<UserGroupAttributes>
   implements UserGroupAttributes
{
   @ForeignKey(() => User)
   @Column(DataType.INTEGER)
   userId!: number;

   @ForeignKey(() => Group)
   @Column(DataType.INTEGER)
   groupId!: number;
}
