const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    teacherEmail: {
        type: String,
        required: true,
    },
    studentEmails: {
        type: [String], // Array of strings
        required: true,
    },
    classTime: {
        type: Date,
        required: true,
    },
    zoomMeetingId: {
        type: String,
        required: true,
    },
    agenda: {
        type: String,
        required: true
    }
});


const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = { Classroom };
