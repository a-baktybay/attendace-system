import axios from 'axios';

const origin = window.location

const ax = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Origin': origin,
    'Content-Type': 'application/json',
    'Access-Control-Request-Method': '*'
  }
});

export const pfm =  {
  auth: (login, password) => {
    return ax.post('api/auth/login',{
      userId: login,
      password
    });
  },
  admin: {
    getStudents: (course, token) => {
      return ax.get(`api/admin/${course}/students`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    changeAttendance(studentId, timeId, value, token) {
      return ax.put(`api/admin/${studentId}/attendances/${timeId}/change/${value}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  },
  student: {
    getSchedule: (studentId, token) => {
      return ax.get(`api/student/${studentId}/subjects`,
      {
       headers: {
        'Authorization': `Bearer ${token}`
        }
      });
    },
    getListOfAttendanceByCourse: (studentID, token) => {
      return ax.get(`api/student/${studentID}/subjects/attendance`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    changeAttendance: (studentId, token) => {
      return ax.put(`api/student/${studentId}/attendance/take`, {
        time: "2023-03-31T14:10:00",
        isAttendance: true, 
        studentId: "200107004",
        courseCode: "MDE152.1",
        putedById: "200107004",
        putedByRole: "STUDENT",
        attendanceType: "CARD"
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  }
}