import axios from 'axios';
import dayjs from 'dayjs';

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
    changeAttendance: (studentId, token, body) => {
      return ax.post(`api/student/${studentId}/attendance/take`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  },
  teacher: {
    getSchedule: (id, token) => {
      return ax.get(`api/teacher/${id}/schedule`,
      {
       headers: {
        'Authorization': `Bearer ${token}`
        }
      });
    },
    getStudents: (id, studentID, token) => {
      return ax.get(`api/teacher/${id}/students/search?studentId=${studentID}`,
      {
       headers: {
        'Authorization': `Bearer ${token}`
        }
      }); 
    },
    takeAttendance: (id, body, token) => {
      return ax.put(`api/teacher/${id}/students/attendance/take`, body,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } 
  },
  putAttendance(id) {
    const almatyTime = dayjs(new Date()).toISOString();
    const date = new Date(almatyTime).toISOString().split('.')[0];
    const arr = date.split('T');
    const time = date.split('T')[1].split(':');
    const dateWithTimezone = `${arr[0]}T${Number(time[0]) + 6}:${time[1]}:${time[2]}`;

    return ax.post(`attendance/take?studentId=${id}&time=${dateWithTimezone}`);
  }
}