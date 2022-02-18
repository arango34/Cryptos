require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.set('trust proxy', 1);

app.use('/api', require('./routes'));

app.use(express.static(path.join(__dirname, './build')));
console.log(__dirname);

// app.use(express.static('./public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on port ${port}`));
