const fs = require('fs').promises;

async function getComment(req, res) {
  const filePath = './data/data.json';
  console.log('aaa');

  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    return res.status(200).json({
      status: 'success',
      data: { data },
    });
  } catch (err) {
    return res
      .status(500)
      .response({ status: 'fail', message: 'Failed to read file' });
  }
}

async function postComment(req, res) {
  const jsonData = req.body;
  console.log('Form data received', jsonData);

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

    data.push(jsonData);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return res.status(201).json({ message: 'Komentar berhasil ditambahkan' });
  } catch (e) {
    console.error('Failed to write data: ', e);
    return res.status(500).json({ error: 'Error saving form data' });
  }
}

async function deleteComment(req, res) {
  console.log('hapus');
  const { userId } = req.body;
  console.log(userId);
  const filePath = './data/data.json';
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const findIndex = data.findIndex((d) => d.userId === userId);
    if (findIndex !== -1) {
      data.splice(findIndex, 1);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return res.status(200).json({ message: 'Komentar berhasil dihapus' });
    }
    return res.status(500).json({ message: 'Komentar tidak ditemukan' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'ada kesalahan internal server' });
  }
}

module.exports = { getComment, postComment, deleteComment };
