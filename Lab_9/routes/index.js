//Here you will require route files and export them as used in previous labs. 


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/homepage.html'));
});

const constructorMethod = (app) => {
  app.use('/', router);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

export default constructorMethod;
