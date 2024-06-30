/* global localStorage alert document */

const getToken = async () => {
  const response = await fetch('http://localhost:5000/getToken?key=', {
    method: 'GET',
  });
  const data = await response.json();
  alert(data);
  return data;
};

const login = async (userId) => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'applcation/json',
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return localStorage.getItem('token');
};

const fetchComment = async () => {
  const token =
    localStorage.getItem('token') !== 'null'
      ? localStorage.getItem('token')
      : login('aia');

  const response = await fetch('http://localhost:5500', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.text();
  console.log(data);
};

document.addEventListener('DOMContentLoaded', () => {
  const isLogin =
    localStorage.getItem('token')?.length > 0 &&
    localStorage.getItem('token') !== null;
  const token = isLogin ? localStorage.getItem('token') : login();
});
