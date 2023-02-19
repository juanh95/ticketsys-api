import { Table, Column, Model, DataType } from "sequelize-typescript";

interface UserAttributes {
  id?: number;
  FirstName: string;
  LastName: string;
  Email?: string;
  Department?: string;
  Phone?: string;
  Pass: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;

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
  public Pass!: string;

  // timestamps!

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}
