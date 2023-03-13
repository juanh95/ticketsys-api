import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
  AutoIncrement,
} from "sequelize-typescript";
import { Token } from "./Token";

interface UserAttributes {
  id?: number;
  FirstName: string;
  LastName: string;
  Email?: string;
  Department?: string;
  Phone?: string;
  Hash: string;
  Salt: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User extends Model<UserAttributes> implements UserAttributes {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.STRING)
  public FirstName!: string;

  @Column(DataType.STRING)
  public LastName!: string;

  @Column(DataType.STRING)
  public Email!: string;

  @Column(DataType.STRING)
  public Department!: string;

  @Column(DataType.STRING)
  public Phone!: string;

  @Column(DataType.STRING)
  public Hash!: string;

  @Column(DataType.STRING)
  public Salt!: string;

  // @HasOne(() => Token)
  // public token!: Token;

  // timestamps!

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}
