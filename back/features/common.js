function waktu() {
  return new Date();
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

  if (elapsedDays > 0) {
    return `${elapsedDays} hari yang lalu`;
  } if (elapsedHours > 0) {
    return `${elapsedHours} jam yang lalu`;
  } if (elapsedMinutes > 0) {
    return `${elapsedMinutes} menit yang lalu`;
  }
  return `${elapsedSeconds} detik yang lalu`;
}

module.exports = { waktu, getTimeElapsedDescription };
