import bcrypt from 'bcrypt';
import path from 'path';

import config from 'config';

const saltRounds = 10;

export const hash = (string) => {
  return bcrypt.hash(string, saltRounds);
};

export const compare = (string, hash) => {
  return bcrypt.compare(string, hash);
};

export const getLogoPath = () => {
  return path.join(config.basePath, 'public', 'logo.png');
};
