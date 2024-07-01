const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./public/main.js"), // Pastikan path ini mengarah ke file sumber kode utama
  output: {
    path: path.resolve(__dirname, "public"), // Lokasi folder output build
    filename: "bundle.js", // Nama file hasil build
  },
};
