'use strict';
function fetch(url, [method, headerName, headerValue, data]) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  if (method === 'POST') {
    xhr.setRequestHeader(headerName, headerValue);
  }

  xhr.send(data);
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (xhr.status !== 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      return;
    }

    console.log(xhr.response);
  }
}

const getDataArray = ['GET'];
const postDataArray = ['POST', 'Content-Type', 'application/json;charset=utf-8', { user: 'Masha', pasword: 1234 }]

fetch('http://httpbin.org/get', getDataArray);
fetch('http://httpbin.org/post', postDataArray);
