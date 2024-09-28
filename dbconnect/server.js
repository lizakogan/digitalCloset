require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('closetDB');
    const collection = database.collection('mannequins');

    const server = http.createServer(async (req, res) => {
      if (req.method === 'GET' && req.url === '/mannequins') {
        const mannequins = await collection.find({}).toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mannequins));
      } else if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, '../index.html'), (err, data) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      } else if (req.method === 'GET' && req.url === '/style.css') {
        fs.readFile(path.join(__dirname, '../style.css'), (err, data) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading style.css');
          }
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(data);
        });
      } else if (req.method === 'GET' && req.url === '/index.js') {
        fs.readFile(path.join(__dirname, '../index.js'), (err, data) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.js');
          }
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
        });
      } else if (req.url.startsWith('/images/')) {
        const imagePath = path.join(__dirname, '..', req.url);
        const ext = path.extname(imagePath).toLowerCase();
        let contentType = 'image/jpeg';

        if (ext === '.png') {
          contentType = 'image/png';
        }

        fs.readFile(imagePath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
          }
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    });

    server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);