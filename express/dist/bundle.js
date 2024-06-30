/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_audio_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/audio-lock */ \"./src/scripts/audio-lock.js\");\n/* harmony import */ var _scripts_audio_lock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_audio_lock__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_commentHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/commentHandler */ \"./src/scripts/commentHandler.js\");\n/* harmony import */ var _scripts_commentHandler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_commentHandler__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_getParamsForRSVP__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/getParamsForRSVP */ \"./src/scripts/getParamsForRSVP.js\");\n/* harmony import */ var _scripts_getParamsForRSVP__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_getParamsForRSVP__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _scripts_observer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/observer */ \"./src/scripts/observer.js\");\n/* harmony import */ var _scripts_observer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_observer__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\n//# sourceURL=webpack://express/./src/main.js?");

/***/ }),

/***/ "./src/scripts/audio-lock.js":
/*!***********************************!*\
  !*** ./src/scripts/audio-lock.js ***!
  \***********************************/
/***/ ((module) => {

eval("/* global document window sessionStorage */\n\nconst root = document.querySelector(':root');\nconst audioIconWrapper = document.querySelector('.audio-icon-wrapper');\nconst audioIcon = document.querySelector('.audio-icon-wrapper i');\nconst song = document.querySelector('#song');\n\nfunction disableScroll() {\n  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;\n\n  window.onscroll = function () {\n    window.scrollTo(scrollTop, scrollLeft);\n  };\n  root.style.scrollBehavior = 'auto';\n}\n\nfunction playAudio() {\n  song.volume = 0.1;\n  song.play();\n  audioIconWrapper.style.display = 'flex';\n}\n\nfunction enableScroll() {\n  window.onscroll = function () {};\n  root.style.scrollBehavior = 'smooth';\n\n  playAudio();\n}\n\nconst submitKomen = sessionStorage.getItem('submitKomen');\nif (submitKomen === 'null') disableScroll();\n\naudioIconWrapper.onclick = function () {\n  if (song.paused) {\n    song.play();\n    audioIcon.classList.remove('bi-pause-circle');\n    audioIcon.classList.add('bi-disc');\n  } else {\n    song.pause();\n    audioIcon.classList.remove('bi-disc');\n    audioIcon.classList.add('bi-pause-circle');\n  }\n};\n\nmodule.exports = { enableScroll };\n\n\n//# sourceURL=webpack://express/./src/scripts/audio-lock.js?");

/***/ }),

/***/ "./src/scripts/commentHandler.js":
/*!***************************************!*\
  !*** ./src/scripts/commentHandler.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* global sessionStorage document window localStorage */\nconst { nanoid } = __webpack_require__(/*! nanoid */ \"./node_modules/nanoid/index.browser.js\");\n\nconst refreshComment = new CustomEvent('refresh-comment');\n\nfunction makeCommentSplashEvent(condition, txt) {\n  const container = document.getElementById('komen-info');\n\n  const wrapper = document.createElement('div');\n  wrapper.classList.add('alert', 'd-flex', 'align-items-center');\n  wrapper.setAttribute('role', 'alert');\n  wrapper.setAttribute('id', 'komen-info-type');\n\n  const text = document.createElement('div');\n  text.setAttribute('id', 'komen-info-text');\n  const i = document.createElement('i');\n  if (condition === 'success') {\n    i.innerText = ` ${txt}`;\n    i.classList.add('bi', 'bi-check-lg');\n    wrapper.classList.add('alert-success');\n    text.prepend(i);\n\n    wrapper.append(text);\n\n    container.append(wrapper);\n\n    container.style.display = 'block';\n    wrapper.classList.add('fade-in-out');\n  } else {\n    i.innerText = ` ${txt}`;\n    i.classList.add('bi', 'bi-exclamation-triangle-fill');\n    text.prepend(i);\n    wrapper.classList.add('alert-danger');\n    wrapper.append(text);\n\n    container.style.display = 'block';\n    wrapper.classList.add('fade-in-out');\n\n    container.append(wrapper);\n  }\n  setTimeout(() => {\n    wrapper.remove();\n  }, 2000);\n}\n\nasync function hapusKomen(userId) {\n  console.log('hapus 1');\n  const response = await fetch('/komen', {\n    method: 'DELETE',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ userId }),\n  });\n  const res = await response.json();\n  if (!response.ok) {\n    makeCommentSplashEvent('fail', res.message);\n    throw new Error('ada salah');\n  }\n  sessionStorage.removeItem('submitKomen');\n  document.dispatchEvent(refreshComment);\n  makeCommentSplashEvent('success', res.message);\n}\n\nfunction getTimeElapsedDescription(startTime) {\n  // Konversi startTime ke objek Date jika bukan objek Date\n  let time = startTime;\n  if (!(startTime instanceof Date)) {\n    time = new Date(startTime);\n  }\n\n  const now = new Date();\n  const elapsedMilliseconds = now - time;\n  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);\n  const elapsedMinutes = Math.floor(elapsedSeconds / 60);\n  const elapsedHours = Math.floor(elapsedMinutes / 60);\n  const elapsedDays = Math.floor(elapsedHours / 24);\n\n  if (elapsedDays === 1) return 'Kemarin';\n  if (elapsedDays > 1) {\n    return `${time.toLocaleDateString('id-ID', {\n      weekday: 'long',\n      day: '2-digit',\n      month: '2-digit',\n      year: 'numeric',\n    })}`;\n  }\n  if (elapsedHours > 0) {\n    return `${elapsedHours} jam yang lalu`;\n  }\n  if (elapsedMinutes > 0) {\n    return `${elapsedMinutes} menit yang lalu`;\n  }\n  return `${elapsedSeconds} detik yang lalu`;\n}\n\nfunction makeCommentElement(data) {\n  data.reverse();\n\n  const wrapper = document.createElement('div');\n\n  const localId = localStorage.getItem('userId');\n\n  data.forEach((elemen) => {\n    // eslint-disable-next-line object-curly-newline\n    const { nama, komentar, tanggal, userId } = elemen;\n\n    const container = document.createElement('div');\n    container.classList.add('container', 'px-3', 'py-1', 'my-2');\n    container.setAttribute('id', `${userId}`);\n\n    const namaTanggalRow = document.createElement('div');\n    namaTanggalRow.classList.add('row', 'align-items-center', 'p-1');\n\n    const contNama = document.createElement('div');\n    contNama.classList.add('col-auto', 'nama');\n    contNama.innerHTML = `<span><i class=\"bi bi-person-circle\"></i></span> ${nama}`;\n\n    const contTgl = document.createElement('div');\n    contTgl.classList.add('col-auto', 'tanggal');\n    contTgl.innerHTML = `<span><i class=\"bi bi-clock-history\"></i></span> ${getTimeElapsedDescription(\n      tanggal,\n    )}`;\n\n    namaTanggalRow.append(contNama, contTgl);\n\n    if (localId === userId) {\n      const contHapus = document.createElement('div');\n      contHapus.classList.add('col-auto', 'ms-auto');\n      const button = document.createElement('button');\n      button.innerText = 'Hapus';\n      button.classList.add('btn', 'btn-danger');\n\n      contHapus.append(button);\n\n      namaTanggalRow.append(contHapus);\n\n      button.addEventListener('click', async (ev) => {\n        ev.preventDefault();\n        const y = document.createElement('button');\n        y.classList.add('btn', 'btn-danger');\n        y.innerText = 'Ya';\n        y.addEventListener('click', () => {\n          hapusKomen(userId);\n          document.dispatchEvent(refreshComment);\n        });\n\n        const b = document.createElement('button');\n        b.classList.add('btn', 'btn-success');\n        b.innerText = 'Batal';\n        b.addEventListener('click', () => {\n          contHapus.innerHTML = '';\n          contHapus.append(button);\n        });\n        contHapus.innerHTML = '';\n        contHapus.append(y, b);\n      });\n    }\n\n    const komenRow = document.createElement('div');\n    komenRow.classList.add('row');\n    const komenInner = document.createElement('div');\n    komenInner.classList.add('col', 'komentar', 'py-1');\n    komenInner.innerText = komentar;\n\n    komenRow.append(komenInner);\n\n    container.append(namaTanggalRow, komenRow);\n\n    wrapper.append(container);\n  });\n  return wrapper;\n}\n\nasync function getComment() {\n  await fetch('/komen')\n    .then((response) => response.json())\n    .then((response) => {\n      console.log(response);\n      const {\n        // status,\n        data: { data },\n        message,\n      } = response;\n      const dataContainer = document.getElementById('komen-container');\n      const outer = document.getElementById('komen-outer');\n\n      if (data) {\n        dataContainer.innerHTML = '';\n\n        console.log(outer.children.length);\n\n        if (outer.children.length === 1) {\n          const h4 = document.createElement('h4');\n          h4.innerText = \"Terima kasih atas segala ucapan  & do'a kalian\";\n\n          const len = document.createElement('p');\n          len.classList.add('text-center');\n          len.innerText = `${data.length} ucapan telah diberikan!`;\n\n          outer.prepend(h4, len);\n        }\n\n        const commentElement = makeCommentElement(data);\n\n        dataContainer.append(commentElement);\n      } else {\n        dataContainer.innerText = message;\n      }\n    })\n    .catch((error) => {\n      console.error('Error fetching data:', error);\n      const dataContainer = document.getElementById('komen-container');\n      dataContainer.textContent = 'Gagal mengambil data. Coba lagi nanti.';\n    });\n}\n\nasync function submitForm(data) {\n  try {\n    if (sessionStorage.getItem('submitKomen')) {\n      document\n        .querySelector(`#${localStorage.getItem('userId')}`)\n        .scrollIntoView({ behavior: 'smooth', block: 'center' });\n      document\n        .querySelector(`#${localStorage.getItem('userId')}`)\n        .classList.add('kelip');\n      setTimeout(() => {\n        document\n          .querySelector(`#${localStorage.getItem('userId')}`)\n          .classList.remove('kelip');\n      }, 2000);\n      throw new Error(\n        'Hanya bisa memberikan ucapan satu kali!\\nAnda bisa menghapus dan mengirim lagi',\n      );\n    }\n    sessionStorage.setItem('submitKomen', 'true');\n    const response = await fetch('/komen', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(data),\n    });\n\n    if (response.ok) {\n      const jsonResponse = await response.json();\n      makeCommentSplashEvent('success', jsonResponse.message);\n\n      document.dispatchEvent(refreshComment);\n    } else {\n      console.error('Error', response.statusText);\n    }\n  } catch (e) {\n    makeCommentSplashEvent('fail', e.message);\n    console.error('err', e);\n  }\n}\n\nwindow.onload = () => {\n  document.addEventListener('refresh-comment', (e) => {\n    e.preventDefault();\n    getComment();\n  });\n\n  document.dispatchEvent(refreshComment);\n\n  const form = document.getElementById('buat-komen');\n\n  form.addEventListener('submit', (ev) => {\n    ev.preventDefault();\n    const formData = new FormData(form);\n\n    const data = {};\n    formData.forEach((value, key) => {\n      data[key] = value;\n    });\n\n    const userId = localStorage.getItem('userId');\n\n    data.tanggal = new Date();\n    data.userId = userId || nanoid(10);\n\n    if (!userId) {\n      localStorage.setItem('userId', data.userId);\n    }\n\n    submitForm(data);\n  });\n};\n\n\n//# sourceURL=webpack://express/./src/scripts/commentHandler.js?");

/***/ }),

/***/ "./src/scripts/getParamsForRSVP.js":
/*!*****************************************!*\
  !*** ./src/scripts/getParamsForRSVP.js ***!
  \*****************************************/
/***/ (() => {

eval("/* global document window */\n\nconst urlParms = new URLSearchParams(window.location.search);\nconst nama = urlParms.get('n') || '';\nconst pronoun = urlParms.get('p') || 'Bapak/Ibu/Saudara/i';\nconst namaContainer = document.querySelector('.hero h4 span');\n\nnamaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ',');\n\ndocument.getElementById('nama').value = nama;\ndocument.getElementById('Nama').value = nama;\n\n\n//# sourceURL=webpack://express/./src/scripts/getParamsForRSVP.js?");

/***/ }),

/***/ "./src/scripts/observer.js":
/*!*********************************!*\
  !*** ./src/scripts/observer.js ***!
  \*********************************/
/***/ (() => {

eval("/* global document IntersectionObserver */\n\n// Callback function to execute when entries change\nconst callback = (entries, observer) => {\n  entries.forEach((entry) => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('active');\n    } else {\n      entry.target.classList.remove('active');\n    }\n  });\n};\n\n// Options for the observer (which parts of the element to observe)\nconst options = {\n  root: null, // Use the viewport as the root\n  rootMargin: '0px',\n  threshold: 0.25, // Trigger when 100% of the element is in view\n};\n\n// Create an observer instance\nconst observer = new IntersectionObserver(callback, options);\n\n// Target the element to be observed\nconst targets = document.querySelectorAll('.animation');\ntargets.forEach((target) => observer.observe(target));\n\n\n//# sourceURL=webpack://express/./src/scripts/observer.js?");

/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   customAlphabet: () => (/* binding */ customAlphabet),\n/* harmony export */   customRandom: () => (/* binding */ customRandom),\n/* harmony export */   nanoid: () => (/* binding */ nanoid),\n/* harmony export */   random: () => (/* binding */ random),\n/* harmony export */   urlAlphabet: () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)\n/* harmony export */ });\n/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ \"./node_modules/nanoid/url-alphabet/index.js\");\n\nlet random = bytes => crypto.getRandomValues(new Uint8Array(bytes))\nlet customRandom = (alphabet, defaultSize, getRandom) => {\n  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1\n  let step = -~((1.6 * mask * defaultSize) / alphabet.length)\n  return (size = defaultSize) => {\n    let id = ''\n    while (true) {\n      let bytes = getRandom(step)\n      let j = step\n      while (j--) {\n        id += alphabet[bytes[j] & mask] || ''\n        if (id.length === size) return id\n      }\n    }\n  }\n}\nlet customAlphabet = (alphabet, size = 21) =>\n  customRandom(alphabet, size, random)\nlet nanoid = (size = 21) =>\n  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {\n    byte &= 63\n    if (byte < 36) {\n      id += byte.toString(36)\n    } else if (byte < 62) {\n      id += (byte - 26).toString(36).toUpperCase()\n    } else if (byte > 62) {\n      id += '-'\n    } else {\n      id += '_'\n    }\n    return id\n  }, '')\n\n\n\n//# sourceURL=webpack://express/./node_modules/nanoid/index.browser.js?");

/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   urlAlphabet: () => (/* binding */ urlAlphabet)\n/* harmony export */ });\nlet urlAlphabet =\n  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'\n\n\n\n//# sourceURL=webpack://express/./node_modules/nanoid/url-alphabet/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;