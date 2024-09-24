const express = require('express');
const { createMentor, getStudentsOfMentor } = require('../controllers/mentorController');

const router = express.Router();

router.post('/', createMentor);
router.get('/:id/students', getStudentsOfMentor);

module.exports = router;
