const express = require('express');
const path = require('path');
const app = express();

const person = {
  name: 'alan',
  age: 22
};

const allowOrigin = res => res.header('Access-Control-Allow-Origin', '*');
app.get('/cors-forbidden', (req, res) => {
  res.json(person);
});

app.get('/cors-permit', (req, res) => {
  allowOrigin(res);
  res.json(person);
});

app.options('/trigger-preflight', (req, res) => {
  allowOrigin(res);
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Access-Token');
  res.end();
});

app.get('/trigger-preflight', (req, res) => {
  allowOrigin(res);
  res.json(person);
});

app.get('/cookie', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.cookie('username', 'jack', {
    maxAge: 86400000,
    secure: false,
    httpOnly: true
  });
  res.end('ok');
});

app.post('/cookie', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.end('ok');
});

app.options('/cookie', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Access-Token');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.end();
});

app.get('/cookie2', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).json(person);
});

app.listen(3001);
