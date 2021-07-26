import { errorHandler } from 'src/exception';

import persons from './persons';

const router = (app) => {
  app.get('/', (req, res) => res.send('NodeWebApp - API'));
  app.use('/persons', persons);
  
  app.use((req, res, next) => {
    res.status(404).send('Not found');
  });

  app.use(errorHandler);
}

export default router;
