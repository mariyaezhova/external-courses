const http = require('http');
const fs = require('fs');
const path = require('path');

const initialAnimalsData = ['cat', 'dog', 'parrot', 'monkey', 'leo', 'ostrich', 'peacock'];

http.createServer((req, res) => {
  if (req.url === '/') {
    sendRes('task-02.html', 'text/html', res);
  } else if (req.url === '/get') {
    res.end(JSON.stringify(initialAnimalsData));
  } else {
    sendRes(req.url, getContentType(req.url), res);
  }  
}).listen(3000);

function sendRes(url, contentType, res) {
  const file = path.join(__dirname, url);

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.write('file not found');
      res.end();
      console.log(`Error 404 ${file}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
      console.log(`${file} is uploaded`);
    }
  })
}

function getContentType(url) {
  switch (path.extname(url)) {
    case '.html':
      return "text/html";
    case '.css':
      return "text/css";
    case '.js':
      return "text/javascript";
    default:
      return "application/octate-stream";
  }
}
