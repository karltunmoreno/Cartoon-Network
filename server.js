const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes'))

mongoose.connect(process.env.MONODB_URI || 'mongodb://127.0.0.1:27017/SocialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));