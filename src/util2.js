// Version 2.2.2
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// Dosya yolunu dinamik olarak ayarla
const excelFilePath = path.join(__dirname, "../public/data/CPIAUCSL.xlsx"); // Bir üst dizine çık ve 'public/data'ya git

// Excel dosyasını oku
try {
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // JSON formatına çevir
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  // JSON dosyasını kaydet
  const outputFilePath = path.join(__dirname, "output.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));

  console.log(`JSON data saved to ${outputFilePath}`);
} catch (error) {
  console.error("Error reading the Excel file:", error.message);
}
