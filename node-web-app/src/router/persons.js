import express from 'express';

import { personsController } from 'src/controllers';
import { toAsyncRouter } from 'utils/router';

const router = toAsyncRouter(express.Router());

router.post('/register', personsController.register);
router.post('/person', personsController.getPerson);
router.put('/update/:id', personsController.update);
router.get('/', personsController.persons);
router.delete('/delete/:id', personsController.delete);

export default router;
