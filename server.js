const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.set('port', 8080);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const filePath = `/uploads/${req.file.filename}`;
    res.send({ filePath });
});

app.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
