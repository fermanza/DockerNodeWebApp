import logger from 'src/logger';

export default async (req, res, next) => {
  if (req.method.toLowerCase() === 'delete') {
    const { user: { email } = {}, body, originalUrl } = req;
    const userInfo = { email };
    logger.info('Deleted person: ', { userInfo, body, originalUrl });
  }
  
  next();
};
