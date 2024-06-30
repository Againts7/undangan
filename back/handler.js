/* eslint-disable no-console */
const fs = require('fs').promises;

async function postComment(request, h) {
  const { payload } = request;
  console.log('Form data received', payload);

  const filePath = './data/data.json';
  try {
    let data = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
      // If file does not exist, continue with an empty array
    }

    data.push(payload);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return { message: 'Komentar berhasil ditambahkan' };
  } catch (e) {
    console.error('Failed to write data: ', e);
    return h.response({ error: 'Error saving form data' }).code(500);
  }
}

async function getComment(request, h) {
  const filePath = './data/data.json';
  console.log('aaa');

  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    return h
      .response({
        status: 'success',
        data: { data },
      })
      .code(200);
  } catch (err) {
    return h
      .response({ status: 'fail', message: 'Failed to read file' })
      .code(500);
  }
}

async function deleteComment(request, h) {
  console.log('hapus');
  const { userId } = request.payload;
  console.log(userId);
  const filePath = './data/data.json';
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const findIndex = data.findIndex((d) => d.userId === userId);
    if (findIndex !== -1) {
      data.splice(findIndex, 1);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return h.response({ message: 'Komentar berhasil dihapus' }).code(200);
    }
    return h.response({ message: 'Komentar tidak ditemukan' }).code(500);
  } catch (e) {
    console.log(e);
    return h.response({ message: 'ada kesalahan internal server' }).code(500);
  }
}

module.exports = { postComment, getComment, deleteComment };
