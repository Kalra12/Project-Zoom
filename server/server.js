const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { scheduleClass, getAllClasses, registerTeacher, loginTeacher } = require('./controllers/classController');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/api/schedule-class', scheduleClass);
app.get('/api/classes/:email', getAllClasses);
app.post('/api/register-teacher', registerTeacher);
app.post('/api/login-teacher', loginTeacher);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
