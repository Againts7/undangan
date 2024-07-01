/* global sessionStorage document window localStorage */
const { nanoid } = require('nanoid');

const refreshComment = new CustomEvent('refresh-comment');

function makeCommentSplashEvent(condition, txt) {
  const container = document.getElementById('komen-info');

  const wrapper = document.createElement('div');
  wrapper.classList.add('alert', 'd-flex', 'align-items-center');
  wrapper.setAttribute('role', 'alert');
  wrapper.setAttribute('id', 'komen-info-type');

  const text = document.createElement('div');
  text.setAttribute('id', 'komen-info-text');
  const i = document.createElement('i');
  if (condition === 'success') {
    i.innerText = ` ${txt}`;
    i.classList.add('bi', 'bi-check-lg');
    wrapper.classList.add('alert-success');
    text.prepend(i);

    wrapper.append(text);

    container.append(wrapper);

    container.style.display = 'block';
    wrapper.classList.add('fade-in-out');
  } else {
    i.innerText = ` ${txt}`;
    i.classList.add('bi', 'bi-exclamation-triangle-fill');
    text.prepend(i);
    wrapper.classList.add('alert-danger');
    wrapper.append(text);

    container.style.display = 'block';
    wrapper.classList.add('fade-in-out');

    container.append(wrapper);
  }
  setTimeout(() => {
    wrapper.remove();
  }, 2000);
}

async function hapusKomen(userId) {
  console.log('hapus 1');
  const response = await fetch('/komen', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  const res = await response.json();
  if (!response.ok) {
    makeCommentSplashEvent('fail', res.message);
    throw new Error('ada salah');
  }
  sessionStorage.removeItem('submitKomen');
  document.dispatchEvent(refreshComment);
  makeCommentSplashEvent('success', res.message);
}

function getTimeElapsedDescription(startTime) {
  // Konversi startTime ke objek Date jika bukan objek Date
  let time = startTime;
  if (!(startTime instanceof Date)) {
    time = new Date(startTime);
  }

  const now = new Date();
  const elapsedMilliseconds = now - time;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays === 1) return 'Kemarin';
  if (elapsedDays > 1) {
    return `${time.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}`;
  }
  if (elapsedHours > 0) {
    return `${elapsedHours} jam yang lalu`;
  }
  if (elapsedMinutes > 0) {
    return `${elapsedMinutes} menit yang lalu`;
  }
  return `${elapsedSeconds} detik yang lalu`;
}

function makeCommentElement(data) {
  data.reverse();

  const wrapper = document.createElement('div');

  const localId = localStorage.getItem('userId');

  data.forEach((elemen) => {
    // eslint-disable-next-line object-curly-newline
    const { nama, komentar, tanggal, userId } = elemen;

    const container = document.createElement('div');
    container.classList.add('container', 'px-3', 'py-1', 'my-2');
    container.setAttribute('id', `${userId}`);

    const namaTanggalRow = document.createElement('div');
    namaTanggalRow.classList.add('row', 'align-items-center', 'p-1');

    const contNama = document.createElement('div');
    contNama.classList.add('col-auto', 'nama');
    contNama.innerHTML = `<span><i class="bi bi-person-circle"></i></span> ${nama}`;

    const contTgl = document.createElement('div');
    contTgl.classList.add('col-auto', 'tanggal');
    contTgl.innerHTML = `<span><i class="bi bi-clock-history"></i></span> ${getTimeElapsedDescription(
      tanggal,
    )}`;

    namaTanggalRow.append(contNama, contTgl);

    if (localId === userId) {
      const contHapus = document.createElement('div');
      contHapus.classList.add('col-auto', 'ms-auto');
      const button = document.createElement('button');
      button.innerText = 'Hapus';
      button.classList.add('btn', 'btn-danger');

      contHapus.append(button);

      namaTanggalRow.append(contHapus);

      button.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const y = document.createElement('button');
        y.classList.add('btn', 'btn-danger');
        y.innerText = 'Ya';
        y.addEventListener('click', () => {
          hapusKomen(userId);
          document.dispatchEvent(refreshComment);
        });

        const b = document.createElement('button');
        b.classList.add('btn', 'btn-success');
        b.innerText = 'Batal';
        b.addEventListener('click', () => {
          contHapus.innerHTML = '';
          contHapus.append(button);
        });
        contHapus.innerHTML = '';
        contHapus.append(y, b);
      });
    }

    const komenRow = document.createElement('div');
    komenRow.classList.add('row');
    const komenInner = document.createElement('div');
    komenInner.classList.add('col', 'komentar', 'py-1');
    komenInner.innerText = komentar;

    komenRow.append(komenInner);

    container.append(namaTanggalRow, komenRow);

    wrapper.append(container);
  });
  return wrapper;
}

async function getComment() {
  await fetch('/komen')
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const {
        // status,
        data: { data },
        message,
      } = response;
      const dataContainer = document.getElementById('komen-container');
      const outer = document.getElementById('komen-outer');

      if (data) {
        dataContainer.innerHTML = '';

        console.log(outer.children.length);

        if (outer.children.length === 1) {
          const h4 = document.createElement('h4');
          h4.innerText = "Terima kasih atas segala ucapan  & do'a kalian";

          const len = document.createElement('p');
          len.classList.add('text-center');
          len.innerText = `${data.length} ucapan telah diberikan!`;

          outer.prepend(h4, len);
        }

        const commentElement = makeCommentElement(data);

        dataContainer.append(commentElement);
      } else {
        dataContainer.innerText = message;
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      const dataContainer = document.getElementById('komen-container');
      dataContainer.textContent = 'Gagal mengambil data. Coba lagi nanti.';
    });
}

async function submitForm(data) {
  try {
    if (sessionStorage.getItem('submitKomen')) {
      document
        .querySelector(`#${localStorage.getItem('userId')}`)
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
      document
        .querySelector(`#${localStorage.getItem('userId')}`)
        .classList.add('kelip');
      setTimeout(() => {
        document
          .querySelector(`#${localStorage.getItem('userId')}`)
          .classList.remove('kelip');
      }, 2000);
      throw new Error(
        'Hanya bisa memberikan ucapan satu kali!\nAnda bisa menghapus dan mengirim lagi',
      );
    }
    sessionStorage.setItem('submitKomen', 'true');
    const response = await fetch('/komen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      makeCommentSplashEvent('success', jsonResponse.message);

      document.dispatchEvent(refreshComment);
    } else {
      console.error('Error', response.statusText);
    }
  } catch (e) {
    makeCommentSplashEvent('fail', e.message);
    console.error('err', e);
  }
}

window.onload = () => {
  document.addEventListener('refresh-comment', (e) => {
    e.preventDefault();
    getComment();
  });

  document.dispatchEvent(refreshComment);

  const form = document.getElementById('buat-komen');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const userId = localStorage.getItem('userId');

    data.tanggal = new Date();
    data.userId = userId || nanoid(10);

    if (!userId) {
      localStorage.setItem('userId', data.userId);
    }

    submitForm(data);
  });
};
