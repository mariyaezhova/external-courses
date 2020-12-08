'use strict';
function fetch(url, { method, headers, data }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    if (method === 'POST') {
      Object.entries(headers).map(([key, value]) => {
        xhr.setRequestHeader(key, value);
      })
    }

    xhr.send(data)
    xhr.responseType = 'json';
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(xhr.statusText);
  })
}

const getDataArray = { method: 'GET' };
const postDataArray = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  data: 'Data were uploaded'
}

fetch('http://httpbin.org/get', getDataArray);
fetch('http://httpbin.org/post', postDataArray);
