const fs = require('fs');
const path = require('path');

function formatUsdTryFromFile() {
  const filePath = path.join(__dirname, '../public/data/data.json'); // data.json resides in the data subdirectory
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);
    const formattedData = data.map(entry => ({
      ...entry,
      USDTRY: parseFloat(entry.USDTRY.toFixed(2)),
      EURTRY: parseFloat(entry?.EURTRY?.toFixed(2)) || 1,
    }));
    return formattedData;
  } catch (error) {
    console.error('Dosya okunamadı:', error.message);
    return [];
  }
}
// Örnek kullanım
const formattedData = formatUsdTryFromFile();
function printDataLineByLine(data) {
  data.forEach(item => {
    console.log(item.EURTRY.toFixed(2)); // Değeri iki ondalık haneye yuvarlayarak yazdırır
  });
}
// Çalıştırma
printDataLineByLine(formattedData);
function saveDataToFile(data, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Data saved to ${fileName}`);
}
saveDataToFile(formattedData, 'output.json');
