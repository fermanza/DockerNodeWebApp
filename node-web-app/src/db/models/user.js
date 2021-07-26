export default (sequelize, type) => {
  const User = sequelize.define('user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      address: type.STRING,
      phone_number: type.STRING,
      email: type.STRING,
      password: type.STRING,
      roleId: {
        type: type.INTEGER,
        references: {
          model: 'Role',
          key: 'id'
        }
      },
    }
  );
  
  User.associate = function(models) {
    models.User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
  };

  return User;
};
