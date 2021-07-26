import jwt from 'jsonwebtoken';

import { UserModel } from 'db';
import { verify } from 'utils/jwt';

export default async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  
  let decoded;

  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    decoded = await verify(token);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const user = await UserModel.findByPk(decoded.id);

  if (!user) {
    return res.status(401).json({ message: 'JWT User not found' });
  }
    
  req.user = user;
  
  next();
};
