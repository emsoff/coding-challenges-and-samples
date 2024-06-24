const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const sourceFilePath = path.join(__dirname, 'largefile.txt');
const destinationFilePath = path.join(__dirname, 'output.txt.gz');

const readStream = fs.createReadStream(sourceFilePath, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(destinationFilePath);

const gzip = zlib.createGzip();

readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
        console.log('Writing and compression finished.');
    })
    .on('error', (err) => {
        console.error('An error occurred during writing:', err);
    });

readStream.on('error', (err) => {
    console.error('An error occurred during reading:', err);
});

gzip.on('error', (err) => {
    console.error('An error occurred during compression:', err);
});

readStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
});

readStream.on('end', () => {
    console.log('Reading finished.');
});
