import config from 'config';
import { UserModel, RoleModel } from 'db';
import { register, getUserJwt } from 'src/repositories/users';
import { compare, hash } from 'utils/strings';
import { validate } from 'utils/validation';

export const personsController = {

  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(422).json({ message: 'email is incorrect' });
    }
    const match = await compare(password, user.password);
    if (!match) {
      return res.status(422).json({ message: 'password is incorrect' });
    }
    const token = await getUserJwt(user);
    res.json({ message: 'login success', token, user });
  },

  async index(req, res) {
    const users = await UserModel.findAll({ include: [
      { association: 'role' },
    ]});
    res.json({ users });
  },

  async getPerson(req, res) {
    const { name, email, address, phone_number, id } = req.body;
    let user;
    if(name !== undefined) {
      user = await UserModel.findOne({ where: { name } });
    } else if (email !== undefined) {
      user = await UserModel.findOne({ where: { email } });
    } else if (address !== undefined) {
      user = await UserModel.findOne({ where: { address } });
    } else if (phone_number !== undefined) {
      user = await UserModel.findOne({ where: { phone_number } });
    } else {
      user = await UserModel.findOne({ where: { id } });
    }

    res.json({ user });
  },

  async delete(req, res) {
    const id = parseInt(req.params.id);
    await UserModel.destroy({ where: { id } });
    res.json({ status: 'Person Deleted' });
  },

  async update(req, res) {
    const id = parseInt(req.params.id);

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await UserModel.update(req.body,{ where: { id }});

    res.json({ status: 'Person Updated' });
  },

  async register(req, res) {
    const { roleId, name, address, phone_number, email, password, passwordConfirmation } = req.body;

    await validate({ roleId, name, address, phone_number, email, password }, {
      roleId: 'required|number',
      name: 'required|string',
      address: 'required|string',
      phone_number: 'required|string',
      email: 'required|email',
      password: 'required|string',
    });

    const role = await RoleModel.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    let user = await UserModel.findOne({ where: { email } });

    if (user) {
      return res.status(422).json({ message: 'User already exists' });
    }

    if (password !== passwordConfirmation) {
      return res.status(422).json({ message: 'Passwords must match' });
    }

    user = await UserModel.create({
      name,
      roleId,
      address,
      phone_number,
      email,
      password: await hash(password)
    });

    res.json({ user });
  },

  async persons(req, res) {
    const users = await UserModel.findAll({ include: [
      { association: 'role' }
    ]});

    res.json({ users });
  },

  async roles(req, res) {
    const roles = await RoleModel.findAll({});

    res.json({ roles });
  },
};
