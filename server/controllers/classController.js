const axios = require('axios');
const { Classroom } = require('../models/classroomModel');
const Teacher = require('../models/teacherModel');
const { getZoomAccessToken } = require('../helpers/zoomHelper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'nipun';

const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2'

const makeZoomApiRequest = async (method, path, data = {}, accessToken) => {
    const url = `${ZOOM_API_BASE_URL}${path}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    try {
        const response = await axios({ method, url, headers, data });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const scheduleClass = async (req, res) => {
    const { teacherEmail, studentEmails, classTime, agenda } = req.body;

    try {
        const accessToken = await getZoomAccessToken();
        const zoomMeeting = await makeZoomApiRequest('post', '/users/me/meetings', {
            topic: 'Class Meeting',
            type: 2,
            start_time: classTime,
            duration: 60,
        }, accessToken);

        const newClassroom = new Classroom({
            teacherEmail: teacherEmail,
            studentEmails: studentEmails.split(',').map(email => email.trim()),
            classTime: new Date(classTime),
            zoomMeetingId: zoomMeeting.id,
            agenda: agenda
        });

        newClassroom.save()
            .then((savedClassroom) => {
                res.status(201).json({ message: 'Class scheduled successfully', classroom: savedClassroom });
            })
    } catch (error) {
        res.status(500).json({ error: 'Failed to schedule class' });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const { email } = req.params;
        const classrooms = await Classroom.find({ teacherEmail: email }).sort({ createdAt: 'desc' }).exec();
        res.json({ classrooms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve classes' });
    }
};

const registerTeacher = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({ error: 'Teacher with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({ name, email, password: hashedPassword });
        await newTeacher.save();

        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register teacher' });
    }
};

const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, teacher.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: teacher.email, _id: teacher._id }, SECRET_KEY);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in teacher', message: error.message });
    }
};


module.exports = { registerTeacher, loginTeacher, scheduleClass, getAllClasses };
