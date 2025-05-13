import express from 'express';
import admin from 'firebase-admin';
import fs from 'fs/promises';
import { readLocalDataset } from './dataProcessor.js'; 

// Load Firebase credentials
const credentials = JSON.parse(
    await fs.readFile('./key.json', 'utf-8')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
const PORT = process.env.PORT || 8080;
const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// On startup, read dataset and upload
(async () => {
  try {
    const collectionRef = db.collection('automobiles');
    const snapshot = await collectionRef.limit(1).get();

    if (snapshot.empty) {
        const data = await readLocalDataset();
        await uploadDataToFirestore(data);
        console.log('Dataset uploaded successfully during startup.');
    } else {
        console.log('Collection already has data. Skipping upload.');
    }
  } catch (err) {
    console.error('Error during initial dataset upload:', err);
  }
})();

// Function to upload data to Firestore
async function uploadDataToFirestore(dataArray) {
  const collectionRef = db.collection('automobiles'); // replace with your collection name

  for (const item of dataArray) {
    await collectionRef.add(item);
  }
}


// GET API
app.get('/automobiles', async (req, res) => {
    try {
        const collectionRef = db.collection('automobiles');
        const response = await collectionRef.get();
        let responseArr = [];

        response.forEach(doc => {
            responseArr.push(doc.data());
        });

        res.send({
            success: true,
            message: 'Collection returned',
            data: responseArr
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: message.error
        });
    }
});