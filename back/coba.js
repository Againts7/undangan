const fs = require('fs');

const readFile = (path, encoding) => new Promise((resolve, reject) => {
  fs.readFile(path, encoding, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

(async function tes() {
  try {
    const a = await readFile('../assets/data/data.json', 'utf8');
    console.log(a);
  } catch (e) {
    console.log(e);
  }
}());
