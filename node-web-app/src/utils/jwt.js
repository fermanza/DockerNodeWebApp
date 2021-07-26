import jwt from 'jsonwebtoken';

import config from 'config';

export const sign = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, config.appKey, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.appKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
