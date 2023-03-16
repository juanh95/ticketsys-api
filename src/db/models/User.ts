import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
  AutoIncrement,
} from "sequelize-typescript";

interface UserAttributes {
  id?: number;
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

  // @HasOne(() => Token)
  // public token!: Token;

  // timestamps!

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}
