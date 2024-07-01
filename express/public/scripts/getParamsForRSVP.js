/* global document window */

const urlParms = new URLSearchParams(window.location.search);
const nama = urlParms.get('n') || '';
const pronoun = urlParms.get('p') || 'Bapak/Ibu/Saudara/i';
const namaContainer = document.querySelector('.hero h4 span');

namaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ',');

document.getElementById('nama').value = nama;
document.getElementById('Nama').value = nama;
