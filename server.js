const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');               

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Use Atlas connection string (development when running locally)
let mongoURI = config.mongoURI.development;
if (process.env.NODE_ENV === 'production') {
    mongoURI = config.mongoURI.production;
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected successfully to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
