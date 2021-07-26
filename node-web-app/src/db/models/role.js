export default (sequelize, type) => {
  const Role = sequelize.define('role',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: type.STRING,
        unique: true,
      },
    }
  );

  Role.associate = function(models) {
    models.Role.hasMany(models.User, { as: 'users' });
  };

  return Role;
};
