const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/init', (req, res) => {
    res.json({ message: 'API Initialized!' });
});

router.get('/persons', catchErrors(personController.getPersons));
router.get('/persons/:id', catchErrors(personController.getPerson));
router.put('/persons/:id', catchErrors(personController.editPerson));
router.post('/persons', catchErrors(personController.createPerson));
router.delete('/persons/:id', catchErrors(personController.deletePerson));


module.exports = router;
