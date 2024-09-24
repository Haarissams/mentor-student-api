const Mentor = require('../models/mentorModel');
const Student = require('../models/studentModel');

// Create Student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: 'Student created', student });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
};

// Assign/Change Mentor to a student
exports.assignMentor = async (req, res) => {
    const { studentId, mentorId } = req.body;
    try {
        const student = await Student.findById(studentId);
        const newMentor = await Mentor.findById(mentorId);

        if (student.mentor) {
            student.previousMentors.push(student.mentor);
        }
        student.mentor = newMentor._id;
        await student.save();

        // Add student to the mentor's list
        newMentor.students.push(student._id);
        await newMentor.save();

        res.status(200).json({ message: 'Mentor assigned', student });
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign mentor' });
    }
};

// Get previously assigned mentors for a student
exports.getPreviousMentors = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('previousMentors');
        res.status(200).json(student.previousMentors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch previous mentors' });
    }
};
