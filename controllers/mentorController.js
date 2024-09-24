const Mentor = require('../models/mentorModel');
const Student = require('../models/studentModel');

// Create Mentor
exports.createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).json({ message: 'Mentor created', mentor });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create mentor' });
    }
};

// Get all students of a mentor
exports.getStudentsOfMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).populate('students');
        res.status(200).json(mentor.students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};
