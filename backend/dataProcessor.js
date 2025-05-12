import fs from 'fs/promises';
import csv from 'csv-parser';
import { Readable } from 'stream';


// File Path
const CSV_FILE_PATH = './dataset/automobile.csv'

export async function readLocalDataset() {
  try {
    const data = await fs.readFile(CSV_FILE_PATH, 'utf-8');

    // Parse data into array of objects
    const parsedData = await parseCSV(data);
    return parsedData;
  } catch (error) {
    console.log('Error reading local dataset:', error);
    throw error;
  }
}

// Helper function to parse CSV string into array of objects
function parseCSV(csvString) {
  return new Promise((resolve, reject) => {
    const results = [];
    const readable = new Readable();
    readable._read = () => {}; // no-op
    readable.push(csvString);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}