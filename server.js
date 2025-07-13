// Version 2.2.1
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/data', (req, res) => {
  try {
    const excelPath = path.join(__dirname, 'public', 'data', 'CPIAUCSL.xlsx');
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    res.json(jsonData);
  } catch (err) {
    console.error('Error reading Excel:', err);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
