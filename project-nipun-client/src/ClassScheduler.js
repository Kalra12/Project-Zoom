

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from './AuthContext';
import { isValidEmail } from './Utils';

const ClassScheduler = () => {
  const [teacherEmail, setTeacherEmail] = useState('');
  const [studentEmails, setStudentEmails] = useState('');
  const [classTime, setClassTime] = useState(new Date());
  const [agenda, setAgenda] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const { isAuthenticated, userEmail } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:4000/api/classes/${userEmail}`)
        .then((response) => response.json())
        .then((data) => setClassrooms(data.classrooms || []))
        .catch((error) => console.error('Error fetching classes:', error));
    }
  }, [isAuthenticated, userEmail]);



  const handleScheduleClass = () => {
    if (!isValidEmail(teacherEmail)) {
      alert('Invalid email address');
      return;
    }
    fetch('http://localhost:4000/api/schedule-class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teacherEmail, studentEmails, classTime, agenda }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClassrooms((prevClassrooms) => [...prevClassrooms, data.classroom || []]);
      })
      .catch((error) => console.error('Error scheduling class:', error));
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#007BFF', textAlign: 'center' }}>Class Scheduler</h1>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>Email of the Teacher:</label>
        <input
          type="text"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>Emails of the Students:</label>
        <input
          type="text"
          value={studentEmails}
          onChange={(e) => setStudentEmails(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>Agenda:</label>
        <input
          type="text"
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>Class Time:</label>
        <DatePicker
          selected={classTime}
          onChange={(date) => setClassTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button
        onClick={handleScheduleClass}
        style={{
          backgroundColor: '#28A745',
          color: '#fff',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
        }}
      >
        Schedule Class
      </button>

      <h2 style={{ color: '#007BFF', marginTop: '20px', textAlign: 'center' }}>Scheduled Classes</h2>
      <ul style={{ padding: 0, listStyleType: 'none' }}>
        {classrooms.map((classroom, index) => (
          <li
            key={index}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '10px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <strong>Teacher:</strong> {classroom.teacherEmail || 'N/A'},{' '}
              <strong>Students:</strong> {classroom.studentEmails || 'N/A'}
            </div>
            <div>
              <strong>Time:</strong> {classroom.classTime || 'N/A'}
            </div>
            <div>
              <strong>Meeting ID:</strong> {classroom.zoomMeetingId || 'N/A'}
            </div>
            <div>
              <strong>Agenda:</strong> {classroom.agenda || 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassScheduler;
