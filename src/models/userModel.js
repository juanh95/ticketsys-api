export function initUserModel(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Department: {
      type: DataTypes.STRING,
    },
    Pass: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
  });

  return User;
}
