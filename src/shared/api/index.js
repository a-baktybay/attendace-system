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
  }
}