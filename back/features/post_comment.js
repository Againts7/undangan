/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */
async function submitForm(data) {
  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('Success', jsonResponse);
      alert(JSON.stringify(jsonResponse.message));
    } else {
      console.error('Error', response.statusText);
    }
  } catch (e) {
    console.error('err', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('buat-komen');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log('Event listener triggered'); // Debugging log

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.tanggal = tanggal();
    console.log('Form Data:', data); // Debugging log

    submitForm(data);
  });
});
