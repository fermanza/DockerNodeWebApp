import config from 'config';
import { UserModel } from 'db';
import { sign } from 'utils/jwt';
import { hash } from 'utils/strings';

export const register = async (name, address, phone_number, email, password) => {
  const hashed = await hash(password);
  return await UserModel.create({
    roleId: config.roles.default,
    name,
    address,
    phone_number,
    email,
    password: hashed
  });
};

export const getUserJwt = (user) => {
  return sign({ id: user.id });
};
