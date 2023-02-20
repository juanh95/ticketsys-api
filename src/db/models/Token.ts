import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

interface TokenAttributes {
  id?: number;
  userId?: number;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table
export class Token extends Model<TokenAttributes> implements TokenAttributes {
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id?: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @Column(DataType.STRING)
  public token?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
